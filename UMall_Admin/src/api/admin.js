import http from './http'

// 添加管理员
export const addAdmin = (data) => {
  return http.post('/useradd', data)
}

/* @分页获取管理员数据
   @param page number 当前的页码
   @param size number 查询条数
   @return Promise
*/
export const getPageAdmin = (page = 1, size = 1) => {
  return http.get('/userlist', {
    params: {
      page,
      size
    }
  })
}

// 获取管理员总数量
export const getAdminTotal = () => {
  return http.get('/usercount')
}

// 修改管理员
export const updateAdmin = (data) => {
  // 判断data中否包含id属性且大于0
  if (!Reflect.has(data, 'id') || data.id <= 0) {
    return Promise.reject(new Error('缺少ID参数或ID参数错误'))
  }
  return http.post('/useredit', data)
}

// 删除管理员
// 删除菜单
export const deleteAdmin = (uid) => {
  return http.post('/userdelete', { uid })
}
