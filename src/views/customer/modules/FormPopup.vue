<template>
  <a-modal
    :title="title"
    :width="700"
    :maskClosable="false"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <div :class="`table-page-popup-wrapper ${!isMobile() || 'mobile'}`">
        <div class="ant-upload-preview" @click="$refs.modal.edit('customerAvatar', formData.id)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <a-avatar shape="square" :size="150" icon="user" :src="formData.customerImage" />
        </div>
        <a-form :form="form" layout="inline">
          <a-row :gutter="5">
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.customerCd')">
                <a-input v-decorator="['customerCd', {rules: [{required: true,validator: this.handleCheckCustomerCd }], validateTrigger: ['blur']}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.customerName')">
                <a-input v-decorator="['customerName', {rules: [{required: true,validator: this.handleCheckCustomerName }], validateTrigger: ['blur']}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.customerType')">
                <a-select
                  v-decorator="['customerType', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]">
                  <a-select-option v-for="list in customerType" :key="list['cnfNote']">{{ list['cnfNote'] }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.salesVolumn')">
                <a-input v-decorator="['salesVolumn']" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.director')">
                <a-input v-decorator="['director', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.phone')">
                <a-input v-decorator="['phone']" />
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.address')">
                <a-cascader
                  placeholder=""
                  :fieldNames="address.fieldName"
                  :options="address.data"
                  v-decorator="['addressSelect', {rules: [{required: true, message: $t('message.required')}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.address-detail')">
                <a-input v-decorator="['address']" />
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.developmentSkill')">
                <a-select
                  mode="multiple"
                  optionFilterProp="children"
                  v-decorator="['developmentSkill']"
                >
                  <a-select-option v-for="list in customerDevelopmentSkill" :key="list['cnfNote']">{{ list['cnfNote'] }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.channel')">
                <a-select
                  mode="multiple"
                  optionFilterProp="children"
                  v-decorator="['channel']"
                >
                  <a-select-option v-for="list in customerChannel" :key="list['cnfNote']">{{ list['cnfNote'] }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.target')">
                <a-input
                  v-decorator="['targetDetail']"
                  placeholder="具体"
                >
                  <a-select
                    slot="addonBefore"
                    v-decorator="['targetType', { initialValue: '全国' }]"
                    placeholder="选项"
                    style="width: 100px"
                  >
                    <a-select-option v-for="list in customerTarget" :key="list['cnfNote']">{{ list['cnfNote'] }}</a-select-option>
                  </a-select>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.productList')">
                <a-input v-decorator="['productList']" />
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.salesMan')">
                <a-select mode="multiple" optionFilterProp="children" v-decorator="['salesMan', {rules: [{required: true, message: $t('message.required')}]}]">
                  <a-select-option v-for="item in this.$parent.$parent.userList" :key="item.id">{{ item.realname }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.description')">
                <a-input type="textarea" v-decorator="['description']" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-spin>

    <avatar-modal ref="modal" @ok="setAvatar"/>
  </a-modal>
</template>

<script>
import i18n from '@/locales'
import AvatarModal from '@/components/tools/AvatarModal'
import pca from 'china-division/dist/pca-code.json'
import { mixinDevice } from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { checkCustomerCd, checkCustomerName } from '@/api/customer'

export default {
  name: 'CustomerForm',
  components: {
    AvatarModal
  },
  computed: {
    ...mapGetters(['customerType', 'customerChannel', 'customerDevelopmentSkill', 'customerTarget'])
  },
  mixins: [mixinDevice],
  data () {
    return {
      title: i18n.t('option.create'),
      actionType: 'add',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      formData: {},
      address: {
        fieldName: {
          label: 'name',
          value: 'code',
          children: 'children'
        },
        data: [{
          name: '国外',
          code: '99',
          children: []
        }, ...pca]
      }
    }
  },
  methods: {
    // 校验客户编号唯一性
    handleCheckCustomerCd (rule, value, callback) {
      if (this.formData.customerCd === value) {
        callback()
        return
      }
      if (value) {
        checkCustomerCd({
          customerCd: value
        }).then(() => {
          callback()
        }).catch(() => {
          callback(new Error(i18n.t('message.used') + ''))
        })
      } else {
        callback(new Error(i18n.t('message.required') + ''))
      }
    },
    // 校验客户名唯一性
    handleCheckCustomerName (rule, value, callback) {
      if (this.formData.customerName === value) {
        callback()
        return
      }
      if (value) {
        checkCustomerName({
          customerName: value
        }).then(() => {
          callback()
        }).catch(() => {
          callback(new Error(i18n.t('message.used') + ''))
        })
      } else {
        callback(new Error(i18n.t('message.required') + ''))
      }
    },
    add () {
      this.title = i18n.t('option.create')
      this.actionType = 'add'
      this.form.resetFields()
      this.visible = true
      this.formData = {
        id: null,
        customerImage: '/avatar.jpg'
      }
    },
    edit (row) {
      this.title = i18n.t('option.edit')
      this.actionType = 'update'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          customerCd: row.customerCd,
          customerName: row.customerName,
          customerType: row.customerType,
          director: row.director,
          phone: row.phone,
          description: row.description,
          salesVolumn: row.salesVolumn,
          developmentSkill: row.developmentSkill ? JSON.parse(row.developmentSkill) : [],
          channel: row.channel ? JSON.parse(row.channel) : [],
          targetType: row.target ? row.target.substr(0, row.target.indexOf(',')) : '',
          targetDetail: row.target ? row.target.substr(row.target.indexOf(',') + 1) : '',
          productList: row.productList,
          addressSelect: row.province ? [row.province, row.city, row.area] : null,
          address: row.address,
          salesMan: row.salesMan ? JSON.parse(row.salesMan) : []
        })
      })
      this.formData = Object.assign({}, this.formData, row)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        if (err) return
        this.confirmLoading = true

        // 参数整理
        if (values.addressSelect) {
          values.province = values.addressSelect[0]
          values.city = values.addressSelect[1]
          values.area = values.addressSelect[2]
        }
        if (values.developmentSkill) {
          values.developmentSkill = JSON.stringify(values.developmentSkill)
        }
        if (values.channel) {
          values.channel = JSON.stringify(values.channel)
        }
        if (values.salesMan) {
          values.salesMan = JSON.stringify(values.salesMan)
        }
        values.target = (values.targetType ? values.targetType : '') + ',' + (values.targetDetail ? values.targetDetail : '')

        this.$emit(this.actionType, Object.assign({}, this.formData, values))
      })
    },
    handleCancel () {
      this.visible = false
    },
    setAvatar (url) {
      this.formData.customerImage = url
    },
    setConfirmLoading (val = false) {
      this.confirmLoading = val
    },
    setVisible (val = false) {
      this.visible = val
    }
  }
}
</script>
