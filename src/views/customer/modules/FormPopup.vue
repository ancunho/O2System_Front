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
            <a-col :md="18" :sm="24" :class="isMobile() || 'twoLine'">
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

            <a-col :md="6" :sm="24">
              <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
                <a-icon type="cloud-upload-o" class="upload-icon"/>
                <div class="mask">
                  <a-icon type="plus" />
                </div>
                <a-avatar shape="square" :size="150" icon="user" :src="formData.imagePhoto" />
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
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'CustomerForm',
  components: {
    AvatarModal
  },
  mixins: [mixinDevice],
  data () {
    return {
      title: i18n.t('option.add'),
      actionType: 'add',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      formData: {}
    }
  },
  methods: {
    add () {
      this.title = i18n.t('option.add')
      this.actionType = 'add'
      this.form.resetFields()
      this.visible = true
      this.formData = {
        id: null,
        imagePhoto: '/avatar.jpg'
      }
    },
    edit (row) {
      this.title = i18n.t('option.edit')
      this.actionType = 'update'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          customerName: row.customerName,
          director: row.director,
          phone: row.phone,
          wechat: row.wechat,
          description: row.description,
          salesVolumn: row.salesVolumn,
          developmentSkill: row.developmentSkill,
          target: row.target,
          productList: row.productList,
          city: row.city,
          address: row.address
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
        // values.birthday = this.$options.filters.filterD2S(values.birthday)
        // values.province = values.addressSelect[0]
        // values.city = values.addressSelect[1]
        // values.area = values.addressSelect[2]

        this.$emit(this.actionType, Object.assign({}, this.formData, values))
      })
    },
    handleCancel () {
      this.visible = false
    },
    setAvatar (url) {
      this.formData.imagePhoto = url
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
