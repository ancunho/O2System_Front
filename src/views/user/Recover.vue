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
            type="text"
            :placeholder="$t('user.username')"
            v-decorator="[
              'username',
              {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}
            ]"
          />
        </a-form-item>
      </div>

      <!-- step2 -->
      <div v-show="currentStep === 1">
        <div class="ask">问：{{ data.question }}</div>

        <a-form-item>
          <a-input
            size="large"
            type="text"
            :placeholder="$t('user.answer')"
            v-decorator="['answer', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]"
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
            :placeholder="$t('user.passwordNew')"
            v-decorator="['passwordNew', {rules: [{ validator: this.handlePasswordLevel }], validateTrigger: 'change'}]"
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
      </div>
    </a-form>

    <div class="button-box" :class="{ 'hide-prev-button': currentStep === 0 }">
      <a-button
        size="large"
        class="prev-button"
        @click="handlePrev(currentStep)">
        {{ $t('option.prev') }}
      </a-button>
      <a-button
        size="large"
        class="next-button"
        type="primary"
        :loading="confirmLoading"
        :disabled="confirmLoading"
        @click="handleNext(currentStep)">
        {{ currentStep === 2 && $t('option.done') || $t('option.next') }}
      </a-button>
    </div>
  </div>
</template>

<script>
import i18n from '@/locales'
import { forgetGetQuestion, forgetCheckAnswer, forgetResetPassword } from '@/api/user'
import { isPassword } from '@/utils/util'

const stepForms = [
  ['username'],
  ['answer'],
  ['passwordNew', 'passwordConfirm']
]

export default {
  name: 'Recover',
  data () {
    return {
      confirmLoading: false,
      currentStep: 0,
      data: {
        question: '?',
        forgetToken: ''
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
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
      const password = this.form.getFieldValue('passwordNew')
      if (!value) {
        callback(new Error(i18n.t('message.required') + ''))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(i18n.t('user.password-twice') + ''))
      }
      callback()
    },

    handlePrev (step) {
      if (this.currentStep > 0) this.currentStep -= 1
    },

    handleNext (step) {
      const { form: { validateFields, getFieldsValue } } = this
      const currentStep = step + 1

      validateFields(stepForms[ this.currentStep ], (err, values) => {
        if (err) return
        this.confirmLoading = true
        const parameter = Object.assign({}, getFieldsValue(), this.data)

        if (currentStep === 1) {
          // 获取问题
          forgetGetQuestion(parameter).then((res) => {
            this.currentStep = currentStep
            this.data.question = res.data
          }).catch((e) => {}).finally(() => {
            this.confirmLoading = false
          })
        } else if (currentStep === 2) {
          // 校验问题
          forgetCheckAnswer(parameter).then((res) => {
            this.currentStep = currentStep
            this.data.forgetToken = res.data
          }).catch((e) => {}).finally(() => {
            this.confirmLoading = false
          })
        } else if (currentStep === 3) {
          // 修改密码
          forgetResetPassword(parameter).then((res) => {
            this.$notification['success']({
              message: i18n.t('message.success'),
              description: i18n.t('user.recover-success'),
              duration: 4
            })

            this.$router.push({ name: 'login' })
          }).catch((e) => {}).finally(() => {
            this.confirmLoading = false
          })
        }
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
        width: 49%;

        &.next-button {
          float: right;
        }
      }

      &.hide-prev-button {
        button {
          width: 100%;
        }

        .prev-button {
          width: 0;
          padding: 0;
          border: 0;
          overflow: hidden;
        }
      }
    }
  }
</style>
