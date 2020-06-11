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
                <a-input v-decorator="['customerCd', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.customerName')">
                <a-input v-decorator="['customerName', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.address')">
                <a-cascader
                  placeholder=""
                  :fieldNames="address.fieldName"
                  :options="address.data"
                  v-decorator="['addressSelect', {rules: [{required: true, message: $t('message.required')}]}]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.address-detail')">
                <a-input v-decorator="['address', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.director')">
                <a-input v-decorator="['director', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.salesVolumn')">
                <a-input v-decorator="['salesVolumn', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.developmentSkill')">
                <a-input v-decorator="['developmentSkill', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.target')">
                <a-input v-decorator="['target']" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.wechat')">
                <a-input v-decorator="['wechat']" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :label="$t('customer.phone')">
                <a-input v-decorator="['phone']" />
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.distribution')">
                <a-input v-decorator="['distribution']" />
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.productList')">
                <a-input v-decorator="['productList']" />
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <a-form-item :label="$t('customer.salesMan')">
                <a-select mode="multiple" optionFilterProp="children" v-decorator="['salesMan']">
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

export default {
  name: 'CustomerForm',
  components: {
    AvatarModal
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
          director: row.director,
          phone: row.phone,
          wechat: row.wechat,
          description: row.description,
          salesVolumn: row.salesVolumn,
          developmentSkill: row.developmentSkill,
          target: row.target,
          productList: row.productList,
          distribution: row.distribution,
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
        if (values.salesMan) {
          values.salesMan = JSON.stringify(values.salesMan)
        }

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
