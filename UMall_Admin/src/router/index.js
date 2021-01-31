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
  // console.log(to.meta)
  // 设置页面标题
  document.title = to.meta.title || 'United Mall后台管理系统'
  // 如果要跳转的页面不是登录页面，就必须要登录成功之后才能访问
  if (to.path === '/login') {
    // 跳转的就是登录页面，不做拦截
    next()
  } else {
    // 跳转的不是登录页面，需要登录以后才能够访问到
    let userInfo = sessionStorage.getItem('user')
    if (!userInfo) {
      // 没有登录，则跳转登录页面
      next('/login')
    } else {
      // 判断登录用户是否拥有对应的权限
      userInfo = JSON.parse(userInfo)
      // 首页是所有用户都能访问
      userInfo.menus_url.push('/', '/statistics')
      if (userInfo.menus_url.includes(to.path)) {
        // userInfo.menus_url就是当前登录用户能够访问的路由path
        next()
      } else {
        // 没有权限访问时自动跳转到首页
        next('/')
      }
    }
  }
})

export default router
