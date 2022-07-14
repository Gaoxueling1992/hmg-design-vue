<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-24 11:00:44
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-14 14:05:12
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadDatetime.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="inherit"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;text-decoration: inherit;"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : ''
    }"
  >{{ ele.label }}</div>
  <span>{{ele.prefix}}&nbsp;</span>
  <a-date-picker
    v-if="!isReadonlyStatus && !ele.baseProps.readonly"
    style="flex: 1"
    class="inherit"
    v-model:value="ele.value"
    placeholder="请选择时间"
    :picker="ele.picker"
    :format="ele.format"
  />
  <div
    v-else
    class="inherit"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;text-decoration: inherit;
    padding-top: 1px;white-space:normal;word-break: break-all;
    padding-bottom: 1px;"
  >{{ele.value ? moment(ele.value).format(ele.format) : ''}}&nbsp;</div>
  {{ele.suffix}}
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import moment from 'moment';

export default defineComponent({
  props: ['ele', 'toolbarId', 'lineId'],
  setup() {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      isReadonlyStatus,
      moment
    };
  }
});
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