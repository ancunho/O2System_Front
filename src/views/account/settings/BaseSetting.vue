<template>
  <div class="account-settings-info-view table-page-popup-wrapper">
    <a-form :form="form" layout="inline">
      <a-row :gutter="16">
        <a-col :md="24" :lg="16">
          <a-form-item :label="$t('user.empno')">
            <a-input
              type="text"
              v-decorator="['empno', {rules: [{required: true, message: $t('message.required')}]}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.realname')">
            <a-input
              type="text"
              v-decorator="['realname', {rules: [{required: true, message: $t('message.required')}]}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.phone')">
            <a-input
              type="text"
              v-decorator="['phone', {rules: [{required: true, message: $t('message.required')}]}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.email')">
            <a-input
              type="text"
              v-decorator="['email', {rules: [{required: true, message: $t('message.required')}]}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.department')">
            <a-input
              type="text"
              v-decorator="['department', {rules: [{required: true, message: $t('message.required')}]}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.sex')">
            <a-input
              type="text"
              v-decorator="['sex']"
            />
          </a-form-item>
          <a-form-item :label="$t('user.birthday')">
            <a-input
              type="text"
              v-decorator="['birthday']"
            />
          </a-form-item>
          <a-form-item :label="$t('user.wechat')">
            <a-input
              type="text"
              v-decorator="['wechat', {rules: [{required: true, message: $t('message.required')}]}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.qq')">
            <a-input
              type="text"
              v-decorator="['qq']"
            />
          </a-form-item>
          <a-form-item :label="$t('user.address')">
            <a-input
              type="text"
              v-decorator="['address']"
            />
          </a-form-item>
          <a-form-item :label="$t('user.question')">
            <a-input
              type="text"
              v-decorator="['question', {rules: [{required: true, message: $t('message.required')}]}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.answer')">
            <a-input
              type="text"
              v-decorator="['answer', {rules: [{required: true, message: $t('message.required')}]}]"
            />
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              :loading="confirmLoading"
              :disabled="confirmLoading"
              @click="handleSubmit">
              {{ $t('option.save') }}
            </a-button>
          </a-form-item>
        </a-col>

        <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
          <div class="ant-upload-preview" @click="$refs.modal.edit()" >
            <a-icon type="cloud-upload-o" class="upload-icon"/>
            <div class="mask">
              <a-icon type="plus" />
            </div>
            <img :src="avatar"/>
          </div>
        </a-col>
      </a-row>
    </a-form>

    <avatar-modal ref="modal" @ok="setAvatar"/>
  </div>
</template>

<script>
import AvatarModal from '@/components/tools/AvatarModal'
import { mapGetters } from 'vuex'
import { userInfoUpdate } from '@/api/user'
import i18n from '@/locales'
import store from '@/store'

export default {
  components: {
    AvatarModal
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      confirmLoading: false,
      form: this.$form.createForm(this),
      avatar: ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        realname: this.userInfo.realname,
        empno: this.userInfo.empno,
        phone: this.userInfo.phone,
        email: this.userInfo.email,
        department: this.userInfo.department,
        wechat: this.userInfo.wechat
      })
    })
    this.avatar = this.userInfo.imagePhoto
  },
  methods: {
    setAvatar (url) {
      this.avatar = url
    },
    handleSubmit () {
      const { form: { validateFields } } = this

      validateFields((err, values) => {
        if (err) return
        this.confirmLoading = true

        userInfoUpdate(values).then((res) => {
          this.$notification['success']({
            message: i18n.t('message.success'),
            description: i18n.t('user.save-success'),
            duration: 4
          })
          store.dispatch('GetInfo')
        }).catch((e) => {}).finally(() => {
          this.confirmLoading = false
        })
      })
    }
  }
}
</script>
