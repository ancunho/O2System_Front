<template>
  <div class="security-box">
    <a-list
      itemLayout="horizontal"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">{{ item.description }}</span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>

    <a-modal
      title="修改密码"
      :width="350"
      :visible="popupVisible"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item>
          <a-input
            type="password"
            autocomplete="false"
            :placeholder="$t('user.passwordOld-placeholder')"
            v-decorator="['passwordOld', {rules: [{ required: true, message: $t('user.passwordOld-required') }], validateTrigger: ['change', 'blur']}]"
          ></a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            type="password"
            autocomplete="false"
            :placeholder="$t('user.passwordNew-placeholder')"
            v-decorator="['passwordNew', {rules: [{ validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
          ></a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            type="password"
            autocomplete="false"
            :placeholder="$t('user.passwordConfirm-placeholder')"
            v-decorator="['passwordConfirm', {rules: [{ required: true, message: $t('user.passwordConfirm-required') }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
          ></a-input>
        </a-form-item>
      </a-form>

      <template slot="footer">
        <a-button @click="handleCancel">{{ $t('option.cancel') }}</a-button>
        <a-button
          type="primary"
          :loading="confirmLoading"
          :disabled="confirmLoading"
          @click="handleSubmit">
          {{ $t('option.modify') }}
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { isPassword } from '@/utils/util'
import i18n from '@/locales'
import { updatePassword } from '@/api/user'

export default {
  data () {
    return {
      popupVisible: false,
      confirmLoading: false,
      data: [
        {
          title: '账户密码',
          description: '修改当前账户密码 ',
          actions: {
            title: '修改',
            callback: () => { this.handleChangePassword() }
          }
        }
      ],
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handlePasswordLevel (rule, value, callback) {
      if (isPassword(value)) {
        callback()
      } else {
        callback(new Error((value === '' ? i18n.t('user.password-required') : i18n.t('user.password-level')) + ''))
      }
    },

    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('passwordNew')
      if (value === undefined) {
        callback(new Error(i18n.t('user.password-required') + ''))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error(i18n.t('user.password-twice') + ''))
      }
      callback()
    },

    handleChangePassword () {
      this.popupVisible = true
    },

    handleSubmit () {
      const { form: { validateFields } } = this

      validateFields((err, values) => {
        if (err) return
        this.confirmLoading = true

        updatePassword(values).then((res) => {
          this.$notification['success']({
            message: i18n.t('message.success'),
            description: i18n.t('user.changePw-success'),
            duration: 4
          })
          this.handleCancel()
        }).catch((e) => {}).finally(() => {
          this.confirmLoading = false
        })
      })
    },

    handleCancel () {
      this.form.resetFields()
      this.popupVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .ant-form-item {
    margin-bottom: 10px;

    &.ant-form-item-with-help {
      margin-bottom: 5px;
    }

    .ant-form-item-control {
      line-height: 35px;
    }
  }
</style>
