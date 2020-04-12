<template>
  <a-modal
    :title="title"
    :width="720"
    :maskClosable="false"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <div class="table-page-popup-wrapper">
        <a-form :form="form" layout="inline">
          <a-row :gutter="24">
            <a-col :md="18" :sm="24" :class="isMobile() || 'twoLine'">
              <a-form-item :label="$t('member.username')" v-show="actionType === 'add'">
                <a-input
                  type="text"
                  v-decorator="['username', {rules: [{required: true,validator: this.handleCheckUsername }], validateTrigger: ['blur']}]"
                ></a-input>
              </a-form-item>

              <a-form-item :label="$t('member.password')" v-show="actionType === 'add'">
                <a-input
                  type="password"
                  autocomplete="false"
                  :placeholder="$t('user.password-register')"
                  v-decorator="['password', {rules: [{required: true, validator: this.handlePasswordLevel }], validateTrigger: 'change'}]"
                ></a-input>
              </a-form-item>

              <a-form-item :label="$t('member.passwordConfirm')" v-show="actionType === 'add'">
                <a-input
                  type="password"
                  autocomplete="false"
                  v-decorator="['passwordConfirm', {rules: [{required: true, validator: this.handlePasswordCheck }], validateTrigger: 'change'}]"
                ></a-input>
              </a-form-item>

              <a-form-item :label="$t('member.empno')">
                <a-input
                  type="text"
                  v-decorator="['empno', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
                />
              </a-form-item>

              <a-form-item :label="$t('member.realname')">
                <a-input
                  type="text"
                  v-decorator="['realname', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
                />
              </a-form-item>

              <a-form-item :label="$t('member.phone')">
                <a-input
                  type="text"
                  v-decorator="['phone', {rules: [{required: true, validator: this.handleCheckPhone }], validateTrigger: 'change'}]"
                />
              </a-form-item>

              <a-form-item :label="$t('member.email')">
                <a-input
                  type="text"
                  v-decorator="['email', {rules: [{required: true, validator: this.handleCheckEmail }], validateTrigger: 'change'}]"
                />
              </a-form-item>

              <a-form-item :label="$t('member.department')">
                <a-select
                  v-decorator="['department', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]">
                  <a-select-option v-for="list in department" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item :label="$t('member.sex')">
                <a-select v-decorator="['sex']">
                  <a-select-option key="1">{{ $t('member.man') }}</a-select-option>
                  <a-select-option key="2">{{ $t('member.woman') }}</a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item :label="$t('member.birthday')">
                <a-date-picker style="width:100%" v-decorator="['birthday']" />
              </a-form-item>

              <a-form-item :label="$t('member.wechat')">
                <a-input
                  type="text"
                  v-decorator="['wechat', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
                />
              </a-form-item>

              <a-form-item :label="$t('member.qq')">
                <a-input
                  type="text"
                  v-decorator="['qq']"
                />
              </a-form-item>

              <a-form-item :label="$t('member.address')">
                <a-cascader
                  :fieldNames="address.fieldName"
                  :options="address.data"
                  v-decorator="['addressSelect']"
                />
              </a-form-item>

              <a-form-item :label="$t('member.address-detail')">
                <a-input
                  type="text"
                  v-decorator="['address']"
                />
              </a-form-item>

              <a-form-item :label="$t('member.question')" v-show="actionType === 'add'">
                <a-select
                  v-decorator="['question', {rules: [{ required: true, message: $t('message.required') }], validateTrigger: 'change'}]">
                  <a-select-option v-for="list in question" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item :label="$t('member.answer')" v-show="actionType === 'add'">
                <a-input
                  type="text"
                  v-decorator="['answer', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
                />
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="24">
              <div class="ant-upload-preview photo" @click="$refs.modal.edit(1)" >
                <a-icon type="cloud-upload-o" class="upload-icon"/>
                <div class="mask">
                  <a-icon type="plus" />
                </div>
                <a-avatar shape="square" :size="150" icon="user" :src="formData.imagePhoto" />
              </div>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-spin>

    <avatar-modal ref="modal" @ok="setAvatar"/>
  </a-modal>
</template>

<script>
import i18n from '@/locales'
import AvatarModal from '@/components/tools/AvatarModal'
import pca from 'china-division/dist/pca-code.json'
import { mapGetters } from 'vuex'
import { isEmail, isPassword, isPhone } from '@/utils/util'
import { checkEmail, checkUsername } from '@/api/user'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'MemberForm',
  components: {
    AvatarModal
  },
  computed: {
    ...mapGetters(['userInfo', 'department', 'question'])
  },
  mixins: [mixinDevice],
  data () {
    return {
      title: i18n.t('option.add'),
      actionType: 'add',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      formData: {},
      address: {
        fieldName: {
          label: 'name',
          value: 'code',
          children: 'children'
        },
        data: [...pca]
      }
    }
  },
  methods: {
    // 新建
    add () {
      this.title = i18n.t('option.add')
      this.actionType = 'add'
      this.form.resetFields()
      this.visible = true
      this.formData = {
        id: null,
        imagePhoto: '/avatar.jpg'
      }
    },

    // 编辑
    edit (row) {
      this.title = i18n.t('option.edit')
      this.actionType = 'update'
      this.visible = true

      this.$nextTick(() => {
        this.form.setFieldsValue({
          realname: row.realname,
          empno: row.empno,
          phone: row.phone,
          email: row.email,
          department: row.department,
          addressSelect: [row.province, row.city, row.area],
          address: row.address,
          wechat: row.wechat,
          birthday: this.$options.filters.filterS2D(row.birthday),
          sex: row.sex,
          qq: row.qq
        })
      })
      this.formData = Object.assign({}, this.formData, row)
    },

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

        if (this.formData.email === value) {
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
    handleSubmit () {
      const { form: { validateFields } } = this
      const checkFields = this.actionType === 'add' ? null : ['realname', 'empno', 'phone', 'email', 'department', 'addressSelect', 'address', 'wechat', 'birthday', 'sex', 'qq']
      validateFields(checkFields, (err, values) => {
        if (err) return
        this.confirmLoading = true

        // 参数整理
        values.birthday = this.$options.filters.filterD2S(values.birthday)
        if (values.addressSelect) {
          values.province = values.addressSelect[0]
          values.city = values.addressSelect[1]
          values.area = values.addressSelect[2]
        }

        this.$emit(this.actionType, Object.assign({}, this.formData, values))
      })
    },
    handleCancel () {
      this.visible = false
    },
    setAvatar (url) {
      this.formData.imagePhoto = url
    },
    setConfirmLoading (val = false) {
      this.confirmLoading = val
    },
    setVisible (val = false) {
      this.visible = val
    }
  }
}
</script>
