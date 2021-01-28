import { getMenuList } from '@/api/menu'
export default {
  // 启用命名空间(虚拟目录)
  namespaced: true,
  state: {
    list: [] // 菜单列表数据
  },
  mutations: {
    SET_LIST (state, list) {
      state.list = list
    }
  },
  actions: {
    // 通过接口获取数据
    getMenuList ({commit}) {
      getMenuList().then(res => {
        console.log(res)
        commit('SET_LIST', res)
      })
    }
  }
}
