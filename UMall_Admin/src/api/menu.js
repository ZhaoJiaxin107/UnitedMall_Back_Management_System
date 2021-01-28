// 导入封装好的axios对象
import http from './http'

// 添加菜单
export const addMenu = (data) => {
  return http.post('/menuadd', data)
}

// 获取菜单数据
export const getMenuList = (istree = true) => {
  // istree是否需要返回树形结构, 是-true, 否-不传
  let params = {}
  if (istree) {
    params = {
      istree: 1
    }
  }
  return http.get('/menulist', {
    params
  })
}
