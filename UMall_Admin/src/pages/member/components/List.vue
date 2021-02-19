<template>
<div>
  <el-table
    :data = "list"
    style="width: 100%;margin: 20px 0;"
    row-key="id"
    height="400"
    border>
    <!-- el-table-column:表格的列组件
        prop: 菜单数据中对应的数据
        label:表头
         -->
    <el-table-column
      prop="phone"
      label="手机号">
    </el-table-column>
     <el-table-column
      prop="nickname"
      label="昵称">
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
</div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteMember } from '@/api/member'
export default {
  computed: {
    ...mapState({
      list: state => state.member.list
    })
  },
  mounted () {
    this.$store.dispatch('member/getMemberList')
  },
  methods: {
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
        deleteMember(data.uid).then(() => {
          // 刷新列表数据
          this.$message.success({
            message: '删除成功',
            onClose: () => {
              // 关闭对话框
              this.dialogFormVisible = false
              // 刷新列表数据
              this.$store.dispatch('member/getMemberList')
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
