import Vue from 'vue'
import store from '@/store'

/**
 * Action 权限指令
 * 指令用法： v-permission:view=['admin', 'user']
 */
const action = Vue.directive('permission', {
  inserted: function (el, binding, vnode) {
    const arg = binding.arg
    const val = binding.value
    const userRole = store.getters.role

    // 有权限跳出
    if (val instanceof Array && val.includes(userRole)) return

    if (arg === 'view') {
      el.remove()
    }
    if (arg === 'disabled') {
      el.setAttribute('disabled', true)
    }
  }
})

export default action
