<template>
  <EditCanvas
    v-if="isEditor"
    class="edit-canvas"
    id="editCanvas"
    :style="{
      'backgroundColor': isReadonlyStatus ? 'transparent' : '#E4E7EE'
    }"
  ></EditCanvas>
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
          @click="visible=true;isReadonlyStatus=false"
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
  <div id="context-menu"></div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, provide, Ref, watch, toRefs } from 'vue';
import { pageConfig, styleSheetObj } from '@/utils/pageData';
import { compBaseConfig } from '@/utils/config';
import { Modal } from 'ant-design-vue';
import { headStr, footStr, openFixedAreaStr, pageStr1, pageStr2, pageStrStyle } from '@/utils/tpl-config';
import { getOneMmsPx } from '@/utils/util';
// 处理主体数据
const handlePageData = (pageData: any) => {
  const changePageConfig = (e: { key: string; value: string }) => {
    const { key, value } = e;
    pageData[key] = value;
    if (key === 'pageType') {
      pageData.styleSheet = {
        ...pageData.styleSheet,
        ...styleSheetObj[value as keyof typeof styleSheetObj]
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
  pageData: any
) => {
  const activePosi: Ref<number> = ref(0);
  const activeCompObj: Ref<object> = ref({});
  const activeCompId: Ref<string> = ref('');
  const pageHeaderId: Ref<string> = ref(pageData.pageHeaderId);
  const pageFooterId: Ref<string> = ref(pageData.pageFooterId);
  // 新增控件
  const addComp = (value: string) => {
    activePosi.value = 1;
    const id: string = new Date().getTime() + '';
    const baseConfig = reactive({
      ...compBaseConfig[value],
      styleSheet: {
        ...compBaseConfig[value].styleSheet
      },
      rules: []
    });
    activeCompObj.value = {
      ...baseConfig,
      id: id
    };
    if (value === 'combination-area') {
      activeCompObj.value.compsList = [];
    }
    pageData.lines.push([activeCompObj.value]);
    activeCompId.value = id;
  };
  // 删除控件
  const deleteComp = (idx: any, index: any) => {
    clickCanvas();
    pageData.lines[+idx.value > 0 ? idx.value : 0].splice(
      +index.value > 0 ? index.value : 0,
      1
    );
    if (pageData.lines[+idx.value > 0 ? idx.value : 0].length === 0) {
      pageData.lines.splice(+idx.value > 0 ? idx.value : 0, 1);
    }
  };
  // 复制控件
  const copyComp = (ele: any) => {
    const id: string = new Date().getTime() + '';
    activeCompObj.value = {
      ...ele,
      id: id,
      styleSheet: {
        ...ele.styleSheet
      }
    };
    pageData.lines.push([activeCompObj.value]);
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
        content = '页眉控件不能在页尾下方。';
      }
    }
    if (content) {
      Modal.confirm({
        title: '提示',
        content,
        okText: '我知道了',
        cancelText: '取消',
        onOk() {},
        onCancel() {},
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
      emit('saveTpl', { pageData, type: 0 });
      window.parent.postMessage({ type: 'doSaveDesigner', pageData: JSON.stringify(pageData) }, '*');
    } else {
      Modal.warning({
        title: '提示',
        content: '检测到模版上没有控件，无法保存。',
        okText: '确定'
      });
    }
  };

  // 重置模版数据
  const resetData = () => {
    pageData.lines = [];
    pageData.name = '';
    pageData.id = '';
    pageData.pageHeaderId = '';
    pageData.pageFooterId = '';
    pageData.headerLine = -1;
    pageData.footerLine = 9999;
    pageData.pageType = 'a4';
    pageData.pageNumType = 0;
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
  const editTpl = (item: any) => {
    pageData.lines = [];
    pageData.lines = item.lines;
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
    pageData.headerLine = item.headerLine;
    pageData.footerLine = item.footerLine;
    pageData.pageNumType = item.pageNumType;
    activePosi.value = 0;
    activeCompObj.value = {};
    activeCompId.value = '';
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
    pageFooterId
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
      pageFooterId
    } = handleCompsOper(emit, pageData);

    const checkStatus = () => {
      isReadonlyStatus.value = !isReadonlyStatus.value;
    };

    window.addEventListener('message', async (e) => {
      switch(e.data.type) {
        case 'newTpl':
          newTpl(1);
          break;
        case 'saveDesinger':
          saveTpl();
          break;
        case 'resetData':
          const data = JSON.parse(e.data.data);
          editTpl(data);
          break;
        case 'resetTableList':
          const data1 = JSON.parse(e.data.data);
          tableList.length = 0;
          data1.forEach(tpl => {
            tableList.push(tpl);
          });
          break;
        case 'resetDomainList':
          const data2 = JSON.parse(e.data.data);
          domainList.length = 0;
          data2.forEach(domain => {
            domainList.push({
              value: domain.option,
              label: domain.name + ' #' + domain.option
            });
          });
          break;
        case 'saveEditor': 
          isReadonlyStatus.value = true;
          setTimeout(() => {
            let headercanvas = document.getElementById('edit-canvas-header').innerHTML;
            let footercanvas = document.getElementById('edit-canvas-footer').innerHTML;
            let bodycanvas = document.getElementById('edit-canvas-body').innerHTML;
            pageData.headerHtml = pageData.pageHeaderId ? (openFixedAreaStr + (pageData.pageNumType ? (+pageData.pageNumType === 1 ? pageStrStyle + pageStr1 : pageStrStyle + pageStr2) : '') + `<div style="padding:0 ${pageData.styleSheet.padding};">` + headercanvas + '</div>' + footStr) : '';
            pageData.headerHeight = pageData.pageHeaderId ? document.getElementById('edit-canvas-header').clientHeight / getOneMmsPx() : 0;
            pageData.footerHtml = pageData.pageFooterId ? (openFixedAreaStr + `<div style="padding:0 ${pageData.styleSheet.padding};">` + footercanvas + '</div>' + footStr) : '';
            pageData.footerHeight = pageData.pageFooterId ? document.getElementById('edit-canvas-footer').clientHeight / getOneMmsPx() : 0;
            pageData.html = headStr + `<div style="padding:${pageData.pageHeaderId ? '5px' : '10px'} ${pageData.styleSheet.padding} ${pageData.pageFooterId ? 0 : '10px'} ${pageData.styleSheet.padding};">` + bodycanvas + '</div>' + footStr;
            window.parent.postMessage({ type: 'saveEditor', pageData: JSON.stringify(pageData) }, '*');

            setTimeout(() => {
              isReadonlyStatus.value = false;
            });
          });
          break;
        case 'resetEditor':
          const data3 = JSON.parse(e.data.data);
          const { lines } = toRefs(pageData);
          console.log(lines.value);
          for (let i = 0; i < lines.value.length; i++) {
            const line = lines.value[i];
            for (let j = 0; j < line.length; j++) {
              if (line[j].threshold && data3[line[j].threshold]) {
                lines.value[i][j] = {
                  ...line[j],
                  value: e.data.addTo ? line[j].value + data3[line[j].threshold] : data3[line[j].threshold],
                  src: data3.src || ''
                };
                console.log(lines.value[i][j].value);
              }
            }
          }
          break;
      }
    });

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

    watch(
      () => pageData,
      (val) => {
        let timer: any;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          window.parent.postMessage({ type: 'saveInLocal', pageData: JSON.stringify(val) }, '*');
        }, 1000);
      },
      { deep: true }
    )

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
      isEditor
    };
  }
});
</script>
<style lang="scss">
.edit-canvas-preview {
  position: fixed;
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
</style>

