const pageConfig: Object = {
  lines: [], // 区域
  name: '',
  pageType: 'a4',
  styleSheet: {
    minHeight: '297mm',
    width: '210mm',
    padding: '10px'
  }
}
const formPageConfig: Object = {
  lines: [], // 区域
  name: '',
  pageType: 'a4',
  styleSheet: {
    minHeight: '100%',
    width: '100%',
    padding: '10px'
  }
}

const styleSheetObj: Object = {
  'a4': {
    minHeight: '297mm',
    width: '210mm'
  },
  'a5a': {
    minHeight: '210mm',
    width: '148mm'
  },
  'a5b': {
    minHeight: '148mm',
    width: '210mm'
  },
  'custom': {
    minHeight: '100mm',
    width: '100mm'
  }
}

export {
  pageConfig,
  formPageConfig,
  styleSheetObj
}