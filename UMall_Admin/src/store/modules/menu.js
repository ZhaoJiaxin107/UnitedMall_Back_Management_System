import { getMenuList } from '@/api/menu'
export default {
  // 启用命名空间(虚拟目录)
  namespaced: true,
  state: {
    list: [] // 菜单列表数据
  },
  getters: {
    firstMenuList (state) {
      // 从list中筛选出一级菜单
      return state.list.filter(item => item.type === 1 && item.pid === 0).map(item => (
        {
          id: item.id,
          title: item.title
        }))
    }
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
