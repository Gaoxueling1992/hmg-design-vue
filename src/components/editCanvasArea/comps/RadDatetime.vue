<!--
 * @Author: your name
 * @Date: 2022-01-24 11:00:44
 * @LastEditTime: 2022-05-10 15:19:48
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadDatetime.vue
-->
<template>
  <div
    class="inherit"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : ''
    }"
  >{{ ele.label }}</div>
  <a-date-picker
    v-if="!isReadonlyStatus"
    style="flex: 1"
    :disabled="ele.baseProps.readonly"
    class="inherit"
    v-model:value="ele.value"
    placeholder="请选择时间"
    :picker="ele.picker"
    :format="ele.format"
  />
  <div
    v-else
    class="inherit display-text"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;
    padding-top: 1px;
    padding-bottom: 1px;"
  >{{ele.value ? moment(ele.value).format(ele.format) : ''}}</div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import moment from 'moment';

export default defineComponent({
  props: ['ele'],
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