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
    styleSheet: {
      fontFamily: 'Microsoft YaHei',
      fontWeight: '400',
      fontSize: '14',
      color: '',
      textAlign: 'center',
      backgroundColor: '',
      wrap: '',
      underline: false,
      fontStyle: '',
      border: ''
    }
  },
  'rad-input': {
    elName: 'RadInput',
    name: '输入框',
    placeholder: '',
    label: '',
    defaultValue: '',
    noLabel: false,
    inline: true,
    styleSheet: {
      fontFamily: 'Microsoft YaHei',
      fontWeight: '400',
      fontSize: '14',
      color: '',
      textAlign: 'center',
      backgroundColor: '',
      wrap: '',
      underline: false,
      fontStyle: '',
      border: ''
    }
  },
  'rad-datetime': {
    elName: 'RadDatetime',
    name: '时间',
    placeholder: '',
    label: '',
    defaultValue: '',
    styleSheet: {
      fontFamily: 'Microsoft YaHei',
      fontWeight: '400',
      fontSize: '14',
      color: '',
      textAlign: 'center',
      backgroundColor: '',
      wrap: '',
      underline: false,
      fontStyle: '',
      border: ''
    }
  },
  'rad-number': {
    elName: 'RadNumber',
    name: '数值',
    placeholder: '请填写数值',
    label: '',
    defaultValue: '',
    styleSheet: {
      fontFamily: 'Microsoft YaHei',
      fontSize: '14',
      fontWeight: '400',
      color: '',
      textAlign: 'center',
      backgroundColor: '',
      wrap: '',
      underline: false,
      fontStyle: '',
      border: ''
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
      color: '',
      textAlign: 'center',
      backgroundColor: '',
      border: ''
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
    type: 'el-color-picker',
    label: '颜色'
  },
  textAlign: {
    
  },
  backgroundColor: {
    
  },
  wrap: {
    
  },
  underline: {
    
  },
  fontStyle: {
    
  },
  border: {
    
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