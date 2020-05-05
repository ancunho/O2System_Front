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
        <div class="table-page-popup-wrapper">
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
                <a-form-item :label="$t('project.projectPriceTotal')">
                  <a-input v-decorator="['projectPriceTotal', {rules: [{required: true, message: $t('message.required')}]}]" />
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
                  <a-input v-decorator="['customerCd', {rules: [{required: true, message: $t('message.required')}]}]" />
                </a-form-item>
              </a-col>
              <a-col :md="12" :sm="24">
                <a-form-item :label="$t('customer.customerName')">
                  <a-row :gutter="8">
                    <a-col :span="14">
                      <a-input v-decorator="['customerName', {rules: [{required: true, message: $t('message.required')}]}]" />
                    </a-col>
                    <a-col :span="10">
                      <a-button @click="() => this.handleGetCustomer()">{{ $t('option.getInfo') }}</a-button>
                    </a-col>
                  </a-row>
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
              <div v-show="advanced">
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
                  <a-form-item :label="$t('customer.description')">
                    <a-input v-decorator="['description']" />
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
import { getCustomerById, getCustomerNameList } from '@/api/customer'
import { getMemberNameList } from '@/api/member'

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
        data: [...pca]
      },
      customerId: '',
      userList: [],
      customerList: []
    }
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
          projectPriceTotal: row.projectPriceTotal,
          projectSalesMan: JSON.parse(row.projectSalesMan),
          customerCd: row.customer.customerCd,
          customerName: row.customer.customerName,
          director: row.customer.director,
          phone: row.customer.phone,
          wechat: row.customer.wechat,
          description: row.customer.description,
          salesVolumn: row.customer.salesVolumn,
          developmentSkill: row.customer.developmentSkill,
          target: row.customer.target,
          productList: row.customer.productList,
          distribution: row.customer.distribution,
          addressSelect: row.customer.province ? [row.customer.province, row.customer.city, row.customer.area] : null,
          address: row.customer.address
        })
      })
      this.formData = Object.assign({}, this.formData, row)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        if (err) return
        this.confirmLoading = true
        values.projectSalesMan = JSON.stringify(values.projectSalesMan)
        values.projectStarttime = this.$options.filters.filterD2S(values.projectStarttime)
        values.projectEndtime = this.$options.filters.filterD2S(values.projectEndtime)
        values.customer = {
          id: this.customerId,
          customerCd: values.customerCd,
          customerName: values.customerName,
          director: values.director,
          phone: values.phone,
          wechat: values.wechat,
          description: values.description,
          salesVolumn: values.salesVolumn,
          developmentSkill: values.developmentSkill,
          target: values.target,
          productList: values.productList,
          distribution: values.distribution,
          address: values.address
        }
        if (values.addressSelect) {
          values.customer.province = values.addressSelect[0]
          values.customer.city = values.addressSelect[1]
          values.customer.area = values.addressSelect[2]
        }

        this.$emit(this.actionType, Object.assign({}, this.formData, values))
      })
    },
    handleCancel () {
      this.visible = false
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    setConfirmLoading (val = false) {
      this.confirmLoading = val
    },
    setVisible (val = false) {
      this.visible = val
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
        this.form.setFieldsValue({
          customerCd: res.data.customerCd,
          customerName: res.data.customerName,
          director: res.data.director,
          phone: res.data.phone,
          wechat: res.data.wechat,
          description: res.data.description,
          salesVolumn: res.data.salesVolumn,
          developmentSkill: res.data.developmentSkill,
          target: res.data.target,
          productList: res.data.productList,
          distribution: res.data.distribution,
          addressSelect: res.data.province ? [res.data.province, res.data.city, res.data.area] : null,
          address: res.data.address
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
