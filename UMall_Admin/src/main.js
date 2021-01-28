import Vue from 'vue'
// 引入Element UI组件
import ElementUI from 'element-ui'
// 引入Element UI样式文件
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
// 引入reset.css
import './assets/css/reset.css'

// 使用Element UI(注册组件)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
