import Vue from 'vue'
import Vuex from 'vuex'

import UserStore from './UserStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // then we reference it
    UserStore
  }
})

export default store
