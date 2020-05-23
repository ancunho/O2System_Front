<template>
  <a-modal
    :title="title"
    :width="500"
    :maskClosable="false"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" class="">
        <a-form-item label="会议日期">
          <a-date-picker
            v-decorator="['meetingDate', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
          />
        </a-form-item>
        <a-form-item :label="`会议时间（${time}）`">
          <a-slider
            :max="180"
            @change="sliderChange"
            v-decorator="['meetingTime']"
          />
        </a-form-item>
        <a-form-item label="会议内容">
          <a-input
            type="textarea"
            v-decorator="['timelineContent', {rules: [{required: true, message: $t('message.required')}], validateTrigger: 'change'}]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import i18n from '@/locales'

export default {
  name: 'TimelineForm',
  data () {
    return {
      title: i18n.t('option.add'),
      actionType: 'add',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      time: '0分钟',
      formData: null
    }
  },
  methods: {
    sliderChange (val) {
      this.time = val + '分钟'
    },
    add (id) {
      this.title = i18n.t('option.add')
      this.actionType = 'add'
      this.form.resetFields()
      this.visible = true

      this.time = '0分钟'
      this.$nextTick(() => {
        this.form.setFieldsValue({
          meetingTime: 0
        })
      })
    },
    edit (row) {
      this.title = i18n.t('option.edit')
      this.actionType = 'update'
      this.visible = true

      this.time = row.meetingTime + '分钟'
      this.$nextTick(() => {
        this.form.setFieldsValue({
          meetingTime: Number(row.meetingTime),
          meetingDate: this.$options.filters.filterS2D(row.meetingDate),
          timelineContent: row.timelineContent
        })
      })
      this.formData = Object.assign({}, this.formData, row)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        if (err) return
        this.confirmLoading = true

        values.meetingDate = this.$options.filters.filterD2S(values.meetingDate)
        this.$emit(this.actionType, Object.assign({}, this.formData, values))
      })
    },
    handleCancel () {
      this.visible = false
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
<style lang="less" scoped>
  .ant-form-item {
    margin-bottom: 0;
  }
</style>
