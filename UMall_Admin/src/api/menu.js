// 导入封装好的axios对象
import http from './http'

// 添加菜单
export const addMenu = (data) => {
  return http.post('/menuadd', data)
}
