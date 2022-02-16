<template>
  <a-layout>
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
        <a-button class="edit-canvas-preview" shape="circle" @click="visible=true">
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
    <EditCanvas class="edit-canvas"></EditCanvas>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, provide, Ref, toRef } from 'vue';
import { pageConfig, styleSheetObj } from '@/utils/pageData';
import { compBaseConfig } from '@/utils/config';
import { Modal } from 'ant-design-vue';
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
  emit: ((event: string, ...args: any[]) => void)|((event: string, ...args: any[]) => void),
  pageData: any
) => {
  const activePosi: Ref<number> = ref(0);
  const activeCompObj: Ref<object> = ref({});
  const activeCompId: Ref<string> = ref('');
  // 新增控件
  const addComp = (value: string) => {
    activePosi.value = 1;
    const id: string = new Date().getTime() + '';
    const baseConfig = reactive({
      ...compBaseConfig[value],
      styleSheet: {
        ...compBaseConfig[value].styleSheet
      }
    });
    activeCompObj.value = {
      ...baseConfig,
      id: id
    };
    pageData.lines.push([activeCompObj.value]);
    activeCompId.value = id;
  };
  // 删除控件
  const deleteComp = (idx: any, index: any) => {
    clickCanvas();
    pageData.lines[+idx.value > 0 ? idx.value : 0].splice(+index.value > 0 ? index.value : 0, 1);
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
  // 保存模版
  const saveTpl = () => {
    if (pageData.lines.length) {
      emit('saveTpl', { pageData, type: 0 });
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
    pageData.pageType = 'a4';
    pageData.styleSheet = {
      minHeight: '297mm',
      width: '210mm',
      padding: '10px'
    };
    activePosi.value = 0;
    activeCompObj.value = {};
    activeCompId.value = '';
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
    pageData.lines = item.lines;
    pageData.name = item.name;
    pageData.pageType = item.pageType;
    pageData.styleSheet = item.styleSheet;
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
    saveTpl, newTpl, editTpl,
    addComp, activeComp, copyComp, deleteComp,
    activePosi, activeCompId, activeCompObj,
    clickCanvas
  };
};

export default defineComponent({
  setup(props, { emit }) {
    let pageData: any = reactive(pageConfig);
    const visible: Ref<boolean> = ref(false);
    const { changePageConfig, changePageSize } = handlePageData(pageData);
    const { 
      addComp, activeComp, copyComp, deleteComp,
      saveTpl, newTpl, editTpl,
      activePosi, activeCompId, activeCompObj,
      clickCanvas
    } = handleCompsOper(
      emit,
      pageData
    );

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

    return {
      activePosi,
      pageData,
      saveTpl,
      newTpl,
      editTpl,
      visible,
      clickCanvas
    };
  }
});
</script>
<style lang="scss">
.edit-canvas {
  margin: 0 auto;
}
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
}
</style>

