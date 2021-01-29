<template>
<!--
    树形数据表格
    data: 要显示的数据
    row-key: 循环的tr的key值 对应的菜单数据的编号
    border: 是否添加边框
    default-expand-all: 是否展开所有的数据
    tree-props: 下级数据的结构 {children(表格组件属性): 'children(表单数据对应的下级菜单)'}
-->
 <el-table
    :data="list"
    style="width: 100%;margin: 20px 0;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children'}">
    <!-- el-table-column:表格的列组件
        prop: 菜单数据中对应的数据
        label:表头
         -->
    <el-table-column
      prop="title"
      label="菜单名称">
    </el-table-column>
    <el-table-column
      label="菜单类型">
    <template #default = "props">
      <el-tag>{{props.row.type === 1 ? '目录':'菜单'}}</el-tag>
    </template>
    </el-table-column>
    <el-table-column
      label="菜单图标">
    <template #default = "props">
      <i v-if="props.row.icon !== ''" :class="props.row.icon"></i>
    </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="菜单地址">
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
      list: state => state.menu.list
    })
  },
  mounted () {
    this.$store.dispatch('menu/getMenuList')
  },
  methods: {
    onEdit (data) {
    //   console.log('on edit...')
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
              // 刷新列表数据
              this.$store.dispatch('menu/getMenuList')
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
