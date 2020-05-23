<template>
  <a-spin :spinning="loading">
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
        <a-button v-permission:u="permissionList" type="primary" @click="handleEdit">编辑</a-button>
      </template>

      <!-- 流程进度 -->
      <a-card :bordered="false" title="流程进度">
        <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="Number(baseInfo.projectStatus) - 1" progressDot>
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
          <a-descriptions-item label="负责人">{{ baseInfo.customer.salesMan | filterMemberName(userList) }}</a-descriptions-item>
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
          <a-descriptions-item label="产品名">{{ form.projectProduct.productName }}</a-descriptions-item>
          <a-descriptions-item label="分类">{{ form.projectProduct.productCategory | fProductCategory }}</a-descriptions-item>
          <a-descriptions-item label="包装类型">{{ form.projectProduct.productPackage | fProductPackage }}</a-descriptions-item>
          <a-descriptions-item label="产品概念">{{ form.projectProduct.productConcept | fProductConcept }}</a-descriptions-item>
          <a-descriptions-item label="产品类型">{{ form.projectProduct.productType | fProductType }}</a-descriptions-item>
          <a-descriptions-item label="数量">{{ form.projectProduct.productQuantity }}</a-descriptions-item>
          <a-descriptions-item label="价格" :span="isMobile() ? 1 : 2">{{ form.projectProduct.productTargetPrice }}</a-descriptions-item>
          <a-descriptions-item label="核心原料" :span="isMobile() ? 1 : 2">
            <a-tag v-for="item in form.projectProduct.productMainMaterial" :key="item">{{ item }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="副原料" :span="isMobile() ? 1 : 2">
            <a-tag v-for="item in form.projectProduct.productSubMaterial" :key="item">{{ item }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="详细说明" :span="isMobile() ? 1 : 4">{{ form.projectProduct.productDetail }}</a-descriptions-item>
        </a-descriptions>
      </a-card>

      <!-- 价格信息 -->
      <a-card :bordered="false">
        <template slot="title">
          价格信息
        </template>
        <div class="input-table">
          <table>
            <tbody>
              <tr>
                <th rowspan="3"> </th>
                <th rowspan="2" colspan="3">估价单</th>
                <th>{{ $t('project.personInCharge') }}</th>
                <th>{{ $t('project.releaseDate') }}</th>
                <th colspan="2">{{ $t('project.dealPlace') }}</th>
              </tr>
              <tr>
                <td>
                  {{ form.projectPrice.personInCharge }}
                </td>
                <td>
                  {{ form.projectPrice.releaseDate }}
                </td>
                <td colspan="2">
                  {{ form.projectPrice.dealPlace }}
                </td>
              </tr>
              <tr>
                <th colspan="3">Tel: 0515-6885-2288</th>
                <th colspan="2">报价有效日期: 报价日起15天</th>
                <th>{{ $t('project.orderQuantity') }}</th>
                <td>
                  {{ form.projectPrice.orderQuantity }}
                </td>
              </tr>
              <tr>
                <th>{{ $t('project.productName') }}</th>
                <th>{{ $t('project.actualInput') }}</th>
                <th>{{ $t('project.unitWeight') }}</th>
                <th>{{ $t('project.weight') }}</th>
                <th>{{ $t('project.packageSpec') }}</th>
                <th>{{ $t('project.theoryQuantity') }}</th>
                <th>{{ $t('project.yieldPercent') }}</th>
                <th>{{ $t('project.actualProduction') }}</th>
              </tr>
              <tr>
                <td>
                  {{ form.projectPrice.productName }}
                </td>
                <td>
                  {{ form.projectPrice.actualInput }}
                </td>
                <td>
                  {{ form.projectPrice.unitWeight }}
                </td>
                <td>
                  {{ form.projectPrice.weight }}
                </td>
                <td>
                  {{ form.projectPrice.packageSpec }}
                </td>
                <td>
                  {{ form.projectPrice.theoryQuantity }}
                </td>
                <td>
                  {{ form.projectPrice.yieldPercent }}
                </td>
                <td>
                  {{ form.projectPrice.actualProduction }}
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th colspan="5">制造原价计算(VAT 除外)</th>
              </tr>
              <tr>
                <th>#</th>
                <th>项目</th>
                <th>金额</th>
                <th>Set 单价</th>
                <th>占有比</th>
              </tr>
              <tr v-for="(item, index) in form.projectPrice.priceList" :key="index">
                <td class="txtC">{{ index + 1 }}</td>
                <td>
                  {{ item.project }}
                </td>
                <td>
                  {{ item.price }}
                </td>
                <td>
                  {{ item.setPrice }}
                </td>
                <td>
                  {{ item.percent }}
                </td>
              </tr>
              <tr>
                <td></td>
                <th>合计</th>
                <td class="txtC">999</td>
                <td class="txtC">99</td>
                <td class="txtC">100%</td>
              </tr>
              <tr>
                <th colspan="2">{{ $t('project.valueNoVat') }}</th>
                <td colspan="2">
                  {{ form.projectPrice.valueNoVat }}
                </td>
                <td class="txtC">110.00</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td colspan="2">
                  {{ $t('project.remark') }}<br><br>
                  {{ form.projectPrice.remark }}
                </td>
              </tr>
              <tr>
                <th colspan="2">说明</th>
              </tr>
              <tr v-for="(item, index) in form.projectPrice.descriptionList" :key="index">
                <td>
                  {{ item.key }}
                </td>
                <td>
                  {{ item.value }}
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  {{ $t('project.specialComment') }}<br><br>
                  {{ form.projectPrice.specialComment }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
          <a-button style="float: right" type="primary" size="small" @click="$refs.timelineViewModal.view(baseInfo)" >{{ $t('option.timeline') }}</a-button>
        </template>
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
              <template v-if="form.projectRecordList[item.id]">
                <tr
                  v-for="(content, index) in form.projectRecordList[item.id].recordContent"
                  :key="index"
                >
                  <td>
                    {{ content.title }}
                  </td>
                  <td>
                    {{ content.date }}
                  </td>
                  <td>
                    {{ content.content }}
                  </td>
                  <td>
                    {{ content.principal }}
                  </td>
                  <td>
                    {{ content.check }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </a-card>

      <!-- 附件 -->
      <a-card :bordered="false">
        <template slot="title">
          附件
        </template>
        <div
          v-for="file in form.projectFileinfoList"
          :key="file.id"
        >
          <a-icon
            theme="twoTone"
            :type="file.fileExtension | filterIcon"
            style="display: inline; font-size: 20px"
          />
          <a-button
            :href="file.filePath"
            :download="file.fileName"
            target="_blank"
            type="link"
          >
            {{ file.fileName }}
          </a-button>
        </div>
      </a-card>

      <!--时间轴-->
      <view-timeline-popup
        ref="timelineViewModal"
      />
    </page-view>
  </a-spin>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import { getProjectView } from '@/api/project'
import { getMemberNameList } from '@/api/member'
import ViewTimelinePopup from '@/views/project/modules/ViewTimelinePopup'
import store from '@/store'

export default {
  name: 'ProjectView',
  components: {
    PageView,
    ViewTimelinePopup
  },
  mixins: [mixinDevice],
  filters: {
    fProductCategory (val) {
      if (!val) return ''
      return store.getters.productCategory.find((x) => x['cnfValue'] === val)['cnfNote']
    },
    fProductPackage (val) {
      if (!val) return ''
      return store.getters.productPackage.find((x) => x['cnfValue'] === val)['cnfNote']
    },
    fProductConcept (val) {
      if (!val) return ''
      return store.getters.productConcept.find((x) => x['cnfValue'] === val)['cnfNote']
    },
    fProductType (val) {
      if (!val) return ''
      return store.getters.productType.find((x) => x['cnfValue'] === val)['cnfNote']
    },
    filterIcon (val) {
      let icon = 'file'

      if (['xls', 'xlsx'].includes(val)) {
        icon = 'file-excel'
      } else if (['ppt', 'pptx'].includes(val)) {
        icon = 'file-ppt'
      } else if (['doc', 'docx'].includes(val)) {
        icon = 'file-word'
      } else if (['pdf'].includes(val)) {
        icon = 'file-pdf'
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(val)) {
        icon = 'file-image'
      }

      return icon
    }
  },
  data () {
    return {
      loading: true,
      projectId: null,
      baseInfo: {
        customer: {}
      },
      form: {
        projectProduct: {},
        projectPrice: {},
        projectRecordList: [],
        projectFileinfoList: []
      },
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
      activeTabKey: '1',
      permissionList: []
    }
  },
  created () {
    this.projectId = this.$route.params.id
    this.$nextTick(() => {
      new Promise(resolve => {
        return getMemberNameList().then(res => {
          this.userList = res.data
          resolve()
        })
      }).then(() => {
        return getProjectView({
          projectId: this.projectId
        }).then(res => {
          this.permissionList = JSON.parse(res.data.projectBaseinfo.projectSalesMan)
          this.permissionList.push(Number(res.data.projectBaseinfo.projectCreater))

          this.baseInfo = res.data.projectBaseinfo
          this.baseInfo.customer = res.data.customer

          if (res.data.projectProduct) {
            this.form.projectProduct = res.data.projectProduct
            this.form.projectProduct.productMainMaterial = JSON.parse(this.form.projectProduct.productMainMaterial)
            this.form.projectProduct.productSubMaterial = JSON.parse(this.form.projectProduct.productSubMaterial)
          }

          if (res.data.projectPrice) {
            this.form.projectPrice = res.data.projectPrice
            this.form.projectPrice.priceList = JSON.parse(this.form.projectPrice.priceList)
            this.form.projectPrice.descriptionList = JSON.parse(this.form.projectPrice.descriptionList)
          }

          if (res.data.projectRecordList) {
            this.form.projectRecordList = res.data.projectRecordList
            this.form.projectRecordList.forEach((item, index) => {
              item.recordContent = JSON.parse(item.recordContent)
            })
          }

          this.form.projectFileinfoList = res.data.projectFileinfoList

          this.loading = false
        })
      })
    })
  },
  methods: {
    handleEdit () {
      this.$router.push({
        name: 'projectEdit',
        params: {
          type: 'edit',
          data: {
            baseInfo: { ...this.baseInfo },
            form: { ...this.form }
          }
        }
      })
    }
  }
}
</script>
