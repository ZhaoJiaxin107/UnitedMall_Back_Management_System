<template>
  <el-container style = "height: 100%;">
    <el-header style="padding: 0;">
      <u-header></u-header>
    </el-header>
   <el-container>
     <el-aside width = "200px">
       <u-menu />
     </el-aside>
     <el-main>
       <!-- 面包屑 -->
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- 当前路由的meta的标题 -->
        <el-breadcrumb-item>{{$route.meta.title || ''}}</el-breadcrumb-item>
      </el-breadcrumb>
       <!-- 嵌套路由 -->
       <router-view />
     </el-main>
   </el-container>
  </el-container>
</template>

<script>
import UHeader from '../../components/Header'
import UMenu from '../../components/Menu'
export default {
  components: {
    UHeader,
    UMenu
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
