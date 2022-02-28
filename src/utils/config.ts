// 报告设计器组件列表
const compsList: Array<object> = [
  {
    elName: 'rad-text',
    title: '文本'
  },
  {
    elName: 'rad-input',
    title: '输入框'
  },
  {
    elName: 'rad-datetime',
    title: '时间'
  },
  {
    elName: 'rad-number',
    title: '数值'
  },
  {
    elName: 'rad-single-select',
    title: '单选'
  },
  {
    elName: 'rad-mul-select',
    title: '多选'
  },
  {
    elName: 'rad-table',
    title: '表格'
  },
  {
    elName: 'rad-image',
    title: '图片'
  },
  {
    elName: 'rad-mulitImagepicker',
    title: '图片选择器'
  },
  {
    elName: 'rad-line',
    title: '分割线'
  },
  {
    elName: 'rad-signalcode',
    title: '条形码'
  },
  {
    elName: 'rad-drcode',
    title: '二维码'
  },
  {
    elName: 'rad-editor',
    title: '富文本'
  },
  {
    elName: 'rad-signature',
    title: '操作人'
  }
]

// 样式表属性
const styleSheet: object = {
  fontFamily: 'Microsoft YaHei',
  fontWeight: '400',
  fontSize: '14',
  color: '#333333',
  justifyContent: 'left',
  backgroundColor: '',
  wrap: 'autoWrap',
  textDecoration: 'none',
  fontStyle: 'normal',
  borderWidth: '0',
  borderColor: '#333333',
  borderStyle: 'solid',
  width: '100%',
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  paddingRight: '0'
}

// 基础属性配置
const baseProps: object = {
  readonly: false, // 只读
  hideOnPrint: false, // 打印隐藏
  // rules: [], // 业务规则
  // script: '' // 控件脚本
}

// 校验属性
const validate: object = {
  required: false, // 是否必填
  limitLength: false, // 限定输入长度
  minLength: 0,
  maxLength: 1000,
  limitRule: false, // 限定输入格式
  rule: '', // 选择的格式
  customRule: '' // 自定义格式，正则
}

// 组件预设属性
const compBaseConfig = {
  'rad-text': {
    elName: 'RadText',
    name: '文本',
    desc: '静态文本，可编辑文字和样式。',
    placeholder: '',
    defaultValue: '',
    label: '',
    inline: true,
    noLabel: true,
    styleSheet: styleSheet,
    baseProps: {
      hideOnPrint: false
    },
    domain: '',
    domainType: 'domain'
  },
  'rad-input': {
    elName: 'RadInput',
    name: '输入框',
    desc: '可设置为单行或多行。',
    type: 'text',
    placeholder: '',
    label: '',
    defaultValue: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    domain: '',
    domainType: 'domain',
    baseProps: baseProps,
    validate: validate,
    prefix: '',
    suffix: ''
  },
  'rad-datetime': {
    elName: 'RadDatetime',
    name: '时间',
    desc: '可设置日期、日期+时间、时间范围。',
    placeholder: '',
    label: '',
    inline: true,
    defaultValue: '',
    styleSheet: styleSheet,
    domain: '',
    domainType: 'domain',
    baseProps: {
      readonly: false
    },
    validate: {
      required: false
    },
    format: 'YYYY-MM-DD',
    picker: 'date',
    rangeOpen: false
  },
  'rad-single-select': {
    elName: 'RadSingleSelect',
    name: '单选',
    type: 'select',
    desc: '从预设的下拉菜单中选择一项，可设为将选项平铺。',
    placeholder: '',
    label: '',
    defaultValue: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    domain: '',
    domainType: 'domain',
    baseProps: baseProps,
    layout: 'crosswise',
    options: []
  },
  'rad-mul-select': {
    elName: 'RadMulSelect',
    name: '多选',
    type: 'select',
    desc: '从预设的选项中选择一项或者多项。',
    placeholder: '',
    label: '',
    defaultValue: [],
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    domain: '',
    domainType: 'domain',
    baseProps: baseProps,
    layout: 'crosswise',
    options: [],
    defaultType: []
  },
  'rad-number': {
    elName: 'RadNumber',
    name: '数值',
    desc: '支持输入整数、小数。',
    placeholder: '请填写数值',
    label: '',
    defaultValue: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    domain: '',
    domainType: 'domain',
    baseProps: baseProps,
    validate: {
      required: false, // 是否必填
    },
    prefix: '',
    suffix: '',
    min: 0,
    max: 1000
  },
  'rad-line': {
    elName: 'RadLine',
    name: '分割线',
    placeholder: '请填写数值',
    label: '',
    defaultValue: '',
    noLabel: true,
    styleSheet: {
      fontFamily: 'Microsoft YaHei',
      fontWeight: '400',
      fontSize: '14',
      color: '#333333',
      borderColor: '#333',
      width: '100%',
      paddingTop: '0',
      paddingBottom: '0'
    }
  },
  'rad-image': {
    elName: 'RadImage',
    name: '图片',
    desc: '支持上传.png，.jpeg，.jpg格式的图片。',
    defaultValue: '',
    src: '',
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    domain: '',
    domainType: 'domain',
    styleSheet: {
      width: '100%',
      paddingTop: '0',
      paddingBottom: '0',
      paddingLeft: '0',
      paddingRight: '0'
    },
    imgHeight: '100',
    imgWidth: '100',
  },
  'rad-table': {
    elName: 'RadTable',
    name: '表格',
    desc: '支持选择和样式设置的表格组件。',
    defaultValue: {},
    src: '',
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    domain: '',
    domainType: 'domain',
    styleSheet: {
      fontFamily: 'Microsoft YaHei',
      fontSize: '14',
      color: '#333333',
      backgroundColor: '',
      textDecoration: 'none',
      fontStyle: 'normal',
      width: '100%'
    },
    defaultType: {}
  },
  'rad-mulitImagepicker': {
    elName: 'RadMulitImagepicker',
    name: '图片选择器',
    desc: '',
    defaultValue: [],
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    domain: '',
    domainType: 'domain',
    styleSheet: {
      width: '100%',
      paddingTop: '0',
      paddingBottom: '0',
      paddingLeft: '0',
      paddingRight: '0'
    },
    imgHeight: '100',
    imgWidth: '100',
    layoutType: '1',
    layout: '1',
    horSpacing: 10,
    verSpacing: 10,
    perNum: 6,
    testTotalNum: 10,
    imgList: [],
    defaultType: []
  },
  'rad-signalcode': {
    elName: 'RadSignalcode',
    name: '条形码',
    desc: '根据输入自动生成条形码，每个页面仅可配置一个。',
    defaultValue: '',
    src: '',
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    domain: '',
    domainType: 'domain',
    styleSheet: {
      width: '100%'
    },
    background: 'transparent',
    displayValue: false,
    text: '',
    textAlign: 'center',
    textPosition: 'bottom',
    textSize: 20,
    codeWidth: 2,
    codeHeight: 50
  },
  'rad-drcode': {
    elName: 'RadDrcode',
    name: '二维码',
    desc: '',
    defaultValue: '',
    src: '',
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    domain: '',
    domainType: 'domain',
    styleSheet: {
      width: '100%'
    },
    background: 'transparent',
    displayValue: false,
    text: '',
    textAlign: 'center',
    textPosition: 'bottom',
    textSize: 20,
    codeHeight: 50
  },
  'rad-editor': {
    elName: 'RadEditor',
    name: '富文本',
    desc: '可控制文本样式，添加图片。',
    type: 'textarea',
    placeholder: '',
    label: '',
    defaultValue: '',
    noLabel: false,
    inline: false,
    styleSheet: styleSheet,
    domain: '',
    domainType: 'domain',
    baseProps: baseProps,
    validate: {
      required: false
    },
    fontColor: '#333',
    fontSize: 12,
    fontWeight: 400,
    fontStyle: 'normal',
    textDecoration: 'none'
  },
  'rad-signature': {
    elName: 'RadSignature',
    name: '操作人',
    desc: '可设置为单行或多行。',
    type: 'input',
    placeholder: '',
    label: '',
    defaultValue: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    domain: '',
    domainType: 'domain',
    baseProps: baseProps,
    validate: validate,
    imagePosi: 'right',
    imgHeight: '32',
    imgWidth: '50'
  }
}

const pickerMap: object = {
  second: [{
    label: 'YYYY-MM-DD HH:mm:ss',
    value: 'YYYY-MM-DD HH:mm:ss'
  },
  {
    label: 'YY-MM-DD HH:mm:ss',
    value: 'YY-MM-DD HH:mm:ss'
  },
  {
    label: 'YYYY/MM/DD HH:mm:ss',
    value: 'YYYY/MM/DD HH:mm:ss'
  },
  {
    label: 'YY/MM/DD HH:mm:ss',
    value: 'YY/MM/DD HH:mm:ss'
  },
  {
    label: 'HH:mm:ss',
    value: 'HH:mm:ss'
  }],
  minute: [
    {
      label: 'YYYY-MM-DD HH:mm',
      value: 'YYYY-MM-DD HH:mm'
    },
    {
      label: 'YY-MM-DD HH:mm',
      value: 'YY-MM-DD HH:mm'
    },
    {
      label: 'YYYY/MM/DD HH:mm',
      value: 'YYYY/MM/DD HH:mm'
    },
    {
      label: 'YY/MM/DD HH:mm',
      value: 'YY/MM/DD HH:mm'
    }
  ],
  date: [
    {
      label: 'YYYY-MM-DD',
      value: 'YYYY-MM-DD'
    }, {
      label: 'YY-MM-DD',
      value: 'YY-MM-DD'
    }, {
      label: 'YYYY/MM/DD',
      value: 'YYYY/MM/DD'
    }, {
      label: 'YY/MM/DD',
      value: 'YY/MM/DD'
    }, {
      label: 'DD/MM/YYYY',
      value: 'DD/MM/YYYY'
    }, {
      label: 'DD/MM/YY',
      value: 'DD/MM/YY'
    }
  ],
  month: [
    {
      label: 'YYYY-MM',
      value: 'YYYY-MM'
    },
    {
      label: 'YY-MM',
      value: 'YY-MM'
    },
    {
      label: 'YYYY/MM',
      value: 'YYYY/MM'
    },
    {
      label: 'YY/MM',
      value: 'YY/MM'
    }
  ],
  quarter: [
    {
      label: 'YYYY年 第Q季度',
      value: 'YYYY年 第Q季度'
    },
    {
      label: 'YY年 第Q季度',
      value: 'YY年 第Q季度'
    }
  ],
  year: [
    {
      label: 'YYYY',
      value: 'YYYY'
    },
    {
      label: 'YY',
      value: 'YY'
    }
  ]
}

// 可选时间选择器类型
const pickerList = [
  {
    label: '秒',
    value: 'second'
  },
  {
    label: '分',
    value: 'minute'
  },
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '月',
    value: 'month'
  },
  {
    label: '季度',
    value: 'quarter'
  },
  {
    label: '年',
    value: 'year'
  }
]

// 字体列表
const fontFamilyList = [
  {
    label: '宋体',
    value: 'SimSun'
  }, {
    label: '新宋体',
    value: 'NSimSun'
  }, {
    label: '仿宋',
    value: 'FangSong'
  }, {
    label: '楷体',
    value: 'KaiTi'
  }, {
    label: '黑体',
    value: 'SimHei'
  }, {
    label: '微软雅黑',
    value: 'Microsoft YaHei'
  }, {
    label: 'Times New Roman',
    value: 'Times New Roman'
  }, {
    label: '隶书',
    value: 'LiSu'
  }, {
    label: '幼圆',
    value: 'YouYuan'
  }
];

// 规则列表
const ruleList = [
  {
    label: '字母',
    value: 'wordsOnly'
  }, {
    label: '字母数字',
    value: 'wordsOrNum'
  }, {
    label: '数字',
    value: 'number'
  }, {
    label: '大写字母',
    value: 'capital'
  }, {
    label: '小写字母',
    value: 'lowercase'
  }, {
    label: '6个字母',
    value: 'sixWords'
  }, {
    label: '6个数字',
    value: 'sixNums'
  }, {
    label: '邮政编码',
    value: 'postNum'
  }, {
    label: '身份证号',
    value: 'idNum'
  }, {
    label: '其他',
    value: 'custom'
  }
]

// 样式表转表单映射规则
const sheet2Form = {
  fontFamily: {
    type: 'a-select',
    label: '字体',
    options: fontFamilyList
  },
  fontSize: {
    type: 'a-input-number',
    label: '大小'
  },
  fontWeight: {
    type: 'a-input-number',
    label: '粗细'
  },
  color: {
    type: 'a-input',
    label: '颜色'
  },
  justifyContent: {
    type: 'a-select',
    label: '对齐方式',
    options: [{
      label: '左', value: 'left'
    }, {
      label: '中', value: 'center'
    }, {
      label: '右', value: 'right'
    }]
  },
  backgroundColor: {
    type: 'a-input',
    label: '填充色'
  },
  wrap: {
    type: 'a-select',
    label: '超出一行',
    options: [{
      label: '隐藏', value: 'noWrap'
    }, {
      label: '自动换行', value: 'autoWrap'
    }]
  },
  textDecoration: {
    type: 'a-select',
    label: '下划线',
    options: [{
      label: '关闭', value: 'none'
    }, {
      label: '开启', value: 'underline'
    }]
  },
  fontStyle: {
    type: 'a-select',
    label: '文字风格',
    options: [{
      label: '正常', value: 'normal'
    }, {
      label: '斜体', value: 'italic'
    }, {
      label: '倾斜', value: 'oblique'
    }]
  },
  borderWidth: {
    type: 'a-input-number',
    label: '边框粗细'
  },
  borderColor: {
    type: 'a-input',
    label: '边框颜色'
  },
  borderStyle: {
    type: 'a-select',
    label: '边框类型',
    options: [{
      label: '实线', value: 'solid'
    }, {
      label: '虚线', value: 'dashed'
    }, {
      label: '点状', value: 'dotted'
    }, {
      label: '双线', value: 'double'
    }]
  },
  readonly: {
    type: 'a-checkbox',
    label: '只读'
  },
  hideOnPrint: {
    type: 'a-checkbox',
    label: '打印隐藏'
  },
  required: {
    type: 'a-checkbox',
    label: '必填'
  },
  limitLength: {
    type: 'a-checkbox',
    label: '限制长度'
  },
  limitRule: {
    type: 'a-checkbox',
    label: '限制格式'
  },
  width: {
    type: 'a-select',
    label: '宽度',
    options: [{
      label: '1', value: '100%'
    }, {
      label: '3/4', value: 300 / 4 + '%'
    }, {
      label: '2/3', value: 66 + '%'
    }, {
      label: '1/2', value: '50%'
    }, {
      label: '1/3', value: 33 + '%'
    }, {
      label: '1/4', value: 100 / 4 + '%'
    }, {
      label: '1/6', value: 16 + '%'
    }, {
      label: '1/8', value: 100 / 8 + '%'
    }]
  },
  paddingTop: {
    type: 'a-input-number',
    label: '上边距'
  },
  paddingBottom: {
    type: 'a-input-number',
    label: '下边距'
  },
  paddingLeft: {
    type: 'a-input-number',
    label: '左边距'
  },
  paddingRight: {
    type: 'a-input-number',
    label: '右边距'
  }
}

// 可选纸张
const tplTypeList: Array<any> = [
  {
    value: 'a4',
    label: 'A4(210x297)',
    width: '210mm',
    height: '297mm'
  },
  {
    value: 'a5a',
    label: 'A5纵(148x210)',
    width: '148mm',
    height: '210mm'
  },
  {
    value: 'a5b',
    label: 'A5横(210x148)',
    width: '210mm',
    height: '148mm'
  },
  {
    value: 'custom',
    label: '自定义宽高',
    width: '210mm',
    height: '297mm'
  }
]

const editorMenus = [
  'undo', // 撤销
  'redo', // 重复
  'head', // 标题
  'bold', // 粗体
  'fontSize', // 字号
  'fontName', // 字体
  'lineHeight',// 
  'italic', // 斜体
  'underline', // 下划线
  'strikeThrough', // 删除线
  'foreColor', // 文字颜色
  'backColor', // 背景颜色
  'list', // 列表
  'justify' // 对齐方式
];

const editorFontSizes = {
  'small': {
    name: '13px',
    value: '2'
  },
  'normal': {
    name: '14px',
    value: '3'
  },
  'large': {
    name: '18px',
    value: '4'
  },
  'x-largr': {
    name: '24px',
    value: '5'
  },
  'xx-large': {
    name: '32px',
    value: '6'
  },
  'xxx-large': {
    name: '48px',
    value: '7'
  }
}

export {
  compsList,
  tplTypeList,
  compBaseConfig,
  sheet2Form,
  ruleList,
  pickerList,
  pickerMap,
  editorMenus,
  editorFontSizes
}