<template>
  <div class="toast" v-show="show">
    <div>{{ message }}</div>
  </div>
</template>

<script>
import {ref , onMounted} from "vue";

export default {
  name: "Toast",
  props: {
    message:{
      type:String,
      default:''
    },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  setup() {
    const show = ref(false);
    onMounted(() => {
      show.value = true;
    });
    return { show };
  },

  // data() {
  //   return {
  //     message: "",
  //     isshow: false,
  //   };
  // },
  // methods: {
  //   show(message='默认文字', duration=2000) {
  //     this.isshow = true;
  //     this.message = message;
  //
  //     setTimeout(() => {
  //       this.isshow = false;
  //       this.message = '';
  //     }, duration);
  //   },
  // },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 10px;
  z-index: 999;
}
</style>
