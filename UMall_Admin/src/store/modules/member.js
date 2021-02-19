import { getMemberList } from '@/api/member'
export default {
  namespaced: true,
  state: {
    list: [] // 会员列表数据
  },
  mutations: {
    SET_LIST (state, list) {
      state.list = list
    }
  },
  actions: {
    getMemberList ({ commit }) {
      // 通过接口获取数据
      getMemberList().then(res => {
        console.log(res)
        commit('SET_LIST', res)
      })
    }
  }
}
