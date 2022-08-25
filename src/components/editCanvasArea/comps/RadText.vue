<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-19 11:16:48
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-08-25 10:29:07
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadText.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="inherit inner-split text-container"
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
