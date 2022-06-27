<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :goods-item="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
import goodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    goodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-evenly;

  }
</style>
