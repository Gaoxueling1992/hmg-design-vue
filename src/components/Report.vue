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
// 处理主体数据
const handlePageData = (pageData: any) => {
  const changePageConfig = (e: { key: string; value: string }) => {
    const { key, value } = e;
    pageData[key] = value;
    if (key === 'pageType') {
      pageData.styleSheet = {
        ...pageData.styleSheet,
        ...styleSheetObj[value]
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
  const addComp = (value: string) => {
    activePosi.value = 1;
    const id: string = new Date().getTime() + '';
    pageData.lines.push([
      {
        ...compBaseConfig[value],
        id: id
      }
    ]);
    activeCompObj.value = {
      ...compBaseConfig[value],
      id: id
    };
    activeCompId.value = id;
  };

  const activeComp = (ele: any) => {
    activePosi.value = 1;
    activeCompId.value = ele.id;
    activeCompObj.value = {
      ...ele
    };
  };

  return { addComp, activeComp };
};

export default defineComponent({
  setup() {
    const pageData: any = reactive(pageConfig);
    const activePosi: Ref<number> = ref(0);
    const activeCompObj: Ref<object> = ref({});
    const activeCompId: Ref<string> = ref('');
    const { changePageConfig, changePageSize } = handlePageData(pageData);
    const { addComp, activeComp } = handleCompsOper(
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

    provide('changePageConfig', changePageConfig);
    provide('changePageSize', changePageSize);
    provide('addComp', addComp);
    provide('activeComp', activeComp);
    provide('clickCanvas', clickCanvas);
    provide('pageData', pageData);
    provide('activeCompId', activeCompId);
    provide('activeCompObj', activeCompObj);

    return {
      activePosi,
      pageData
    };
  }
});
</script>

