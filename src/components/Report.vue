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
import { defineComponent, toRefs, ref, reactive, provide, Ref } from 'vue'
import { pageConfig } from '@/utils/pageData'
import { compBaseConfig } from '@/utils/config'
// 处理主体数据
const handlePageData = () => {
  const changePageConfig = (e: { name: string, value: string }) => {
    const { name, value } = e
    console.log(name, value)
  }

  return { changePageConfig }
}

// 处理控件操作
const handleCompsOper = (pageData: { lines: any[][] }, activePosi: Ref<number>, activeCompId: Ref<string>) => {
  const addComp = (value: string) => {
    activePosi.value = 1
    const id: string = (new Date()).getTime() + ''
    pageData.lines.push([{
      ...compBaseConfig[value],
      id: id
    }])
    activeCompId.value = id
  }

  const activeComp = (id: string) => {
    activePosi.value = 1
    activeCompId.value = id
  }

  return { addComp, activeComp }
}

export default defineComponent({
  setup () {
    const pageData: { lines: any[][] } = reactive(pageConfig)
    const activePosi: Ref<number> = ref(0)
    const activeCompId: Ref<string> = ref('')
    const { changePageConfig } = handlePageData()
    const { addComp, activeComp } = handleCompsOper(pageData, activePosi, activeCompId)
  
    const clickCanvas = () => {
      activePosi.value = 0
      activeCompId.value = ''
    }

    provide('changePageConfig', changePageConfig)
    provide('addComp', addComp)
    provide('activeComp', activeComp)
    provide('clickCanvas', clickCanvas)
    provide('pageData', pageData)
    provide('activeCompId', activeCompId)

    return {
      activePosi,
      pageData
    }
  }
})
</script>

