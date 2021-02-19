import http from './http'

// 添加会员
export const addMember = (data) => {
  return http.post('/register', data)
}

// 获取会员列表
export const getMemberList = () => {
  return http.get('/memberlist')
}

// 修改会员
export const updateMember = (data) => {
  // 判断data中否包含id属性且大于0
  if (!Reflect.has(data, 'id') || data.id <= 0) {
    return Promise.reject(new Error('缺少ID参数或ID参数错误'))
  }
  return http.post('/memberedit', data)
}

// 删除会员
export const deleteMember = (uid) => {
  return http.post('/memberdelete', { uid })
}
