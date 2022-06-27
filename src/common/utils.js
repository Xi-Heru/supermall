// 防抖动
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout( () => {
      func.apply(this, args)
    }, delay)
  }
}

// 时间格式化
// export function formatDate(date, fmt) {
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").slice(4 - RegExp.$1.length));
//   }
//
//   let o = {
//     "M+": date.getMonth() + 1,
//     "d+": date.getDate(),
//     "h+": date.getHours(),
//     "m+": date.getMinutes(),
//     "s+": date.getSeconds()
//   };
//
//   for (let k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       let str = o[k] + "";
//       fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
//     }
//   }
//
//   return fmt;
// }

// 用于格式化时间
// 设置按需导出
export function formatDate(value, format) {
  //value: 需要格式化的数据
  //format: 指定格式 yyyy-MM-dd hh:mm:ss

  let date = new Date(value);
  // 获取年份
  let year = date.getFullYear();

  if (/(y+)/.test(format)) {
    // 获取匹配组的内容
    let content = RegExp.$1;
    format = format.replace(content, year.toString().slice(4 - content.length));
  }

  let o = {
    // y: date.getFullYear(),  // 用这一句也行，但只适用于四位数显示时候用
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  for (let key in o) {
    // 构造动态正则
    let reg = new RegExp(`(${key}+)`);

    if (reg.test(format)) {
      // 获取匹配组的内容
      let content = RegExp.$1;
      let k = o[key] >= 10 ? o[key] : content.length == 2 ? '0' + o[key] : o[key];
      format = format.replace(content, k);
    }
  }
  return format;
}



