<template>
<div>
  <el-table
    :data = "list"
    style="width: 100%; margin: 20px 0;"
    row-key="id"
    border>
    <!-- el-table-column:表格的列组件
        prop: 菜单数据中对应的数据
        label:表头
         -->
    <el-table-column
      prop="specsname"
      label="规格名称">
    </el-table-column>
     <el-table-column
      prop="attrs"
      label="规格属性">
    <template #default = "props">
      <el-tag v-for = "item of props.row.attrs" type="info" :key = "item" style="margin-right: 5px">{{item}}</el-tag>
    </template>
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
       <el-button type="danger" size = "mini" @click="onDelete(props.row)" v-if = "props.row.id > 1"><i class="el-icon-delete"></i> 删除</el-button>
    </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件
    layout 组件布局
    total: 总数量
    page-size: 每页显示的数量
    current-change: 当前页码发生改变时触发
    至少有2页时才显示分页组件
    -->
   <el-pagination
   @current-change = "onCurrentChange"
   class="page"
   background
   layout="prev, pager, next"
   :page-size="size"
   :total="total"
   v-if = "total > size"
   >
   </el-pagination>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteSpecs } from '@/api/specs'
export default {
  computed: {
    ...mapState({
      list: state => state.specs.list,
      size: state => state.specs.size,
      page: state => state.specs.page,
      total: state => state.specs.total
    })
  },
  mounted () {
    this.$store.dispatch('specs/getSpecsList')
    this.$store.dispatch('specs/getSpecsTotal')
  },
  methods: {
    onCurrentChange (page) {
      // console.log(page)
      // 更改vuex中的当前页
      this.$store.commit('specs/SET_PAGE', page)
      // 重新获取当前页的规格数据
      this.$store.dispatch('specs/getSpecsList')
    },
    onEdit (data) {
      // 触发编辑按钮
      // 通知父组件显示编辑菜单的对话框, 把当前编辑的数据传递过去
      this.$emit('edit', data)
    },
    // id为1的管理员不允许删除
    onDelete (data) {
      // element-ui的弹出框this.$comfirm(显示的信息[,标题,其他的配置项目])
      this.$confirm('确定要删除吗?', '提示', { type: 'error' }).then(() => {
        // 完成删除功能
        // 调用接口删除角色
        // console.log('删除')
        deleteSpecs(data.id).then(() => {
          // 刷新列表数据
          this.$message.success({
            message: '删除成功',
            onClose: () => {
              // 关闭对话框
              this.dialogFormVisible = false
              // 重新获取总数量
              this.$store.dispatch('specs/getSpecsTotal')
              // 如果当前页的数据已经全部删除, 就修改page
              if (this.list.length === 1) {
                let page = 0
                if (this.page === 1) {
                  page = 1
                } else {
                  page = this.page - 1
                }
                this.$store.commit('specs/SET_PAGE', page)
              }
              // 刷新列表数据
              this.$store.dispatch('specs/getSpecsList')
            }
          })
        }).catch(err => {
          this.$message.error(err.message)
        })
        // 调用接口删除菜单
        // 刷新列表数据
      }).catch(() => {})
    }
  }
}
</script>

<style>
.page {
  float: right;
}
</style>
