import { getCommonConfigList } from '@/api/common'
import { groupBy } from '@/utils/util'

const common = {
  state: {
    department: null,
    question: null,
    customerType: null,
    customerDevelopmentSkill: null,
    customerChannel: null,
    customerTarget: null,
    productPackage: null,
    productConcept: null,
    productType: null
  },

  mutations: {
    SET_DEPARTMENT: (state, department) => {
      state.department = department
    },
    SET_QUESTION: (state, question) => {
      state.question = question
    },
    SET_CUSTOMERTYPE: (state, customerType) => {
      state.customerType = customerType
    },
    SET_CUSTOMERDEVELOPMENTSKILL: (state, customerDevelopmentSkill) => {
      state.customerDevelopmentSkill = customerDevelopmentSkill
    },
    SET_CUSTOMERCHANNEL: (state, customerChannel) => {
      state.customerChannel = customerChannel
    },
    SET_CUSTOMERTARGET: (state, customerTarget) => {
      state.customerTarget = customerTarget
    },
    SET_PRODUCTPACKAGE: (state, productPackage) => {
      state.productPackage = productPackage
    },
    SET_PRODUCTCONCEPT: (state, productConcept) => {
      state.productConcept = productConcept
    },
    SET_PRODUCTTYPE: (state, productType) => {
      state.productType = productType
    }
  },

  actions: {
    // 获取common config
    GetCommon ({ commit }) {
      return new Promise((resolve, reject) => {
        getCommonConfigList().then((res) => {
          const orderData = groupBy(res.data, function (item) {
            return item.cnfCode
          })

          const keyList = Object.keys(this.state.common)
          for (const key of keyList) {
            if (orderData.hasOwnProperty(key)) {
              commit('SET_' + key.toUpperCase(), orderData[key])
            }
          }
        })
      })
    }
  }
}

export default common
