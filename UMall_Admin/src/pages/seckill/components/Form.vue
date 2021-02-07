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
    </el-form>
    </el-dialog>
</template>

<script>
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
    return {
      dialogFormVisible: false,
      title: '', // 对话框的标题
      createTime: [], // 开始时间 结束时间
      form: {...defaultForm},
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      secondCategoryList: [] // 二级分类数据
    }
  },
  mounted () {
  },
  methods: {
    timeRange () {
    // console.log(this.createTime)
    // 将时间对象转化为时间戳
      this.form.begintime = this.createTime[0].getTime()
      this.form.endtime = this.createTime[1].getTime()
    }
  }
}
</script>

<style scoped>

</style>
