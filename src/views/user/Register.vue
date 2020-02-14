<template>
  <div class="main user-layout-register">
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.username-placeholder')"
          v-decorator="['username', {rules: [{ required: true, message: $t('user.username-required') }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          :placeholder="$t('user.password-placeholder')"
          v-decorator="['password', {rules: [{ validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          :placeholder="$t('user.passwordConfirm-placeholder')"
          v-decorator="['passwordConfirm', {rules: [{ required: true, message: $t('user.passwordConfirm-required') }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          :placeholder="$t('user.phone-placeholder')"
          v-decorator="['phone', {rules: [{ required: true, message: $t('user.phone-wrong-format'), pattern: /^1[3456789]\d{9}$/ }], validateTrigger: ['change', 'blur'] }]">
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          :placeholder="$t('user.email-placeholder')"
          v-decorator="['email', {rules: [{ required: true, type: 'email', message: $t('user.email-wrong-format'), pattern: /^1[3456789]\d{9}$/ }], validateTrigger: ['change', 'blur'] }]">
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.empno-placeholder')"
          v-decorator="['empno', {rules: [{ required: true, message: $t('user.empno-required') }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-select
          size="large"
          :placeholder="$t('user.department-placeholder')"
          v-decorator="['department', {rules: [{ required: true, message: $t('user.department-required') }], validateTrigger: ['change', 'blur']}]">
          <a-select-option value="1">市场部</a-select-option>
          <a-select-option value="2">销售部</a-select-option>
          <a-select-option value="3">IT部</a-select-option>
          <a-select-option value="4">人事部</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-select
          size="large"
          :placeholder="$t('user.question-placeholder')"
          v-decorator="['question', {rules: [{ required: true, message: $t('user.question-required') }], validateTrigger: ['change', 'blur']}]">
          <a-select-option value="1">你的生日是？</a-select-option>
          <a-select-option value="2">你的故乡是？</a-select-option>
          <a-select-option value="3">你的小学名称？</a-select-option>
          <a-select-option value="4">你的小学班主任名是？</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.answer-placeholder')"
          v-decorator="['answer', {rules: [{ required: true, message: $t('user.answer-required') }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn">
          {{ $t('user.register') }}
        </a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import i18n from '@/locales'

export default {
  name: 'Register',
  data () {
    return {
      form: this.$form.createForm(this),
      registerBtn: false
    }
  },
  methods: {
    handlePasswordLevel (rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      if (level >= 2 && value.length >= 6) {
        callback()
      } else {
        callback(new Error(i18n.t('user.password-level') || 'Password Error'))
      }
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value === undefined) {
        callback(new Error(i18n.t('user.password-required') || 'Password Confirm Error'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(i18n.t('user.password-twice') || 'Password Confirm Error'))
      }
      callback()
    },

    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          this.$notification['success']({
            message: '注册成功',
            description: '注册成功，请登录',
            duration: 4
          })

          this.$router.push({ name: 'login' })
        }
      })
    },

    requestFailed (err) {
      this.$notification['error']({
        message: 'Error',
        description: ((err.response || {}).data || {}).msg || 'Request error, please try again later',
        duration: 4
      })
      this.registerBtn = false
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
