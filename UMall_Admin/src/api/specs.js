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
  return http.post('/specsedit', data)
}

// 分页获取规格数据
export const getPageSpecs = (page = 1, size = 1) => {
  return http.get('/specslist', {
    params: {
      page,
      size
    }
  })
}

// 获取规格总数量
export const getSpecsTotal = () => {
  return http.get('/specscount')
}

// 删除规格属性
export const deleteSpecs = (id) => {
  return http.post('/specsdelete', { id })
}
