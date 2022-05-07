const styleSheet2obj = (styleSheet: Object) => {

}

// 1mm对应像素
let getOneMmsPx  = () => {
  let div = document.createElement('div')
  div.id = 'mm'
  div.style.width = '1mm'
  document.querySelector('body').appendChild(div)
  let mm1 = document.getElementById('mm').getBoundingClientRect()
  div = null;
  return Math.round(mm1.width * 100) / 100;
}

// 函数防抖的实现
function debounce (fn, wait) {
  var timer = null;

  return function() {
    var context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 函数节流的实现;
function throttle (fn, delay) {
  var preTime = Date.now();

  return function() {
    var context = this,
      args = arguments,
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

export {
  styleSheet2obj,
  getOneMmsPx,
  debounce, throttle
}