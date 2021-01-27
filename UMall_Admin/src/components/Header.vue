<template>
  <div class="header">
    <div class="logo">United Mall后台管理系统</div>
    <!-- 下拉菜单选项
        divided 添加横线
        disabled 禁用 -->
    <el-dropdown  @command = "handleCommand">
      <span class="el-dropdown-link">
        欢迎！{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command = "personInfo">个人信息</el-dropdown-item>
        <el-dropdown-item command = "changePwd">修改密码</el-dropdown-item>
        <el-dropdown-item divided command = "logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    // 从本地存储中获取登录用户的信息
    const userInfo = JSON.parse(sessionStorage.getItem('user'))
    this.username = userInfo.username // 获取登录用户的账号
    // console.log(userInfo)
  },
  methods: {
    handleCommand (command) {
      // console.log('command', command)
      // 必须保证command和对应的方法名称相同
      this[command]()
    },
    personInfo () {
      console.log('personal info')
    },
    changePwd () {
      console.log('change password')
    },
    logout () {
      console.log('log out')
      // 退出系统
      // 清除本地存储中的登录用户信息
      sessionStorage.removeItem('user')
      // 跳转登录页面
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 100%;
  background: #518ecb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}
.logo {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}
.el-dropdown-link {
 color: #ffffff;
}
</style>
