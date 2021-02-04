export default {
  first_cateid (value) {
    value = parseInt(value)
    if (value === 0) {
      return '请选择一级分类'
    }
    return true
  },
  second_cateid (value) {
    value = parseInt(value)
    if (value === 0) {
      return '请选择二级分类'
    }
    return true
  },
  goodsname (value) {
    return value === '' ? '请输入商品名称' : true
  },
  price (value) {
    if (!value) return '请输入价格'
    if (isNaN(value)) return '价格必须为数字'
    if (value < 0) return '价格必须为正数'
    return true
  },
  market_price (value) {
    if (!value) return '请输入市场价格'
    if (isNaN(value)) return '市场价格必须为数字'
    if (value < 0) return '市场价格必须为正数'
    return true
  }
}
