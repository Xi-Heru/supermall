<template>
  <div class="wrapper" ref="aaa">
  <ul class="center">
    <button @click="btnClick">按钮</button>
    <li @click="btnClick">111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
    <li>111111</li>
  </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Category",
  data () {
    return {
      scroll: null
    }
  },

  mounted() {
    // console.log(this.$refs.aaa);
    // console.log(document.querySelector('.wrapper'));
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType: 3,
      // click一开始为false，禁用原生click
      click:true,
      pullUpLoad:true
    })
    this.scroll.on('scroll',(position) => {
      console.log(position);
    })
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');
    })
  },
  methods: {
    btnClick() {
      console.log('....');
    }
  }
}
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
