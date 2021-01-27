const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/statistics',
    name: 'Index',
    component: () => import('@/pages/main/Index'),
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/pages/statistics/Index'),
        meta: {
          title: '图表统计'
        }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/pages/menu/Index'),
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/pages/role/Index'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/pages/admin/Index'),
        meta: {
          title: '管理员管理'
        }
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/pages/category/Index'),
        meta: {
          title: '商品分类'
        }
      },
      {
        path: 'specs',
        name: 'specs',
        component: () => import('@/pages/specs/Index'),
        meta: {
          title: '商品规格'
        }
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/pages/goods/Index'),
        meta: {
          title: '商品管理'
        }
      },
      {
        path: 'seckill',
        name: 'seckill',
        component: () => import('@/pages/seckill/Index'),
        meta: {
          title: '秒杀活动'
        }
      },
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@/pages/banner/Index'),
        meta: {
          title: '轮播图'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Index'),
    meta: {
      title: '登录'
    }
  }
]

export default routes
