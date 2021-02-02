import http from './http'

// 添加规格
export const addSpecs = (data) => {
  return http.post('/specsadd', data)
}

// 修改规格
export const updateSpecs = (data) => {
  // 判断data中是否包含id属性且大于0
  if (!Reflect.has(data, 'id') || data.id <= 0) {
    return Promise.reject(new Error('缺少ID参数或id参数错误'))
  }
  return http.post('/specsedit')
}
