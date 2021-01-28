<template>
  <div>
   <el-button size="small" type="primary" plain @click = "showAddForm">添加</el-button>
   <u-list />
   <u-form ref = "form"/>
  </div>
</template>

<script>
import UList from './components/List'
import UForm from './components/Form'
export default {
  components: {
    UList,
    UForm
  },
  methods: {
    showAddForm () {
      // 显示对话框
      this.$refs.form.dialogFormVisible = true
    }
  }
}
</script>

<style scoped>

</style>
