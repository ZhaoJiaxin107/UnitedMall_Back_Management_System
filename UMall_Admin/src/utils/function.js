// 公共函数库
export const validate = (data, rules) => {
  // 要验证的this.form
  for (const k in data) {
    if (Reflect.has(rules, k)) {
      // 说明当前的this.form的属性在验证规则中存在
      // 也就是需要验证
      const v = rules[k](data[k])
      if (v !== true) {
        return v
      }
    }
  }
  return true
}
