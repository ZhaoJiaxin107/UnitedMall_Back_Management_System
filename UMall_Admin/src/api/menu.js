// 导入封装好的axios对象
import http from './http'

// 添加菜单
export const addMenu = (data) => {
  return http.post('/menuadd', data)
}
// 修改菜单
export const updateMenu = (data) => {
  // 判断data中否包含id属性且大于0
  if (!Reflect.has(data, 'id') || data.id <= 0) {
    return Promise.reject(new Error('缺少ID参数或ID参数错误'))
  }
  return http.post('/menuedit', data)
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
