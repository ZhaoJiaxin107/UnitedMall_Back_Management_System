<template>
  <!-- el-dialog: 弹出对话框组件
       title: 对话框标题
       visible: 是否显示
   -->
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    @close="clearForm"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-suffix="："
      label-width="120px"
    >
      <el-form-item label="所属角色">
        <el-select v-model="form.roleid" placeholder="请选择">
          <!-- 当value与v-model的值相等的时候就选中 -->
          <!-- value与v-model是全等比较 -->
          <el-option label = "请选择角色" :value="0"></el-option>
          <!-- 循环一级菜单 -->
          <el-option
            v-for="item of roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名称">
        <el-input
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入用户名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model.trim="form.password"
          autocomplete="off"
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="状态">
        <!-- 开关组件
            active-value: Boolean | string | number 选中时的值
            inactive-value: Boolean | string | number 未选中时的值
        -->
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
// 引入接口方法
// 导出所有的非default内容
// import { addMenu, updateMenu } from '@/api/menu'
import * as model from '@/api/role'
const defaultForm = {
  roleid: 0, // 角色id
  username: '', // 管理员账号(必填)
  password: '', // 管理员的密码(添加时必填, 修改时可以不填)
  status: 1 // 状态 1启用 2禁用
}
export default {
  data () {
    return {
      dialogFormVisible: true,
      title: '', // 对话框的标题
      form: { ...defaultForm },
      rules: {
      }
    }
  },
  computed: {
    ...mapState({
      // 获取角色信息
      roleList: state => state.role.list
    })
  },
  mounted () {
    // 如果没有角色信息, 就重新获取角色信息
    if (this.roleList.length === 0) {
      this.$store.dispatch('role/getRoleList')
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 根据form数据中是否有id属性来判断当前是修改菜单还是添加菜单
          if (this.form.id && this.form.id > 0) {
            // 修改
            this.editMenu('updateMenu')
          } else {
            // 添加
            this.editMenu()
          }
        }
      })
    },
    editMenu (method = 'addMenu') {
      // 处理菜单的添加,把表单的数据提交给接口
      model[method](this.form)
        .then(() => {
          // 添加成功
          // 显示添加成功的信息
          this.$message.success({
            message: method === 'addMenu' ? '添加成功' : '修改成功',
            // 关闭对话框
            onClose: () => {
              this.dialogFormVisible = false
            }
          })
          // 刷新列表数据
          this.$store.dispatch('menu/getMenuList')
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    clearForm () {
      // 把表单数据还原到初始值
      this.form = { ...defaultForm }
      // 清空所有的表单验证
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style>
</style>
