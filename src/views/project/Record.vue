<template>
  <page-view>
    <a-card :bordered="false">
      <div class="select-box">
        <span class="label">请选择项目:</span>
        <a-select
          show-search
          placeholder="请选择项目"
          option-filter-prop="children"
          @change="handleChange"
        >
          <a-select-option v-for="item in projectList" :key="item.id">{{ item.projectName }}</a-select-option>
        </a-select>
      </div>

      <a-card
        style="margin-top: 25px"
        :loading="loading"
        :tabList="tabList"
        :activeTabKey="activeTabKey"
        @tabChange="(key) => {this.activeTabKey = key}"
      >
        <div
          v-if="activeTabKey === item.key"
          v-for="item in tabList"
          :key="item.key"
          class="input-table"
        >
          <table>
            <tbody>
              <tr>
                <th>分类</th>
                <th>时间</th>
                <th>进度描述</th>
                <th>负责人</th>
                <th>确认/反馈内容</th>
              </tr>
              <template v-if="projectRecordList[item.id]">
                <tr
                  v-for="(content, index) in projectRecordList[item.id].recordContent"
                  :key="index"
                >
                  <td>{{ content.title }}</td>
                  <td>{{ content.date }}</td>
                  <td>{{ content.content }}</td>
                  <td>{{ content.principal }}</td>
                  <td>{{ content.check }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </a-card>

      <div
        class="button-box"
        v-show="!loading"
      >
        <a-button
          type="primary"
          @click="handleTimeline"
        >
          进度
        </a-button>

        <a-button
          v-permission:u="permissionList"
          type="primary"
          @click="handleEdit"
        >
          编辑
        </a-button>
      </div>
    </a-card>

    <form-record-popup
      ref="recordFormModal"
      @update="handleUpdate($event)"
    />

    <!--时间轴-->
    <view-timeline-popup
      ref="timelineViewModal"
    />
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { getProjectList, getProjectRecordList, getProjectRecordUpdate } from '@/api/project'
import FormRecordPopup from './modules/FormRecordPopup'
import ViewTimelinePopup from '@/views/project/modules/ViewTimelinePopup'

export default {
  name: 'ProjectRecord',
  components: {
    PageView,
    FormRecordPopup,
    ViewTimelinePopup
  },
  data () {
    return {
      loading: true,
      projectId: null,
      projectBaseInfo: {},
      projectList: [],
      tabList: [
        {
          id: 0,
          key: '1',
          tab: '产品咨询/确认'
        },
        {
          id: 1,
          key: '2',
          tab: '标签和出口准备'
        },
        {
          id: 2,
          key: '3',
          tab: 'PO/合同/订单'
        },
        {
          id: 3,
          key: '4',
          tab: '生产/发货'
        },
        {
          id: 4,
          key: '5',
          tab: '出口/AS'
        }
      ],
      activeTabKey: '1',
      projectRecordList: [],
      permissionList: []
    }
  },
  created () {
    getProjectList().then(res => {
      this.projectList = res.data
    })
  },
  methods: {
    handleChange (value) {
      this.projectId = value
      getProjectRecordList({
        projectId: value
      }).then(res => {
        const temp = this.projectList.find((x) => x['id'] === value)
        this.projectBaseInfo = temp
        if (temp) {
          this.permissionList = JSON.parse(temp.projectSalesMan)
          this.permissionList.push(Number(temp.projectCreater))
        }

        this.projectRecordList = res.data
        if (res.data) {
          this.projectRecordList = res.data
          this.projectRecordList.forEach((item, index) => {
            item.recordContent = JSON.parse(item.recordContent)
          })
        }
        this.loading = false
      })
    },
    handleTimeline () {
      this.$refs.timelineViewModal.view(this.projectBaseInfo)
    },
    handleEdit () {
      const data = JSON.parse(JSON.stringify(this.projectRecordList))
      this.$refs.recordFormModal.edit(data, this.projectId)
    },
    handleUpdate (row) {
      getProjectRecordUpdate(row).then(res => {
        if (row) {
          this.projectRecordList = row
          this.projectRecordList.forEach((item, index) => {
            item.recordContent = JSON.parse(item.recordContent)
          })
        }
        this.$refs.recordFormModal.setConfirmLoading()
        this.$refs.recordFormModal.setVisible()
        this.$message.success(res.msg)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .select-box {
    position: relative;
    padding-left: 90px;

    .label {
      position: absolute;
      left: 0;
      line-height: 32px;
    }

    .ant-select {
      width: 100%;
    }
  }

  .button-box {
    margin-top: 20px;
    text-align: right;

    button {
      margin-left: 10px;
    }
  }
</style>
