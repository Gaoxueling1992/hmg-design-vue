<template>
  <template v-if="isEditor">
    <EditCanvas
      class="edit-canvas"
      id="editCanvas"
      :style="{
        'backgroundColor': isReadonlyStatus ? 'transparent' : '#E4E7EE',
        zoom: zoom + '%'
      }"
    ></EditCanvas>
  </template>
  <a-layout v-else>
    <a-layout-sider
      width="260px"
      class="padding20"
    >
      <CompsArea></CompsArea>
    </a-layout-sider>
    <a-layout-content class="edit-canvas-container border-l border-r padding10 marginB30">
      <CanvasArea @clickCanvas="clickCanvas"></CanvasArea>
      <a-tooltip placement="left">
        <template #title>
          <span>预览</span>
        </template>
        <a-button
          class="edit-canvas-preview"
          shape="circle"
          @click="openPreview"
        >
          <template #icon>
            <i class="iconfont iconpreview_border"></i>
          </template>
        </a-button>
      </a-tooltip>
    </a-layout-content>
    <a-layout-sider width="260px">
      <PageAttr v-if="activePosi===0"></PageAttr>
      <CompAttr v-if="activePosi===1"></CompAttr>
    </a-layout-sider>
  </a-layout>
  <a-modal
    v-model:visible="visible"
    width="100%"
    wrap-class-name="full-modal"
    :footer="null"
    destroyOnClose
    @cancel="closePreview"
  >
    <a-button
      class="print-preview"
      type="primary"
      @click="checkStatus"
    >{{ isReadonlyStatus === true ? '编辑效果' : '打印效果'}}</a-button>
    <EditCanvas
      class="edit-canvas"
      id="editCanvas"
      :style="{
        'backgroundColor': isReadonlyStatus ? 'transparent' : '#E4E7EE'
      }"
    ></EditCanvas>
  </a-modal>
  <div
    id="context-menu1"
    style="display: none"
  ></div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  provide,
  Ref,
  watch,
  toRefs,
  nextTick
} from 'vue';
import { pageConfig, styleSheetObj } from '@/utils/pageData';
import { compBaseConfig } from '@/utils/config';
import { Modal } from 'ant-design-vue';
import {
  headStr,
  footStr,
  openFixedAreaStr,
  pageStr1,
  pageStr2,
  pageStrStyle
} from '@/utils/tpl-config';
import { getOneMmsPx, dealWithRules } from '@/utils/util';
// 处理主体数据
const handlePageData = (pageData: any) => {
  const changePageConfig = (e: { key: string; value: string }) => {
    const { key, value } = e;
    pageData[key] = value;
    if (key === 'pageType') {
      pageData.styleSheet = {
        ...pageData.styleSheet,
        minHeight: styleSheetObj[value].minHeight,
        width: styleSheetObj[value].width
      };
    }
  };

  const changePageSize = (e: { key: string; value: any }) => {
    const { key, value } = e;
    pageData.styleSheet[key] = value + 'mm';
  };

  return { changePageConfig, changePageSize };
};

// 处理控件操作
const handleCompsOper = (
  emit:
    | ((event: string, ...args: any[]) => void)
    | ((event: string, ...args: any[]) => void),
  pageData: any,
  loading: any,
  pageId: any
) => {
  const activePosi: Ref<number> = ref(0);
  const activeCompObj: Ref<object> = ref({});
  const activeCompId: Ref<string> = ref('');
  const pageHeaderId: Ref<string> = ref(pageData.pageHeaderId);
  const pageFooterId: Ref<string> = ref(pageData.pageFooterId);
  const returnComp = (elName: string, cusInfo = {}) => {
    activePosi.value = 1;
    const id: string = new Date().getTime() + '';
    const baseConfig = reactive({
      ...compBaseConfig[elName],
      styleSheet: compBaseConfig[elName].styleSheet ? {
        ...compBaseConfig[elName].styleSheet
      } : null,
      baseProps: compBaseConfig[elName].baseProps ? {
        ...compBaseConfig[elName].baseProps
      } : null,
      rules: {}
    });
    activeCompObj.value = {
      ...baseConfig,
      id: id
    };
    if (cusInfo && cusInfo.threshold) {
      activeCompObj.value.label = cusInfo.label;
      activeCompObj.value.threshold = cusInfo.threshold;
      if (cusInfo.elValue) {
        activeCompObj.value.value = cusInfo.elValue;
      }
    }
    if (elName === 'combination-area') {
      activeCompObj.value.compsList = [];
    }
    activeCompId.value = id;
    return activeCompObj.value;
  };
  // 新增控件
  const addComp = (value: string, cusInfo = {}) => {
    activePosi.value = 1;
    const id: string = new Date().getTime() + '';
    const baseConfig = reactive({
      ...compBaseConfig[value],
      styleSheet: compBaseConfig[value].styleSheet ? {
        ...compBaseConfig[value].styleSheet
      } : null,
      baseProps: compBaseConfig[value].baseProps ? {
        ...compBaseConfig[value].baseProps
      } : null,
      options: compBaseConfig[value].options ? [
        ...compBaseConfig[value].options
      ] : [],
      rules: {}
    });
    activeCompObj.value = {
      ...baseConfig,
      id: id
    };
    if (cusInfo && cusInfo.threshold) {
      activeCompObj.value.label = cusInfo.label;
      activeCompObj.value.threshold = cusInfo.threshold;
      if (cusInfo.elValue) {
        activeCompObj.value.value = cusInfo.elValue;
      }
    }
    if (value === 'combination-area') {
      activeCompObj.value.compsList = [];
    }
    pageData.lines.push([activeCompObj.value]);
    pageData.lines.push([]);
    activeCompId.value = id;
  };
  // 删除控件
  const deleteComp = (idx: any, id: any) => {
    for (
      let i = 0;
      i < pageData.lines[+idx.value > 0 ? idx.value : 0].length;
      i++
    ) {
      if (pageData.lines[+idx.value > 0 ? idx.value : 0][i].id === id) {
        pageData.lines[+idx.value > 0 ? idx.value : 0].splice(i > 0 ? i : 0, 1);
        break;
      }
    }
    if (pageData.lines[+idx.value > 0 ? idx.value : 0].length === 0) {
      pageData.lines.splice(+idx.value > 0 ? idx.value : 0, 1);
    }
    setTimeout(() => {
      clickCanvas();
    });
  };
  // 复制控件
  const copyComp = (ele: any) => {
    const id: string = new Date().getTime() + '';
    activeCompObj.value = {
      ...ele,
      id: id,
      styleSheet: ele.styleSheet ? {
        ...ele.styleSheet
      } : null,
      baseProps: ele.baseProps ? {
        ...ele.baseProps
      } : null,
      options: ele.options ? [
        ...ele.options
      ] : [],
      rules: ele.rules ? JSON.parse(JSON.stringify(ele.rules)) : [],
      compsList: ele.compsList ? JSON.parse(JSON.stringify(ele.compsList)) : []
    };
    pageData.lines.push([activeCompObj.value]);
    pageData.lines.push([]);
    activeCompId.value = id;
    activePosi.value = 1;
  };
  // 激活控件
  const activeComp = (ele: any) => {
    activePosi.value = 1;
    activeCompId.value = ele.id;
    activeCompObj.value = ele;
  };
  // 设置页眉页脚
  const setFixedArea = (ele: any, typeStr: string, idx) => {
    let content = '';
    if (typeStr === 'footer') {
      if (pageData.pageHeaderId === ele.id) {
        content = '页脚不能和页眉设置为同一控件。';
      }
      if (pageData.headerLine > idx) {
        content = '页脚控件不能在页眉上方。';
      }
    }
    if (typeStr === 'header') {
      if (pageData.pageFooterId === ele.id) {
        content = '页眉不能和页脚设置为同一控件。';
      }
      if (pageData.footerLine < idx) {
        content = '页眉控件不能在页脚下方。';
      }
    }
    if (content) {
      Modal.confirm({
        title: '提示',
        content,
        okText: '我知道了',
        cancelText: '取消',
        onOk() {},
        onCancel() {}
      });
      return;
    }
    if (typeStr === 'header') {
      if (ele.id !== pageData.pageHeaderId) {
        pageHeaderId.value = ele.id;
        pageData.pageHeaderId = ele.id;
        pageData.headerLine = idx;
      } else {
        pageHeaderId.value = '';
        pageData.pageHeaderId = '';
        pageData.headerLine = -1;
      }
    } else {
      if (ele.id !== pageData.pageFooterId) {
        pageFooterId.value = ele.id;
        pageData.pageFooterId = ele.id;
        pageData.footerLine = idx;
      } else {
        pageFooterId.value = '';
        pageData.pageFooterId = '';
        pageData.footerLine = 9999;
      }
    }
  };
  // 保存模版
  const saveTpl = () => {
    if (pageData.lines.length) {
      for (let i = pageData.lines.length - 1; i >= 0; i--) {
        if (pageData.lines[i].length === 0) {
          pageData.lines.splice(i, 1);
        }
      }
      emit('saveTpl', { pageData, type: 0 });
      window.parent.postMessage(
        {
          type: 'doSaveDesigner',
          pageData: JSON.stringify(pageData),
          pageId: pageId.value
        },
        '*'
      );
    } else {
      Modal.warning({
        title: '提示',
        content: '检测到模版上没有控件，无法保存。',
        okText: '确定',
        onOk: () => {
          window.parent.postMessage({ type: 'onOk' }, '*');
        }
      });
    }
  };

  // 重置模版数据
  const resetData = () => {
    loading.value = true;
    pageData.lines = [];
    pageData.name = '';
    pageData.id = '';
    pageData.pageHeaderId = '';
    pageData.pageFooterId = '';
    pageData.headerLine = -1;
    pageData.footerLine = 9999;
    pageData.pageType = 'a4';
    pageData.pageNumType = 0;
    pageData.pageNumPosi = 0;
    pageData.styleSheet = {
      minHeight: '297mm',
      width: '210mm',
      padding: '10px'
    };
    activePosi.value = 0;
    activeCompObj.value = {};
    activeCompId.value = '';
    pageHeaderId.value = '';
    pageFooterId.value = '';
    loading.value = false;
  };

  // 新建模版
  const newTpl = (checkSave: number) => {
    if (pageData.lines.length && checkSave === 1) {
      Modal.confirm({
        title: '提示',
        content: '检测到您有未保存的模版，是否保存模版？',
        cancelText: '丢弃',
        okText: '保存',
        onOk() {
          saveTpl();
        },
        onCancel() {
          resetData();
        }
      });
    } else {
      resetData();
    }
  };

  // 解析外部传入的模版详情，用于渲染
  const editTpl = (item: any, pageId: string) => {
    let reg = new RegExp(`^([^]*)(v2)([^]*)$`);
    item.name = item.name.replace(reg, '$1$3');
    loading.value = true;
    pageData.lines = [];
    pageData.headerLine = -1;
    // 设计器在每行后面追加一行，方便拖拽
    if (pageId === 'designer') {
      let res = [[]];
      for (let i = 0; i < item.lines.length; i++) {
        res.push(item.lines[i]);
        res.push([]);
        for (let j = 0; j < item.lines[i].length; j++) {
          if (item.pageHeaderId && item.lines[i][j].id === item.pageHeaderId) {
            pageData.headerLine = i == 0 ? 0 : 2 * i - 1;
          }
          if (item.pageFooterId && item.lines[i][j].id === item.pageFooterId) {
            pageData.footerLine = i == 0 ? 0 : 2 * i - 1;
          }
        }
      }
      pageData.lines = [].concat(res);
    } else {
      console.log(item.pageHeaderId, item.pageFooterId);
      if (item.pageFooterId || item.pageHeaderId) {
        for (let i = 0; i < item.lines.length; i++) {
          for (let j = 0; j < item.lines[i].length; j++) {
            if (
              item.pageHeaderId &&
              item.lines[i][j].id === item.pageHeaderId
            ) {
              pageData.headerLine = i;
            }
            if (
              item.pageFooterId &&
              item.lines[i][j].id === item.pageFooterId
            ) {
              pageData.footerLine = i;
            }
          }
        }
      }
      pageData.lines = item.lines;
    }
    pageData.name = item.name;
    pageData.id = item.id;
    pageData.pageType = item.pageType;
    pageData.styleSheet = {
      minHeight: item.styleSheet.minHeight,
      width: item.styleSheet.width,
      padding: item.styleSheet.padding
    };
    pageData.pageFooterId = item.pageFooterId;
    pageData.pageHeaderId = item.pageHeaderId;
    pageData.pageNumType = item.pageNumType;
    pageData.pageNumPosi = item.pageNumPosi;
    pageHeaderId.value = item.pageHeaderId;
    pageFooterId.value = item.pageFooterId;
    activePosi.value = 0;
    activeCompObj.value = {};
    activeCompId.value = '';
    setTimeout(() => {
      loading.value = false;
    }, 500);
  };

  const clickCanvas = () => {
    activePosi.value = 0;
    activeCompId.value = '';
    activeCompObj.value = {};
  };

  return {
    saveTpl,
    newTpl,
    editTpl,
    addComp,
    activeComp,
    copyComp,
    deleteComp,
    activePosi,
    activeCompId,
    activeCompObj,
    clickCanvas,
    setFixedArea,
    pageHeaderId,
    pageFooterId,
    returnComp
  };
};

export default defineComponent({
  emits: ['saveTpl'],
  name: 'ReportContainer',
  setup(props, { emit }) {
    let pageData: any = reactive(pageConfig);
    const visible: Ref<boolean> = ref(false);
    const isReadonlyStatus: Ref<boolean> = ref(false);
    const isEditor = location.href.indexOf('isEditor') > -1 ? true : false;
    let tableList: any = reactive([]);
    const domainList = reactive([]);
    const { changePageConfig, changePageSize } = handlePageData(pageData);
    const isModified: Ref<boolean> = ref(false);
    const currentReport: Ref<string> = ref('');
    const splitField: Ref<string> = ref('');
    const splitRule: Ref<string> = ref('');
    const currentDec: Ref<string> = ref('');
    let calSplitField = null;
    const loading: Ref<boolean> = ref(true);
    const pageId: Ref<string> = ref('');
    let tempLines: any = [];
    let customComp: Ref<string> = ref('');
    const zoom: Ref<string> = ref('100');
    let tempToAave: any = null;

    const {
      addComp,
      activeComp,
      copyComp,
      deleteComp,
      saveTpl,
      newTpl,
      editTpl,
      activePosi,
      activeCompId,
      activeCompObj,
      clickCanvas,
      setFixedArea,
      pageHeaderId,
      pageFooterId,
      returnComp
    } = handleCompsOper(emit, pageData, loading, pageId);

    const checkStatus = () => {
      isReadonlyStatus.value = !isReadonlyStatus.value;
    };

    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const getDomHtml = () => {
      return sleep(100).then(
        (v) => document.getElementById('edit-canvas-body').innerHTML
      );
    };

    window.addEventListener('message', async (e) => {
      switch (e.data.type) {
        case 'resetZoom':
          zoom.value = e.data.data;
          break;
        case 'newTpl':
          newTpl(1);
          if (e.data.pageId) {
            pageId.value = e.data.pageId;
          }
          loading.value = false;
          break;
        case 'saveDesinger':
          if (visible.value) {
            visible.value = false;
            pageData.lines = [];
            setTimeout(() => {
              pageData.lines = JSON.parse(tempLines);
              saveTpl();
            });
          } else {
            saveTpl();
          }
          break;
        case 'resetData':
          if (e.data.zoom) {
            zoom.value = e.data.zoom;
          } else {
            zoom.value = '100';
          }
          if (e.data.splitJson) {
            let splitJson = JSON.parse(e.data.splitJson);
            currentDec.value = splitJson.calSplitField.filter(
              (item) => +item.id === +splitJson.currentReport
            )?.[0]?.label;
            currentReport.value = splitJson.currentReport;
            splitField.value = splitJson.splitField;
            splitRule.value = splitJson.splitRule;
            calSplitField = splitJson.calSplitField;
          }
          if (e.data.pageId) {
            pageId.value = e.data.pageId;
          }
          let data = JSON.parse(e.data.data);
          if (data) {
            editTpl(data, e.data.pageId);
          }
          break;
        case 'resetSplit':
          if (e.data.splitJson) {
            let splitJson = JSON.parse(e.data.splitJson);
            currentDec.value = splitJson.calSplitField.filter(
              (item) => +item.id === +splitJson.currentReport
            )?.[0]?.label;
            currentReport.value = splitJson.currentReport;
            splitField.value = splitJson.splitField;
            splitRule.value = splitJson.splitRule;
            calSplitField = splitJson.calSplitField;
          }
          break;
        case 'resetTableList':
          const data1 = JSON.parse(e.data.data);
          tableList.length = 0;
          data1.forEach((tpl) => {
            tableList.push(tpl);
          });
          break;
        case 'resetDomainList':
          if (e.data.data && JSON.parse(e.data.data)) {
            const data2 = JSON.parse(e.data.data);
            domainList.length = 0;
            data2.forEach((domain) => {
              domainList.push({
                value: domain.option,
                label: domain.name + ' #' + domain.option
              });
            });
          }
          break;
        case 'resetCustomComp':
          if (e.data.data && JSON.parse(e.data.data)) {
            customComp.value = JSON.parse(e.data.data);
          }
          break;
        case 'resetReportDesc':
          calSplitField[+currentReport.value - 1].label = e.data.currentDec;
          currentDec.value = e.data.currentDec;
          break;
        case 'continueSaveEditor':
          const { value, bind2Threshold } = e.data;
          console.log(tempToAave, value, bind2Threshold)
          pageData.lines.forEach(line => {
            line.forEach(ele => {
              console.log(ele.threshold, bind2Threshold)
              if (ele.threshold === bind2Threshold) {
                ele.value = value;
              }
            });
          });
          toSaveEditor(tempToAave, value, bind2Threshold);
          break;
        case 'saveEditor':
          toSaveEditor(e.data);
          break;
        case 'resetEditor':
          const data3 = JSON.parse(e.data.data);
          const { lines } = toRefs(pageData);
          for (let i = 0; i < lines.value.length; i++) {
            const line = lines.value[i];
            for (let j = 0; j < line.length; j++) {
              if (
                line[j].threshold &&
                data3[line[j].threshold] &&
                line[j].elName !== 'CombinationArea'
              ) {
                let value = line[j].value;
                let insertValue = data3[line[j].threshold];
                if (line[j].elName === 'RadEditor') {
                  let arr =
                    value.split(
                      /<!--[\u4E00-\u9FA5A-Za-z0-9_,;+%()（）\s]+end\s-->/
                    ) || [];
                  let hasVal = false;
                  for (let j = 0; j < arr.length; j++) {
                    if (arr[j]) {
                      if (arr[j].indexOf(`%%${currentReport.value}%%`) !== -1) {
                        let txt = arr[j].replace(
                          new RegExp(
                            /<!--[\u4E00-\u9FA5A-Za-z0-9_,\/;+%()（）\s]+start\s-->/g,
                            'gm'
                          ),
                          ''
                        );
                        value = value.replace(
                          arr[j],
                          `<!-- ${currentDec.value}%%${
                            currentReport.value
                          }%%start -->${
                            (e.data.addTo ? txt : '') + insertValue
                          }`
                        );
                        hasVal = true;
                        break;
                      }
                    }
                  }
                  if (!hasVal && !e.data.isAutoApply) {
                    value += `<!-- ${currentDec.value}%%${currentReport.value}%%start -->${insertValue}<!-- ${currentDec.value}%%${currentReport.value}%%end -->`;
                  }
                } else {
                  value = data3[line[j].threshold];
                }
                lines.value[i][j] = {
                  ...line[j],
                  value,
                  src: data3.src || ''
                };
              } else if (line[j].elName === 'CombinationArea') {
                if (line[j].compsList && line[j].compsList.length) {
                  line[j].compsList.forEach((item) => {
                    if (item.threshold && data3[item.threshold]) {
                      item.value = data3[item.threshold];
                      item.src = data3.src || '';
                    }
                  });
                }
              }
            }
          }
          break;
      }
    });

    const toSaveEditor = (data, value = '', bind2Threshold = '') => {
      const checkInfo = JSON.parse(data.checkData);
      if (value && bind2Threshold) {
        checkInfo[bind2Threshold] = value;
      }
      // 处理提交前控件脚本
      dealWithRules(JSON.stringify(pageData.lines), checkInfo).then((res) => {
        if (!res.result) {
          tempToAave = JSON.parse(JSON.stringify(data));
          isReadonlyStatus.value = false;
          window.parent.postMessage(
            {
              type: 'saveStopTips',
              content: res.content,
              tipType: res.tipType,
              pageId: pageId.value,
              bind2Threshold: res.bind2Threshold
            },
            '*'
          );
          return;
        }

        tempToAave = null;

        isReadonlyStatus.value = true;
        nextTick(async () => {
          let headercanvas =
            document.getElementById('edit-canvas-header').innerHTML;
          let footercanvas =
            document.getElementById('edit-canvas-footer').innerHTML;
          pageData.html = '';
          if (splitField.value) {
            let lastDec = currentDec.value;
            let lastReport = currentReport.value;
            // 拆分报告 生成多份报告
            for (let i = 0; i < calSplitField.length; i++) {
              currentDec.value = calSplitField[i].label;
              currentReport.value = calSplitField[i].id;
              let bodycanvas = await getDomHtml();
              pageData.html +=
                headStr +
                `<div style="padding:${
                  pageData.pageHeaderId ? '5px' : '10px'
                } ${pageData.styleSheet.padding} ${
                  pageData.pageFooterId ? 0 : '10px'
                } ${pageData.styleSheet.padding};${
                  i > 0 ? 'page-break-before: always;' : ''
                }">` +
                bodycanvas +
                '</div>' +
                footStr;
            }
            currentDec.value = lastDec;
            currentReport.value = lastReport;
          } else {
            let bodycanvas =
              document.getElementById('edit-canvas-body').innerHTML;
            pageData.html +=
              headStr +
              `<div style="padding:${
                pageData.pageHeaderId ||
                (pageData.pageNumType && pageData.pageNumPosi <= 1)
                  ? '5px'
                  : '10px'
              } ${pageData.styleSheet.padding} ${
                pageData.pageFooterId ||
                (pageData.pageNumType && pageData.pageNumPosi > 1)
                  ? 0
                  : '10px'
              } ${pageData.styleSheet.padding};">` +
              bodycanvas +
              '</div>' +
              footStr;
          }
          const pagePosiMap = {
            0: 'text-align: right; width: 100%',
            1: 'text-align: left;',
            2: 'text-align: center; width: 100%',
            3: 'text-align: left;',
            4: 'text-align: right; width: 100%',
            5: 'text-align: center; width: 100%'
          };
          pageData.headerHtml =
            openFixedAreaStr +
            (pageData.pageNumType && pageData.pageNumPosi <= 2
              ? +pageData.pageNumType === 1
                ? pageStrStyle + pagePosiMap[pageData.pageNumPosi] + pageStr1
                : pageStrStyle + pagePosiMap[pageData.pageNumPosi] + pageStr2
              : '') +
            `<div style="padding:0 ${pageData.styleSheet.padding};">` +
            (pageData.pageHeaderId ? headercanvas : '') +
            '</div>' +
            footStr;
          pageData.headerHeight = pageData.pageHeaderId
            ? (document.getElementById('edit-canvas-header').clientHeight -
                (pageData.headerLine + 1) * 2) /
              getOneMmsPx()
            : pageData.pageNumType && pageData.pageNumPosi <= 2
            ? 5
            : 0;
          pageData.footerHtml =
            openFixedAreaStr +
            (pageData.pageNumType && pageData.pageNumPosi > 2
              ? +pageData.pageNumType === 1
                ? pageStrStyle + pagePosiMap[pageData.pageNumPosi] + pageStr1
                : pageStrStyle + pagePosiMap[pageData.pageNumPosi] + pageStr2
              : '') +
            `<div style="padding:0 ${pageData.styleSheet.padding};">` +
            (pageData.pageFooterId ? footercanvas : '') +
            '</div>' +
            footStr;
          pageData.footerHeight = pageData.pageFooterId
            ? document.getElementById('edit-canvas-footer').clientHeight /
              getOneMmsPx()
            : pageData.pageNumType && pageData.pageNumPosi > 2
            ? 5
            : 0;
          window.parent.postMessage(
            {
              type: 'saveEditor',
              pageData: JSON.stringify(pageData),
              isModified: isModified.value,
              pageId: pageId.value
            },
            '*'
          );

          nextTick(() => {
            isReadonlyStatus.value = false;
          });
        });
      });
    };

    provide('changePageConfig', changePageConfig);
    provide('changePageSize', changePageSize);
    provide('addComp', addComp);
    provide('activeComp', activeComp);
    provide('clickCanvas', clickCanvas);
    provide('pageData', pageData);
    provide('activeCompId', activeCompId);
    provide('activeCompObj', activeCompObj);
    provide('copyComp', copyComp);
    provide('deleteComp', deleteComp);
    provide('isReadonlyStatus', isReadonlyStatus);
    provide('tableList', tableList);
    provide('domainList', domainList);
    provide('setFixedArea', setFixedArea);
    provide('pageHeaderId', pageHeaderId);
    provide('pageFooterId', pageFooterId);
    provide('currentReport', currentReport);
    provide('splitField', splitField);
    provide('splitRule', splitRule);
    provide('currentDec', currentDec);
    provide('loading', loading);
    provide('returnComp', returnComp);
    provide('pageId', pageId);
    provide('customComp', customComp);

    let timer: any;
    watch(
      () => pageData,
      (val) => {
        if (isReadonlyStatus.value || pageId.value === 'designer') {
          return;
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          isModified.value = true;
          window.parent.postMessage(
            {
              type: 'saveInLocal',
              pageData: JSON.stringify(val),
              pageId: pageId.value
            },
            '*'
          );
        }, 1000);
      },
      { deep: true }
    );

    const openPreview = () => {
      tempLines = JSON.stringify(pageData.lines);
      visible.value = true;
      isReadonlyStatus.value = false;
      clickCanvas();
    };

    const closePreview = () => {
      pageData.lines = [];
      setTimeout(() => {
        pageData.lines = JSON.parse(tempLines);
      });
    };

    return {
      activePosi,
      pageData,
      saveTpl,
      newTpl,
      editTpl,
      visible,
      clickCanvas,
      checkStatus,
      isReadonlyStatus,
      isEditor,
      openPreview,
      closePreview,
      zoom
    };
  }
});
</script>
<style lang="scss">
.ant-layout {
  ::-webkit-scrollbar {
    width: 2px;
  }
}
.edit-canvas-preview {
  position: fixed !important;
  right: 280px;
  bottom: 30px;
}
.edit-canvas-container {
  position: relative;
}
.full-modal {
  height: 100%;
  overflow-x: auto;
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .ant-modal-body {
    flex: 1;
  }
  .print-preview {
    position: absolute;
    right: 100px;
  }
  .print-btn {
    position: absolute;
    right: 106px;
    top: 60px;
  }
}
.ant-calendar-picker-container {
  z-index: 10500 !important;
}
.ant-layout-sider {
  height: 100vh;
  overflow-y: auto;
}
</style>

