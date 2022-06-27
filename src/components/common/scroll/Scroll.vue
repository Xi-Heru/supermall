<template>
<!--  ref/children -> 子组件使用-->
  <div class="wrapper" ref="wrapper">
    <div class="center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BSscroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,  //可选值0/1/2/3 2弹性滚动不会监听 3实时监听滚动位置
        pullUpLoad: this.pullUpLoad,

        // 开启图片加载
        // observeImage: true,
        // 改变center的子元素
        // observeDOM:true
    })

      // scrollTo回到顶部x, y
      // this.scroll.scrollTo(0,0)
      // 2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

    // 监听上拉事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x , y , time)
    },
    // 上拉加载更多多条数据
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
}
</script>

<style scoped>

</style>
