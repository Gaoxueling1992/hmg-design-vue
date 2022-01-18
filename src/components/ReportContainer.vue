<template>
  <a-layout>
    <a-layout-sider
      width="260px"
      class="padding20"
    >
      <CompsArea></CompsArea>
    </a-layout-sider>
    <a-layout-content class="border-l border-r padding10 marginB30">
      <CanvasArea @clickCanvas="activePosi=0"></CanvasArea>
    </a-layout-content>
    <a-layout-sider width="260px">
      <PageAttr v-if="activePosi===0"></PageAttr>
      <CompAttr v-if="activePosi===1"></CompAttr>
    </a-layout-sider>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, provide, Ref } from 'vue';
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
  pageData: any,
  activePosi: Ref<number>,
  activeCompId: Ref<string>,
  activeCompObj: Ref<object>
) => {
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
    pageData.lines[+idx > 0 ? idx : 0].splice(+index > 0 ? index : 0, 1);
    if (pageData.lines[+idx > 0 ? idx : 0].length === 0) {
      pageData.lines.splice(+idx > 0 ? idx : 0, 1);
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

  return { addComp, activeComp, copyComp, deleteComp };
};

// 模版操作
const handleTpl = (
  emit:
    | ((event: string, ...args: any[]) => void)
    | ((event: string, ...args: any[]) => void),
  pageData: { lines: string | any[] },
  activePosi: Ref<number>,
  activeCompObj: Ref<object>,
  activeCompId: Ref<string>
) => {
  // 保存模版
  const saveTpl = () => {
    if (pageData.lines.length) {
      emit('saveTpl', pageData);
    } else {
      Modal.warning({
        title: '提示',
        content: '检测到模版上没有控件，无法保存。',
        okText: '确定'
      });
    }
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
          pageData.lines = [];
          activePosi.value = 0;
          activeCompObj.value = {};
          activeCompId.value = '';
        }
      });
    } else {
      pageData.lines = [];
      activePosi.value = 0;
      activeCompObj.value = {};
      activeCompId.value = '';
    }
  };
  return {
    saveTpl,
    newTpl
  };
};

export default defineComponent({
  setup(props, { emit }) {
    const pageData: any = reactive(pageConfig);
    const activePosi: Ref<number> = ref(0);
    const activeCompObj: Ref<object> = ref({});
    const activeCompId: Ref<string> = ref('');
    const { changePageConfig, changePageSize } = handlePageData(pageData);
    const { addComp, activeComp, copyComp, deleteComp } = handleCompsOper(
      pageData,
      activePosi,
      activeCompId,
      activeCompObj
    );

    const clickCanvas = () => {
      activePosi.value = 0;
      activeCompId.value = '';
      activeCompObj.value = {};
    };

    const { saveTpl, newTpl } = handleTpl(
      emit,
      pageData,
      activePosi,
      activeCompObj,
      activeCompId
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
      newTpl
    };
  }
});
</script>

