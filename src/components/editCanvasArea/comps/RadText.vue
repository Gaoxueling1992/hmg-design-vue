<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-19 11:16:48
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-14 14:06:17
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadText.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    style="min-height: 20px"
    class="inherit"
    :style="{
      'border-color': 'inherit',
      color: 'inherit !important',
      'background-color': 'inherit',
      'font-size': 'inherit',
      textAlign: ele.styleSheet.justifyContent,
      width: '100%'
    }"
    :class="{'ellipsis': ele.styleSheet.wrap === 'noWrap'}"
    v-html="ele.label || '静态文本'"
  ></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['ele', 'toolbarId', 'lineId'],
  setup () {
    
  },
})
</script>
