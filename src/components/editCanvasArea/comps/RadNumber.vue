<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : '',
      'text-decoration': 'inherit'
    }"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
  >{{ ele.label }}</div>
  <a-input-number
    style="flex: 1"
    :min="ele.min"
    :max="ele.max"
    class="inherit"
    v-model:value="ele.value"
    :placeholder="ele.placeholder"
    v-if="!isReadonlyStatus && !ele.baseProps.readonly"
  >
    <template #prefix>
      {{ ele.prefix }}
    </template>
    <template #suffix>
      {{ ele.suffix }}
    </template>
  </a-input-number>
  <div v-else style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;text-decoration: inherit;line-height: 30px !important;
    padding-top: 1px;
    padding-bottom: 1px;" class="inherit display-text">
    {{ ele.prefix }} {{ ele.value }} {{ ele.suffix }}&nbsp;
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, inject } from 'vue'

export default defineComponent({
  props: ['ele'],
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