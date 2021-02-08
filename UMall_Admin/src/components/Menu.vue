<template>
  <div class="aside">
    <!-- 导航菜单组件
      el-menu: 容器组件
      @open 监听下拉打开
      @close 监听下拉菜单打开
      default-active string 默认选中的菜单项的index的值
      text-color: 文本的颜色
      active-text-color: 菜单被选中时的文本颜色
      router: 是否使用vue-router的模式进行跳转，启用该模式激活导航时以Index作为
      参数进行路由跳转
      default-active 设置为当前路由的path
     -->
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#3d5f81"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 没有下级菜单的菜单项 -->
      <el-menu-item index="/statistics">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 有下级菜单的菜单项 -->
      <template v-for="(menu, index) of menuList">
        <!-- 有下级菜单 -->
        <el-submenu :index = "''+index" :key = "menu.id" v-if="menu.children && menu.children.length > 0">
          <!-- 一级菜单名称 -->
          <template slot="title">
            <i v-if = "menu.icon!=''" :class="menu.icon"></i>
            <span>{{menu.title}}</span>
          </template>
          <!-- 二级菜单项 -->
          <el-menu-item-group>
            <el-menu-item v-for = "item of menu.children" :key="item.id" :index="item.url">
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: []
    }
  },
  mounted () {
    const userInfo = JSON.parse(sessionStorage.getItem('user'))
    this.menuList = userInfo.menus || []
    console.log(userInfo)
  }
}
</script>

<style scoped>
.aside {
  background: #3d5f81;
  height: 680px;
  overflow-y: scroll;
  overflow-x:hidden;
}
.aside::-webkit-scrollbar{
  width:8px;
  height: 8px;
}
.aside::-webkit-scrollbar-track {
  -webhit-box-shadow: inset 0 0 5px transparent;
  border-radius:0;
  background:transparent;
}
.content::-webkit-scrollbar-thumb {
  border-radius:5px;
  -webkit-box-shadow:inset 0 0 5px #0e1124;
  background:#0e1124;
}
.el-menu {
  border-right: none;
}
</style>
