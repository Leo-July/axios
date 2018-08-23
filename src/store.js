import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    requestList: [],
    loading: false
  },
  mutations: {
    pushRequest(state, config) { // 添加到请求到队列
      state.requestList.push(config)
      console.log(state.requestList)
    },
    popRequest(state, config) { // 从请求队列中删除
      state.requestList.splice(state.requestList.indexOf(config), 1)
    },
    setLoading(state, statue) { // 设置loading状态
      state.loading = statue
    }
  },
  actions: {

  }
})