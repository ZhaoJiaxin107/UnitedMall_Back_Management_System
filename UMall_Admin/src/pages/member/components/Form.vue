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
      <el-form-item label="手机号" prop = "phone">
        <el-input
          v-model="form.phone"
          autocomplete="off"
          placeholder="请输入手机号"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="昵称" prop = "nickname">
        <el-input
          v-model="form.nickname"
          autocomplete="off"
          placeholder="请输入昵称"
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
import * as model from '@/api/member'
const defaultForm = {
  phone: '', // 会员账号(必填)
  nickname: '', // 会员昵称(必填)
  password: '', // 会员密码(添加时必填, 修改时可以不填)
  status: 1 // 状态 1启用 2禁用
}
export default {
  data () {
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
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请填写正确的手机号' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 根据form数据中是否有id属性来判断当前是修改菜单还是添加菜单
          if (this.form.id && this.form.id > 0) {
            // 修改
            this.editMember('updateMember')
          } else {
            // 添加
            this.editMember()
          }
        }
      })
    },
    editMember (method = 'addMember') {
      // 处理菜单的添加,把表单的数据提交给接口
      model[method](this.form)
        .then(() => {
          // 添加成功
          // 显示添加成功的信息
          this.$message.success({
            message: method === 'addMember' ? '添加成功' : '修改成功',
            // 关闭对话框
            onClose: () => {
              this.dialogFormVisible = false
            }
          })
          // 刷新列表数据
          this.$store.dispatch('member/getMemberList')
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
      const editData = {...data} // 复制一份传入的会员数据
      editData.password = ''
      this.form = editData
    }
  }
}
</script>

<style>
</style>
