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
      <el-form-item label="所属角色" prop = "roleid">
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

      <el-form-item label="用户名称" prop = "username">
        <el-input
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入用户名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop = "password">
        <el-input
          show-password
          v-model.trim="form.password"
          autocomplete="off"
          :placeholder="form.id > 0 ? '不填代表不修改密码' : '请输入密码'"
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
import * as model from '@/api/admin'
const defaultForm = {
  roleid: 0, // 角色id
  username: '', // 管理员账号(必填)
  password: '', // 管理员的密码(添加时必填, 修改时可以不填)
  status: 1 // 状态 1启用 2禁用
}
export default {
  data () {
    const checkRole = (rule, value, callback) => {
      // 如果值不为0就代表通过
      if (value === 0) {
        callback(new Error('请选择角色'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      // 添加时必填，修改时可以不填
      if (this.form.id > 0) {
        callback()
      } else {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
    }
    return {
      dialogFormVisible: false,
      title: '', // 对话框的标题
      form: { ...defaultForm },
      rules: {
        // 如果没有使用自定义验证, 那么规划的属性就必须在表单的数据中存在
        roleid: [
          { validator: checkRole, trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
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
            this.editAdmin('updateAdmin')
          } else {
            // 添加
            this.editAdmin()
          }
        }
      })
    },
    editAdmin (method = 'addAdmin') {
      // 处理菜单的添加,把表单的数据提交给接口
      model[method](this.form)
        .then(() => {
          // 添加成功
          // 显示添加成功的信息
          this.$message.success({
            message: method === 'addAdmin' ? '添加成功' : '修改成功',
            // 关闭对话框
            onClose: () => {
              this.dialogFormVisible = false
            }
          })
          // 添加时重新获取总数量
          if (method === 'addAdmin') {
            this.$store.dispatch('admin/getAdminTotal')
          }
          // 刷新列表数据
          this.$store.dispatch('admin/getAdminList')
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    clearForm () {
      // 把表单数据还原到初始值
      this.form = { ...defaultForm }
      // 清空所有的表单验证
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 修改时设置表单数据
    setFormData (data) {
      // 修改时把密码清空
      const editData = {...data} // 复制一份传入的管理员数据
      editData.password = ''
      this.form = editData
    }
  }
}
</script>

<style>
</style>
