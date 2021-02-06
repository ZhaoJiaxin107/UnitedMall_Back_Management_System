import http from './http'

// 添加商品
export const addGoods = (data) => {
  // 有数据上传, 需要设置headers
  return http.post('/goodsadd', data, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

// 修改规格
export const updateGoods = (data) => {
// 判断data中是否包含id属性且大于0
  if (!Reflect.has(data, 'id') || data.id <= 0) {
    return Promise.reject(new Error('缺少ID参数或id参数错误'))
  }
  // 有数据上传, 需要设置headers
  return http.post('/goodsedit', data, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

// 分页获取商品数据
export const getPageSpecs = (page = 1, size = 1) => {
  return http.get('/specslist', {
    params: {
      page,
      size
    }
  })
}

// 获取规格总数量
export const getGoodsTotal = () => {
  return http.get('/goodscount')
}

// 删除规格属性
export const deleteGoods = (id) => {
  return http.post('/goodsdelete', { id })
}
