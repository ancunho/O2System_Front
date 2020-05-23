<template>
  <a-modal
    :title="title"
    :width="900"
    :maskClosable="false"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-card
        style="margin-top: 25px"
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
    </a-spin>
  </a-modal>
</template>

<script>
import i18n from '@/locales'

export default {
  name: 'RecordForm',
  data () {
    return {
      title: i18n.t('option.edit'),
      visible: false,
      confirmLoading: false,
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
      projectId: null,
      projectRecordList: []
    }
  },
  methods: {
    edit (data, id) {
      this.visible = true
      this.projectId = id

      if (data) {
        this.projectRecordList = data
        this.projectRecordList.forEach((item, index) => {
          item.recordContent.forEach((item, index) => {
            item.date = this.$options.filters.filterS2D(item.date)
          })
        })
      }
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
          projectId: this.projectId, // id
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
    },
    handleSubmit () {
      this.confirmLoading = true
      // 修改参数
      const param = JSON.parse(JSON.stringify(this.projectRecordList))
      param.forEach((item, index) => {
        item.recordContent.forEach((item, index) => {
          item.date = this.$options.filters.filterD2S(item.date)
        })
        item.recordContent = JSON.stringify(item.recordContent)
      })

      this.$emit('update', param)
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
