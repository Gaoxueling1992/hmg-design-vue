import { createStore } from 'vuex'
import actions from './actions'
import state from './state'
import mutations from './mutations'

const store = createStore({
  state,
  mutations,
  actions,
  modules: {

  }
})

export default store