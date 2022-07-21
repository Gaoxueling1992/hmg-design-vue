/*
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-12 11:36:49
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-21 09:50:50
 * @FilePath: /hmg-design-vue/src/utils/pageData.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const pageConfig: Object = {
  lines: [], // 区域
  name: '',
  version: '2.0',
  pageType: '',
  newPage: false,
  pageNumType: 0,
  pageNumPosi: 0,
  id: '',
  styleSheet: {
    minHeight: '297mm',
    width: '210mm',
    padding: '5mm'
  },
  pageHeaderId: '',
  pageFooterId: '',
  headerLine: -1,
  footerLine: 9999
}
const formPageConfig: Object = {
  lines: [], // 区域
  name: '',
  pageType: 'a4',
  newPage: false,
  id: '',
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