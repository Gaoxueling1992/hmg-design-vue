<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-19 14:11:58
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-19 11:30:06
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadInput.vue
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
    <a-input
      style="flex: 1"
      class="inherit"
      v-if="ele.type !== 'textarea'"
      v-model:value="ele.value"
      :placeholder="ele.placeholder"
    >
      <template #prefix>
        {{ ele.prefix }}
      </template>
      <template #suffix>
        {{ ele.suffix }}
      </template>
    </a-input>
    <a-textarea
      style="flex: 1"
      v-model:value="ele.value"
      :placeholder="ele.placeholder"
      class="inherit"
      v-else
    >
      <template #prefix>
        {{ ele.prefix }}
      </template>
      <template #suffix>
        {{ ele.suffix }}
      </template>
    </a-textarea>
  </template>
  <div v-else style="
    border-color:inherit;
    color:inherit !important;
    background-color: inherit;
    font-size: inherit;
    display: inline-block;
    flex: 1;
    word-break: break-all;
    white-space:normal;"
    :style="{
      'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration ?  ele.styleSheet.textDecoration : 'none'
    }"
    class="inherit display-text">
    {{ ele.prefix }}{{ ele.value }}{{ ele.suffix }}
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'

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