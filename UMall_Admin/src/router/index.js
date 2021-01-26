import Vue from 'vue'
import Router from 'vue-router'
// 导入路由规则
import routes from './routes'


Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes
})

// 拦截
router.beforeEach((to, from, next) => {
  // 如果要跳转的页面不是登录页面，就必要登录成功之后才能访问
  if(to.path === '/login'){
    // 跳转的就是登录页面，不做拦截
    next()
  }else{
    // 跳转的不是登录页面，需要登录以后才能够访问到
    const userInfo = sessionStorage.getItem('user')
    if(!userInfo){
      // 没有登录，则跳转登录页面
      next('/login')
    }else{
      next()
    }
  }
  
})

export default router
