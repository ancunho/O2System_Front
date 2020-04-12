import Vue from 'vue'
import moment from 'moment'
import i18n from '@/locales'
import store from '@/store'
import provinces from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'

// Date转字符串
Vue.filter('filterD2S', function (val, pattern = 'YYYY-MM-DD') {
  return val ? moment(val).format(pattern) : ''
})

// 字符串转Date
Vue.filter('filterS2D', function (val, pattern = 'YYYY-MM-DD') {
  return val ? moment(val, pattern) : ''
})

// 启用
Vue.filter('filterStatus', function (val) {
  return val === '1'
})

// 性别
Vue.filter('filterSex', function (val) {
  return val === '1' ? i18n.t('member.man') : i18n.t('member.woman')
})

// 部门
Vue.filter('filterDepartment', function (val) {
  if (!val) return ''
  const obj = store.getters.department.find((x) => x['cnfValue'] === val)
  return obj['cnfNote']
})

// 问题
Vue.filter('filterQuestion', function (val) {
  if (!val) return ''
  const obj = store.getters.question.find((x) => x['cnfValue'] === val)
  return obj['cnfNote']
})

// 地址
Vue.filter('filterAddress', function (v1, v2, v3, v4 = '') {
  if (!v1 || !v2 || !v2) return ''
  const obj1 = [...provinces].find((x) => x['code'] === v1)
  const obj2 = [...cities].find((x) => x['code'] === v2)
  const obj3 = [...areas].find((x) => x['code'] === v3)
  return obj1['name'] + '-' + obj2['name'] + '-' + obj3['name'] + '-' + v4
})
