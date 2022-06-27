import { createApp,} from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import FastClick from "fastclick"
import VueLazyload from "vue-lazyload";

// vue3的原型创建
import mitt from "mitt";
import moment from "moment";
import {toast} from "@/components/common/toast";
// vue2的原型创建
// Vue.prototype.$bus = new Vue()
const $bus = mitt()

const $moment = moment()
// const $toast = toast

// 解决移动端300ms的延迟
FastClick.attach(document.body)
// 空值下面的$bus传进来
// const $bus = {}

// const emitter = mitt()
// $bus.on = emitter.on
// $bus.emit = emitter.emit
// $bus.off = emitter.off

const app = createApp(App)
  app.use(router)
  app.use(store)

// 图片懒加载的插件
  app.use(VueLazyload, {
    loading: require('./assets/img/common/sit.png')
  })
  app.config.globalProperties.$bus = $bus
  app.config.globalProperties.$moment = $moment
  app.config.globalProperties.$toast = toast
  app.mount('#app')

