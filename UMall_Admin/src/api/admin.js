import http from './http'

// 添加管理员
export const addAdmin = (data) => {
  return http.post('/useradd', data)
}
