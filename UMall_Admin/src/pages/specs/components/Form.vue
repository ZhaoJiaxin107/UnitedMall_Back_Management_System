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
      <el-form-item label="规格名称" prop="specsname">
        <el-input
          v-model="form.specsname"
          autocomplete="off"
          placeholder="请输入规格名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item
      label="规格属性"
      v-for="(item, index) of attrList"
      :key="index"
      label-width="120px"
      >
      <div class="item-container">
        <el-input v-model.trim="item.value" placeholder="请输入规格属性"></el-input>
        <el-button type="primary" v-if="index === 0" @click="addAttr">新增规格属性</el-button>
        <el-button type="danger" v-else @click="removeAttr(index)">删除</el-button>
      </div>
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
// 引入接口方法
// 导出所有的非default内容
import * as model from '@/api/specs'
const defaultForm = {
  specsname: '', // 规格名称
  attrs: '', // 规格属性
  status: 1 // 状态 1启用 2禁用
}
export default {
  data () {
    return {
      dialogFormVisible: false,
      title: '', // 对话框的标题
      form: { ...defaultForm },
      rules: {
        specsname: [
          { required: true, message: '请输入规格名称', trigger: 'blur' }
        ]
      },
      attrList: [{ value: '' }] // 属性数组
    }
  },
  methods: {
    addAttr () {
      this.attrList.push({ value: '' })
    },
    removeAttr (index) {
      this.attrList.splice(index, 1)
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 根据form数据中是否有id属性来判断当前是修改菜单还是添加菜单
          if (this.form.id && this.form.id > 0) {
            // 修改
            this.editSpecs('updateSpecs')
          } else {
            // 添加
            this.editSpecs()
          }
        }
      })
    },
    editSpecs (method = 'addSpecs') {
      // 从规格数属性中过滤出不为空的数据, 然后要转换为字符串
      this.form.attrs = this.attrList.filter(item => item.value !== '').map(item => item.value).join(',')
      if (this.form.attrs === '') {
        this.$message.error('请输入规格属性')
        return
      }
      // 处理菜单的添加,把表单的数据提交给接口
      model[method](this.form)
        .then(() => {
          // 添加成功
          // 显示添加成功的信息
          this.$message.success({
            message: method === 'addSpecs' ? '添加成功' : '修改成功',
            // 关闭对话框
            onClose: () => {
              this.dialogFormVisible = false
            }
          })
          // 添加时重新获取总数量
          if (method === 'addSpecs') {
            this.$store.dispatch('specs/getSpecsTotal')
          }
          // 刷新列表数据
          this.$store.dispatch('specs/getSpecsList')
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    clearForm () {
      // 把表单数据还原到初始值
      this.form = { ...defaultForm }
      // 清空所有的表单验证
      this.attrList = [{ value: '' }]
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 修改时设置表单数据
    setFormData (data) {
      // 处理规格属性
      if (data.attrs !== '') {
        this.attrList = data.attrs.map(item => ({ value: item }))
      }
      this.form = {...data} // 复制一份数据
    }
  }
}
</script>

<style scoped>
.item-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}
.el-button {
  margin-left: 5px;
}

</style>
