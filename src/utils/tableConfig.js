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
  functionButton:
    '<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">download</button> <button id="" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">share</button> <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">show data</button>', //右上角按钮
  cellRightClickConfig: {
    //自定义配置单元右键菜单
    copy: true, // 复制
    copyAs: true, // 复制为
    paste: true, // 粘贴
    insertRow: true, // 插入行insert row
    insertColumn: true, // 插入列insert column
    deleteRow: true, // 删除选中行的数据 delete the selected row
    deleteColumn: true, // 删除选中列的数据delete the selected column
    deleteCell: false, // delete cell
    hideRow: true, // hide the selected row and display the selected row
    hideColumn: true, // hide the selected column and display the selected column
    rowHeight: true, // 设置行高
    columnWidth: true, // 设置行宽
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
