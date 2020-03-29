<template>
  <div class="main user-layout-register">
    <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.username-placeholder')"
          v-decorator="['username', {rules: [{ validator: this.handleCheckUsername }], validateTrigger: ['blur']}]"
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
          v-decorator="['email', {rules: [{ type: 'email', validator: this.handleCheckEmail }], validateTrigger: ['blur'] }]">
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
          @focus="getSelectOption('department')"
          :loading="loading.department"
          v-decorator="['department', {rules: [{ required: true, message: $t('user.department-required') }], validateTrigger: ['change', 'blur']}]">
          <a-select-option v-for="list in select.department" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-select
          size="large"
          :placeholder="$t('user.question-placeholder')"
          @focus="getSelectOption('question')"
          :loading="loading.question"
          v-decorator="['question', {rules: [{ required: true, message: $t('user.question-required') }], validateTrigger: ['change', 'blur']}]">
          <a-select-option v-for="list in select.question" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
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
import { register, checkUsername, checkEmail } from '@/api/user'
import { getCommonConfig } from '@/api/common'
import { isPassword, isEmail } from '@/utils/util'

export default {
  name: 'Register',
  data () {
    return {
      select: {
        department: [],
        question: []
      },
      loading: {
        department: false,
        question: false
      },
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
          callback(new Error(i18n.t('user.username-used') + ''))
        })
      } else {
        callback(new Error(i18n.t('user.username-required') + ''))
      }
    },

    // 校验邮箱唯一性
    handleCheckEmail (rule, value, callback) {
      if (value) {
        if (!isEmail(value)) {
          callback(new Error(i18n.t('user.email-wrong-format') + ''))
          return
        }

        checkEmail({ 'email': value }).then(() => {
          callback()
        }).catch(() => {
          callback(new Error(i18n.t('user.email-used') + ''))
        })
      } else {
        callback(new Error(i18n.t('user.email-required') + ''))
      }
    },

    // 校验密码强度
    handlePasswordLevel (rule, value, callback) {
      if (isPassword(value)) {
        callback()
      } else {
        callback(new Error((value === '' ? i18n.t('user.password-required') : i18n.t('user.password-level')) + ''))
      }
    },

    // 校验确认密码
    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value === undefined) {
        callback(new Error(i18n.t('user.password-required') + ''))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(i18n.t('user.password-twice') + ''))
      }
      callback()
    },

    // 获取common config
    getSelectOption (val) {
      if (val === '' || this.select[val].length > 0) return
      this.loading[val] = true

      getCommonConfig({ CNF_CODE: val }).then((res) => {
        this.select[val] = res.data
      }).catch(() => {
        this.select[val] = []
      }).finally(() => {
        this.loading[val] = false
      })
    },

    // 提交
    handleSubmit () {
      const { form: { validateFields } } = this
      this.registerBtn = true

      validateFields({ force: true }, (err, values) => {
        if (!err) {
          console.log(values)
          register(values).then((res) => {
            this.$notification['success']({
              message: i18n.t('message.success'),
              description: res.msg,
              duration: 4
            })

            this.$router.push({ name: 'login' })
          }).catch((e) => {}).finally(() => {
            this.registerBtn = false
          })
        } else {
          this.registerBtn = false
        }
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
