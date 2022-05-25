<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    style="border-color:inherit;text-decoration: inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : ''
    }"
  >{{ ele.label }}</div>
  <span>{{ele.prefix}} </span>
  <template v-if="!isReadonlyStatus">
    <a-select
      style="flex: 1"
      :disabled="ele.baseProps.readonly"
      class="inherit"
      v-if="ele.type === 'select'"
      v-model:value="ele.value"
      :options="ele.options"
    >
    </a-select>
    <a-radio-group
      v-else-if="ele.layout === 'crosswise'"
      v-model:value="ele.value"
      :disabled="ele.baseProps.readonly"
      :options="ele.options"
    />
    <div v-else>
      <a-radio
        v-for="item in ele.options"
        :key="item.value"
        :checked="item.value === ele.value"
        :disabled="ele.baseProps.readonly"
        class="option"
      >{{item.label}}</a-radio>
    </div>
  </template>
  <div v-else style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;
    padding-top: 1px;text-decoration: inherit;white-space:normal;word-break: break-all;
    padding-bottom: 1px;" class="inherit display-text">
    <template v-for="item in ele.options">
      <span :key="item.value" v-if="item.value === ele.value">
        {{item.label}}
      </span>
    </template>
  </div>
  <span>{{ele.suffix}} </span>
</template>
<script lang="ts">
import { defineComponent, Ref, inject } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup() {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      isReadonlyStatus
    };
  }
});
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
  display: inline-block;
}
.option {
  display: block;
}
.display-text {
  display: inline-block;
}
</style>