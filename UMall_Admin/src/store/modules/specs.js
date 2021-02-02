// 导入接口文件
import { getPageSpecs, getSpecsTotal } from '@/api/specs'

export default {
  namespaced: true,
  state: {
    list: [],
    page: 1, // 当前的页码
    size: 1, // 每页显示的条数
    total: 0 // 管理员用户总数
  },
  mutations: {
    SET_LIST (state, list) {
      state.list = list
    },
    SET_TOTAL (state, total) {
      state.total = total
    },
    SET_PAGE (state, page) {
      state.page = page
    }
  },
  actions: {
    getSpecsList ({commit, state}) {
      getPageSpecs(state.page, state.size).then(res => {
        // console.log(res)
        commit('SET_LIST', res)
      })
    },
    getSpecsTotal ({commit}) {
      getSpecsTotal().then(res => {
        // console.log(res)
        commit('SET_TOTAL', res[0].total || 0)
      })
    }
  }
}
