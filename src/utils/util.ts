import { Modal } from 'ant-design-vue'

const styleSheet2obj = (styleSheet: Object) => {

}

// 处理提交脚本
const dealWithRules = async (linesStr: any, checkInfo: any) => {
  let lines = JSON.parse(linesStr);
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      let ele = lines[i][j];
      if (ele.rules && ele.rules.submit) {
        let rules = ele.rules.submit;
        for (let k = 0; k < rules.length; k++) {
          let rule = rules[k];
          const {
            id,
            content,
            current,
            elType,
            label,
            max,
            min,
            threshold,
            ruleType,
            value,
            prefix,
            suffix,
            tipType,
            bind2Threshold
          } = rule;
          switch (id) {
            case 1: // 执行脚本
              break;
            case -2: // 隐藏
              ele.baseProps.hideOnPrint = true;
              break;
            case 6: // 拼接
              if (ele.elName === 'RadText') {
                if (current === 0 || (threshold && judjeCondition(ruleType, checkInfo[threshold], value, min, max))) {
                  ele.label = transTplStr(content, ele.label, checkInfo) || ele.label;
                }
              } else {
                // 7不为空 6为空
                if (judjeCondition(ruleType, (current === 0 || !threshold) ? ele.value : checkInfo[threshold], value, min, max)) {
                  ele.label = transTplStr(label, ele.label, checkInfo);
                  ele.value = transTplStr(content, ele.value, checkInfo);
                }
              }
              break;
            case 8: // 提示
              if (judjeCondition(ruleType, (current === 0 || !threshold) ? ele.value : checkInfo[threshold], value, min, max)) {
                return {
                  result: false,
                  content,
                  tipType,
                  bind2Threshold
                };
              }
              break;
            case 0: // 追加前后缀
              if (ele.elName !== 'RadText' && !(elType === 'imgp' && ele.elName === 'RadMulitImagepicker')) {
                if (judjeCondition(ruleType, (current === 0 || !threshold) ? ele.value : checkInfo[threshold], value, min, max)) {
                  ele.prefix = prefix;
                  ele.suffix = suffix;
                }
              }
              break;
            default:
          }
        }
      } else {
        break;
      }
    }
  }
  return {
    result: true,
    lines
  }
}

// 判断是否满足执行规则的条件
const judjeCondition = (ruleType, value, con, min, max) => {
  switch (+ruleType) {
    case 7: // 不为空
      return !!value;
    case 6: // 为空
      return !value;
    case 0: // 包含
      return value.indexOf(con) > -1;
    case 1: // 不包含
      return value.indexOf(con) === -1;
    case 2: // 等于
      console.log('sel', value, con)
      return '' + value === '' + con;
    case 3: // 不等于
      return '' + value !== '' + con;
    case 4: // 以。。为开头
      return ('' + value).indexOf(con) === 0;
    case 5:  // 以。。为结尾
      let d = value.length - con.length;
      return (d >= 0 && value.lastIndexOf(con) == d);
    case 10: // 无条件
      return true;
    case 11: // 在范围内
      return value >= min && value <= max;
    case 12: // 不在范围内
      return value < min || value > max;
    case 13: // 大于
      return value > con;
    case 14:
      return value >= con;
    case 15: // 小于
      return value < con;
    case 16:
      return value <= con;
    default:
      return false;
  }
};

// 1mm对应像素
let getOneMmsPx = () => {
  let div = document.createElement('div')
  div.id = 'mm'
  div.style.width = '1mm'
  document.querySelector('body').appendChild(div)
  let mm1 = document.getElementById('mm').getBoundingClientRect()
  div = null;
  return Math.round(mm1.width * 100) / 100;
}

// 提取字符串之间的变量
const transTplStr = (val, eleValue = '', reportInfo) => {
  if (!val) {
    return eleValue;
  }
  let reg = /\$\{(.+?)\}/;
  let reg1 = /\$\{(.+?)\}/g;
  let tpls = val.match(reg1);
  if (tpls?.length) {
    tpls.forEach((tp) => {
      let tp1 = tp.match(reg)[1];
      if (tp1 === 'current') {
        val = val.replace(tp, eleValue);
      } else {
        val = val.replace(tp, reportInfo[tp1]);
      }
    });
  }
  return val;
}

// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;

  return function () {
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
function throttle(fn, delay) {
  var preTime = Date.now();

  return function () {
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
  debounce, throttle,
  dealWithRules
}