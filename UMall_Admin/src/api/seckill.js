import http from './http'

// 添加限时秒杀
export const addSeckill = (data) => {
  return http.post('/seckadd', data)
}

// 获取限时秒杀列表
export const getSeckillList = () => {
  return http.get('/secklist')
}

// 修改限时秒杀
export const updateSeckill = (data) => {
  // 判断data中否包含id属性且大于0
  if (!Reflect.has(data, 'id') || data.id <= 0) {
    return Promise.reject(new Error('缺少ID参数或ID参数错误'))
  }
  return http.post('/seckedit', data)
}
// 删除菜单
export const deleteSeckill = (id) => {
  return http.post('/seckdelete', { id })
}
