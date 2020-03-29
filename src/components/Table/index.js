import T from 'ant-design-vue/es/table/Table'

export default {
  data () {
    return {
      localLoading: false,
      localDataSource: [],
      SearchDataSource: [],
      localPagination: Object.assign({}, this.pagination)
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
    this.localLoading = true
    const data = this.data()

    // 对接自己的通用数据接口需要修改下方代码
    if ((typeof data === 'object' || typeof data === 'function') && typeof data.then === 'function') {
      data.then(res => {
        // 初始化分页
        this.localPagination = {
          current: 1,
          total: res.data.length,
          showSizeChanger: true,
          pageSize: 10
        }

        // 数据不满足分页大小，关闭 table 分页功能
        try {
          if ((['auto', true].includes(this.showPagination) && res.data.length <= this.localPagination.pageSize)) {
            this.localPagination.hideOnSinglePage = true
          }
        } catch (e) {
          this.localPagination = false
        }
        this.localDataSource = res.data // 返回结果中的数组数据
        this.SearchDataSource = [...res.data] // 返回结果中的数组数据(深拷贝)
      }).finally(_ => {
        this.localLoading = false
      })
    }
  },
  methods: {
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
    },
    /**
     * 前端搜索
     */
    localSearch () {
      const param = this.queryParam
      const obj = this.SearchDataSource.filter(item => {
        let flag = true
        Object.keys(param).forEach(e => {
          if (!String(item[e]).includes(param[e])) {
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
    add (record) {
      this.SearchDataSource.unshift(record)
      this.refresh('add')
      this.$message.success('新建成功')
    },
    /**
     * 编辑
     */
    update (record) {
      this.SearchDataSource.splice(this.SearchDataSource.findIndex(item => item.id === record.id), 1, record)
      this.refresh('update')
      this.$message.success('编辑成功')
    },
    /**
     * 删除
     */
    delete (record) {
      this.SearchDataSource.splice(this.SearchDataSource.findIndex(item => item.id === record.id), 1)
      this.refresh('delete')
      this.$message.success('删除成功')
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
