<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    @close="clearForm">
    <el-form
    :model="form"
     :rules="rules"
     ref="form"
     label-suffix="："
     label-width="120px"
     >
        <el-form-item label="角色名称" prop="rolename">
            <el-input v-model.trim="form.rolename" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="menus">
        <!--
        树形控件
        data 要显示的数据
        show-checkbox 是否显示checkbox数据
        node-key: node的key 对应的菜单数据的编号
        props 节点配置 [children(下级)：菜单数据中对应的下级名称, label:菜单数据中的标题]
        default-expand-all 是否展开所有节点
        check-strictly 是否联动选择(选择父节点的时候是否选中所有的子节点)
         -->
        <el-tree
         :data = "menuList"
         node-key="id"
         show-checkbox
         default-expand-all
         ref="tree"
         :props="{children:'children',label:'title'}"
         :check-strictly="checkStrictly"
        >
        </el-tree>
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
// 导出角色管理的接口文件
import * as model from '@/api/role'
const defaultForm = {
  rolename: '', // 角色名称
  menus: '', // 角色选择的菜单
  status: 1 // 状态 1正常 2禁用
}
export default {
  data () {
    const checkMeuns = (rule, value, callback) => {
      // 获取树形控件的数据
      // 获取选中的节点的key: this.$refs.tree.getCheckedKeys()
      // 获取班选中的节点key: this.$refs.tree.getHalfCheckedKeys()
      const selectMenus = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      if (selectMenus.length === 0) {
        // 还原表单数据中的菜单
        this.form.menus = ''
        //  没有选择任何菜单
        callback(new Error('请选择角色权限'))
      } else {
        // 把选择的权限复制给表单数据
        this.form.menus = selectMenus
        callback()
      }
    }
    return {
      title: '', // 对话框的标题
      dialogFormVisible: false, // 是否显示对话框
      form: {...defaultForm}, // 复制一份默认数据
      rules: {
        rolename: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        menus: [
          { validator: checkMeuns, trigger: 'change' }
        ]
      },
      // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
      checkStrictly: false
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.menu.list
    })
  },
  mounted () {
    // console.log(this.menuList)
    // 判断是否获取过菜单数据, 如果没有则重新获取
    if (this.menuList.length === 0) {
      this.$store.dispatch('menu/getMenuList')
    }
  },
  methods: {
    clearForm () {
      // 关闭对话框
      // 还原表单数据
      this.form = {...defaultForm}
      // 清空树形数据
      this.$refs.tree.setCheckedKeys([])
      // 清除表单验证
      this.$refs.form.clearValidate()
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          // console.log(this.form)
          // 处理数据
          // 根据form数据中是否有id属性来判断当前是修改菜单还是添加菜单
          if (this.form.id && this.form.id > 0) {
            // 修改
            this.editRole('updateRole')
          } else {
            // 添加
            this.editRole()
          }
        }
      })
    },
    editRole (method = 'addRole') {
      // 处理菜单的添加,把表单的数据提交给接口
      model[method](this.form)
        .then(() => {
          // 添加成功
          // 显示添加成功的信息
          this.$message.success({
            message: method === 'addRole' ? '添加成功' : '修改成功',
            // 关闭对话框
            onClose: () => {
              this.dialogFormVisible = false
            }
          })
          // 刷新列表数据
          this.$store.dispatch('role/getRoleList')
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    // 修改的时候设置表单数据
    setFormData (data) {
      this.form = {...data}
      // 给树形控件赋值
      const keys = data.menus.split(',')
      // 在渲染树形组件之前关闭父子节点的联动选择
      this.checkStrictly = true
      this.$nextTick(() => {
        // 在本次dom完成渲染之后触发
        this.$refs.tree.setCheckedKeys(keys) // 参数必须是数组
        this.checkStrictly = false // 在赋值之后开启父子节点的联动选择
      })
    }
  }
}
</script>

<style scoped>

</style>
