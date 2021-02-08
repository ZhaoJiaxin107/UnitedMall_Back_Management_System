<template>
    <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-suffix="："
      label-width="120px"
    >
      <el-form-item label="活动名称" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动期限">
         <el-date-picker
            v-model="createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00','23:59:59']"
            @change = "timeRange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类" prop="first_cateid">
          <el-select v-model = "form.first_cateid" placeholder="请选择一级分类"
          @change="onChangeFirstCategory">
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
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select v-model = "form.second_cateid" placeholder="请选择二级分类"
          @change="onChangeSecondCategory">
            <el-option label="请选择二级分类" :value="0"></el-option>
              <!-- 循环一级分类 -->
            <el-option
            v-for="item of secondCategoryList"
            :key = "item.id"
            :label ="item.catename"
            :value = "item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model = "form.goodsid" placeholder="请选择商品">
            <el-option label="请选择商品" :value="0"></el-option>
              <!-- 循环一级分类 -->
            <el-option
            v-for="item of goodsList"
            :key = "item.id"
            :label ="item.goodsname"
            :value = "item.id"
            >
            </el-option>
          </el-select>
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
        <el-button type="primary">确 定</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
const defaultForm = {
  title: '', // 限时秒杀名称
  begintime: '', // 开始时间
  endtime: '', // 结束时间
  first_cateid: 0, // 一级分类id
  second_cateid: 0, // 二级分类id
  goodsid: 0, // 商品编号
  status: 1 // 状态 1禁用 2启用
}
export default {
  data () {
    const checkFirstCate = (rule, value, callback) => {
      // 如果值不为0就代表通过
      if (value === 0) {
        callback(new Error('请选择一级分类'))
      } else {
        callback()
      }
    }
    const checkSecondCate = (rule, value, callback) => {
      // 如果值不为0就代表通过
      if (value === 0) {
        callback(new Error('请选择二级分类'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: true,
      title: '', // 对话框的标题
      createTime: [], // 开始时间 结束时间
      form: {...defaultForm},
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        first_cateid: [
          { validator: checkFirstCate, trigger: 'change' }
        ],
        second_cateid: [
          { validator: checkSecondCate, trigger: 'change' }
        ]
      },
      secondCategoryList: [] // 二级分类数据
    }
  },
  computed: {
    ...mapState({
      // 获取分类列表
      categoryList: state => state.category.list,
      // 获取商品列表
      goodsList: state => state.goods.allList
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
    if (this.goodsList.length === 0) {
      this.$store.dispatch('goods/getAllGoods')
    }
  },
  methods: {
    timeRange () {
    // console.log(this.createTime)
    // 将时间对象转化为时间戳
      this.form.begintime = this.createTime[0].getTime()
      this.form.endtime = this.createTime[1].getTime()
      let curTime = new Date().getTime()
      // 如果结束时间还未到当前时间，则启用
      if (this.form.endtime > curTime) {
        this.form.status = 1
      } else {
        this.form.status = 0
      }
    },
    onChangeFirstCategory (id) {
      // 清空表单的二级分类id
      this.form.second_cateid = 0
      // 如果id为0则清空二级分类
      // 如果id>0则获取当前的二级分类
      if (id > 0) {
        const category = this.categoryList.find(item => item.id === id)
        this.secondCategoryList = category.children || []
      } else {
        this.secondCategoryList = []
      }
    },
    onChangeSecondCategory (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>
