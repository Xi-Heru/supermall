<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center >购物街</template></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>

    <scroll class="center" ref="scroll" :probe-type="3" @scroll="contentScoll" :pull-up-load="true" @pullingUp="loadMore">
    <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
    <recommend-view :recommend="recommend"/>
    <feature-view/>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl2"/>
    <goods-list :goods="showGoods"/>
    </scroll>
<!--    native监听组件的原生事件 必须加上.native-->
    <bar-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import homeSwiper from "@/views/home/childComps/homeSwiper";
import recommendView from "@/views/home/childComps/RecommendView";
import featureView from "@/views/home/childComps/FeatureView";

import navBar from "@/components/common/navbar/NavBar";
import tabControl from "@/components/content/tabControl/TabControl";
import goodsList from "@/components/content/goods/GoodsList";
import scroll from "@/components/common/scroll/Scroll";
// import barTop from "@/components/content/barTop/BarTop";
import Scroll from "@/components/common/scroll/Scroll";

import {itemListenerMixin, backTopMixin} from "@/common/mixin"; // 混入
import {getHomeMultidata, getHomeGoods} from "@/netword/home";  //网络请求


export default {
  name: "Home",
  components: {
    Scroll,
    homeSwiper,
    recommendView,
    featureView,
    navBar,
    tabControl,
    goodsList,
    scroll,
    // barTop,

  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      // result: null
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImgListener: null
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },


  // 销毁前保留
  // 激活
  // vue3这两个钩子函数必须加on才能执行
  activated() {
    // 进来一次刷新一次
    this.$refs.scroll.refresh()

    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // console.log('....');
  },

  // 停用保留之前的页面缓存
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件的监听
    this.$bus.off('itemImageLoad', this.ItemImgListener)
  },

  created() {
    // 1.请求多个数据
   this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // // 图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 50)
    // // 3.监听图片
    // this.itemImgListener = () => {
    //   // this.$refs.scroll.refresh()
    //   // console.log('....');
    //   refresh()
    // }
    // this.$bus.on('itemImageLoad', this.itemImgListener)


  },

  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2 :
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 回到顶部
    // backClick() {
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    //   this.$refs.scroll.scrollTo(0, 0,)
    // },
    // 当滚动到900就显示按钮可以返回顶部
    contentScoll(position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = (-position.y) > 900

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 上拉加载更多数据
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh();
    },

    swiperImageLoad(){
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.$refs.tabControl2.$el.offsetTop);
    },

    /**
     *网络请求相关的方法
     **/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },

    getHomeGoods(type) {
      // page初始值为0，滑动到尽头才会请求另一页面的数据
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // ...res.data.list获取所有网络请求的数据存放list数组对象中
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多 刷新
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    /*position: relative;*/
  }
  .home-nav {
    /*background-color: #ff8198;*/
    background-color: var(--color-tint);
    color: #ffffff;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .center {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  /*.center {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/
</style>
