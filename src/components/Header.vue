<template>
  <div class="header">
    <a-tabs
      class="header-menu"
      v-model:activeKey="activeTab"
      @change="changeTab"
    >
      <a-tab-pane
        key="ReportContainer"
        tab="报告设计器"
      ></a-tab-pane>
      <a-tab-pane
        key="TableContainer"
        tab="表格设计器"
      ></a-tab-pane>
      <a-tab-pane
        key="FormContainer"
        tab="表单设计器"
      ></a-tab-pane>
    </a-tabs>
    <div class="theme-choose">
      <a-button
        class="marginR10"
        type="primary"
        @click="saveTpl"
      >保存</a-button>
      <a-button
        class="marginR10"
        @click="newTpl"
      >新建</a-button>
      <a-select
        v-model:value="theme"
        @change="themeChange"
      >
        <a-select-option
          v-for="item in themeList"
          :key="item.value"
          :value="item.value"
        >
          {{item.label}}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, inject, Ref } from 'vue';
import { initTheme } from '../utils/theme';
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js';

// 处理主题
const handleTheme = () => {
  const themeList = ref<any>([
    { value: 'default', label: '默认主题' },
    { value: 'green', label: '绿色主题' }
  ]);
  const theme = ref<string>('default');

  const themeChange = (value: string) => {
    initTheme(value);
    toggleTheme({ scopeName: 'theme-' + value });
  };

  return { themeList, themeChange, theme };
};

// 处理tab切换
const handleTabChange = (activeTab: Ref<string>) => {
  const changeTab = (value: string) => {
    activeTab.value = value;
  };
  return { changeTab };
};

// 操作模版
const handelTpl = (emit) => {
  const saveTpl = () => {
    emit('saveTpl');
  };
  const newTpl = () => {
    emit('newTpl');
  };
  return {
    saveTpl,
    newTpl
  };
};

export default defineComponent({
  setup(props, { emit }) {
    const activeTab: Ref<string> =
      inject('activeTab') || ref('reportContainer');
    const { themeList, themeChange, theme } = handleTheme();
    const { changeTab } = handleTabChange(activeTab);
    const { saveTpl, newTpl } = handelTpl(emit);

    return {
      changeTab,
      activeTab,
      theme,
      themeList,
      themeChange,
      saveTpl, newTpl
    };
  }
});
</script>
<style lang="scss">
.header {
  background-color: var(--color-tb);
  height: var(--size-50);
  line-height: var(--size-50);
  text-align: center;
  .header-menu {
    font-weight: 500;
  }
  .theme-choose {
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>
