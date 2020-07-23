import T from 'ant-design-vue/es/table/Table'

// 地区
import provinces from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'
import store from '@/store'

// 导出excel
const { exportJsonToExcel } = require('@/excel/Export2Excel')

export default {
  data () {
    return {
      localLoading: false,
      localDataSource: [],
      SearchDataSource: [],
      localPagination: Object.assign({}, this.pagination),
      localSort: {
        order: null
      }
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    data: {
      type: Function,
      required: true
    },
    queryParam: {
      type: Object,
      default: null
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto'
    }
  }),
  created () {
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init () {
      this.localLoading = true
      const data = this.data()

      // 对接自己的通用数据接口需要修改下方代码
      if ((typeof data === 'object' || typeof data === 'function') && typeof data.then === 'function') {
        data.then(res => {
          // 初始化分页
          this.localPagination = {
            current: 1,
            total: res.length,
            showSizeChanger: true,
            pageSize: 10
          }

          // 数据不满足分页大小，关闭 table 分页功能
          try {
            if ((['auto', true].includes(this.showPagination) && res.length <= this.localPagination.pageSize)) {
              this.localPagination.hideOnSinglePage = true
            }
          } catch (e) {
            this.localPagination = false
          }
          this.localDataSource = res // 返回结果中的数组数据
          this.SearchDataSource = [...res] // 返回结果中的数组数据(深拷贝)
        }).finally(_ => {
          this.localLoading = false
        })
      }
    },
    /**
     * 表格重新加载方法
     */
    refresh (pagination, filters, sorter) {
      if (typeof pagination === 'object') {
        this.localPagination = pagination
      } else if (typeof pagination === 'string') {
        this.localDataSource = ['search', 'delete'].includes(pagination) ? this.localSearch() : this.SearchDataSource
        this.localPagination = Object.assign({}, pagination, {
          current: ['search', 'add'].includes(pagination) ? 1 : this.localPagination.current,
          total: this.localDataSource.length
        })
      }

      if (sorter) this.localSort = sorter
      if (this.localSort.order === 'ascend') {
        this.localDataSource.sort((a, b) => a[this.localSort['columnKey']] > b[this.localSort['columnKey']] ? 1 : -1)
      } else if (this.localSort.order === 'descend') {
        this.localDataSource.sort((a, b) => b[this.localSort['columnKey']] < a[this.localSort['columnKey']] ? -1 : 1)
      } else if (this.localSort) {
        this.localDataSource.sort((a, b) => b['createtime'] < a['createtime'] ? -1 : 1)
      }
    },
    /**
     * 前端搜索
     */
    localSearch () {
      const param = this.queryParam
      const obj = this.SearchDataSource.filter(item => {
        let flag = true
        Object.keys(param).forEach(e => {
          /**
           * 1. Json查询
           * 2. 普通查询
           */
          if (['salesMan', 'projectSalesMan'].includes(e) &&
              param[e] &&
              !(JSON.parse(item[e])).includes(Number(param[e]))) {
            flag = false
          } else if (!String(item[e]).includes(param[e])) {
            flag = false
          }
        })
        return flag
      })

      return obj.length === 0 && param.length === 0 ? this.SearchDataSource : obj
    },
    /**
     * 新建
     */
    add (row) {
      this.SearchDataSource.unshift(row)
      this.refresh('add')
    },
    /**
     * 编辑
     */
    update (row) {
      this.SearchDataSource.splice(this.SearchDataSource.findIndex(item => item.id === row.id), 1, row)
      this.refresh('update')
    },
    /**
     * 删除
     */
    delete (row) {
      this.SearchDataSource.splice(this.SearchDataSource.findIndex(item => item.id === row.id), 1)
      this.refresh('delete')
    },
    /**
     * Excel导出
     */
    excelExport (e, o) {
      require.ensure([], () => {
        let list = this.localDataSource
        const userInfo = store.getters.userInfo
        /**
         * 除一下人员其他人只能下载自己项目客户信息
         * 3  admin
         * 23 朴道永
         * 22 单珊
         * 17 정용범
         */
        if (![3, 23, 22, 17].includes(userInfo.id)) {
          list = list.filter((v) => {
            if (!v['salesMan']) return false
            return (JSON.parse(v['salesMan'])).includes(userInfo.id)
          })
        }

        const data = this.formatJson(e.filterVal, list, o)
        if (data.length === 0) {
          this.$message.warning('无客户信息可导出')
        } else {
          exportJsonToExcel(e.tHeader, data, e.excelName)
        }
      })
    },
    /**
     * 格式化json
     */
    formatJson (filterVal, jsonData, other) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'province' && v[j]) {
          return v[j] === '99' ? '国外' : [...provinces].find((x) => x['code'] === v[j])['name']
        } else if (j === 'city' && v[j]) {
          return [...cities].find((x) => x['code'] === v[j])['name']
        } else if (j === 'area' && v[j]) {
          return [...areas].find((x) => x['code'] === v[j])['name']
        } else if (j === 'projectSalesMan' && v[j] || j === 'salesMan' && v[j]) {
          const list = JSON.parse(v[j])
          let names = ''
          list.forEach((item, index) => {
            other.userList.find((x) => {
              if (x['id'] === Number(item)) {
                names += x['realname'] + (list.length === index + 1 ? '' : ', ')
              }
            })
          })

          return names
        } else if (j === 'projectStatus' && v[j]) {
          return other.statusMap.find(x => x['k'] === v[j])['v']
        } else {
          return v[j]
        }
      }))
    }
  },

  render () {
    const props = {}
    const localKeys = Object.keys(this.$data)

    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })

    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.refresh}>
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
      </a-table>
    )

    return (
      <div class="table-wrapper">
        { table }
      </div>
    )
  }
}
