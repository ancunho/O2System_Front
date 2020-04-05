import { getCommonConfig } from '@/api/common'

const common = {
  state: {
    department: null,
    question: null
  },

  mutations: {
    SET_DEPARTMENT: (state, department) => {
      state.department = department
    },
    SET_QUESTION: (state, question) => {
      state.question = question
    }
  },

  actions: {
    // 获取common config
    GetCommon ({ commit }) {
      return new Promise((resolve, reject) => {
        const keyList = Object.keys(this.state.common)
        for (const key of keyList) {
          getCommonConfig({ CNF_CODE: key }).then((response) => {
            commit('SET_' + key.toUpperCase(), response.data)
            if ([...keyList].pop() === key) resolve()
          })
        }
      })
    }
  }
}

export default common
