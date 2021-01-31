import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 导入模块
import menu from './modules/menu'
import role from './modules/role'
import admin from './modules/admin'
// 使用vuex插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 使用模块
  modules: {
    menu,
    role,
    admin
  }
})

export default store
