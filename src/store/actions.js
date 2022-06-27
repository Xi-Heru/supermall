export default {
  addCart(context, payload) {
    return new Promise((reslove, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count +=1
        context.commit('addCount', oldProduct) //数量*1
        reslove('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload) //添加商品
        reslove('添加了新的商品')
      }
    })
  }

}
