<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item :label="$t('customer.customerName')">
              <a-input v-model="queryParam.customerName"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item :label="$t('customer.customerType')">
              <a-select v-model="queryParam.customerType">
                <a-select-option v-for="list in customerType" :key="list['cnfNote']">{{ list['cnfNote'] }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item :label="$t('customer.salesMan')">
              <a-select v-model="queryParam.salesMan">
                <a-select-option value="">All</a-select-option>
                <a-select-option v-for="item in userList" :key="item.id" :value="item.id">
                  {{ item.realname }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
          </template>
          <a-col :md="!advanced && 6 || 6" :sm="24" style="text-align: right">
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
      <a-button
        type="primary"
        icon="export"
        @click="excelExport"
      >
        {{ $t('option.ExcelExport') }}
      </a-button>

      <a-button
        type="primary"
        icon="plus"
        @click="$refs.formModal.add()"
      >
        {{ $t('option.create') }}
      </a-button>
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
      <span slot="salesMan" slot-scope="text">
        <template>
          {{ text | filterMemberName(userList) }}
        </template>
      </span>
      <span slot="action" slot-scope="text, row" class="table-option">
        <template>
          <a @click="$refs.viewProjectModal.view(row.id)">{{ $t('option.project') }}</a>
          <a-divider type="vertical" />
          <a @click="$refs.viewModal.view(row)">{{ $t('option.view') }}</a>
          <span v-permission:i="row.salesMan">
            <a-divider type="vertical" />
            <a @click="$refs.formModal.edit(row)">{{ $t('option.edit') }}</a>
          </span>
          <span v-permission:i="[]">
            <a-divider type="vertical" />
            <a @click="handleDelete(row)">{{ $t('option.delete') }}</a>
          </span>
        </template>
      </span>
    </s-table>

    <!--项目列表-->
    <view-project-popup
      ref="viewProjectModal"
    />

    <!--详细-->
    <view-popup
      ref="viewModal"
      @edit="$refs.formModal.edit($event)"
      @delete="handleDelete($event)"
    />

    <!--编辑-->
    <form-popup
      ref="formModal"
      @add="handleAdd($event)"
      @update="handleUpdate($event)"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import FormPopup from './modules/FormPopup'
import ViewPopup from './modules/ViewPopup'
import ViewProjectPopup from './modules/ViewProjectPopup'
import { getMemberNameList } from '@/api/member'
import { getCustomerList, customerAdd, customerUpdate, customerDelete } from '@/api/customer'
import i18n from '@/locales'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'CustomerList',
  components: {
    STable,
    FormPopup,
    ViewPopup,
    ViewProjectPopup
  },
  computed: {
    ...mapGetters(['customerType'])
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        department: ''
      },
      // 表头
      columns: [
        {
          title: i18n.t('customer.customerName'),
          dataIndex: 'customerName'
        },
        {
          title: i18n.t('customer.customerType'),
          dataIndex: 'customerType'
        },
        {
          title: i18n.t('customer.director'),
          dataIndex: 'director'
        },
        {
          title: i18n.t('customer.salesMan'),
          dataIndex: 'salesMan',
          scopedSlots: { customRender: 'salesMan' }
        },
        {
          title: i18n.t('customer.salesVolumn'),
          dataIndex: 'salesVolumn'
        },
        {
          title: i18n.t('customer.address'),
          key: 'id',
          customRender: (row) => {
            return this.$options.filters.filterCity(row.province, row.city)
          }
        },
        {
          title: i18n.t('customer.description'),
          dataIndex: 'description',
          width: '170px',
          ellipsis: true
        },
        {
          title: i18n.t('customer.createtime'),
          dataIndex: 'createtime'
        },
        {
          title: i18n.t('option.action'),
          dataIndex: 'action',
          width: '200px',
          align: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getCustomerList().then(res => {
          return res.data
        })
      },
      userList: []
    }
  },
  created () {
    this.$nextTick(() => {
      getMemberNameList().then(res => {
        this.userList = res.data
      })
    })
  },
  methods: {
    handleAdd (row) {
      customerAdd(row).then(res => {
        this.$message.success(res.msg)
        this.$refs.formModal.setConfirmLoading()
        this.$refs.formModal.setVisible()
        this.$refs.table.init()
      })
    },
    handleUpdate (row) {
      customerUpdate(row).then(res => {
        this.$message.success(res.msg)
        this.$refs.formModal.setConfirmLoading()
        this.$refs.table.update(row)
      })
    },
    handleDelete (row) {
      this.$confirm({
        title: i18n.t('message.handleDeleteInfo'),
        okType: 'danger',
        onOk: () => {
          customerDelete({
            id: row.id
          }).then(res => {
            this.$message.success(res.msg)
            this.$refs.viewModal.setVisible()
            this.$refs.table.delete(row)
          })
        }
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    excelExport () {
      const data = {
        'excelName': '客户管理' + moment(new Date()).format('YYYY-MM-DD'),
        'tHeader': ['客户公司名', '客户类型', '联系人', '客户负责人', '销售额', '地址-省级', '地址-地级', '地址-县级', '地址-详细', '公司信息', '创建日期'],
        'filterVal': ['customerName', 'customerType', 'director', 'salesMan', 'salesVolumn', 'province', 'city', 'area', 'address', 'description', 'createtime']
      }
      this.$refs.table.excelExport(data, { userList: this.userList })
    }
  }
}
</script>
<style lang="less" scoped>
  .table-option a {
    user-select: none;
  }
</style>
