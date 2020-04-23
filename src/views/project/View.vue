<template>
  <page-view :title="$t('project.projectCd') + '：' + baseInfo.projectCd" class="project-box">
    <!-- 负责人信息 -->
    <a-descriptions :column="{ md: 3, sm: 3, xs: 1}" slot="headerContent" class="detail-layout">
      <a-descriptions-item :label="$t('project.projectName')">{{ baseInfo.projectName }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectSalesMan')">{{ baseInfo.projectSalesMan | filterMemberName(userList) }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectPriceTotal')">{{ baseInfo.projectPriceTotal }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectStarttime')">{{ baseInfo.projectStarttime }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectEndtime')">{{ baseInfo.projectEndtime }}</a-descriptions-item>
    </a-descriptions>

    <template slot="action">
      <a-button type="primary">编辑</a-button>
    </template>

    <!-- 流程进度 -->
    <a-card :bordered="false" title="流程进度">
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="Number(baseInfo.projectStatus)" progressDot>
        <a-step v-for="item in tabList" :title="item.tab" :key="item.key" />
      </a-steps>
    </a-card>

    <!-- 客户信息 -->
    <a-card :bordered="false">
      <template slot="title">
        客户信息
      </template>

      <a-descriptions>
        <a-descriptions-item label="姓名">{{ baseInfo.customer.customerName }}</a-descriptions-item>
        <a-descriptions-item label="负责人">{{ baseInfo.customer.salesMan | filterMemberName(userList)  }}</a-descriptions-item>
        <a-descriptions-item label="微信">{{ baseInfo.customer.wechat }}</a-descriptions-item>
        <a-descriptions-item label="营业额">{{ baseInfo.customer.salesVolumn }}</a-descriptions-item>
        <a-descriptions-item label="主要市场">{{ baseInfo.customer.target }}</a-descriptions-item>
        <a-descriptions-item label="有无开发能力">{{ baseInfo.customer.developmentSkill }}</a-descriptions-item>
        <a-descriptions-item label="城市">{{ baseInfo.customer.province | filterCity(baseInfo.customer.city, baseInfo.customer.area) }}</a-descriptions-item>
        <a-descriptions-item label="详细地址" :span="isMobile() ? 1 : 2">{{ baseInfo.customer.customerName }}</a-descriptions-item>
        <a-descriptions-item label="公司介绍" :span="isMobile() ? 1 : 3">{{ baseInfo.customer.customerName }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <!-- 产品 - 原料信息 -->
    <a-card :bordered="false">
      <template slot="title">
        产品 - 原料信息
      </template>

      <a-descriptions :column="isMobile() ? 1 : 4">
        <a-descriptions-item label="产品名">某某</a-descriptions-item>
        <a-descriptions-item label="分类">饮品</a-descriptions-item>
        <a-descriptions-item label="产品类型">功能型饮料</a-descriptions-item>
        <a-descriptions-item label="包装类型">瓶装</a-descriptions-item>
        <a-descriptions-item label="食品类型">液体</a-descriptions-item>
        <a-descriptions-item label="数量">100w</a-descriptions-item>
        <a-descriptions-item label="价格" :span="isMobile() ? 1 : 2">单价10元</a-descriptions-item>
        <a-descriptions-item label="核心原料" :span="isMobile() ? 1 : 2">
          <a-tag>原料 1</a-tag>
          <a-tag>原料 2</a-tag>
          <a-tag>原料 3</a-tag>
          <a-tag>原料 4</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="副原料" :span="isMobile() ? 1 : 2">
          <a-tag>原料 5</a-tag>
          <a-tag>原料 6</a-tag>
          <a-tag>原料 7</a-tag>
          <a-tag>原料 8</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="备注" :span="isMobile() ? 1 : 4">备注备注备注备注</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <!-- 历史信息 -->
    <a-card
      class="card-tabs-box"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <template slot="title">
        历史信息
      </template>
    </a-card>

  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import { getProjectBaseinfo, getProjectDetail } from '@/api/project'
import { getMemberNameList } from '@/api/member'

export default {
  name: 'ProjectView',
  components: {
    PageView
  },
  mixins: [mixinDevice],
  data () {
    return {
      projectId: null,
      baseInfo: {
        customer: {}
      },
      form: {},
      userList: [],
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
      activeTabKey: '1'
    }
  },
  created () {
    this.projectId = this.$route.params.projectId
    this.$nextTick(() => {
      getMemberNameList().then(res => {
        this.userList = res.data
      })
      getProjectBaseinfo({
        projectId: this.projectId
      }).then(res => {
        console.log(res.data)
        this.baseInfo = res.data
      })
      getProjectDetail({
        projectId: this.projectId
      }).then(res => {
        this.form = res.data
      })
    })
  }
}
</script>
