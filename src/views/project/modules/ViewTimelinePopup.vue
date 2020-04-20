<template>
  <a-modal
    :title="title"
    :width="550"
    :maskClosable="false"
    :visible="visible"
    @cancel="handleCancel"
  >
    <a-timeline>
      <a-timeline-item v-for="item in timeline" :key="item.id">
        <p style="margin-bottom: 0">{{ item.createtime + ' - ' + item.timelineAuthor }}</p>
        <p style="margin-bottom: 0">{{ item.timelineContent }}</p>
      </a-timeline-item>
    </a-timeline>
    <template slot="footer">
      <a-button @click="handleCancel">{{ $t('option.cancel') }}</a-button>
      <a-button v-permission:view="['ROLE_ADMIN']" type="primary" @click="handleEdit">{{ $t('option.edit') }}</a-button>
    </template>
  </a-modal>
</template>

<script>
import i18n from '@/locales'

export default {
  name: 'TimelineView',
  data () {
    return {
      title: i18n.t('option.timeline'),
      visible: false,
      timeline: []
    }
  },
  methods: {
    setVisible (val = false) {
      this.visible = val
    },
    view (val) {
      this.visible = true
      this.timeline = val
    },
    handleEdit () {
      this.$emit('edit', this.timeline)
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
