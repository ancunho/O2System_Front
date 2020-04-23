<template>
  <div>
    <a-modal
      :title="title"
      :width="550"
      :maskClosable="false"
      :visible="visible"
      @cancel="handleCancel"
    >
      <a-timeline class="meeting-box">
        <a-timeline-item v-for="item in timeline" :key="item.id">
          <p class="title">
            <b>
              {{ item.meetingDate }} - {{ item.timelineAuthor }}
              <a-divider type="vertical" />
              <a class="edit" @click="$refs.timelineFormModal.edit(item)">{{ $t('option.edit') }}</a>
              <a-divider type="vertical" />
              <a class="delete" @click="handleDelete(item.id)">{{ $t('option.delete') }}</a>
            </b>
            <span>会议时间: {{ item.meetingTime }}分钟</span>
          </p>
          <p>{{ item.timelineContent }}</p>
        </a-timeline-item>
      </a-timeline>
      <a-button type="dashed" block @click="$refs.timelineFormModal.add()">{{ $t('option.add') }}</a-button>
      <template slot="footer">
        <a-button @click="handleCancel">{{ $t('option.cancel') }}</a-button>
      </template>
    </a-modal>

    <form-timeline-popup
      ref="timelineFormModal"
      @add="handleAdd($event)"
      @update="handleUpdate($event)"
    />
  </div>
</template>

<script>
import FormTimelinePopup from './FormTimelinePopup'
import i18n from '@/locales'
import { getProjectTimelineList, projectTimelineAdd, projectTimelineUpdate, projectTimelineDelete } from '@/api/project'

export default {
  name: 'TimelineView',
  components: {
    FormTimelinePopup
  },
  data () {
    return {
      title: i18n.t('option.timeline'),
      visible: false,
      projectId: null,
      timeline: []
    }
  },
  methods: {
    view (id) {
      this.visible = true
      this.projectId = id

      getProjectTimelineList({
        projectId: this.projectId
      }).then(res => {
        this.timeline = res.data
      })
    },
    handleAdd (row) {
      row.projectId = this.projectId
      projectTimelineAdd(row).then(res => {
        this.$refs.timelineFormModal.setConfirmLoading()
        this.$refs.timelineFormModal.setVisible()
        this.$message.success(res.msg)
        this.view(this.projectId)
      })
    },
    handleUpdate (row) {
      projectTimelineUpdate(row).then(res => {
        this.$refs.timelineFormModal.setConfirmLoading()
        this.$refs.timelineFormModal.setVisible()
        this.$message.success(res.msg)
        this.view(this.projectId)
      })
    },
    handleDelete (id) {
      this.$confirm({
        title: i18n.t('member.handleResetInfo'),
        okType: 'danger',
        onOk: () => {
          projectTimelineDelete({
            id: id
          }).then(res => {
            this.$message.success(res.msg)
            this.view(this.projectId)
          })
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    setVisible (val = false) {
      this.visible = val
    }
  }
}
</script>
<style lang="less" scoped>
  .meeting-box p {
    margin-bottom: 0;

    &:after {
      content: "";
      display: block;
      clear: both;
      height: 0;
      overflow: hidden;
    }

    &.title b {
      float: left;
      font-size: 15px;

      a {
        font-weight: normal;
        font-size: 13px;

        &.delete { color: #ff4d4f; }
      }
    }

    &.title span {
      float: right;
      color: #ff4d4f;
    }
  }
</style>
