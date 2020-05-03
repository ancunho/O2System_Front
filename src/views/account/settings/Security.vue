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
      :title="$t('user.change-password')"
      :width="350"
      :visible="popupVisible"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item>
          <a-input
            type="password"
            autocomplete="false"
            :placeholder="$t('user.passwordOld')"
            v-decorator="['passwordOld', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]"
          ></a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            type="password"
            autocomplete="false"
            :placeholder="$t('user.passwordNew')"
            v-decorator="['passwordNew', {rules: [{ validator: this.handlePasswordLevel }], validateTrigger: 'change'}]"
          ></a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            type="password"
            autocomplete="false"
            :placeholder="$t('user.passwordConfirm')"
            v-decorator="['passwordConfirm', {rules: [{ validator: this.handlePasswordCheck }], validateTrigger: 'change'}]"
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
          title: i18n.t('user.user-password'),
          description: i18n.t('user.user-password-txt'),
          actions: {
            title: i18n.t('option.modify'),
            callback: () => { this.handleChangePassword() }
          }
        }
      ],
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

    handleChangePassword () {
      this.popupVisible = true
    },

    handleSubmit () {
      const { form: { validateFields } } = this

      validateFields((err, values) => {
        if (err) return
        this.confirmLoading = true

        updatePassword(values).then((res) => {
          this.$message.success(res.msg)
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
