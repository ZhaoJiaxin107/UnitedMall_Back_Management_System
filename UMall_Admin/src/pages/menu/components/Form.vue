<template>
  <!-- el-dialog: 弹出对话框组件
       title: 对话框标题
       visible: 是否显示
   -->
  <el-dialog title="添加菜单" :visible.sync="dialogFormVisible">
  <el-form :model="form" label-suffix="：" label-width="120px">
    <el-form-item :label="form.type === 1 ? '* 目录名称': '* 菜单名称'">
      <el-input v-model="form.title" autocomplete="off" placeholder="请输入名称">
      </el-input>
    </el-form-item>
    <el-form-item label="* 上级菜单">
      <el-select v-model="form.pid" placeholder="请选择上级菜单">
        <!-- 当value与v-model的值相等的时候就选中 -->
        <!-- value与v-model是全等比较 -->
        <el-option label="顶级菜单" :value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label = "菜单类型">
        <!-- 单选框组 -->
        <el-radio-group v-model="form.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item v-show = "form.type === 1" label="目录图标">
      <el-input v-model="form.icon" autocomplete="off" placeholder="请输入目录图标">
      </el-input>
    </el-form-item>
    <el-form-item v-show = "form.type === 2" label="菜单地址">
      <el-input v-model="form.url" autocomplete="off" placeholder="请输入菜单地址">
      </el-input>
    </el-form-item>
    <el-form-item>
       <el-button @click="dialogFormVisible = false">取 消</el-button>
       <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: true,
      form: {
        pid: 0, // 上级分类编号, 顶级菜单为0
        title: '', // 菜单名称(必填)
        icon: '', // 菜单图标
        type: 1, // 类型 1目录 2菜单
        url: '', // 菜单地址(如果是菜单才必填)
        status: 1 // 状态 1正常 2禁用

      }
    }
  }
}
</script>

<style>

</style>
