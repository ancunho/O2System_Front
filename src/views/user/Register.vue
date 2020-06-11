<template>
  <div class="main user-layout-register">
    <a-form :form="form">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.username')"
          v-decorator="['username', {rules: [{ validator: this.handleCheckUsername }], validateTrigger: ['blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.realname')"
          v-decorator="['realname', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          :placeholder="$t('user.password-register')"
          v-decorator="['password', {rules: [{ validator: this.handlePasswordLevel }], validateTrigger: 'change'}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          :placeholder="$t('user.passwordConfirm')"
          v-decorator="['passwordConfirm', {rules: [{ validator: this.handlePasswordCheck }], validateTrigger: 'change'}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.phone')"
          v-decorator="['phone', {rules: [{ validator: this.handleCheckPhone }], validateTrigger: 'change'}]">
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.email')"
          v-decorator="['email', {rules: [{ validator: this.handleCheckEmail }], validateTrigger: ['blur'] }]">
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.empno')"
          v-decorator="['empno', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-select
          size="large"
          :placeholder="$t('user.department')"
          v-decorator="['department', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]">
          <a-select-option v-for="list in department" :key="list['cnfNote']">{{ list['cnfNote'] }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-select
          size="large"
          :placeholder="$t('user.question')"
          v-decorator="['question', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]">
          <a-select-option v-for="list in question" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.answer')"
          v-decorator="['answer', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          :disabled="registerBtn"
          @click="handleSubmit">
          {{ $t('user.register') }}
        </a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import i18n from '@/locales'
import { register, checkUsername, checkEmail } from '@/api/user'
import { isPassword, isPhone, isEmail } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
  name: 'Register',
  computed: {
    ...mapGetters(['department', 'question'])
  },
  data () {
    return {
      form: this.$form.createForm(this),
      registerBtn: false
    }
  },
  methods: {
    // 校验账号唯一性
    handleCheckUsername (rule, value, callback) {
      if (value) {
        if (value.length < 5) {
          callback(new Error(i18n.t('user.username-length') + ''))
          return
        }
        checkUsername({ 'username': value }).then(() => {
          callback()
        }).catch(() => {
          callback(new Error(i18n.t('message.used') + ''))
        })
      } else {
        callback(new Error(i18n.t('message.required') + ''))
      }
    },

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

        checkEmail({ 'email': value }).then(() => {
          callback()
        }).catch(() => {
          callback(new Error(i18n.t('message.used') + ''))
        })
      } else {
        callback(new Error(i18n.t('message.required') + ''))
      }
    },

    // 校验密码强度
    handlePasswordLevel (rule, value, callback) {
      if (isPassword(value)) {
        callback()
      } else {
        callback(new Error((!value ? i18n.t('message.required') : i18n.t('user.password-level')) + ''))
      }
    },

    // 校验确认密码
    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (!value) {
        callback(new Error(i18n.t('message.required') + ''))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(i18n.t('user.password-twice') + ''))
      }
      callback()
    },

    // 提交
    handleSubmit (e) {
      e.preventDefault()
      const { form: { validateFields } } = this

      validateFields((err, values) => {
        if (err) return
        this.registerBtn = true

        // 默认头像
        values['imagePhoto'] = '/avatar.jpg'

        register(values).then((res) => {
          this.$message.success(res.msg)
          this.$router.push({ name: 'login' })
        }).catch((e) => {}).finally(() => {
          this.registerBtn = false
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .user-layout-register {

    .ant-input-group-addon:first-child {
      background-color: #fff;
    }

    .register-button {
      width: 100%;
    }
  }
</style>
