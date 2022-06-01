// 报告设计器组件列表
const compsList: Array<object> = [
  {
    elName: 'rad-text',
    title: '文本',
    isForm: true
  },
  {
    elName: 'rad-input',
    title: '输入框',
    isForm: true
  },
  {
    elName: 'rad-datetime',
    title: '时间',
    isForm: true
  },
  {
    elName: 'rad-number',
    title: '数值',
    isForm: true
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

const areaList: Array<object> = [
  {
    title: '复合组件',
    elName: 'combination-area'
  }
]

// 样式表属性
const styleSheet: object = {
  fontFamily: 'Microsoft YaHei',
  fontWeight: '400',
  fontSize: '18',
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
}

// 组件预设属性
const compBaseConfig = {
  'rad-text': {
    elName: 'RadText',
    name: '文本',
    desc: '静态文本，可编辑文字和样式。',
    placeholder: '',
    value: '',
    label: '',
    inline: true,
    noLabel: true,
    styleSheet: styleSheet,
    baseProps: {
      hideOnPrint: false
    },
    threshold: '',
    domainType: 'domain',
    elType: 'onlytext',
    rules: {},
    display: true,
  },
  'rad-input': {
    elName: 'RadInput',
    name: '输入框',
    desc: '可设置为单行或多行。',
    type: 'text',
    placeholder: '',
    label: '',
    value: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    threshold: '',
    domainType: 'domain',
    baseProps: baseProps,
    prefix: '',
    suffix: '',
    elType: 'text',
    rules: {},
    display: true,
  },
  'rad-datetime': {
    elName: 'RadDatetime',
    name: '时间',
    desc: '可设置日期、日期+时间、时间范围。',
    placeholder: '',
    label: '',
    inline: true,
    value: null,
    styleSheet: styleSheet,
    threshold: '',
    domainType: 'domain',
    baseProps: {
      readonly: false
    },
    prefix: '',
    suffix: '',
    format: 'YYYY-MM-DD',
    picker: 'date',
    rangeOpen: false,
    elType: 'date',
    rules: {},
    display: true,
  },
  'rad-single-select': {
    elName: 'RadSingleSelect',
    name: '单选',
    type: 'select',
    desc: '从预设的下拉菜单中选择一项，可设置为平铺模式。',
    placeholder: '',
    label: '',
    value: '',
    prefix: '',
    suffix: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    threshold: '',
    domainType: 'domain',
    baseProps: baseProps,
    layout: 'crosswise',
    options: [],
    elType: 'singles',
    rules: {},
    display: true,
  },
  'rad-mul-select': {
    elName: 'RadMulSelect',
    name: '多选',
    type: 'select',
    desc: '从预设的选项中选择一项或者多项。',
    placeholder: '',
    label: '',
    value: [],
    prefix: '',
    suffix: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    threshold: '',
    domainType: 'domain',
    baseProps: baseProps,
    layout: 'crosswise',
    options: [],
    defaultType: [],
    elType: 'muls',
    rules: {},
    display: true,
  },
  'rad-number': {
    elName: 'RadNumber',
    name: '数值',
    desc: '支持输入整数、小数。',
    placeholder: '请填写数值',
    label: '',
    value: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    threshold: '',
    domainType: 'domain',
    baseProps: baseProps,
    prefix: '',
    suffix: '',
    min: 0,
    max: 1000,
    elType: 'number',
    rules: {},
    display: true,
  },
  'rad-line': {
    elName: 'RadLine',
    name: '分割线',
    placeholder: '请填写数值',
    label: '',
    value: '',
    noLabel: true,
    styleSheet: {
      fontFamily: 'Microsoft YaHei',
      fontWeight: '400',
      fontSize: '18',
      color: '#333333',
      width: '100%',
      paddingTop: '0',
      paddingBottom: '0'
    },
    elType: 'other',
    rules: {},
    display: true,
  },
  'rad-image': {
    elName: 'RadImage',
    name: '图片',
    desc: '支持上传.png，.jpeg，.jpg， *.pjpeg，*.jfif，*.pjg格式的图片。',
    value: '',
    src: '',
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    threshold: '',
    domainType: '',
    styleSheet: {
      width: '100%',
      paddingTop: '0',
      paddingBottom: '0',
      paddingLeft: '0',
      paddingRight: '0'
    },
    imgHeight: '100',
    imgWidth: '100',
    elType: 'other',
    rules: {},
    display: true,
  },
  'rad-table': {
    elName: 'RadTable',
    name: '表格',
    desc: '支持选择和样式设置的表格组件。',
    value: {},
    src: '',
    noLabel: true,
    baseProps: {
      hideOnPrint: false,
      readonly: false
    },
    threshold: '',
    domainType: 'domain',
    styleSheet: {
      fontFamily: 'Microsoft YaHei',
      fontSize: '18',
      color: '#333333',
      backgroundColor: '',
      textDecoration: 'none',
      fontStyle: 'normal',
      width: '100%'
    },
    defaultType: {},
    inputs: {},
    elType: 'table',
    rules: {},
    display: true,
  },
  'rad-mulitImagepicker': {
    elName: 'RadMulitImagepicker',
    name: '图片选择器',
    desc: '',
    value: [],
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    threshold: '',
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
    defaultType: [],
    hideSelectBtn: true,
    elType: 'imgp',
    rules: {},
    display: true,
  },
  'rad-signalcode': {
    elName: 'RadSignalcode',
    name: '条形码',
    desc: '根据输入自动生成条形码，每个页面仅可配置一个，配置规则：大小写字母+数字。',
    value: '',
    src: '',
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    threshold: '',
    domainType: '',
    styleSheet: styleSheet,
    background: 'transparent',
    displayValue: false,
    text: '',
    textAlign: 'center',
    textPosition: 'bottom',
    textSize: 20,
    codeWidth: 2,
    codeHeight: 50,
    elType: 'other',
    rules: {},
    display: true,
  },
  'rad-drcode': {
    elName: 'RadDrcode',
    name: '二维码',
    desc: '',
    value: '',
    src: '',
    noLabel: true,
    baseProps: {
      hideOnPrint: false
    },
    threshold: '',
    domainType: '',
    styleSheet: {
      width: '100%',
      paddingTop: '0',
      paddingBottom: '0',
      paddingLeft: '0',
      paddingRight: '0'
    },
    background: 'transparent',
    displayValue: false,
    text: '',
    textAlign: 'center',
    textPosition: 'bottom',
    textSize: 20,
    imgHeight: '100',
    imgWidth: '100',
    img: '',
    elType: 'other',
    rules: {},
    display: true,
  },
  'rad-editor': {
    elName: 'RadEditor',
    name: '富文本',
    desc: '可控制文本样式，添加图片。',
    type: 'textarea',
    placeholder: '',
    label: '',
    value: '',
    noLabel: false,
    inline: false,
    styleSheet: styleSheet,
    threshold: '',
    domainType: 'domain',
    baseProps: baseProps,
    fontColor: '#333',
    fontSize: 18,
    fontWeight: 400,
    containerMinHeight: 0,
    fontStyle: 'normal',
    textDecoration: 'none',
    elType: 'text',
    rules: {},
    display: true,
  },
  'rad-signature': {
    elName: 'RadSignature',
    name: '操作人',
    desc: '可设置为单行或多行。',
    type: 'input',
    placeholder: '',
    label: '',
    value: '',
    noLabel: false,
    inline: true,
    styleSheet: styleSheet,
    threshold: '',
    domainType: 'domain',
    baseProps: baseProps,
    imagePosi: 'right',
    imgHeight: '32',
    imgWidth: '50',
    elType: 'sig',
    rules: {},
    src: '',
    display: true,
    srcs: [],
    splitWords: ''
  },
  'combination-area': {
    elName: 'CombinationArea',
    name: '复合组件',
    desc: '表单复合组件，可将多个表单控件聚合成一体。',
    type: 'comb',
    label: '',
    inline: false,
    styleSheet: styleSheet,
    compsList: [],
    align: 'left',
    layout: 'top',
    elType: 'other',
    rules: {},
    display: true,
  }
}

const ruleMap: object = {
  'other': {
    n: '其他',
    conditionList: []
  },
  'sig': {
    n: '操作人',
    conditionList: [
      {
        key: '10',
        value: '无条件'
      }
    ]
  },
  'onlytext': {
    n: '纯文本',
    conditionList: [
      {
        key: '10',
        value: '无条件'
      }
    ]
  },
  'text': {
    n: '文本',
    conditionList: [
      {
        key: '0',
        value: '包含'
      },
      {
        key: '1',
        value: '不包含'
      },
      {
        key: '2',
        value: '是'
      },
      {
        key: '3',
        value: '不是'
      },
      {
        key: '4',
        value: '开头为',
      },
      {
        key: '5',
        value: '结尾为',
      },
      {
        key: '6',
        value: '为空'
      },
      {
        key: '7',
        value: '不为空'
      },
      {
        key: '10',
        value: '无条件'
      }
    ]
  },
  'imgp': {
    n: '图片选择器',
    conditionList: [
      {
        key: '11',
        value: '数量在范围内'
      },
      {
        key: '12',
        value: '数量不在范围内'
      },
      {
        key: '3',
        value: '数量不等于'
      },
      {
        key: '13',
        value: '数量大于'
      },
      {
        key: '14',
        value: '数量大于等于'
      },
      {
        key: '15',
        value: '数量小于'
      },
      {
        key: '16',
        value: '数量小于等于'
      },
      {
        key: '2',
        value: '数量等于'
      },
      {
        key: '10',
        value: '无条件'
      }
    ]
  },
  'number': {
    n: '数值',
    conditionList: [
      {
        key: '11',
        value: '在范围内(包含)'
      },
      {
        key: '12',
        value: '不在范围内'
      },
      {
        key: '3',
        value: '不等于'
      },
      {
        key: '13',
        value: '大于'
      },
      {
        key: '14',
        value: '大于等于'
      },
      {
        key: '15',
        value: '小于'
      },
      {
        key: '16',
        value: '小于等于'
      },
      {
        key: '2',
        value: '等于'
      },
      {
        key: '10',
        value: '无条件'
      }
    ]
  },
  'table': {
    n: '表格',
    conditionList: [
      {
        key: '10',
        value: '无条件'
      }
    ]
  },
  'singles': {
    n: '单选',
    conditionList: [
      {
        key: '2',
        value: '是'
      },
      {
        key: '3',
        value: '不是'
      },
      {
        key: '10',
        value: '无条件'
      }
    ]
  },
  'muls': {
    n: '多选',
    conditionList: [
      {
        key: '2',
        value: '是'
      },
      {
        key: '3',
        value: '不是'
      },
      {
        key: '0',
        value: '包含'
      },
      {
        key: '1',
        value: '不包含'
      },
      {
        key: '6',
        value: '为空'
      },
      {
        key: '7',
        value: '不为空'
      },
      {
        key: '10',
        value: '无条件'
      }
    ]
  },
  'date': {
    n: '时间',
    conditionList: [{
      key: '2',
      value: '是'
    },
    {
      key: '3',
      value: '不是'
    },
    {
      key: '15',
      value: '早于'
    },
    {
      key: '13',
      value: '晚于'
    },
    {
      key: '14',
      value: '不早于'
    },
    {
      key: '16',
      value: '不晚于'
    },
    {
      key: '11',
      value: '在范围内'
    },
    {
      key: '12',
      value: '不在范围内'
    },
    {
      key: '6',
      value: '为空'
    },
    {
      key: '7',
      value: '不为空'
    },
    {
      key: '10',
      value: '无条件'
    }
    ]
  }
};

const actionList: any = {
  'sig': [
    {
      key: 6,
      value: '拼接'
    },
    {
      key: 2,
      value: '可编辑',
      disableOp: ['submit']
    },
    {
      key: 3,
      value: '只读',
      disableOp: ['submit']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    },
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    }
  ],
  'table': [
    {
      key: 2,
      value: '可编辑',
      disableOp: ['submit']
    },
    {
      key: 3,
      value: '只读',
      disableOp: ['submit']
    },
    {
      key: 7,
      value: '加载表格',
      disableOp: ['submit']
    },
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    }
  ],
  'text': [
    {
      key: 6,
      value: '拼接'
    },
    {
      key: 2,
      value: '可编辑',
      disableOp: ['submit']
    },
    {
      key: 3,
      value: '只读',
      disableOp: ['submit']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    },
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    },
    {
      key: 0,
      value: '追加前后缀'
    }
  ],
  'date': [
    {
      key: 0,
      value: '追加前后缀'
    },
    {
      key: 2,
      value: '可编辑',
      disableOp: ['submit']
    },
    {
      key: 3,
      value: '只读',
      disableOp: ['submit']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    },
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    },
  ],
  'muls': [
    {
      key: 0,
      value: '追加前后缀'
    },
    {
      key: 2,
      value: '可编辑',
      disableOp: ['submit']
    },
    {
      key: 3,
      value: '只读',
      disableOp: ['submit']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    },
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    }
  ],
  'number': [
    {
      key: 0,
      value: '追加前后缀'
    },
    {
      key: 2,
      value: '可编辑',
      disableOp: ['submit']
    },
    {
      key: 3,
      value: '只读',
      disableOp: ['submit']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    },
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    },
  ],
  'imgp': [
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    // {
    //   key: 1,
    //   value: '属性',
    //   disableOp: ['init']
    // },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    }
  ],
  'onlytext': [
    {
      key: 6,
      value: '拼接'
    },
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    }
  ],
  'singles': [
    {
      key: 0,
      value: '追加前后缀'
    },
    {
      key: 2,
      value: '可编辑',
      disableOp: ['submit']
    },
    {
      key: 3,
      value: '只读',
      disableOp: ['submit']
    },
    {
      key: 8,
      value: '提示',
      disableOp: ['init']
    },
    {
      key: -1,
      value: '隐藏控件',
      disableOp: ['submit']
    },
    {
      key: -2,
      value: '打印隐藏',
      disableOp: ['init']
    }
  ],
  'other': []
};

const opportunityMap: any = {
  'init': '初始化',
  // 'change': '值变化时',
  'submit': '提交前'
};

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
    label: '字号'
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

const editorColors = [
  'transparent',
  '#000000',
  '#1c487f',
  '#4d80bf', '#FFFFFF',
  '#3B99D4', '#8ED14B', '#F06B49', '#ECC2F1', '#82C7C3', '#E3698A', '#1776EB', '#F5B2AC', '#533085', '#89363A', '#19413E', '#D92B45', '#60C9FF', '#1B9F2E', '#BA217D', '#076B82'
];

const editorFontSizes = {
  'x-small': {
    name: '12px',
    value: '1'
  },
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
  editorColors,
  editorFontSizes,
  areaList,
  ruleMap,
  actionList,
  opportunityMap
}