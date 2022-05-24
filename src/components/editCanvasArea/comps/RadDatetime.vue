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
  {{ele.prefix}}
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
    class="inherit display-text"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;text-decoration: inherit;line-height: 30px !important;
    padding-top: 1px;white-space:normal;word-break: break-all;
    padding-bottom: 1px;"
  >{{ele.value ? moment(ele.value).format(ele.format) : ''}}</div>
  {{ele.suffix}}
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