import Vue from 'vue'

Vue.mixin({
  methods: {
    recombinationImg (imgSrc) {
      // 如果imgSrc已经是远程路径就不处理  http:// https://
      if (!/^(https?:\/\/).*/.test(imgSrc)) {
        // imgSrc不是http://或者https://开头
        return 'http://localhost:3000' + imgSrc
      }
      return imgSrc
    }
  }
})
