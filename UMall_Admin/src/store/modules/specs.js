// 导入接口文件
import { getPageSpecs, getSpecsTotal } from '@/api/specs'

export default {
  namespaced: true,
  state: {
    allList: [], // 所有的规格
    list: [],
    page: 1, // 当前的页码
    size: 2, // 每页显示的条数
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
    },
    SET_ALLLIST (state, list) {
      state.allList = list
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
    },
    // 获取所有规格
    async getAllSpecs ({commit}) {
      const total = await getSpecsTotal().then(res => res[0].total || 0)
      // console.log(total)
      if (total > 0) {
        const list = await getPageSpecs(1, total)
        // console.log(list)
        commit('SET_ALLLIST', list)
      }
    }
  }
}
