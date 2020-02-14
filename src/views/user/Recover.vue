<template>
  <div class="main user-layout-recover">
    <a-steps :current="currentStep" size="small">
      <a-step :title="$t('user.recover-step1')" />
      <a-step :title="$t('user.recover-step2')" />
      <a-step :title="$t('user.recover-step3')" />
    </a-steps>

    <a-form :form="form">
      <!-- step1 -->
      <div v-show="currentStep === 0">
        <a-form-item>
          <a-input
            size="large"
            :placeholder="$t('user.username-placeholder')"
            v-decorator="[
              'username',
              {rules: [{ required: true, message: $t('user.username-required') }], validateTrigger: 'change'}
            ]"
          />
        </a-form-item>
      </div>

      <!-- step2 -->
      <div v-show="currentStep === 1">
        <div class="ask">问：{{ question }}</div>

        <a-form-item>
          <a-input
            size="large"
            type="text"
            :placeholder="$t('user.answer-placeholder')"
            v-decorator="['answer', {rules: [{ required: true, message: $t('user.answer-required') }], validateTrigger: ['change', 'blur']}]"
          ></a-input>
        </a-form-item>
      </div>

      <!-- step3 -->
      <div v-show="currentStep === 2">
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
      </div>
    </a-form>

    <div class="button-box">
      <a-button
        size="large"
        type="primary"
        :loading="confirmLoading"
        @click="handleNext(currentStep)">
        {{ currentStep === 2 && '完成' || '下一步' }}
      </a-button>
    </div>
  </div>
</template>

<script>
// import i18n from '@/locales'

import i18n from '@/locales'

const stepForms = [
  ['username'],
  ['answer'],
  ['password', 'passwordConfirm']
]

export default {
  name: 'Recover',
  data () {
    return {
      confirmLoading: false,
      currentStep: 0,
      question: '?',
      form: this.$form.createForm(this)
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

    handleNext (step) {
      const { form: { validateFields } } = this
      const currentStep = step + 1
      // this.confirmLoading = true

      validateFields(stepForms[ this.currentStep ], (errors, values) => {
        if (errors) return

        if (currentStep === 1) {
          this.question = '你最喜欢的电影是？'
        } else if (currentStep === 2) {

        } else if (currentStep === 3) {
          this.$notification['success']({
            message: '修改成功',
            description: '密码修改成功，请重新登录',
            duration: 4
          })

          this.$router.push({ name: 'login' })

          return
        }

        this.currentStep = currentStep
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .user-layout-recover {
    .ant-steps {
      margin-bottom: 25px;
    }

    .ask {
      margin-bottom: 15px;
      font-size: 16px;
    }

    .button-box {
      button {
        width: 100%;
      }
    }
  }
</style>
