<template>
  <div class = "main">
    <div class="loginform">
        <h3 class="title">管理员登录</h3>
        <el-form ref="form" :model="loginInfo">
          <el-form-item label="">
            <el-input v-model="loginInfo.username" placeholder="请输入账号" clearable>
                <template slot="prepend">
                  <i class="el-icon-s-custom"></i>
                </template>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="loginInfo.password" placeholder="请输入密码" show-password clearable>
                <template slot="prepend">
                  <i class="el-icon-lock"></i>
                </template>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="onSubmit" class="loginbtn">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('on submit')
    }
  }
}
</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/loginbg.jpg') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loginform {
    background: #ffffff;
    padding:18px 28px;
    border-radius: 10px;
}
.loginform .title {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
}
.loginform .loginbtn {
    width:100%
}
</style>
