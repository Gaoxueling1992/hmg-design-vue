<template>
  <div class="header">
    <a-tabs class="header-menu" v-model:activeKey="activeTab" @change="changeTab">
      <a-tab-pane key="report" tab="报告设计器"></a-tab-pane>
      <a-tab-pane key="table" tab="表格设计器"></a-tab-pane>
      <a-tab-pane key="form" tab="表单设计器"></a-tab-pane>
    </a-tabs>
    <a-select
      v-model:value="theme"
      class="theme-choose"
      @change="themeChange"
    >
      <a-select-option v-for="item in themeList" :key="item.value" :value="item.value">
        {{item.label}}
      </a-select-option>
    </a-select>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, inject, Ref } from 'vue'
import { initTheme } from '../utils/theme'

// 处理主题
const handleTheme = () => {
  const themeList = ref<any>([
    { value: 'default', label: '默认主题' },
    { value: 'green', label: '绿色主题' }
  ])
  const theme = ref<string>('default')

  const themeChange = (value: string) => {
    initTheme(value)
  }

  return { themeList, themeChange, theme }
}

// 处理tab切换
const handleTabChange = (activeTab: Ref<string>) => {
  const changeTab = (value: string) => {
    activeTab.value = value
  }
  return { changeTab }
}

export default defineComponent({
  setup () {
    const activeTab: Ref<string> = inject('activeTab') || ref('report')
    const { themeList, themeChange, theme } = handleTheme()
    const { changeTab } = handleTabChange(activeTab)

    return {
      changeTab,
      activeTab,
      theme, themeList, themeChange
    }
  }
})
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
    top: 10px;
    width: 100px;
  }
}
</style>
