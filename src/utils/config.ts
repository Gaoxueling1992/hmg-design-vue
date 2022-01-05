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
  // {
  //   elName: 'a-input',
  //   title: '输入框'
  // },
  // {
  //   elName: 'rad-select',
  //   title: '下拉选择'
  // },
  // {
  //   elName: 'rad-datetime',
  //   title: '时间选择器'
  // },
  // {
  //   elName: 'rad-table',
  //   title: '表格'
  // },
  // {
  //   elName: 'rad-image',
  //   title: '图片'
  // },
  // {
  //   elName: 'rad-mulitImagepicker',
  //   title: '图片选择器'
  // },
  // {
  //   elName: 'rad-line',
  //   title: '直线'
  // },
  // {
  //   elName: 'rad-drcode',
  //   title: '条形码/二维码'
  // },
  // {
  //   elName: 'rad-editor',
  //   title: '富文本'
  // },
  // {
  //   elName: 'rad-operator',
  //   title: '操作人'
  // }
]

const compBaseConfig: Object = {
  'rad-text': {
    elName: 'rad-text',
    name: '文本',
    eleWidth: '100%',
    placeholder: '',
    defaultValue: ''
  },
  'rad-input': {
    elName: 'rad-input',
    name: '输入框',
    eleWidth: '100%',
    placeholder: '',
    defaultValue: ''
  },
  'rad-number': {
    elName: 'rad-number',
    name: '数值',
    eleWidth: '100%',
    placeholder: '请填写数值',
    defaultValue: ''
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