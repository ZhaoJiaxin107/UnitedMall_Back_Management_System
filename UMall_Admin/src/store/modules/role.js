import { getRoleList } from '@/api/role'
export default {
  namespaced: true,
  state: {
    list: [] // 角色列表数据
  },
  mutations: {
    SET_LIST (state, list) {
      state.list = list
    }
  },
  actions: {
    getRoleList ({ commit }) {
      // 通过接口获取数据
      getRoleList().then(res => {
        console.log(res)
        commit('SET_LIST', res)
      })
    }
  }
}
