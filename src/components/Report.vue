<template>
  <a-layout>
    <a-layout-sider  width="260px" class="padding20">
      <CompsArea @addArea="addArea" @addComp="addComp"></CompsArea>
    </a-layout-sider>
    <a-layout-content class="border-l border-r padding10">
      <CanvasArea
        v-bind:pageData="pageData"
        @clickArea="clickArea"
        @clickCanvas="clickCanvas"
      ></CanvasArea>
    </a-layout-content>
    <a-layout-sider  width="260px" class="padding20">
      <PageAttr v-if="activePosi===0"></PageAttr>
      <AreaAttr v-if="activePosi===1"></AreaAttr>
      <CompAttr v-if="activePosi===2"></CompAttr>
    </a-layout-sider>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { pageConfig, areaConfig } from '@/utils/pageData'
import { notification } from 'ant-design-vue'

export default defineComponent({
  data() {
    return {
      activePosi: Number,
      pageData: Object
    }
  },
  created () {
    this.pageData = reactive(pageConfig)
    this.activePosi = ref(0)
  },
  methods: {
    addArea (value: object) {
      this.activePosi = ref(1)
      console.log(value)
      this.pageData.areas.push({
        ...areaConfig,
        type: value.areaType
      })
    },
    addComp (value: string) {
      if (this.activePosi === 1) {
        this.activePosi = ref(2)
      } else {
        notification.warning({
          message: '提示',
          description: '添加控件前请先选择目标区域。',
          duration: 2
        });
      }
    },
    clickArea (index: number) {
      this.activePosi = ref(1)
    },
    clickCanvas () {
      this.activePosi = ref(0)
    }
  },
})
</script>

