<template>
  <!-- el-dialog: 弹出对话框组件
       title: 对话框标题
       visible: 是否显示
   -->
  <el-dialog title="添加菜单" :visible.sync="dialogFormVisible" @close = "clearForm">
  <el-form :model="form" ref="form" :rules = "rules" label-suffix="：" label-width="120px">
    <el-form-item :label="form.type === 1 ? '目录名称': '菜单名称'" prop = "title">
      <el-input v-model.trim="form.title" autocomplete="off" placeholder="请输入名称">
      </el-input>
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-select v-model="form.pid" placeholder="请选择上级菜单">
        <!-- 当value与v-model的值相等的时候就选中 -->
        <!-- value与v-model是全等比较 -->
        <el-option label="顶级菜单" :value="0"></el-option>
        <!-- 循环一级菜单 -->
        <el-option v-for = "item of firstMenuList" :key="item.id" :label="' |- '+item.title"
        :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label = "菜单类型">
        <!-- 单选框组 -->
        <el-radio-group v-model="form.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item v-show = "form.type === 1" label="目录图标" prop="icon">
      <el-input v-model="form.icon" autocomplete="off" placeholder="请输入目录图标">
      </el-input>
    </el-form-item>
    <el-form-item v-show = "form.type === 2" label="菜单地址" prop = "url">
      <el-input v-model.trim="form.url" autocomplete="off" placeholder="请输入菜单地址">
      </el-input>
    </el-form-item>
    <el-form-item label="状态">
       <!-- 开关组件
            active-value: Boolean | string | number 选中时的值
            inactive-value: Boolean | string | number 未选中时的值
        -->
       <el-switch
       v-model="form.status"
       :active-value="1"
       :inactive-color="2">
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
import { mapGetters } from 'vuex'
// 引入接口方法
import { addMenu } from '@/api/menu'
const defaultForm = {
  pid: 0, // 上级分类编号, 顶级菜单为0
  title: '', // 菜单名称(必填)
  icon: '', // 菜单图标
  type: 1, // 类型 1目录 2菜单
  url: '', // 菜单地址(如果是菜单才必填)
  status: 1 // 状态 1正常 2禁用
}
export default {
  data () {
    // 自定义验证规则
    // value就是要验证的表单的项
    // callback function 输出验证信息
    // 验证通过调用callback()
    // 验证没有通过调用callback(Error对象)
    const checkIcon = (rule, value, callback) => {
      // 如果是菜单的时候链接必填
      if (this.form.type === 2) {
        callback() // 验证通过
      } else {
        // 是菜单的时候验证必填
        if (value === '') {
          callback(new Error('请输入目录图标'))
        } else {
          callback()
        }
      }
    }
    const checkUrl = (rule, value, callback) => {
      // 如果是菜单的时候链接必填
      if (this.form.type === 1) {
        callback() // 验证通过
      } else {
        // 是菜单的时候验证必填
        if (value === '') {
          callback(new Error('请输入菜单地址'))
        } else {
          callback()
        }
      }
    }
    return {
      dialogFormVisible: false,
      form: {...defaultForm},
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        icon: [
          { validator: checkIcon, trigger: 'blur' }
        ],
        url: [
          { validator: checkUrl, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      firstMenuList: 'menu/firstMenuList'
    })
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 处理菜单的添加,把表单的数据提交给接口
          addMenu(this.form).then(() => {
            // 添加成功
            // 显示添加成功的信息
            this.$message.success({
              message: '添加成功',
              // 关闭对话框
              onClose: () => {
                this.dialogFormVisible = false
              }
            })
            // 刷新列表数据
            this.$store.dispatch('menu/getMenuList')
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      })
    },
    clearForm () {
      // 把表单数据还原到初始值
      this.form = {...defaultForm}
      // 清空所有的表单验证
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style>

</style>
