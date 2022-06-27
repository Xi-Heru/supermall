<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
<!--       <li v-for="(item,index) in cartList" :key="index">{{item}}</li>-->
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item" />

    </scroll>

  </div>
</template>

<script>
import scroll from "@/components/common/scroll/Scroll";

import CartListItem from "@/views/cart/childComps/CartListItem";

import {mapGetters} from "vuex";
export default {
  name: "CartList",
  components: {
    scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"])
  },

  activated() {
    this.$refs.scroll.refresh()
    // console.log('......');
  }
}
</script>

<style scoped>
  .content{
    position: absolute;
    top:44px;
    left: 0;
    right: 0;
    bottom: 89px;
    overflow: hidden;
  }
  .cart-list{
    height: 100%;
  }
</style>
