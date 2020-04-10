<template>
  <a-modal
    :title="title"
    :width="700"
    :maskClosable="false"
    :visible="visible"
    @cancel="handleCancel"
  >

    <a-row :gutter="24">
      <a-col :md="17" :sm="24">
        <a-descriptions :column="{ md: 2, sm: 1, xs: 1}">
          <a-descriptions-item :label="$t('member.username')">{{ member.username }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.realname')">{{ member.realname }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.sex')">
            {{ member.sex | filterSex }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.birthday')">{{ member.birthday }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.empno')">{{ member.empno }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.department')">{{ member.department }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.email')">{{ member.email }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.phone')">{{ member.phone }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.wechat')">{{ member.wechat }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.qq')">{{ member.qq }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.address')" :span="2">
            {{ member.province | filterAddress(member.city, member.area, member.address) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('member.createtime')">{{ member.createtime }}</a-descriptions-item>
          <a-descriptions-item :label="$t('member.status')">
            <a-switch size="small" :checked="member.status | filterStatus" @change="handleStatus" />
          </a-descriptions-item>
        </a-descriptions>
      </a-col>

      <a-col :md="7" :sm="24">
        <div class="photo">
          <a-avatar shape="square" :size="150" icon="user" :src="member.imagePhoto" />
          <b>{{ $t('member.imagePhoto') }}</b>
        </div>
      </a-col>
    </a-row>

    <a-table
      :title="_ => $t('member.projectList')"
      size="small"
      rowKey="projectName"
      :bordered="false"
      :columns="projectColumns"
      :dataSource="projectData"
      :pagination="false"
      class="view-table"
    />

    <template slot="footer">
      <a-button class="reset-button" @click="handleRest">{{ $t('member.resetPassword') }}</a-button>
      <a-button @click="handleCancel">{{ $t('option.cancel') }}</a-button>
      <a-button type="primary" @click="handleEdit">{{ $t('option.edit') }}</a-button>
      <a-button type="danger" @click="handleDelete">{{ $t('option.delete') }}</a-button>
    </template>
  </a-modal>
</template>

<script>
import i18n from '@/locales'

export default {
  name: 'MemberView',
  data () {
    return {
      title: i18n.t('option.view'),
      visible: false,
      member: {},
      projectColumns: [
        {
          title: i18n.t('project.projectName'),
          dataIndex: 'projectName'
        },
        {
          title: i18n.t('project.projectCustomer'),
          dataIndex: 'projectCustomer'
        },
        {
          title: i18n.t('project.productName'),
          dataIndex: 'productName'
        },
        {
          title: i18n.t('project.projectStatus'),
          dataIndex: 'projectStatus'
        },
        {
          title: i18n.t('project.projectStarttime'),
          dataIndex: 'projectStarttime'
        }
      ],
      projectData: [
        {
          projectName: 'test1',
          projectCustomer: 'test',
          productName: 'test',
          projectStatus: 'test',
          projectStarttime: 'test'
        },
        {
          projectName: 'test2',
          projectCustomer: 'test',
          productName: 'test',
          projectStatus: 'test',
          projectStarttime: 'test'
        }
      ]
    }
  },
  methods: {
    view (row) {
      this.visible = true
      this.member = row
    },
    handleStatus () {
      this.$emit('status', this.member)
    },
    handleRest () {
      this.$emit('reset', this.member)
    },
    handleEdit () {
      this.$emit('edit', this.member)
      this.visible = false
    },
    handleDelete () {
      this.$emit('delete', this.member)
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
  .photo {
    text-align: center;

    b {
      display: block;
      margin-top: 10px;
    }
  }

  .view-table {
    margin-top: 15px;

    /deep/ .ant-table-small {
      border: 0;

      .ant-table-title {
        padding: 8px 0;
        font-weight: bold;
      }

      .ant-table-body {
        margin: 0;
      }
    }
  }

  .reset-button {
    float: left;
  }
</style>
