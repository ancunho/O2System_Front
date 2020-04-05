<template>
  <div class="account-settings-info-view table-page-popup-wrapper">
    <a-form :form="form" layout="inline">
      <a-row :gutter="16">
        <a-col :md="24" :lg="16">
          <a-form-item :label="$t('user.empno')">
            <a-input
              type="text"
              v-decorator="['empno', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.realname')">
            <a-input
              type="text"
              v-decorator="['realname', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.phone')">
            <a-input
              type="text"
              v-decorator="['phone', {rules: [{required: true, validator: this.handleCheckPhone }], validateTrigger: 'change'}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.email')">
            <a-input
              type="text"
              v-decorator="['email', {rules: [{required: true, validator: this.handleCheckEmail }], validateTrigger: 'change'}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.department')">
            <a-select
              v-decorator="['department', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]">
              <a-select-option v-for="list in department" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('user.sex')">
            <a-select v-decorator="['sex']">
              <a-select-option :key="1">{{ $t('user.man') }}</a-select-option>
              <a-select-option :key="2">{{ $t('user.woman') }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('user.birthday')">
            <a-date-picker style="width:100%" v-decorator="['birthday']" />
          </a-form-item>
          <a-form-item :label="$t('user.wechat')">
            <a-input
              type="text"
              v-decorator="['wechat', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
            />
          </a-form-item>
          <a-form-item :label="$t('user.qq')">
            <a-input
              type="text"
              v-decorator="['qq']"
            />
          </a-form-item>
          <a-form-item :label="$t('user.address')">
            <a-cascader
              placeholder=""
              :fieldNames="address.fieldName"
              :options="address.data"
              v-decorator="['address']"
            />
          </a-form-item>
          <a-form-item :label="$t('user.question')">
            <a-select
              v-decorator="['question', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]">
              <a-select-option v-for="list in question" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('user.answer')">
            <a-input
              type="text"
              v-decorator="['answer', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
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
import pca from 'china-division/dist/pca-code.json'
import { mapGetters } from 'vuex'
import { checkEmail, userInfoUpdate } from '@/api/user'
import i18n from '@/locales'
import store from '@/store'
import { isEmail, isPhone } from '@/utils/util'

export default {
  components: {
    AvatarModal
  },
  computed: {
    ...mapGetters(['userInfo', 'department', 'question'])
  },
  data () {
    return {
      address: {
        fieldName: {
          label: 'name',
          value: 'code',
          children: 'children'
        },
        data: [...pca]
      },
      avatar: '',
      email: '',
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.avatar = this.userInfo.imagePhoto
    this.email = this.userInfo.email

    this.$nextTick(() => {
      this.form.setFieldsValue({
        realname: this.userInfo.realname,
        empno: this.userInfo.empno,
        phone: this.userInfo.phone,
        email: this.userInfo.email,
        department: this.userInfo.department,
        question: this.userInfo.question,
        answer: this.userInfo.answer,
        address: this.userInfo.address,
        wechat: this.userInfo.wechat,
        birthday: this.userInfo.birthday,
        sex: this.userInfo.sex,
        qq: this.userInfo.qq
      })
    })
  },
  methods: {
    // 校验手机
    handleCheckPhone (rule, value, callback) {
      if (value) {
        if (!isPhone(value)) {
          callback(new Error(i18n.t('message.format') + ''))
          return
        }

        callback()
      } else {
        callback(new Error(i18n.t('message.required') + ''))
      }
    },

    // 校验邮箱唯一性
    handleCheckEmail (rule, value, callback) {
      if (value) {
        if (!isEmail(value)) {
          callback(new Error(i18n.t('message.format') + ''))
          return
        }

        if (this.email === value) {
          callback()
          return
        }

        checkEmail({ 'email': value }).then(() => {
          callback()
        }).catch(() => {
          callback(new Error(i18n.t('message.used') + ''))
        })
      } else {
        callback(new Error(i18n.t('message.required') + ''))
      }
    },

    // 修改头像
    setAvatar (url) {
      this.avatar = url
    },

    // 保存
    handleSubmit () {
      const { form: { validateFields } } = this

      validateFields((err, values) => {
        console.log(values)
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
