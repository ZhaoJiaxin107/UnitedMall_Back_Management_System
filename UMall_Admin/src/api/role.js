import http from './http'

// 添加角色
export const addRole = (data) => {
  return http.post('/roleadd', data)
}

// 获取角色列表
export const getRoleList = () => {
  return http.get('/rolelist')
}

// 修改菜单
export const updateRole = (data) => {
  // 判断data中否包含id属性且大于0
  if (!Reflect.has(data, 'id') || data.id <= 0) {
    return Promise.reject(new Error('缺少ID参数或ID参数错误'))
  }
  return http.post('/roleedit', data)
}
// 删除菜单
export const deleteRole = (id) => {
  return http.post('/roledelete', { id })
}
