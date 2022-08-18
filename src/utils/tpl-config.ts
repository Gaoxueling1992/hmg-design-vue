const footStr = `</body></html>`

const openFixedAreaStr = function(pageWidth) {
  return `<!DOCTYPE html><html style="width:${pageWidth}px"><head><meta http-equiv="content-type" content="text/html;charset=utf-8">
  <style>
    @font-face{font-family: "SimSun";src:url('{fontPath}/simsun.ttf') format('truetype');}
    @font-face{font-family: "NSimSun";src:url('{fontPath}/nsimsun.ttf') format('truetype');}
    @font-face{font-family: "FangSong";src:url('{fontPath}/simfang.ttf') format('truetype');}
    @font-face{font-family: "KaiTi";src:url('{fontPath}/simkai.ttf') format('truetype');}
    @font-face{font-family: "SimHei";src:url('{fontPath}/simhei.ttf') format('truetype');}
    @font-face{font-family: "Microsoft YaHei";src:url('{fontPath}/msyh.ttf') format('truetype');}
    @font-face{font-family: "Times New Roman";src:url('{fontPath}/times.ttf') format('truetype');}
    @font-face{font-family: "LiSu";src:url('{fontPath}/simli.ttf') format('truetype');}
    @font-face{font-family: "YouYuan";src:url('{fontPath}/simyou.ttf') format('truetype');}
    .editor-display-text p{margin-top:0; margin-bottom:0;}
  </style></head>
  <body style="border:0; margin: 0;width: ${pageWidth}px;">`
}
export {
  footStr,
  openFixedAreaStr
}