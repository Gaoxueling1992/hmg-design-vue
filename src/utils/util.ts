import { Modal } from 'ant-design-vue'

const styleSheet2obj = (styleSheet: Object) => {

}

// 处理提交脚本
const dealWithRules = async (linesStr: any, checkInfo: any, tipsIds: any) => {
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
                if (!tipsIds || tipsIds.indexOf('' + ele.id) === -1) {
                  return {
                    result: false,
                    content: transTplStr(content, ele.value, checkInfo),
                    tipType,
                    bind2Threshold,
                    tipsIds: tipsIds.concat(ele.id)
                  };
                }
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

const conversion_getDPI =function () {
  var arrDPI = new Array;
  if (window.screen.deviceXDPI) {
      arrDPI[0] = window.screen.deviceXDPI;
      arrDPI[1] = window.screen.deviceYDPI;
  } else {
      var tmpNode = document.createElement("DIV");
      tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
      document.body.appendChild(tmpNode);
      arrDPI[0] = parseInt(tmpNode.offsetWidth);
      arrDPI[1] = parseInt(tmpNode.offsetHeight);
      tmpNode.parentNode.removeChild(tmpNode);
  }
  return arrDPI;
};

const pxConversionMm = function (value) {
  var inch = value / conversion_getDPI()[0];
  var c_value = inch * 25.4;
  return c_value;
};

const mmConversionPx = function (value) {
  var inch = value / 25.4;
  var c_value = inch * conversion_getDPI()[0];
  return c_value;
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

function dealWithCurNode (fragment, curNode, findInnerSplit, top, curPage, pageHeight, height, res) {
  let splitItems = findInnerSplit[0].childNodes;
  let lineItemLength = findInnerSplit.length;
  let lastNode = curNode.cloneNode(true);
  let nextNode = curNode.cloneNode(true);
  let minHeight: any = '0';
  for (let i = 0; i < lineItemLength; i++) {
    minHeight = lastNode.getElementsByClassName('editor-display-text') && lastNode.getElementsByClassName('editor-display-text')[i] && lastNode.getElementsByClassName('editor-display-text')[i].style.minHeight || '0';
    minHeight = parseInt(minHeight);
    if (lastNode.getElementsByClassName('editor-display-text') && lastNode.getElementsByClassName('editor-display-text')[i]) {
      lastNode.getElementsByClassName('editor-display-text')[i].style.minHeight = 'unset';
      lastNode.getElementsByClassName('editor-display-text')[i].parentNode.style.minHeight = 'unset';
    }
    lastNode.getElementsByClassName('inner-split')[i].innerHTML = '';
    nextNode.getElementsByClassName('inner-split')[i].innerHTML = '';
  }
  let page = 0;
  let lastInnerNull = true;
  let lastHidden = false;
  for (let i = 0; i <= splitItems.length; i++) {
    let curNodeInnter = splitItems[i];
    if (curNodeInnter) {
      let { offsetTop, clientHeight } = curNodeInnter;
      if (offsetTop !== undefined && clientHeight !== undefined) {
        if (offsetTop + top <= curPage * pageHeight && offsetTop + top + clientHeight <= pageHeight * curPage) {
          // 当前页
          lastInnerNull = false;
          lastHidden = false;
          lastNode.getElementsByClassName('inner-split')[0].appendChild(curNodeInnter.cloneNode(true));
          for (let j = 1; j < lineItemLength; j++) {
            for (let k = 0; k < findInnerSplit[j].childNodes.length; k++) {
              let lineNode = findInnerSplit[j].childNodes[k];
              if (lineNode) {
                if (lineNode.offsetTop + top <= curPage * pageHeight && lineNode.offsetTop + top + lineNode.clientHeight <= pageHeight * curPage) {
                  lastNode.getElementsByClassName('inner-split')[j].appendChild(lineNode.cloneNode(true));
                }
              }
            }
          }
        } else {
          if (offsetTop + top <= (curPage + page) * pageHeight && offsetTop + top + clientHeight <= pageHeight * (curPage + page)) {
            lastInnerNull = false;
            nextNode.getElementsByClassName('inner-split')[0].appendChild(curNodeInnter.cloneNode(true));
          } else {
            if (lastInnerNull) {
              if (page === 0 && lastNode.getElementsByClassName('split-next-hidden') && lastNode.getElementsByClassName('split-next-hidden')[0]) {
                lastNode.getElementsByClassName('split-next-hidden')[0].parentNode.removeChild(lastNode.getElementsByClassName('split-next-hidden')[0]);
                lastHidden = true;
              } else if ( nextNode.getElementsByClassName('split-next-hidden') && nextNode.getElementsByClassName('split-next-hidden')[0]) {
                if (!lastHidden) {
                  nextNode.getElementsByClassName('split-next-hidden')[0].parentNode.removeChild(nextNode.getElementsByClassName('split-next-hidden')[0]);
                  lastHidden = true;
                }
              }
            } else {
              if (nextNode.getElementsByClassName('split-next-hidden') && nextNode.getElementsByClassName('split-next-hidden')[0]) {
                nextNode.getElementsByClassName('split-next-hidden')[0].parentNode.removeChild(nextNode.getElementsByClassName('split-next-hidden')[0]);
                lastHidden = true;
              }
            }
            lastInnerNull = true;
            // if ((page === 0 && lastNode.clientHeight > 6) || nextNode.clientHeight >6) {
              fragment.appendChild(page === 0 ? lastNode : nextNode);
            // }
            if (fragment.innerHTML) {
              res.push(fragment.innerHTML);
              page++;
              fragment = null;
              fragment = document.createElement('div');
            }
            if (minHeight > 0 && minHeight - offsetTop > 0) {
              if (nextNode.getElementsByClassName('editor-display-text') && nextNode.getElementsByClassName('editor-display-text')[0]) {
                nextNode.getElementsByClassName('editor-display-text')[0].style.minHeight = minHeight - offsetTop + 'px';
                nextNode.getElementsByClassName('editor-display-text')[0].parentNode.style.minHeight = minHeight - offsetTop + 'px';
              }
            } else if (minHeight > 0){
              if (nextNode.getElementsByClassName('editor-display-text') && nextNode.getElementsByClassName('editor-display-text')[0]) {
                nextNode.getElementsByClassName('editor-display-text')[0].style.minHeight = 'unset';
                nextNode.getElementsByClassName('editor-display-text')[0].parentNode.style.minHeight = 'unset';
              }
            }
            nextNode.getElementsByClassName('inner-split')[0].innerHTML = '';
            nextNode.getElementsByClassName('inner-split')[0].appendChild(curNodeInnter.cloneNode(true));
            for (let j = 1; j < lineItemLength; j++) {
              nextNode.getElementsByClassName('inner-split')[j].innerHTML = '';
              for (let k = 0; k < findInnerSplit[j].childNodes.length; k++) {
                let lineNode = findInnerSplit[j].childNodes[k];
                if (lineNode) {
                  if (!(lineNode.offsetTop + top <= curPage * pageHeight && lineNode.offsetTop + top + lineNode.clientHeight <= pageHeight * curPage)) {
                    if (minHeight > 0 && minHeight - lineNode.offsetTop > 0) {
                      if (nextNode.getElementsByClassName('editor-display-text') && nextNode.getElementsByClassName('editor-display-text')[j]) {
                        nextNode.getElementsByClassName('editor-display-text')[j].style.minHeight = minHeight - offsetTop + 'px';
                        nextNode.getElementsByClassName('editor-display-text')[j].parentNode.style.minHeight = minHeight - offsetTop + 'px';
                      }
                    }
                    nextNode.getElementsByClassName('inner-split')[j].appendChild(lineNode.cloneNode(true));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (page !== 0) {
    if (!lastHidden && nextNode.getElementsByClassName('split-next-hidden') && nextNode.getElementsByClassName('split-next-hidden')[0]) {
      nextNode.getElementsByClassName('split-next-hidden')[0].parentNode.removeChild(nextNode.getElementsByClassName('split-next-hidden')[0]);
    }
  }
  // if ((page === 0 && lastNode.clientHeight > 6) || nextNode.clientHeight >6) {
    fragment.appendChild(page === 0 ? lastNode : nextNode);
  // }

  return {
    res,
    curPage: curPage + page,
    fragment
  }
}

// 拿到dom拆分成多页
function calSplitPage (dom, pageHeight) {
  let res = [];
  let curPage = 1;
  let fragment = document.createElement('div');
  for (let i = 1; i < dom.childNodes.length; i++) {
    let curNode = dom.childNodes[i];
    let { offsetTop, clientHeight, id } = curNode;
    if (!id || (id && id.indexOf('body-line') === -1)) {
      if (fragment) {
        if (fragment.innerHTML) {
          res.push(fragment.innerHTML);
          curPage++;
          fragment = null;
        }
      }
      break;
    }
    if (offsetTop <= curPage * pageHeight && offsetTop + clientHeight <= pageHeight * curPage) {
      if (curNode.clientHeight > 6) {
        fragment.appendChild(curNode.cloneNode(true));
      }
    } else {
      // 如果当前元素 顶部在页面内部，底部超出一页
      let findInnerSplit = curNode.getElementsByClassName('inner-split');
      // 找到内部可拆分元素，拆分到两页
      if (findInnerSplit && findInnerSplit[0]) {
        // 处理支持跨页展示的节点
        let result = dealWithCurNode(fragment, curNode, findInnerSplit, offsetTop, curPage, pageHeight, clientHeight, res);
        res = result.res;
        curPage = result.curPage;
        fragment = result.fragment;
        continue;
      }
      if (fragment.innerHTML) {
        res.push(fragment.innerHTML);
        curPage++;
        // 新启一个页面虚拟dom
        fragment = null;
        fragment = document.createElement('div');
      }
      
      // 找不到可拆分子元素，直接放到下一页
      if (!findInnerSplit || !findInnerSplit[0]) {
        if (curNode.clientHeight > 6) {
          fragment.appendChild(curNode.cloneNode(true));
        }
      }
    }
  }
  return res;
}

export {
  styleSheet2obj,
  getOneMmsPx,
  debounce, throttle,
  dealWithRules,
  calSplitPage,
  pxConversionMm,
  mmConversionPx
}