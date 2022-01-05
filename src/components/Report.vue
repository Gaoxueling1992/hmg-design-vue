<template>
  <a-layout>
    <a-layout-sider  width="260px" class="padding20">
      <CompsArea></CompsArea>
    </a-layout-sider>
    <a-layout-content class="border-l border-r padding10 marginB30">
      <CanvasArea @clickCanvas="activePosi=0"></CanvasArea>
    </a-layout-content>
    <a-layout-sider  width="260px">
      <PageAttr v-if="activePosi===0"></PageAttr>
      <CompAttr v-if="activePosi===1"></CompAttr>
    </a-layout-sider>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref, reactive, provide } from 'vue'
import { pageConfig } from '@/utils/pageData'
import { compBaseConfig } from '@/utils/config'
// 处理主体数据
const handlePageData = () => {
  const changePageConfig = (e: object) => {
    const { name, value } = e
    console.log(name, value)
  }

  return { changePageConfig }
}

// 处理控件操作
const handleCompsOper = (pageData, activePosi) => {
  const addComp = (value: string) => {
    activePosi.value = 1
    pageData.elements.push({
      ...compBaseConfig[value],
      id: (new Date()).getTime() + ''
    })
  }

  return { addComp }
}

export default defineComponent({
  setup () {
    const pageData = reactive(pageConfig)
    const activePosi = ref<number>(0)
    const { changePageConfig } = handlePageData()
    const { addComp } = handleCompsOper(pageData, activePosi)
  
    const clickCanvas = () => {
      activePosi.value = 0
    }

    provide('changePageConfig', changePageConfig)
    provide('addComp', addComp)
    provide('clickCanvas', clickCanvas)
    provide('pageData', pageData)

    return {
      activePosi,
      pageData
    }
  }
})
</script>

