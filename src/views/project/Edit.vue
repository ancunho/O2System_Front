<template>
  <page-view :title="$t('project.projectCd') + '：' + baseInfo.projectCd" class="project-box">
    <!-- 负责人信息 -->
    <a-descriptions :column="{ md: 4, sm: 3, xs: 1}" slot="headerContent" class="detail-layout">
      <a-descriptions-item :label="$t('project.projectName')">{{ baseInfo.projectName }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectCustomer')">{{ baseInfo.customer.customerName }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectSalesMan')">{{ baseInfo.projectSalesMan | filterMemberName(userList) }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectPriceTotal')">{{ baseInfo.projectPriceTotal }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectStarttime')">{{ baseInfo.projectStarttime }}</a-descriptions-item>
      <a-descriptions-item :label="$t('project.projectEndtime')">{{ baseInfo.projectEndtime }}</a-descriptions-item>
    </a-descriptions>

    <a-form-model :model="form">
      <!-- 产品 - 原料信息 -->
      <a-card :bordered="false">
        <template slot="title">
          产品 - 原料信息
        </template>
        <a-row :gutter="24">
          <a-col :lg="6" :md="8" :sm="24">
            <a-form-model-item :label="$t('project.productName')">
              <a-input v-model="form.projectProduct.productName" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24">
            <a-form-model-item :label="$t('project.productCategory')">
              <a-select v-model="form.projectProduct.productCategory">
                <a-select-option v-for="list in productCategory" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24">
            <a-form-model-item :label="$t('project.productPackage')">
              <a-select v-model="form.projectProduct.productPackage">
                <a-select-option v-for="list in productPackage" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24">
            <a-form-model-item :label="$t('project.productConcept')">
              <a-select v-model="form.projectProduct.productConcept">
                <a-select-option v-for="list in productConcept" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24">
            <a-form-model-item :label="$t('project.productType')">
              <a-select v-model="form.projectProduct.productType">
                <a-select-option v-for="list in productType" :key="list['cnfValue']">{{ list['cnfNote'] }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24">
            <a-form-model-item :label="$t('project.productQuantity')">
              <a-input v-model="form.projectProduct.productQuantity" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24">
            <a-form-model-item :label="$t('project.productTargetPrice')">
              <a-input v-model="form.projectProduct.productTargetPrice" />
            </a-form-model-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-model-item :label="$t('project.productMainMaterial')">
              <a-select mode="tags" style="width: 100%" :tokenSeparators="[',']" v-model="form.projectProduct.productMainMaterial">
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-model-item :label="$t('project.productSubMaterial')">
              <a-select mode="tags" style="width: 100%" :tokenSeparators="[',']" v-model="form.projectProduct.productSubMaterial">
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-model-item :label="$t('project.productDetail')">
              <a-input v-model="form.projectProduct.productDetail" type="textarea" />
            </a-form-model-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-model-item :label="$t('project.productTargetContent')">
              <a-input v-model="form.projectProduct.productTargetContent" type="textarea" />
            </a-form-model-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24">
            <a-form-model-item :label="$t('project.productImage')">
              <a-upload
                class="image-uploader"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                :showUploadList="false"
              >
                <img width="125" v-if="form.projectProduct.productImage" :src="form.projectProduct.productImage" />
                <div v-else>
                  <a-icon :type="'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-col>
        </a-row>
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
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.personInCharge" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-date-picker style="width:100%" v-model="form.projectPrice.releaseDate" />
                  </a-form-model-item>
                </td>
                <td colspan="2">
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.dealPlace" />
                  </a-form-model-item>
                </td>
              </tr>
              <tr>
                <th colspan="3">Tel: 0515-6885-2288</th>
                <th colspan="2">报价有效日期: 报价日起15天</th>
                <th>{{ $t('project.orderQuantity') }}</th>
                <td>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.orderQuantity" />
                  </a-form-model-item>
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
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.productName" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.actualInput" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.unitWeight" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.weight" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.packageSpec" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.theoryQuantity" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.yieldPercent" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.actualProduction" />
                  </a-form-model-item>
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
                  <a-form-model-item>
                    <a-input v-model="item.project" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input type="number" v-model="item.price" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input type="number" v-model="item.setPrice" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input type="number" v-model="item.percent" />
                  </a-form-model-item>
                </td>
              </tr>
              <tr>
                <td colspan="5" class="btns">
                  <a-button type="primary" size="small" icon="plus" @click="handlePricePush" >添加一行</a-button>
                </td>
              </tr>
              <tr>
                <td></td>
                <th>合计</th>
                <td class="txtC">{{ total.price }}</td>
                <td class="txtC">{{ total.setPrice }}</td>
                <td class="txtC">{{ total.percent }}%</td>
              </tr>
              <tr>
                <th colspan="2">{{ $t('project.valueNoVat') }}</th>
                <td colspan="2">
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.valueNoVat"/>
                  </a-form-model-item>
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
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.remark" type="textarea" />
                  </a-form-model-item>
                </td>
              </tr>
              <tr>
                <th colspan="2">说明</th>
              </tr>
              <tr v-for="(item, index) in form.projectPrice.descriptionList" :key="index">
                <td>
                  <a-form-model-item>
                    <a-input v-model="item.key" />
                  </a-form-model-item>
                </td>
                <td>
                  <a-form-model-item>
                    <a-input v-model="item.value" />
                  </a-form-model-item>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="btns">
                  <a-button type="primary" size="small" icon="plus" @click="handleDescriptionPush" >添加一行</a-button>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  {{ $t('project.specialComment') }}<br><br>
                  <a-form-model-item>
                    <a-input v-model="form.projectPrice.specialComment" type="textarea" />
                  </a-form-model-item>
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
          <a-button style="float: right" type="primary" @click="$refs.timelineViewModal.view(baseInfo)" >{{ $t('option.timeline') }}</a-button>
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
                    <a-form-model-item>
                      <a-input v-model="content.title" />
                    </a-form-model-item>
                  </td>
                  <td>
                    <a-form-model-item>
                      <a-date-picker style="width:100%" v-model="content.date" />
                    </a-form-model-item>
                  </td>
                  <td>
                    <a-form-model-item>
                      <a-input v-model="content.content" />
                    </a-form-model-item>
                  </td>
                  <td>
                    <a-form-model-item>
                      <a-input v-model="content.principal" />
                    </a-form-model-item>
                  </td>
                  <td>
                    <a-form-model-item>
                      <a-input v-model="content.check" />
                    </a-form-model-item>
                  </td>
                </tr>
              </template>
              <tr>
                <td colspan="5" class="btns">
                  <a-button type="primary" size="small" icon="plus" @click="handleRecordPush(item.id)" >添加一行</a-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </a-card>

      <!-- 附件 -->
      <a-card :bordered="false">
        <template slot="title">
          附件
        </template>
        <a-upload-dragger
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">单击或拖动文件到此区域以上载</p>
          <p class="ant-upload-hint">支持单次或批量上传。 严格禁止上传公司数据文件</p>
        </a-upload-dragger>
      </a-card>
    </a-form-model>

    <div class="button-box">
      <a-button type="primary" @click="handleEdit">编辑基本信息</a-button>
      <a-button type="primary" @click="handleSubmit">保存</a-button>
    </div>

    <form-popup
      ref="formModal"
      @update="handleUpdate($event)"
    />

    <!--时间轴-->
    <view-timeline-popup
      ref="timelineViewModal"
    />
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import ViewTimelinePopup from './modules/ViewTimelinePopup'
import { getMemberNameList } from '@/api/member'
import { projectBaseInfoUpdate, projectDetailAdd, projectDetailUpdate } from '@/api/project'
import { mapGetters } from 'vuex'
import FormPopup from '@/views/project/modules/FormPopup'

export default {
  name: 'ProjectEdit',
  components: {
    PageView,
    FormPopup,
    ViewTimelinePopup
  },
  computed: {
    ...mapGetters(['productCategory', 'productPackage', 'productConcept', 'productType'])
  },
  data () {
    return {
      type: 'add',
      baseInfo: {
        customer: {}
      },
      userList: [],
      form: {
        projectProduct: {
          productName: '',
          productMainMaterial: [],
          productSubMaterial: [],
          productCategory: '',
          productPackage: '',
          productConcept: '',
          productType: '',
          PRODUCT_QUANTITY: '',
          productTargetPrice: '',
          productDetail: '',
          productTargetContent: '',
          productImage: ''
        },
        projectPrice: {
          productName: '',
          personInCharge: '',
          releaseDate: null,
          dealPlace: '',
          orderQuantity: '',
          actualInput: '',
          unitWeight: '',
          weight: '',
          packageSpec: '',
          theoryQuantity: '',
          yieldPercent: '',
          actualProduction: '',
          priceList: [],
          descriptionList: [],
          remark: '',
          valueNoVat: '',
          specialComment: ''
        },
        projectRecordList: []
      },
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
      total: {
        price: 0,
        setPrice: 0,
        percent: 0
      }
    }
  },
  watch: {
    'form.projectPrice.priceList': function (val) {
      let price = 0
      let setPrice = 0
      let percent = 0
      val.forEach(item => {
        price += Number(item['price'])
        setPrice += Number(item['setPrice'])
        percent += Number(item['percent'])
      })

      this.total = {
        price: price,
        setPrice: setPrice,
        percent: percent
      }
    }
  },
  created () {
    if (!this.$route.params.data) {
      this.$router.push({
        name: 'projectList'
      })
      return false
    }

    if (this.$route.params.type === 'add') {
      this.type = 'add'
      this.baseInfo = this.$route.params.data
    } else {
      this.type = 'edit'
      this.baseInfo = this.$route.params.data.baseInfo
      this.form = this.$route.params.data.form
      this.form.projectPrice.releaseDate = this.$options.filters.filterS2D(this.form.projectPrice.releaseDate)
      this.form.projectRecordList.forEach((item, index) => {
        item.recordContent.forEach((item, index) => {
          item.date = this.$options.filters.filterS2D(item.date)
        })
      })
    }

    this.$nextTick(() => {
      getMemberNameList().then(res => {
        this.userList = res.data
      })
    })
  },
  methods: {
    // 添加价格
    handlePricePush () {
      this.form.projectPrice.priceList.push({
        project: '',
        price: '',
        setPrice: '',
        percent: ''
      })
    },

    // 添加备注
    handleDescriptionPush () {
      this.form.projectPrice.descriptionList.push({
        key: '',
        value: ''
      })
    },

    // 添加历史信息
    handleRecordPush (id) {
      if (this.form.projectRecordList[id]) {
        this.form.projectRecordList[id].recordContent.push({
          title: '',
          date: null,
          content: '',
          principal: '',
          check: ''
        })
      } else {
        this.form.projectRecordList.push({
          projectId: this.baseInfo.id, // id
          recordId: this.form.projectRecordList.length + 1,
          recordContent: [
            {
              title: '',
              date: null,
              content: '',
              principal: '',
              check: ''
            }
          ] // 内容list
        })
      }
    },

    // 文件上传
    handleChange (info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },

    // 编辑
    handleEdit () {
      this.$refs.formModal.edit(this.baseInfo)
    },

    // 编辑保存
    handleUpdate (values) {
      projectBaseInfoUpdate(values).then(res => {
        this.$refs.formModal.setConfirmLoading()
        this.$refs.formModal.setVisible()
        this.$message.success(res.msg)
      })
    },

    // 提交
    handleSubmit (info) {
      if (!this.form.projectProduct.productName) {
        this.$message.error('产品名不能为空')
        return false
      }

      // 修改参数
      const param = JSON.parse(JSON.stringify(this.form))

      param.projectId = this.baseInfo.id
      param.projectStatus = this.form.projectRecordList.length
      param.projectProduct.projectId = this.baseInfo.id
      param.projectProduct.productMainMaterial = JSON.stringify(param.projectProduct.productMainMaterial)
      param.projectProduct.productSubMaterial = JSON.stringify(param.projectProduct.productSubMaterial)
      param.projectPrice.projectId = this.baseInfo.id
      param.projectPrice.releaseDate = this.$options.filters.filterD2S(param.projectPrice.releaseDate)
      param.projectPrice.priceList = JSON.stringify(param.projectPrice.priceList)
      param.projectPrice.descriptionList = JSON.stringify(param.projectPrice.descriptionList)

      param.projectRecordList.forEach((item, index) => {
        item.recordContent.forEach((item, index) => {
          item.date = this.$options.filters.filterD2S(item.date)
        })
        item.recordContent = JSON.stringify(item.recordContent)
      })

      if (this.type === 'add') {
        projectDetailAdd(param).then(res => {
          this.$message.success(res.msg)
        })
      } else if (this.type === 'edit') {
        projectDetailUpdate(param).then(res => {
          this.$message.success(res.msg)
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .ant-card {
    .ant-form-item {
      margin-bottom: 0;

      /deep/ .image-uploader > .ant-upload {
        width: 128px;
        height: 128px;
      }

      .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
      }

      .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }
  }
</style>
