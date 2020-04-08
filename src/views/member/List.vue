<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item :label="$t('member.realname')">
              <a-input v-model="queryParam.realname" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item :label="$t('member.empno')">
              <a-input v-model="queryParam.empno" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item :label="$t('member.department')">
              <a-select v-model="queryParam.department">
                <a-select-option value="">All</a-select-option>
                <a-select-option v-for="list in department" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('member.status')">
                <a-select v-model="queryParam.status">
                  <a-select-option value="">All</a-select-option>
                  <a-select-option value="0">冻结</a-select-option>
                  <a-select-option value="1">激活</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 6 || 24" :sm="24" style="text-align: right">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh('search')">{{ $t('option.search') }}</a-button>
              <a-button style="margin-left: 8px" @click="searchReset()">{{ $t('option.reset') }}</a-button>
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
      <span slot="status" slot-scope="text, record">
        <template>
          <a-switch size="small" :checked="text === '1'" @change="handleStatus(record)" />
        </template>
      </span>
      <span slot="action" slot-scope="text, record" class="table-option">
        <template>
          <a @click="$refs.viewModal.view(record)">{{ $t('option.view') }}</a>
          <a-divider type="vertical" />
          <a @click="$refs.formModal.edit(record)">{{ $t('option.edit') }}</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">{{ $t('option.delete') }}</a>
        </template>
      </span>
    </s-table>
    <form-popup
      ref="formModal"
      @add="handleAdd($event)"
      @update="handleUpdate($event)"
    />
    <view-popup
      ref="viewModal"
      @reset="handleReset($event)"
      @status="handleStatus($event)"
      @edit="$refs.formModal.edit($event)"
      @delete="handleDelete($event)"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import FormPopup from './modules/FormPopup'
import ViewPopup from './modules/ViewPopup'
import { getMemberList } from '@/api/member'
import i18n from '@/locales'
import { mapGetters } from 'vuex'

export default {
  name: 'MemberList',
  components: {
    STable,
    FormPopup,
    ViewPopup
  },
  computed: {
    ...mapGetters(['department'])
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        department: '',
        status: ''
      },
      // 表头
      columns: [
        {
          title: i18n.t('member.realname'),
          dataIndex: 'realname'
        },
        {
          title: i18n.t('member.empno'),
          dataIndex: 'empno'
        },
        {
          title: i18n.t('member.phone'),
          dataIndex: 'phone'
        },
        {
          title: i18n.t('member.email'),
          dataIndex: 'email'
        },
        {
          title: i18n.t('member.department'),
          dataIndex: 'department'
        },
        {
          title: i18n.t('member.createtime'),
          dataIndex: 'createtime'
        },
        {
          title: i18n.t('member.status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
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
        return getMemberList()
          .then(res => {
            console.log(res.data)
            return res.data
          })
      }
    }
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    searchReset () {
      this.queryParam = {
        department: '',
        status: ''
      }
    },
    handleStatus (record) {
      record.status = record.status === '0' ? '1' : '0'
      this.$message.info(`${record.status ? '激活' : '冻结'} - ${record.realname}`)
    },
    handleReset () {
      this.$message.info('初始化密码')
    },
    handleAdd (record) {
      record.id = 99
      this.$refs.table.add(record)
    },
    handleUpdate (record) {
      this.$refs.table.update(record)
    },
    handleDelete (record) {
      this.$refs.table.delete(record)
    }
  }
}
</script>
<style lang="less" scoped>
  .table-option a {
    user-select: none;
  }
</style>
