<template>
<div>
  <el-table
    :data = "list"
    style="width: 100%;margin: 20px 0;"
    row-key="id"
    border>
    <!-- el-table-column:表格的列组件
        prop: 菜单数据中对应的数据
        label:表头
         -->
    <el-table-column
      prop="username"
      label="角色名称">
    </el-table-column>
     <el-table-column
      prop="rolename"
      label="所属角色">
    </el-table-column>
    <el-table-column
      label="状态">
    <template #default = "props">
      <el-tag v-if = "props.row.status === 1">启用</el-tag>
      <el-tag v-else type="danger">禁用</el-tag>
    </template>
    </el-table-column>
    <el-table-column
      label="操作">
    <template #default = "props">
       <el-button type="primary" size = "mini" @click="onEdit(props.row)"><i class="el-icon-edit"></i> 编辑</el-button>
       <el-button type="danger" size = "mini" @click="onDelete(props.row)"><i class="el-icon-delete"></i> 删除</el-button>
    </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件
    layout 组件布局
    total: 总数量
    page-size: 每页显示的数量
    current-change: 当前页码发生改变时触发
    -->
   <el-pagination
   @current-change = "onCurrentChange"
   class="page"
   background
   layout="prev, pager, next"
   :page-size="size"
   :total="total">
   </el-pagination>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      list: state => state.admin.list,
      size: state => state.admin.size,
      total: state => state.admin.total
    })
  },
  mounted () {
    this.$store.dispatch('admin/getAdminList')
    this.$store.dispatch('admin/getAdminTotal')
  },
  methods: {
    onCurrentChange (page) {
      // console.log(page)
      // 更改vuex中的当前页
      this.$store.commit('admin/SET_PAGE', page)
      // 重新获取当前页的管理员数据
      this.$store.dispatch('admin/getAdminList')
    },
    onEdit () {},
    onDelete () {}
  }
}
</script>

<style>
.page {
  float: right;
}
</style>
