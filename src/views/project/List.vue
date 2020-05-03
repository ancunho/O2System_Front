<template>
  <page-view>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('project.projectName')">
                <a-input v-model="queryParam.projectName"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('project.projectCustomer')">
                <a-input v-model="queryParam.projectCustomer"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('project.projectSalesMan')">
                <a-select v-model="queryParam.projectSalesMan">
                  <a-select-option value="">All</a-select-option>
                  <a-select-option v-for="item in userList" :key="item.id" :value="item.id">
                    {{ item.realname }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('project.projectProduct')">
                  <a-input v-model="queryParam.projectProduct"/>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('project.projectStatus')">
                  <a-select v-model="queryParam.projectStatus">
                    <a-select-option value="">All</a-select-option>
                    <a-select-option v-for="item in statusMap" :key="item.k" :value="item.k">
                      {{ item.v }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 6 || 18" :sm="24" style="text-align: right">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh('search')">{{ $t('option.search') }}</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">{{ $t('option.reset') }}</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? $t('option.close') : $t('option.open') }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="$refs.formModal.add()">{{ $t('option.create') }}</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :queryParam="queryParam"
        showPagination="auto"
      >
        <span slot="projectSalesMan" slot-scope="text">
          <template>
            {{ text | filterMemberName(userList) }}
          </template>
        </span>
        <span slot="projectStatus" slot-scope="text">
          <template>
            <a-tag :color="text | filterStepColor">{{ text | filterStep }}</a-tag>
          </template>
        </span>
        <span slot="action" slot-scope="text, row" class="table-option">
          <template>
            <a @click="$refs.timelineViewModal.view(row.id, row.projectSalesMan)">{{ $t('option.timeline') }}</a>
            <a-divider type="vertical" />
            <a @click="handleView(row)">{{ $t('option.view') }}</a>
            <span v-permission:b="[]">
              <a-divider type="vertical" />
              <a @click="handleDelete(row)">{{ $t('option.delete') }}</a>
            </span>
          </template>
        </span>
      </s-table>
      <form-popup
        ref="formModal"
        @add="handleAdd($event)"
      />

      <!--时间轴-->
      <view-timeline-popup
        ref="timelineViewModal"
      />
    </a-card>
  </page-view>
</template>

<script>
import { STable } from '@/components'
import { PageView } from '@/layouts'
import FormPopup from './modules/FormPopup'
import ViewTimelinePopup from './modules/ViewTimelinePopup'
import { getProjectList, projectBaseInfoAdd } from '@/api/project'
import { getMemberNameList } from '@/api/member'
import { getCustomerNameList } from '@/api/customer'
import i18n from '@/locales'

const statusMap = [
  {
    k: '1',
    c: 'orange',
    v: '产品咨询/确认'
  },
  {
    k: '2',
    c: 'cyan',
    v: '标签和出口准备'
  },
  {
    k: '3',
    c: 'blue',
    v: 'PO/合同/订单'
  },
  {
    k: '4',
    c: 'purple',
    v: '生产/发货'
  },
  {
    k: '5',
    c: 'green',
    v: '出口/AS'
  }
]

export default {
  name: 'ProjectList',
  components: {
    PageView,
    STable,
    FormPopup,
    ViewTimelinePopup
  },
  filters: {
    filterStep (val) {
      return statusMap.find(x => x['k'] === val)['v']
    },
    filterStepColor (val) {
      return statusMap.find(x => x['k'] === val)['c']
    }
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      statusMap: statusMap,
      // 表头
      columns: [
        {
          title: i18n.t('project.projectName'),
          dataIndex: 'projectName'
        },
        {
          title: i18n.t('project.projectCustomer'),
          dataIndex: 'projectCustomer'
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
          width: '170px',
          align: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getProjectList()
          .then(res => {
            return res.data
          })
      },
      userList: [],
      customerList: []
    }
  },
  created () {
    this.$nextTick(() => {
      getMemberNameList().then(res => {
        this.userList = res.data
      })
      getCustomerNameList().then(res => {
        this.customerList = res.data
      })
    })
  },
  methods: {
    handleAdd (values) {
      projectBaseInfoAdd(values).then(res => {
        this.$refs.formModal.setConfirmLoading()
        this.$refs.formModal.setVisible()
        this.$router.push({
          name: 'projectEdit',
          params: {
            type: 'add',
            data: res.data
          }
        })
      })
    },
    handleView (row) {
      this.$router.push({
        name: 'projectView',
        params: row
      })
    },
    handleDelete (row) {
      this.$confirm({
        title: i18n.t('message.handleDeleteInfo'),
        okType: 'danger',
        onOk: () => {
          this.$refs.table.delete(row)
        }
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}
</script>
<style lang="less" scoped>
  .table-option a {
    user-select: none;
  }
</style>
