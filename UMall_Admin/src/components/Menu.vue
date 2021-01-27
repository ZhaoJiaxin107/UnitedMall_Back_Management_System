<template>
  <div class="aside">
    <!-- 导航菜单组件
      el-menu: 容器组件
      @open 监听下拉打开
      @close 监听下拉菜单打开
      default-active string 默认选中的菜单项的index的值
      text-color: 文本的颜色
      active-text-color: 菜单被选中时的文本颜色
     -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#3d5f81"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 没有下级菜单的菜单项 -->
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 有下级菜单的菜单项 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>系统管理</span>
        </template>
        <!-- 一组菜单项 -->
        <el-menu-item-group>
          <el-menu-item index="2-1">菜单管理</el-menu-item>
          <el-menu-item index="2-2">角色管理</el-menu-item>
          <el-menu-item index="2-3">管理员管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商城管理</span>
        </template>
        <!-- 一组菜单项 -->
        <el-menu-item-group>
          <el-menu-item index="3-1">商品分类</el-menu-item>
          <el-menu-item index="3-2">商品规格</el-menu-item>
          <el-menu-item index="3-3">商品管理</el-menu-item>
          <el-menu-item index="3-4">秒杀活动</el-menu-item>
          <el-menu-item index="3-5">轮播图管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.aside {
  background: #3d5f81;
  height: 100%;
}
.el-menu {
  border-right: none;
}
</style>
