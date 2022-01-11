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
    elName: 'rad-number',
    title: '数值'
  },
  {
    elName: 'rad-datetime',
    title: '时间'
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
    title: '签名'
  }
]

const styleSheet = {
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
  width: '100%'
}

const baseProps = {
  readonly: false, // 只读
  hideOnPrint: false, // 打印隐藏
  // rules: [], // 业务规则
  // script: '' // 控件脚本
}

const validate = {
  required: false, // 是否必填
  limitLength: false, // 限定输入长度
  minLength: 0,
  maxLength: 1000,
  limitRule: false // 限定输入格式
  // rule: ''
}

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
    validate: validate
  },
  'rad-datetime': {
    elName: 'RadDatetime',
    name: '时间',
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
      require: false
    }
  },
  'rad-number': {
    elName: 'RadNumber',
    name: '数值',
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
      require: false, // 是否必填
      limitLength: false // 限定输入长度
    }
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
      width: '100%'
    }
  }
}

const sheet2Form = {
  fontFamily: {
    type: 'a-select',
    label: '字体',
    options: [{
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
    }]
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
    options:  [{
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
    options:  [{
      label: '隐藏', value: 'noWrap'
    }, {
      label: '自动换行', value: 'autoWrap'
    }]
  },
  textDecoration: {
    type: 'a-select',
    label: '下划线',
    options:  [{
      label: '关闭', value: 'none'
    }, {
      label: '开启', value: 'underline'
    }]
  },
  fontStyle: {
    type: 'a-select',
    label: '文字风格',
    options:  [{
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
    options:  [{
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
    options:  [{
      label: '1', value: '100%'
    }, {
      label: '3/4', value: 300/4 + '%'
    }, {
      label: '2/3', value: 200/3 + '%'
    }, {
      label: '1/2', value: '50%'
    }, {
      label: '1/3', value: 100/3 + '%'
    }, {
      label: '1/4', value: 100/4 + '%'
    }]
  }
}

const tplTypeList: Array<Object> = [
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

export {
  compsList,
  tplTypeList,
  compBaseConfig,
  sheet2Form
}