<template>
<!-- 普通数据表格 -->
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
      prop="rolename"
      label="角色名称">
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
</template>

<script>
import { mapState } from 'vuex'
import { deleteMenu } from '@/api/menu'
export default {
  computed: {
    ...mapState({
      list: state => state.role.list
    })
  },
  mounted () {
    if (this.list.length === 0) {
      this.$store.dispatch('role/getRoleList')
    }
  },
  methods: {
    onEdit (data) {
      console.log('on edit...', data)
      // 触发编辑按钮
      // 通知父组件显示编辑菜单的对话框, 把当前编辑的数据传递过去
      this.$emit('edit', data)
    },
    onDelete (data) {
      // element-ui的弹出框this.$comfirm(显示的信息[,标题,其他的配置项目])
      this.$confirm('确定要删除吗?', '提示', { type: 'error' }).then(() => {
        // 完成删除功能
        // 如果有下级菜单，就不允许删除
        if (Reflect.has(data, 'children') && data.children.length > 0) {
          this.$message.error('有下级菜单, 不允许删除')
          return
        }
        // 调用接口删除菜单
        // console.log('删除')
        deleteMenu(data.id).then(() => {
          // 刷新列表数据
          this.$message.success({
            message: '删除成功',
            onClose: () => {
              // 关闭对话框
              this.dialogFormVisible = false
              // 刷新列表数据
              this.$store.dispatch('role/getRoleList')
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

<style scoped>
</style>
