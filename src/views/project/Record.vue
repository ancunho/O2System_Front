<template>
  <page-view>
    <a-card :bordered="false">
      <a-select
        show-search
        placeholder="请选择项目"
        option-filter-prop="children"
        style="width: 100%"
        @change="handleChange"
      >
        <a-select-option v-for="item in projectList" :key="item.id">{{ item.projectName }}</a-select-option>
      </a-select>

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
                  <td>
                    <a-input v-model="content.title" />
                  </td>
                  <td>
                    <a-date-picker style="width:100%" v-model="content.date" />
                  </td>
                  <td>
                    <a-input v-model="content.content" />
                  </td>
                  <td>
                    <a-input v-model="content.principal" />
                  </td>
                  <td>
                    <a-input v-model="content.check" />
                  </td>
                </tr>
              </template>
              <tr>
                <td colspan="5" class="btns">
                  <a-button type="primary" size="small" icon="plus" @click="handleRecordPush(item.id)" >添加一行</a-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </a-card>
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { getProjectList, getProjectRecordList } from '@/api/project'

export default {
  name: 'ProjectRecord',
  components: {
    PageView
  },
  data () {
    return {
      loading: false,
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
      projectRecordList: []
    }
  },
  created () {
    getProjectList().then(res => {
      this.projectList = res.data
    })
  },
  methods: {
    handleChange (value) {
      getProjectRecordList({
        projectId: value
      }).then(res => {
        console.log(res.data)
        this.projectRecordList = res.data
        if (res.data) {
          this.projectRecordList = res.data
          this.projectRecordList.forEach((item, index) => {
            item.recordContent = JSON.parse(item.recordContent)
            item.recordContent.forEach((item, index) => {
              item.date = this.$options.filters.filterS2D(item.date)
            })
          })
        }
      })
    },

    // 添加历史信息
    handleRecordPush (id) {
      if (this.projectRecordList[id]) {
        this.projectRecordList[id].recordContent.push({
          title: '',
          date: null,
          content: '',
          principal: '',
          check: ''
        })
      } else {
        this.projectRecordList.push({
          projectId: 0, // id
          recordId: this.projectRecordList.length + 1,
          recordContent: [
            {
              title: '',
              date: null,
              content: '',
              principal: '',
              check: ''
            }
          ] // 内容list
        })
      }
    }
  }
}
</script>
