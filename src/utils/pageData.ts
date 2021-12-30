const pageConfig: object = {
  areas: [], // 区域
  fixedHeader: {
    openFixed: false,
    height: '50mm'
  },
  fixedFooter: {
    openFixed: false,
    height: '50mm'
  },
  name: '',
  pageType: 'a4',
  styleSheet: {
    minHeight: '297mm',
    width: '210mm',
    padding: '5mm'
  },
  totalPages: 1,
  backgroundSize: 20,
  backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==")'
}

const areaConfig: object = {
  type: 'form', // 'form'表单区域， 'normal'图文区域， 'editor'富文本区域，
  elements: [],
  styleSheet: {
    minHeight: '30px'
  }
}

export {
  pageConfig,
  areaConfig
}