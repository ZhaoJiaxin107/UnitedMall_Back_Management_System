import http from './http'

// 登录
export const login = (username, password) => {
  if (!username || !password) {
    return Promise.reject(new Error('账号或密码为空'))
  }
  return http.post('/userlogin', {
    username,
    password
  })
}
