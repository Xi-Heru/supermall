import Toast from './Toast.vue'
// const obj={}
//
//
// obj.install=function(Vue){
//   const toastCountrustor=Vue.extend(Toast)
//   const toast=new toastCountrustor()
//
//   toast.$mount(document.createElement('div'))
//   document.body.appendChild(toast.$el)
//   // Vue.prototype.$toast=toast
// }
// export default obj

import { createVNode, render } from "vue";

const div = document.createElement("div");
div.setAttribute("class", "toast");
document.body.appendChild(div);

let time = null;
export const toast = (message, duration = 1500) => {
  const NODE = createVNode(Toast, { message });
  render(NODE, div);
  clearTimeout(time);
  time = setTimeout(() => {
    render(null, div);
  }, duration);
};

