import Vue from 'vue'
import moment from 'moment'
import i18n from '@/locales'
import store from '@/store'
import provinces from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'

// 数字格式化
Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

// 项目状态
const statusMap = [
  {
    k: '0',
    c: '',
    v: '准备中'
  },
  {
    k: '1',
    c: 'orange',
    v: '产品咨询/确认'
  },
  {
    k: '2',
    c: 'cyan',
    v: '标签和出口准备'
  },
  {
    k: '3',
    c: 'blue',
    v: 'PO/合同/订单'
  },
  {
    k: '4',
    c: 'purple',
    v: '生产/发货'
  },
  {
    k: '5',
    c: 'green',
    v: '出口/AS'
  }
]
Vue.filter('filterStep', function (val) {
  return val ? statusMap.find(x => x['k'] === val)['v'] : ''
})
Vue.filter('filterStepColor', function (val) {
  return val ? statusMap.find(x => x['k'] === val)['c'] : ''
})

// Date转字符串
Vue.filter('filterD2S', function (val, pattern = 'YYYY-MM-DD') {
  return val ? moment(val).format(pattern) : ''
})

// 字符串转Date
Vue.filter('filterS2D', function (val, pattern = 'YYYY-MM-DD') {
  return val ? moment(val, pattern) : null
})

// 启用
Vue.filter('filterStatus', function (val) {
  return val === '1'
})

// 性别
Vue.filter('filterSex', function (val) {
  return val === '1' ? i18n.t('member.man') : i18n.t('member.woman')
})

// 获取姓名
Vue.filter('filterMemberName', function (val, obj) {
  if (!val) return ''
  const list = JSON.parse(val)
  let names = ''
  list.forEach((item, index) => {
    obj.find((x) => {
      if (x['id'] === Number(item)) {
        names += x['realname'] + (list.length === index + 1 ? '' : ', ')
      }
    })
  })

  return names
})

// 部门
Vue.filter('filterDepartment', function (val) {
  if (!val) return ''
  return store.getters.department.find((x) => x['cnfValue'] === val)['cnfNote']
})

// 问题
Vue.filter('filterQuestion', function (val) {
  if (!val) return ''
  return store.getters.question.find((x) => x['cnfValue'] === val)['cnfNote']
})

// 地址
Vue.filter('filterAddress', function (v1, v2, v3, v4 = '') {
  if (v1 === '99') {
    return '国外' + (v4 ? '/' + v4 : '')
  } else if (!v1 || !v2 || !v2) {
    return ''
  } else {
    const n1 = [...provinces].find((x) => x['code'] === v1)['name']
    const n2 = [...cities].find((x) => x['code'] === v2)['name']
    const n3 = [...areas].find((x) => x['code'] === v3)['name']
    return n1 + '/' + n2 + '/' + n3 + (v4 ? '/' + v4 : '')
  }
})
Vue.filter('filterCity', function (v1, v2) {
  if (v1 === '99') {
    return '国外'
  } else if (!v1 || !v2) {
    return ' '
  } else {
    const n1 = [...provinces].find((x) => x['code'] === v1)['name']
    const n2 = [...cities].find((x) => x['code'] === v2)['name']
    return n1 + '/' + n2
  }
})
