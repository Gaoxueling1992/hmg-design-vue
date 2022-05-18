<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : ''
    }"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;text-decoration: inherit;"
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
    line-height: 30px !important;
    padding-top: 1px;
    flex: 1;
    padding-bottom: 1px;word-break: break-all;
    text-decoration: inherit;white-space:normal;" class="inherit display-text">
    {{ ele.prefix }}{{ ele.value }}{{ ele.suffix }}&nbsp;
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'

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