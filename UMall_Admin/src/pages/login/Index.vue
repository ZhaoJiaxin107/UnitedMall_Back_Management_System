<template>
  <div class = "main">
    <div class="loginform">
        <h3 class="title">管理员登录</h3>
        <el-form ref="form" :model="loginInfo" :rules = "rules">
          <el-form-item label="" prop = "username">
            <el-input v-model="loginInfo.username" placeholder="请输入账号" clearable>
                <template slot="prepend">
                  <i class="el-icon-s-custom"></i>
                </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop = "password">
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
// 从user中导出登录方法
import { login } from '@/api/user'

export default {
  data () {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      rules: {
        // 规则的编写
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
    //   console.log('on submit')
      // 触发表单验证 调用Form组件的validate回调方法
      this.$refs.form.validate(valid => {
        // validate表示验证是否全部通过
        // console.log('valid', valid)
        if (valid) {
        // 全部通过
          this.login()
        }
      })
    },
    login () {
      // 登录处理
      login(this.loginInfo.username, this.loginInfo.password).then(res => {
        // console.log(res)
        // 登录成功, 把返回的信息保存到sessionStorage中
        sessionStorage.setItem('user', JSON.stringify(res))
        // 跳转到后台首页
        this.$router.replace('/')
      }).catch(err => {
        // console.error(err.message)
        // 登录失败，显示错误信息
        this.$message.error(err.message)
      })
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
