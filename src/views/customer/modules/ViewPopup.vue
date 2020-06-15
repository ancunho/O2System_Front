<template>
  <a-modal
    :title="title"
    :width="700"
    :maskClosable="false"
    :visible="visible"
    v-if="visible"
    @cancel="handleCancel"
  >

    <a-row :gutter="24">
      <a-col :md="17" :sm="24">
        <a-descriptions :column="{ md: 2, sm: 1, xs: 1}">
          <a-descriptions-item :label="$t('customer.customerCd')">{{ customer.customerCd }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.customerName')">{{ customer.customerName }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.customerType')">{{ customer.customerType }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.salesVolumn')">{{ customer.salesVolumn }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.director')">{{ customer.director }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.phone')">{{ customer.phone }}</a-descriptions-item>
        </a-descriptions>
        <a-descriptions :column="{ md: 1, sm: 1, xs: 1}">
          <a-descriptions-item :label="$t('customer.address')">{{ customer.province | filterAddress(customer.city, customer.area) }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.address-detail')">{{ customer.address }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.developmentSkill')">{{ customer.developmentSkill | filterJson2Str }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.channel')">{{ customer.channel | filterJson2Str }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.target')">{{ customer.target }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.productList')">{{ customer.productList }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.salesMan')">{{ customer.salesMan | filterMemberName(this.$parent.$parent.userList) }}</a-descriptions-item>
          <a-descriptions-item :label="$t('customer.description')">{{ customer.description }}</a-descriptions-item>
        </a-descriptions>
      </a-col>

      <a-col :md="7" :sm="24">
        <div class="photo">
          <a-avatar shape="square" :size="150" icon="user" :src="customer.imagePhoto" />
          <b>{{ $t('customer.customerImage') }}</b>
        </div>
      </a-col>
    </a-row>

    <template slot="footer">
      <a-button @click="handleCancel">{{ $t('option.cancel') }}</a-button>
      <a-button v-permission:i="customer.salesMan" type="primary" @click="handleEdit">{{ $t('option.edit') }}</a-button>
      <a-button v-permission:i="[]" type="danger" @click="handleDelete">{{ $t('option.delete') }}</a-button>
    </template>
  </a-modal>
</template>

<script>
import i18n from '@/locales'

export default {
  name: 'CustomerView',
  data () {
    return {
      title: i18n.t('option.view'),
      visible: false,
      customer: {}
    }
  },
  methods: {
    setVisible (val = false) {
      this.visible = val
    },
    view (val) {
      this.visible = true
      this.customer = val
    },
    handleEdit () {
      this.$emit('edit', this.customer)
      this.visible = false
    },
    handleDelete () {
      this.$emit('delete', this.customer)
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
