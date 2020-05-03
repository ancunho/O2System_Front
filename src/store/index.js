import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import common from './modules/common'
import user from './modules/user'
import i18n from './modules/i18n'

// default router permission control
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    common,
    user,
    permission,
    i18n
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
