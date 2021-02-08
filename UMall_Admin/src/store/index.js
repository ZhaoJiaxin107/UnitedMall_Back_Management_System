import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 导入模块
import menu from './modules/menu'
import role from './modules/role'
import admin from './modules/admin'
import category from './modules/category'
import specs from './modules/specs'
import goods from './modules/goods'
import banner from './modules/banner'
import seckill from './modules/seckill'
// 使用vuex插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 使用模块
  modules: {
    menu,
    role,
    admin,
    category,
    specs,
    goods,
    banner,
    seckill
  }
})

export default store
