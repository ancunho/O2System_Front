<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" :message="$t('user.username-password-error')" />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="`${$t('user.username')}: admin`"
          v-decorator="[
            'username',
            {rules: [{ required: true, message: $t('user.username-required') }], validateTrigger: 'change'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          :placeholder="`${$t('user.password')}: demo`"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: $t('user.password-required') }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >{{ $t('user.login') }}</a-button>
      </a-form-item>

      <div class="user-login-other">
        <router-link class="register" :to="{ name: 'register' }">{{ $t('user.register') }}</router-link>
        <router-link class="recover" :to="{ name: 'recover' }">{{ $t('user.recover') }}</router-link>
      </div>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        loginBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          state.loginBtn = false
        }
      })
    },
    loginSuccess (res) {
      this.$router.push({ path: '/' })
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: 'Error',
        description: ((err.response || {}).data || {}).msg || 'Request error, please try again later',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .register {
      float: left;
    }

    .recover {
      float: right;
    }
  }
}
</style>
