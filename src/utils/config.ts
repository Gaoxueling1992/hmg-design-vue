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
    // eleWidth: '50%',
    placeholder: '',
    defaultValue: '',
    inline: true,
    noLabel: true,
    styleSheet: {
      fontSize: '14px',
      fontWeight: '400',
      color: '',
      textAlign: 'center',
      backgroundColor: '',
      wrap: '',
      underline: false,
      fontStyle: '',
      fontFamily: '',
      border: ''
    }
  },
  'rad-input': {
    elName: 'RadInput',
    name: '输入框',
    // eleWidth: '100%',
    placeholder: '',
    defaultValue: ''
  },
  'rad-datetime': {
    elName: 'RadDatetime',
    name: '时间',
    // eleWidth: '100%',
    placeholder: '',
    defaultValue: ''
  },
  'rad-number': {
    elName: 'RadNumber',
    name: '数值',
    // eleWidth: '100%',
    placeholder: '请填写数值',
    defaultValue: ''
  },
  'rad-line': {
    elName: 'RadLine',
    name: '分割线',
    eleWidth: '100%',
    placeholder: '请填写数值',
    defaultValue: '',
    noLabel: true
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
  compBaseConfig
}