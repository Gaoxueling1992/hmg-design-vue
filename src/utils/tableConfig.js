const config = {
  container: 'luckysheet', // 设定DOM容器的id
  title: '表格设计器', // 设定表格名称
  lang: 'zh', // 设定表格语言
  plugins: ['chart'],
  column: 10, //列数
  row: 30, //行数
  showtoolbar: true, //是否显示工具栏
  showinfobar: true, //是否显示顶部信息栏
  showsheetbar: false, //是否显示底部sheet按钮
  allowEdit: true, //是否允许前端编辑
  showtoolbarConfig: {
    undoRedo: true, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
    paintFormat: true, //格式刷
    currencyFormat: false, //货币格式
    percentageFormat: false, //百分比格式
    numberDecrease: false, // '减少小数位数'
    numberIncrease: false, // '增加小数位数
    moreFormats: false, // '更多格式'
    font: true, // '字体'
    fontSize: true, // '字号大小'
    bold: true, // '粗体 (Ctrl+B)'
    italic: true, // '斜体 (Ctrl+I)'
    strikethrough: true, // '删除线 (Alt+Shift+5)'
    textColor: true, // '文本颜色'
    fillColor: true, // '单元格颜色'
    border: false, // '边框'
    mergeCell: true, // '合并单元格'
    horizontalAlignMode: true, // '水平对齐方式'
    verticalAlignMode: true, // '垂直对齐方式'
    textWrapMode: true, // '换行方式'
    textRotateMode: false, // '文本旋转方式'
    image: false, // '插入图片'
    link: false, // '插入链接'
    chart: false, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
    postil: false, //'批注'
    pivotTable: false, //'数据透视表'
    function: false, // '公式'
    frozenMode: false, // '冻结方式'
    sortAndFilter: false, // '排序和筛选'
    conditionalFormat: false, // '条件格式'
    dataVerification: false, // '数据验证'
    splitColumn: false, // '分列'
    screenshot: false, // '截图'
    findAndReplace: false, // '查找替换'
    protection: false, // '工作表保护'
    print: false, // '打印'
  },
  textWrap: {
    overflow:"Overflow",
    wrap:"Wrap",
  },
  functionButton: '<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">download</button> <button id="" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">share</button> <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">show data</button>', //右上角按钮
  cellRightClickConfig: {
    //自定义配置单元右键菜单
    copy: true, // 复制
    paste: true, // 粘贴
    insertRow: true, // 插入行insert row
    insertColumn: true, // 插入列insert column
    deleteRow: true, // 删除选中行的数据 delete the selected row
    deleteColumn: true, // 删除选中列的数据delete the selected column
    deleteCell: false, // delete cell
    hideRow: true, // hide the selected row and display the selected row
    hideColumn: true, // hide the selected column and display the selected column
    rowHeight: false, // 设置行高
    columnWidth: false, // 设置行宽
    clear: true, // 清空选定内容clear content
    matrix: false, //矩阵 matrix operation selection
    sort: false, // 排序sort selection
    filter: false, //筛选 filter selection
    chart: false, //图表生成 chart generation
    image: false, //插入图片 insert picture
    link: false, // 插入连接，比如网址之类insert link
    data: false, //数据校验 data verification
    cellFormat: false
  }
};

export default config;