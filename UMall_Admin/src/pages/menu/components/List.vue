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
    :data="tableData"
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
      prop="type"
      label="菜单类型">
    </el-table-column>
    <el-table-column
      prop="icon"
      label="菜单图标">
    </el-table-column>
    <el-table-column
      prop="url"
      label="菜单地址">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
  </el-table>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
