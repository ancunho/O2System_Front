<template>
  <div>
    <a-modal
      :title="title"
      :width="700"
      :maskClosable="false"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :okText="actionType === 'add' ? $t('option.createProject') : $t('option.save')"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-spin :spinning="confirmLoading">
        <div class="table-page-popup-wrapper noPhoto">
          <a-form :form="form" layout="inline">
            <a-divider>{{ $t('project.projectBaseInfo') }}</a-divider>
            <a-row :gutter="24">
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('project.projectCd')">
                  <a-input v-decorator="['projectCd', {rules: [{required: true, message: $t('message.required')}]}]" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('project.projectName')">
                  <a-input v-decorator="['projectName', {rules: [{required: true, message: $t('message.required')}]}]" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('project.projectLocation')">
                  <a-select v-decorator="['projectLocation']">
                    <a-select-option value="进口（一般）">进口（一般）</a-select-option>
                    <a-select-option value="进口（跨境）">进口（跨境）</a-select-option>
                    <a-select-option value="国产">国产</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('project.distribution')">
                  <a-select v-decorator="['distribution']">
                    <a-select-option value="内销">内销</a-select-option>
                    <a-select-option value="出口">出口</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('project.projectPriceTotal')">
                  <a-input v-decorator="['projectPriceTotal']" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('project.projectSalesMan')">
                  <a-select mode="multiple" optionFilterProp="children" v-decorator="['projectSalesMan', {rules: [{required: true, message: $t('message.required')}]}]">
                    <a-select-option v-for="item in userList" :key="item.id">{{ item.realname }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('project.projectStarttime')">
                  <a-date-picker style="width:100%" v-decorator="['projectStarttime', {rules: [{required: true, message: $t('message.required')}]}]" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('project.projectEndtime')">
                  <a-date-picker style="width:100%" v-decorator="['projectEndtime', {rules: [{required: true, message: $t('message.required')}]}]" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-divider>{{ $t('project.projectCustomerInfo') }}</a-divider>
            <a-row :gutter="24">
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.customerCd')">
                  <a-input :disabled="customerDisable" v-decorator="['customerCd', {rules: [{required: true,validator: this.handleCheckCustomerCd }], validateTrigger: ['blur']}]" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.customerName')">
                  <a-row :gutter="8">
                    <a-col :span="14">
                      <a-input :disabled="customerDisable" v-decorator="['customerName', {rules: [{required: true,validator: this.handleCheckCustomerName }], validateTrigger: ['blur']}]" />
                    </a-col>
                    <a-col :span="10">
                      <a-button @click="() => this.handleGetCustomer()">{{ $t('option.getInfo') }}</a-button>
                    </a-col>
                  </a-row>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.customerType')">
                  <a-select
                    :disabled="customerDisable"
                    v-decorator="['customerType', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]"
                  >
                    <a-select-option v-for="list in customerType" :key="list['cnfNote']">{{ list['cnfNote'] }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.salesVolumn')">
                  <a-input :disabled="customerDisable" v-decorator="['salesVolumn']" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.director')">
                  <a-input :disabled="customerDisable" v-decorator="['director', {rules: [{required: true, message: $t('message.required')}]}]" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.phone')">
                  <a-input :disabled="customerDisable" v-decorator="['phone']" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.address')">
                  <a-cascader
                    placeholder=""
                    :disabled="customerDisable"
                    :fieldNames="address.fieldName"
                    :options="address.data"
                    v-decorator="['addressSelect', {rules: [{required: true, message: $t('message.required')}]}]"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.address-detail')">
                  <a-input :disabled="customerDisable" v-decorator="['address']" />
                </a-form-item>
              </a-col>
              <a-col :md="24" :sm="24">
                <a-form-item :label="$t('customer.salesMan')">
                  <a-select
                    :disabled="customerDisable"
                    mode="multiple"
                    optionFilterProp="children"
                    v-decorator="['salesMan', {rules: [{required: true, message: $t('message.required')}]}]"
                  >
                    <a-select-option v-for="item in userList" :key="item.id">{{ item.realname }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <div v-show="advanced">
                <a-col :md="12" :sm="24">
                  <a-form-item :label="$t('customer.developmentSkill')">
                    <a-select
                      :disabled="customerDisable"
                      mode="multiple"
                      optionFilterProp="children"
                      v-decorator="['developmentSkill']"
                    >
                      <a-select-option v-for="list in customerDevelopmentSkill" :key="list['cnfNote']">{{ list['cnfNote'] }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="12" :sm="24">
                  <a-form-item :label="$t('customer.channel')">
                    <a-select
                      :disabled="customerDisable"
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
                      :disabled="customerDisable"
                      v-decorator="['targetDetail']"
                      placeholder="具体"
                    >
                      <a-select
                        :disabled="customerDisable"
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
                    <a-input :disabled="customerDisable" v-decorator="['productList']" />
                  </a-form-item>
                </a-col>
                <a-col :md="24" :sm="24">
                  <a-form-item :label="$t('customer.description')">
                    <a-input :disabled="customerDisable" type="textarea" v-decorator="['description']" />
                  </a-form-item>
                </a-col>
              </div>
              <a-col :md="24" :sm="24" class="more-box">
                <a @click="toggleAdvanced">
                  {{ advanced ? $t('option.close') : $t('option.open') }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-spin>
    </a-modal>

    <a-modal
      title="获取客户信息"
      :width="300"
      :maskClosable="false"
      :visible="visibleCustomer"
      @ok="handleSubmitCustomer"
      @cancel="handleCancelCustomer"
    >
      <a-select
        :showSearch="true"
        optionFilterProp="children"
        v-model="customerId"
        placeholder="请搜索"
        style="width: 100%"
      >
        <a-select-option v-for="item in customerList" :key="item.id">{{ item.customerName }}</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script>
import i18n from '@/locales'
import pca from 'china-division/dist/pca-code.json'
import { checkCustomerCd, checkCustomerName, getCustomerById, getCustomerNameList } from '@/api/customer'
import { getMemberNameList } from '@/api/member'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectForm',
  data () {
    return {
      advanced: false,
      title: i18n.t('option.create'),
      actionType: 'add',
      visible: false,
      visibleCustomer: false,
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
      },
      customerId: '',
      userList: [],
      customerList: [],
      customerDisable: false
    }
  },
  computed: {
    ...mapGetters(['customerType', 'customerChannel', 'customerDevelopmentSkill', 'customerTarget'])
  },
  created () {
    this.$nextTick(() => {
      getMemberNameList().then(res => {
        this.userList = res.data
      })
      getCustomerNameList().then(res => {
        this.customerList = res.data
      })
    })
  },
  methods: {
    // 校验客户编号唯一性
    handleCheckCustomerCd (rule, value, callback) {
      if (this.formData.customer && this.formData.customer.customerCd === value) {
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
      if (this.formData.customer && this.formData.customer.customerName === value) {
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
    },
    edit (row) {
      this.title = i18n.t('option.edit')
      this.actionType = 'update'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          projectCd: row.projectCd,
          projectStarttime: this.$options.filters.filterS2D(row.projectStarttime),
          projectEndtime: this.$options.filters.filterS2D(row.projectEndtime),
          projectName: row.projectName,
          projectLocation: row.projectLocation,
          distribution: row.distribution,
          projectPriceTotal: row.projectPriceTotal,
          projectSalesMan: JSON.parse(row.projectSalesMan),
          customerCd: row.customer.customerCd,
          customerName: row.customer.customerName,
          customerType: row.customer.customerType,
          director: row.customer.director,
          phone: row.customer.phone,
          description: row.customer.description,
          salesVolumn: row.customer.salesVolumn,
          developmentSkill: row.customer.developmentSkill ? JSON.parse(row.customer.developmentSkill) : [],
          channel: row.customer.channel ? JSON.parse(row.customer.channel) : [],
          targetType: row.customer.target ? row.customer.target.substr(0, row.customer.target.indexOf(',')) : '',
          targetDetail: row.customer.target ? row.customer.target.substr(row.customer.target.indexOf(',') + 1) : '',
          productList: row.customer.productList,
          addressSelect: row.customer.province ? [row.customer.province, row.customer.city, row.customer.area] : null,
          address: row.customer.address,
          salesMan: row.customer.salesMan ? JSON.parse(row.customer.salesMan) : []
        })
      })
      this.formData = Object.assign({}, this.formData, row)
      this.customerId = this.formData.customer.id
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        if (err) return
        this.confirmLoading = true
        values.projectCustomer = this.customerId
        values.projectSalesMan = JSON.stringify(values.projectSalesMan)
        values.projectStarttime = this.$options.filters.filterD2S(values.projectStarttime)
        values.projectEndtime = this.$options.filters.filterD2S(values.projectEndtime)
        values.customer = {
          id: this.customerId,
          customerCd: values.customerCd,
          customerName: values.customerName,
          customerType: values.customerType,
          director: values.director,
          phone: values.phone,
          description: values.description,
          salesVolumn: values.salesVolumn,
          channel: values.channel,
          salesMan: values.salesMan,
          developmentSkill: values.developmentSkill,
          target: (values.targetType ? values.targetType : '') + ',' + (values.targetDetail ? values.targetDetail : ''),
          productList: values.productList,
          address: values.address
        }
        if (values.addressSelect) {
          values.customer.province = values.addressSelect[0]
          values.customer.city = values.addressSelect[1]
          values.customer.area = values.addressSelect[2]
        }
        if (values.customer.developmentSkill) {
          values.customer.developmentSkill = JSON.stringify(values.customer.developmentSkill)
        }
        if (values.customer.channel) {
          values.customer.channel = JSON.stringify(values.customer.channel)
        }
        if (values.customer.salesMan) {
          values.customer.salesMan = JSON.stringify(values.customer.salesMan)
        }

        this.$emit(this.actionType, Object.assign({}, this.formData, values))
      })
    },
    handleCancel () {
      this.visible = false
      this.customerDisable = false
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    setConfirmLoading (val = false) {
      this.confirmLoading = val
    },
    setVisible (val = false) {
      this.visible = val
      this.customerDisable = false
    },
    handleGetCustomer () {
      this.visibleCustomer = true
    },
    handleSubmitCustomer () {
      if (!this.customerId) return

      getCustomerById({
        customerId: this.customerId
      }).then(res => {
        this.visibleCustomer = false
        this.customerDisable = true
        this.form.setFieldsValue({
          customerCd: res.data.customerCd,
          customerName: res.data.customerName,
          customerType: res.data.customerType,
          director: res.data.director,
          phone: res.data.phone,
          description: res.data.description,
          salesVolumn: res.data.salesVolumn,
          developmentSkill: res.data.developmentSkill ? JSON.parse(res.data.developmentSkill) : [],
          channel: res.data.channel ? JSON.parse(res.data.channel) : [],
          targetType: res.data.target ? res.data.target.substr(0, res.data.target.indexOf(',')) : '',
          targetDetail: res.data.target ? res.data.target.substr(res.data.target.indexOf(',') + 1) : '',
          productList: res.data.productList,
          addressSelect: res.data.province ? [res.data.province, res.data.city, res.data.area] : null,
          address: res.data.address,
          salesMan: res.data.salesMan ? JSON.parse(res.data.salesMan) : []
        })
      })
    },
    handleCancelCustomer () {
      this.visibleCustomer = false
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/ .ant-form-inline .more-box {
    text-align: center;
  }
</style>
