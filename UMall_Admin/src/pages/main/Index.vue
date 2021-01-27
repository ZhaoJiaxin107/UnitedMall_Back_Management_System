<template>
  <el-container style = "height: 100%;">
    <el-header style="padding: 0;">
      <u-header></u-header>
    </el-header>
   <el-container>
     <el-aside width = "200px">
       <u-menu />
     </el-aside>
     <el-main>Main
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

</style>
