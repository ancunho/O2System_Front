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
      <div class="table-page-popup-wrapper">
        <a-form :form="form" layout="inline">
          <a-row :gutter="24">
            <a-col :md="15" :sm="24">
              <a-form-item :label="$t('customer.customerName')">
                <a-input v-decorator="['customerName', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.city')">
                <a-input v-decorator="['city', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.address')">
                <a-input v-decorator="['address', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.director')">
                <a-input v-decorator="['director', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.wechat')">
                <a-input v-decorator="['wechat', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.phone')">
                <a-input v-decorator="['phone', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.description')">
                <a-input v-decorator="['description', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.salesVolumn')">
                <a-input v-decorator="['salesVolumn', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.developmentSkill')">
                <a-input v-decorator="['developmentSkill', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.target')">
                <a-input v-decorator="['target', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.productList')">
                <a-input v-decorator="['productList', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('customer.other')">
                <a-select mode="multiple">
                  <a-select-option key="1">1111</a-select-option>
                  <a-select-option key="2">2222</a-select-option>
                  <a-select-option key="3">3333</a-select-option>
                  <a-select-option key="4">4444</a-select-option>
                  <a-select-option key="5">5555</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="9" :sm="24">
              <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
                <a-icon type="cloud-upload-o" class="upload-icon"/>
                <div class="mask">
                  <a-icon type="plus" />
                </div>
                <a-avatar shape="square" :size="180" icon="user" :src="otherData.imagePhoto" />
              </div>
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

export default {
  name: 'CustomerForm',
  components: {
    AvatarModal
  },
  data () {
    return {
      title: i18n.t('option.add'),
      actionType: 'add',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      otherData: {
        id: null,
        imagePhoto: null
      }
    }
  },
  methods: {
    add () {
      this.title = i18n.t('option.add')
      this.actionType = 'add'
      this.form.resetFields()
      this.visible = true
      this.otherData.id = null
      this.otherData.imagePhoto = null
    },
    edit (val) {
      this.title = i18n.t('option.edit')
      this.actionType = 'update'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          customerName: val.customerName,
          director: val.director,
          phone: val.phone,
          wechat: val.wechat,
          description: val.description,
          salesVolumn: val.salesVolumn,
          developmentSkill: val.developmentSkill,
          target: val.target,
          productList: val.productList,
          city: val.city,
          address: val.address
        })
      })
      this.otherData.id = val.id
      this.otherData.imagePhoto = val.imagePhoto
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          this.confirmLoading = false
          this.$emit(this.actionType, Object.assign({}, values, this.otherData))
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    setAvatar (url) {
      this.otherData.imagePhoto = url
    }
  }
}
</script>
