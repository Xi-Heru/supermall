<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/home.svg" alt="">
      </template>

      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/home_active.svg" alt="">
      </template>

      <template v-slot:item-text>首页</template>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <template v-slot:item-icon>
      <img src="@/assets/img/tabbar/category.svg" alt="">
      </template>

      <template v-slot:item-icon-active>
        <img src="@/assets/img/tabbar/category_active.svg" alt="">
      </template>

      <template v-slot:item-text>分类</template>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <template v-slot:item-icon>
        <img  src="@/assets/img/tabbar/shopcart.svg" alt="">
      </template>

      <template v-slot:item-icon-active>
        <img  src="@/assets/img/tabbar/shopcart_active.svg" alt="">
      </template>

      <template v-slot:item-text>购物车</template>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <template v-slot:item-icon>
        <img src="@/assets/img/tabbar/profile.svg" alt="">
      </template>

      <template v-slot:item-icon-active>
        <img  src="@/assets/img/tabbar/profile_active.svg" alt="">
      </template>

      <template v-slot:item-text>我的</template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import tabBar from "@/components/common/tabbar/TabBar";
import tabBarItem from "@/components/common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components: {
      tabBar,
      tabBarItem
    }
  }
</script>

<style scoped>
img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
