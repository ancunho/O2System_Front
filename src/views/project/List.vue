<template>
  <page-view>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('customer.customerName')">
                <a-input v-model="queryParam.customerName" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('customer.wechat')">
                <a-input v-model="queryParam.wechat" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('customer.director')">
                <a-input v-model="queryParam.director" placeholder=""/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('customer.productList')">
                  <a-input v-model="queryParam.productList" placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('customer.developmentSkill')">
                  <a-select v-model="queryParam.developmentSkill">
                    <a-select-option value="">all</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('customer.productList')">
                  <a-input v-model="queryParam.target" placeholder=""/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 6 || 12" :sm="24" style="text-align: right">
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
        <a-button type="primary" icon="plus" @click="$refs.formModal.add()">{{ $t('option.add') }}</a-button>
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
        <span slot="action" slot-scope="text, record" class="table-option">
          <template>
            <a @click="handleView(record)">{{ $t('option.view') }}</a>
            <span v-permission:view="['admin']">
              <a-divider type="vertical" />
              <a @click="handleDelete(record)">{{ $t('option.delete') }}</a>
            </span>
          </template>
        </span>
      </s-table>
      <form-popup
        ref="formModal"
        @add="handleAdd($event)"
        @update="handleUpdate($event)"
      />
    </a-card>
  </page-view>
</template>

<script>
import { STable } from '@/components'
import { PageView } from '@/layouts'
import FormPopup from './modules/FormPopup'
import { getCustomerList } from '@/api/customer'
import i18n from '@/locales'

export default {
  name: 'ProjectList',
  components: {
    PageView,
    STable,
    FormPopup
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
          title: i18n.t('customer.director'),
          dataIndex: 'director'
        },
        {
          title: i18n.t('customer.salesVolumn'),
          dataIndex: 'salesVolumn'
        },
        {
          title: i18n.t('customer.developmentSkill'),
          dataIndex: 'developmentSkill'
        },
        {
          title: i18n.t('customer.city'),
          dataIndex: 'city'
        },
        {
          title: i18n.t('option.action'),
          dataIndex: 'action',
          width: '150px',
          align: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getCustomerList()
          .then(res => {
            return res.data
          })
      }
    }
  },
  methods: {
    handleAdd (record) {
      record.id = 99
      this.$refs.table.add(record)
    },
    handleView (record) {
      this.$router.push({
        name: 'projectView',
        params: record
      })
    },
    handleDelete (record) {
      this.$refs.table.delete(record)
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
