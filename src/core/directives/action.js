import Vue from 'vue'
import store from '@/store'

/**
 * Action 权限指令
 * 指令用法： v-permission:view=[UserList]
 */
const action = Vue.directive('permission', {
  inserted: function (el, binding, vnode) {
    const root = ['ROLE_ADMIN']
    const userInfo = store.getters.userInfo
    const arg = binding.arg
    const val = typeof binding.value === 'string' ? JSON.parse(binding.value) : binding.value

    if (arg !== 'b') return

    // 有权限跳出
    if (root.includes(userInfo.role) ||
      val instanceof Array && val.includes(userInfo.id)) return

    el.remove()
  },
  update: function (el, binding, vnode) {
    const root = ['ROLE_ADMIN']
    const userInfo = store.getters.userInfo
    const arg = binding.arg
    const val = typeof binding.value === 'string' ? JSON.parse(binding.value) : binding.value

    if (arg !== 'u') return

    // 有权限跳出
    if (root.includes(userInfo.role) ||
      val instanceof Array && val.includes(userInfo.id)) {
      el.style.display = 'inline-block'
    } else {
      el.style.display = 'none'
    }
  }
})

export default action
