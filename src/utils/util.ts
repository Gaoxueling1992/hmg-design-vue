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

export {
  styleSheet2obj,
  getOneMmsPx
}