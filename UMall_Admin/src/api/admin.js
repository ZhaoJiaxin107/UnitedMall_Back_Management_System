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
