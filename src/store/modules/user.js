import Vue from 'vue'
import { login, getInfo, logout } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    role: '',
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          Vue.ls.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data

          if (data.role) {
            commit('SET_ROLE', data.role)
            commit('SET_INFO', data)
          } else {
            reject(new Error('getInfo: role must be a non-null!'))
          }

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLE', '')
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
