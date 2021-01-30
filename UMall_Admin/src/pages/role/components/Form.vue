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
         -->
        <el-tree
         :data = "menuList"
         node-key="id"
         show-checkbox
         default-expand-all
         ref="tree"
         :props="{children:'children',label:'title'}"
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
const defaultForm = {
  rolename: '', // 角色名称
  menus: '', // 角色选择的菜单
  status: 1 // 状态 1正常 2禁用
}
export default {
  data () {
    const checkMeuns = (rule, value, callback) => {
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
      dialogFormVisible: true, // 是否显示对话框
      form: {...defaultForm}, // 复制一份默认数据
      rules: {
        rolename: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        menus: [
          { validator: checkMeuns, trigger: 'change' }
        ]
      }
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
    // 清除表单验证
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          // 获取树形控件的数据
          // 获取选中的节点的key: this.$refs.tree.getCheckedKeys()
          // 获取班选中的节点key: this.$refs.tree.getHalfCheckedKeys()
          console.log(this.$refs.tree.getCheckedKeys(), this.$refs.tree.getHalfCheckedKeys())
          // 处理数据
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
