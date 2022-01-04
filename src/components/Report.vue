<template>
  <a-layout>
    <a-layout-sider  width="260px" class="padding20">
      <CompsArea></CompsArea>
    </a-layout-sider>
    <a-layout-content class="border-l border-r padding10">
      <CanvasArea
        v-bind:pageData="pageData"
        @clickCanvas="activePosi=0"
      ></CanvasArea>
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

// 处理主体数据
const handlePageData = () => {
  const pageData = toRefs(reactive(pageConfig))
  const changePageConfig = (e: object) => {
    const { name, value } = e
    console.log(name, value)
  }
  provide('changePageConfig', changePageConfig)
  return { pageData }
}

export default defineComponent({
  setup () {
    const { pageData } = handlePageData()

    const activePosi = ref<number>(0)
    
    const addComp = (value: string) => {
      activePosi.value = 1
      console.log(value)
      // pageData.elements.push(value)
    }

    const clickCanvas = () => {
      activePosi.value = 0
    }

    provide('addComp', addComp)
    provide('clickCanvas', clickCanvas)

    return {
      activePosi,
      pageData
    }
  }
})
</script>

