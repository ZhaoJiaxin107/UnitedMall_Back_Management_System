const routes = [
    {
      path: '/',
      name: 'Index',
      component: () => import ('@/pages/main/Index')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import ('@/pages/login/Index')
    }
]

export default routes