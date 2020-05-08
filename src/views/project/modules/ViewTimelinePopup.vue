<template>
  <div>
    <a-modal
      :title="title"
      :width="550"
      :maskClosable="false"
      :visible="visible"
      v-if="visible"
      @cancel="handleCancel"
    >
      <a-timeline class="meeting-box">
        <a-timeline-item v-for="item in timeline" :key="item.id">
          <p class="title">
            <b>
              {{ item.meetingDate }} - {{ item.timelineAuthor }}
              <span v-permission:i="permissionList">
                <a-divider type="vertical" />
                <a class="edit" @click="$refs.timelineFormModal.edit(item)">{{ $t('option.edit') }}</a>
                <a-divider type="vertical" />
                <a class="delete" @click="handleDelete(item.id)">{{ $t('option.delete') }}</a>
              </span>
            </b>
            <span>会议时间: {{ item.meetingTime }}分钟</span>
          </p>
          <p>{{ item.timelineContent }}</p>
        </a-timeline-item>
      </a-timeline>
      <a-button
        v-permission:i="permissionList"
        type="dashed"
        block
        @click="$refs.timelineFormModal.add()"
      >
        {{ $t('option.add') }}
      </a-button>
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
import store from '@/store'

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
      timeline: [],
      permissionList: []
    }
  },
  methods: {
    view (row) {
      this.visible = true
      this.projectId = row.id
      this.permissionList = JSON.parse(row.projectSalesMan)
      this.permissionList.push(Number(row.projectCreater))

      getProjectTimelineList({
        projectId: this.projectId
      }).then(res => {
        this.timeline = res.data
      })
    },
    handleAdd (row) {
      row.projectId = this.projectId
      row.timelineAuthor = store.getters.userInfo.username
      projectTimelineAdd(row).then(res => {
        this.$refs.timelineFormModal.setConfirmLoading()
        this.$refs.timelineFormModal.setVisible()
        this.$message.success(res.msg)
        this.view(this.projectId)
      })
    },
    handleUpdate (row) {
      row.timelineAuthor = store.getters.userInfo.username
      projectTimelineUpdate(row).then(res => {
        this.$refs.timelineFormModal.setConfirmLoading()
        this.$refs.timelineFormModal.setVisible()
        this.$message.success(res.msg)
        this.view(this.projectId)
      })
    },
    handleDelete (id) {
      this.$confirm({
        title: i18n.t('message.handleResetInfo'),
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
