// 导入http对象
import http from './http'

// 添加商品分类
export const addCategory = (data) => {
  return http.post('/cateadd', data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}

// 获取菜单数据
export const getCategoryList = (istree = true) => {
  // istree是否需要返回树形结构, 是-true, 否-不传
  let params = {}
  if (istree) {
    params = {
      istree: 1
    }
  }
  return http.get('/catelist', {
    params
  })
}

// 修改分类
export const updateCategory = (data) => {
  // 判断data中否包含id属性且大于0
  if (!data.get('id')) {
    return Promise.reject(new Error('缺少ID参数或ID参数错误'))
  }
  return http.post('/cateedit', data)
}
// 删除分类
export const deleteCategory = (id) => {
  return http.post('/catedelete', { id })
}
