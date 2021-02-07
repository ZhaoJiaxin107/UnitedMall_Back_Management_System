import http from './http'

// 添加轮播图
export const addBanner = (data) => {
  return http.post('/banneradd', data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}

// 获取轮播图列表
export const getBannerList = () => {
  return http.get('/bannerlist')
}

// 修改轮播图
export const updateBanner = (data) => {
  // 判断data中否包含id属性且大于0
  if (!data.get('id')) {
    return Promise.reject(new Error('缺少ID参数或ID参数错误'))
  }
  return http.post('/banneredit', data)
}

// 删除轮播图
export const deleteBanner = (id) => {
  return http.post('/bannerdelete', { id })
}
