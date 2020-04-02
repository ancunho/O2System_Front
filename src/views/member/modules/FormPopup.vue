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
              <a-form-item :label="$t('member.username')">
                <a-input v-decorator="['username', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('member.realname')">
                <a-input v-decorator="['realname', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('member.department')">
                <a-input v-decorator="['department', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('member.empno')">
                <a-input v-decorator="['empno', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('member.phone')">
                <a-input v-decorator="['phone', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('member.wechat')">
                <a-input v-decorator="['wechat', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('member.email')">
                <a-input v-decorator="['email', {rules: [{required: true, message: $t('message.required')}]}]" />
              </a-form-item>
              <a-form-item :label="$t('member.status')">
                <a-switch v-decorator="['status', {valuePropName: 'checked'}]" />
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
  name: 'MemberForm',
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
          username: val.username,
          realname: val.realname,
          empno: val.empno,
          phone: val.phone,
          email: val.email,
          department: val.department,
          status: !!val.status,
          wechat: val.wechat
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
