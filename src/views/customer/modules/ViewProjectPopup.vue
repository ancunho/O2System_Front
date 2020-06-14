<template>
  <a-modal
    :title="title"
    :width="900"
    :maskClosable="false"
    :visible="visible"
    v-if="visible"
    @cancel="handleCancel"
  >
    <a-table
      :pagination="false"
      :columns="columns"
      :data-source="projectList"
    >
      <span slot="projectSalesMan" slot-scope="text">
        <template>
          {{ text | filterMemberName($parent.$parent.userList) }}
        </template>
      </span>
      <span slot="projectStatus" slot-scope="text">
        <template>
          <a-tag :color="text | filterStepColor">{{ text | filterStep }}</a-tag>
        </template>
      </span>
      <span slot="action" slot-scope="text, row" class="table-option">
        <template>
          <a @click="projectView(row)">{{ $t('option.view') }}</a>
        </template>
      </span>
    </a-table>
    <template slot="footer">
      <a-button @click="handleCancel">{{ $t('option.cancel') }}</a-button>
    </template>
  </a-modal>
</template>

<script>
import i18n from '@/locales'
import { getProjectByCustomer } from '@/api/customer'

export default {
  name: 'CustomerProjectView',
  data () {
    return {
      title: '关联项目',
      visible: false,
      columns: [
        {
          title: i18n.t('project.projectName'),
          dataIndex: 'projectName'
        },
        {
          title: i18n.t('project.projectSalesMan'),
          dataIndex: 'projectSalesMan',
          scopedSlots: { customRender: 'projectSalesMan' }
        },
        {
          title: i18n.t('project.productName'),
          dataIndex: 'productName'
        },
        {
          title: i18n.t('project.projectStatus'),
          dataIndex: 'projectStatus',
          scopedSlots: { customRender: 'projectStatus' }
        },
        {
          title: i18n.t('project.projectStarttime'),
          dataIndex: 'projectStarttime'
        },
        {
          title: i18n.t('project.projectEndtime'),
          dataIndex: 'projectEndtime'
        },
        {
          title: i18n.t('option.action'),
          dataIndex: 'action',
          width: '70px',
          align: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      projectList: []
    }
  },
  methods: {
    view (val) {
      if (!val) return

      // 获取项目列表
      getProjectByCustomer({
        customerId: val
      }).then(res => {
        this.projectList = res.data
        this.visible = true
      })
    },
    projectView (row) {
      this.$router.push({
        name: 'projectView',
        params: row
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
