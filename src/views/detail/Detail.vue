<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"  ref="nav"/>

      <scroll class="center"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="params" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="list" :goods="recommends"/>
      </scroll>

    <detail-bottom-bar @addCart="addToCart" />
    <bar-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
// import Toast from "@/components/common/toast/Toast";
// import barTop from "@/components/content/barTop/BarTop";   放进混入了

import {itemListenerMixin, backTopMixin} from "@/common/mixin";  //混入

import {getDetail, getRecommend, Goods, Shop, GoodsParam } from "@/netword/getDetail";
import {debounce} from "@/common/utils";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
    // barTop
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener: null
      themeToYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false

      // isShowBackTop: false,
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    /**
     * 网路请求
     */
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
      const data = res.result
      // console.log(res);
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 5.取出参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 评论
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    });

    // 3.创建详情页推荐数据
    getRecommend().then( res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY进行赋值（对给this.themeToYs赋值的操作进行防抖，debounce进行防抖，等待加载完成图片高度，再进行刷新）防止频繁获取
    this.getThemeTopY = debounce(() => {
      this.themeToYs = [];

      this.themeToYs.push(0);
      this.themeToYs.push(this.$refs.params.$el.offsetTop); // el获取子组件的高度offsetTop
      this.themeToYs.push(this.$refs.comment.$el.offsetTop);
      this.themeToYs.push(this.$refs.list.$el.offsetTop);
      this.themeToYs.push(Number.MAX_VALUE); //获取最大值，进行区间判断显示
      // console.log(this.themeToYs);
    }, 100);
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

  // destroyed vue3的使用方法
  beforeUnmount() {
    this.$bus.off('itemImageLoad', this.ItemImgListener)
  },

  methods: {
    imageLoad() {
      // 刷新图片
      this.$refs.scroll.refresh()

      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeToYs[index], 500);
    },

    // 滚动获取当前位置并显示出来
    // 内容滚动，显示正确的标题
    contentScroll(position) {
      const positionY = -position.y;

      let length = this.themeToYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeToYs[i] &&
          positionY < this.themeToYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(positionY);
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 回到顶部
      this.isShowBackTop = positionY > 1000;


    },


    // 回到顶部
    // backClick() {
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    //   this.$refs.scroll.scrollTo(0, 0,)
    // },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车中
      this.$store.dispatch('addCart', product).then(res => {
        // this.show=true
        //   this.message=res
        //   setTimeout(() => {
        //     this.show=false
        //     this.message=''
        //   }, 1500);
        this.$toast(res)
        console.log(res);
      })
      // 可以使用映射...mapActions  promise
      // this.addCart(product).then((res) => {
      //   console.log(res);
      //   // this.show=true
      //   // this.message=res
      //   // setTimeout(() => {
      //   //   this.show=false
      //   //   this.message=''
      //   // }, 1500);
      //   this.$toast.show(res)
      // });
    },
  },
}
</script>

<style scoped>
  #detail {
    z-index: 10;
    position: relative;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
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
  /*  height: calc(100% - 44px);*/
  /*}*/
</style>
