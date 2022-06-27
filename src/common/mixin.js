import { debounce } from "@/common/utils.js";
import BarTop from "@/components/content/barTop/BarTop";

export const itemListenerMixin = {
  data() {
    return {
      ItemImgListener:null,
      refresh:null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 200);

    this.ItemImgListener = () => {
      this.refresh();
    }
    this.$bus.on("itemImageLoad", this.ItemImgListener);
    // console.log('我是记得记得');
  },
}

export const backTopMixin={
  components: {
    BarTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0,)
    },
  },
}
