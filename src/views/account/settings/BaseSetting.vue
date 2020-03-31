<template>
  <div class="account-settings-info-view table-page-popup-wrapper">
    <a-form :form="form" layout="inline">
      <a-row :gutter="16">
        <a-col :md="24" :lg="16">
          <a-form-item :label="$t('member.realname')">
            <a-input v-decorator="['realname', {rules: [{required: true}]}]" />
          </a-form-item>
          <a-form-item :label="$t('member.department')">
            <a-input v-decorator="['department', {rules: [{required: true}]}]" />
          </a-form-item>
          <a-form-item :label="$t('member.empno')">
            <a-input v-decorator="['empno', {rules: [{required: true}]}]" />
          </a-form-item>
          <a-form-item :label="$t('member.phone')">
            <a-input v-decorator="['phone', {rules: [{required: true}]}]" />
          </a-form-item>
          <a-form-item :label="$t('member.wechat')">
            <a-input v-decorator="['wechat', {rules: [{required: true}]}]" />
          </a-form-item>
          <a-form-item :label="$t('member.email')">
            <a-input v-decorator="['email', {rules: [{required: true}]}]" />
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
          <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
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
        }).catch((e) => {}).finally(() => {
          this.confirmLoading = false
        })
      })
    }
  }
}
</script>
