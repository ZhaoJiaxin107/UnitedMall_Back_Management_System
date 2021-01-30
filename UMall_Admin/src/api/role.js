import http from './http'

// 添加角色
export const addRole = (data) => {
  return http.post('/roleadd', data)
}

// 获取角色列表
export const getRoleList = () => {
  return http.get('/rolelist')
}
