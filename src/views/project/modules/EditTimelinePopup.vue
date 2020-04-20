<template>
  <a-modal
    :title="title"
    :width="700"
    :maskClosable="false"
    :visible="visible"
    @cancel="handleCancel"
  >
    <a-form-model>
      <div v-for="item in timeline" :key="item.id">
        <a-form-model-item>
          <a-input type="textarea" v-model="item.timelineContent" />
        </a-form-model-item>
      </div>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">{{ $t('option.cancel') }}</a-button>
      <a-button type="primary" @click="handleSave">{{ $t('option.edit') }}</a-button>
    </template>
  </a-modal>
</template>

<script>
import i18n from '@/locales'

export default {
  name: 'TimelineEdit',
  data () {
    return {
      title: i18n.t('option.timeline') + ' - ' + i18n.t('option.edit'),
      visible: false,
      timeline: []
    }
  },
  methods: {
    setVisible (val = false) {
      this.visible = val
    },
    edit (val) {
      this.visible = true
      this.timeline = val
    },
    handleSave () {
      this.$emit('save', this.timeline)
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>

</style>
