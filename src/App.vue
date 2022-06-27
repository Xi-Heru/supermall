<template>
  <div id="app">
<!--  用来保存用户切换别的页面  返回还是显示原来的页面-->
  <router-view  v-slot="{ Component }">
      <keep-alive include="Home" exclude="Detail"  >
      <component :is="Component" />
    </keep-alive>
  </router-view>
<!--    <keep-alive exclude="Detail">-->
<!--      <router-view />-->
<!--    </keep-alive>-->

<!--  tabbat-->
  <main-tab-bar/>
  </div>
</template>

<script>

import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  },
 computed: {
   key () {
     return this.$route.path
   }
 }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
