import {createStore} from "vuex";

import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

const state = {
    cartList: []
}

const store = createStore({
  state,
  actions,
  mutations,
  getters,


  // mutations: {
  //   addCary(state, payload) {
  //     // payload添加的商品
  //
  //     // 查找之前的数组中是否有该商品 find
  //     let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //
  //     // 判断oldProduct
  //     if (oldProduct) {
  //       oldProduct.count += 1
  //     }else {
  //       payload.count = 1
  //       state.cartList.push(payload)
  //     }
  //   }
  // }
})

export default store
