<template>
  <!-- el-dialog: 弹出对话框组件
       title: 对话框标题
       visible: 是否显示
   -->
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    @close="clearForm"
    width="80%"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-suffix="："
      label-width="120px"
    >
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-form-item label="一级分类">
          <el-select v-model = "form.first_cateid" placeholder="请选择一级分类"
          @change="onChangeCategory">
            <el-option label="请选择一级分类" :value="0"></el-option>
              <!-- 循环一级分类 -->
            <el-option
            v-for="item of firstCategoryList"
            :key = "item.id"
            :label ="' |- ' + item.catename"
            :value = "item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model = "form.second_cateid" placeholder="请选择二级分类">
            <el-option label="请选择二级分类" :value="0"></el-option>
              <!-- 循环一级分类 -->
            <el-option
            v-for="item of secondCategoryList"
            :key = "item.id"
            :label ="' |- ' + item.catename"
            :value = "item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="图片信息" name="imageInfo">imageInfo</el-tab-pane>
      <el-tab-pane label="促销信息" name="promoteInfo">promoteInfo</el-tab-pane>
      <el-tab-pane label="详细信息" name="detailInfo">detailInfo</el-tab-pane>
    </el-tabs>
    </el-form>
  </el-dialog>
</template>

<script>
// 引入接口方法
import { mapGetters, mapState } from 'vuex'
// 导出所有的非default内容
import * as model from '@/api/specs'
const defaultForm = {
  first_cateid: 0, // 一级分类ID(required)
  second_cateid: 0, // 二级分类ID(required)
  goodsname: '', // 商品名称(required)
  price: '', // 商品价格(required)
  market_price: '', // 市场价格(required)
  img: '', // 商品图片(required)
  description: '', // 商品详情(required)
  specsid: 0, // 规格ID(required)
  specsattr: '', // 规格属性(required)
  isnew: 1, // 是否新品 1是 2不是
  ishot: 1, // 是否热卖推荐 1是 2不是
  status: 1 // 状态 1启用 2禁用
}
export default {
  data () {
    return {
      dialogFormVisible: true,
      title: '', // 对话框的标题
      activeName: 'baseInfo', // 点击的tab选项卡
      form: { ...defaultForm },
      rules: {
        specsname: [
          { required: true, message: '请输入规格名称', trigger: 'blur' }
        ]
      },
      secondCategoryList: [] // 二级分类数据
    }
  },
  computed: {
    ...mapState({
      // 获取分类列表
      categoryList: state => state.category.list
    }),
    ...mapGetters({
      // 获取一级分类
      firstCategoryList: 'category/firstCategoryList'
    })
  },
  mounted () {
    // 如果没有一级分类信息, 则重新获取信息
    if (this.categoryList.length === 0) {
      this.$store.dispatch('category/getCategoryList')
    }
  },
  methods: {
    // 切换一级分类时触发
    onChangeCategory (id) {
      // console.log(id, this.categoryList)
      // 如果id为0则清空二级分类
      // 如果id>0则获取当前分类的二级分类
      if (id > 0) {
        const category = this.categoryList.find(item => item.id === id)
        this.secondCategoryList = category.children || []
      } else {
        this.secondCategoryList = []
      }
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
