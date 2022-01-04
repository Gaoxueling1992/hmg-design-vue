<template>
  <a-layout>
    <a-layout-sider  width="260px" class="padding20">
      <CompsArea @addComp="addComp"></CompsArea>
    </a-layout-sider>
    <a-layout-content class="border-l border-r padding10">
      <CanvasArea
        v-bind:pageData="pageData"
        @clickCanvas="activePosi=0"
      ></CanvasArea>
    </a-layout-content>
    <a-layout-sider  width="260px">
      <PageAttr v-if="activePosi===0" @changePageConfig="changePageConfig"></PageAttr>
      <CompAttr v-if="activePosi===1"></CompAttr>
    </a-layout-sider>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref, reactive } from 'vue'
import { pageConfig } from '@/utils/pageData'

export default defineComponent({
  setup () {
    const pageData = toRefs(reactive(pageConfig))

    const activePosi = ref<number>(0)

    const changePageConfig = (e: object) => {
      const { name, value } = e
    }
    const addComp = (value: string) => {
      activePosi.value = 1
      pageData.elements.push('jdjdj')
    }

    return {
      activePosi,
      pageData,
      changePageConfig,
      addComp
    }
  }
})
</script>

