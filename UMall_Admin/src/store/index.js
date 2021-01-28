import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 导入模块
import menu from './modules/menu'
// 使用vuex插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 使用模块
  modules: {
    menu
  }
})

export default store
