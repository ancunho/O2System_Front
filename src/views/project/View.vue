<template>
  <page-view title="项目编号：234231029431" logo="/logo.png" class="project-box">
    <!-- 负责人信息 -->
    <a-descriptions slot="headerContent" class="detail-layout">
      <a-descriptions-item label="负责人姓名">某某</a-descriptions-item>
      <a-descriptions-item label="开始日期">2020-04-01</a-descriptions-item>
      <a-descriptions-item label="结束日期">2020-05-01</a-descriptions-item>
      <a-descriptions-item label="备注">请于两个工作日内确认</a-descriptions-item>
    </a-descriptions>

    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary">编辑</a-button>
    </template>

    <!-- 流程进度 -->
    <a-card :bordered="false" title="流程进度">
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="1" progressDot>
        <a-step title="创建项目">
        </a-step>
        <a-step title="部门初审">
        </a-step>
        <a-step title="财务复核">
        </a-step>
        <a-step title="完成">
        </a-step>
      </a-steps>
    </a-card>

    <!-- 客户信息 -->
    <a-card :bordered="false">
      <template slot="title">
        客户信息
        <a-button size="small" type="primary" style="margin-left:15px">编辑</a-button>
      </template>

      <a-descriptions>
        <a-descriptions-item label="姓名">某某</a-descriptions-item>
        <a-descriptions-item label="负责人">某某</a-descriptions-item>
        <a-descriptions-item label="微信">wx123456</a-descriptions-item>
        <a-descriptions-item label="营业额">100w</a-descriptions-item>
        <a-descriptions-item label="主要市场">巴拉巴拉</a-descriptions-item>
        <a-descriptions-item label="有无开发能力">
          <a-tag color="green">有</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="城市">上海</a-descriptions-item>
        <a-descriptions-item label="详细地址" :span="isMobile() ? 1 : 2">上海市闵行区</a-descriptions-item>
        <a-descriptions-item label="公司介绍" :span="isMobile() ? 1 : 3">公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <!-- 产品 - 原料信息 -->
    <a-card :bordered="false">
      <template slot="title">
        产品 - 原料信息
        <a-button size="small" type="primary" style="margin-left:15px">编辑</a-button>
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
        <a-button size="small" type="primary" style="margin-left:15px">编辑</a-button>
      </template>
      <a-table
        v-if="activeTabKey === '1'"
        :columns="operationColumns"
        :dataSource="operation"
        :pagination="false"
      >
      </a-table>
      <div v-if="activeTabKey === '2'">tab2</div>
      <div v-if="activeTabKey === '3'">tab3</div>
      <div v-if="activeTabKey === '4'">tab4</div>
      <div v-if="activeTabKey === '5'">tab5</div>
    </a-card>

  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'

export default {
  name: 'ProjectView',
  components: {
    PageView
  },
  mixins: [mixinDevice],
  data () {
    return {
      tabList: [
        {
          key: '1',
          tab: 'TAB1'
        },
        {
          key: '2',
          tab: 'TAB2'
        },
        {
          key: '3',
          tab: 'TAB3'
        },
        {
          key: '4',
          tab: 'TAB4'
        },
        {
          key: '5',
          tab: 'TAB5'
        }
      ],
      activeTabKey: '1',
      operationColumns: [
        {
          title: '操作类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '操作人',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '执行结果',
          dataIndex: 'status',
          key: 'status'
        },
        {
          title: '操作时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark'
        }
      ],
      operation: [
        {
          key: 'op1',
          type: '订购关系生效',
          name: '曲丽丽',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        },
        {
          key: 'op5',
          type: '创建订单',
          name: '汗牙牙',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ]
    }
  }
}
</script>
