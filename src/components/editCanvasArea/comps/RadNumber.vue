<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-24 11:18:20
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-19 11:37:13
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadNumber.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : '',
      'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration ?  ele.styleSheet.textDecoration : 'none'
    }"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
  >{{ ele.label }}</div>
  <template v-if="!isReadonlyStatus && !ele.baseProps.readonly">
    <span>{{ele.prefix}}</span>
    <a-input-number
      style="flex: 1"
      :min="ele.min"
      :max="ele.max"
      class="inherit"
      v-model:value="ele.value"
      :placeholder="ele.placeholder"
    >
    </a-input-number>
    <span>{{ele.suffix}}</span>
  </template>
  <div v-else style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;
    padding-top: 1px;white-space:normal;word-break: break-all;
    padding-bottom: 1px;" class="inherit display-text"
    :style="{
      'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration ?  ele.styleSheet.textDecoration : 'none'
    }">
    {{ ele.prefix }} {{ ele.value }} {{ ele.suffix }}&nbsp;
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, inject } from 'vue'

export default defineComponent({
  props: ['ele', 'toolbarId', 'lineId'],
  setup () {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      isReadonlyStatus
    };
  },
})
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
  display: inline-block;
}
.display-text {
  display: inline-block;
}
</style>