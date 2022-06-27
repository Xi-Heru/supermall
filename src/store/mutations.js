export default {
  addCount(state,payload){
    payload.count++
  },
  addToCart(state,payload){
    payload.checked=true
    state.cartList.push(payload)
  },


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
}

