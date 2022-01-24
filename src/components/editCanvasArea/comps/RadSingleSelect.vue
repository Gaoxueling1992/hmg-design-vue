<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label }}</div>
  <a-select
    style="flex: 1"
    :disabled="ele.baseProps.readonly"
    class="inherit"
    v-if="ele.type === 'select'"
    v-model:value="ele.defaultValue"
    :options="ele.options"
  >
  </a-select>
  <a-radio-group
    v-else-if="ele.layout === 'crosswise'"
    v-model:value="ele.defaultValue"
    :options="ele.options"
  />
  <div v-else>
    <a-radio
      v-for="item in ele.options"
      :key="item.value"
      :checked="item.value === ele.defaultValue"
      class="option"
    >{{item.label}}</a-radio>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup() {}
});
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
}
.option {
  display: block;
}
</style>