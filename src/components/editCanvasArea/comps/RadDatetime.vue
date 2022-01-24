<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label }}</div>
  <a-date-picker
    style="flex: 1"
    :disabled="ele.baseProps.readonly"
    class="inherit"
    v-model:value="ele.defaultValue"
    :picker="ele.picker"
    :format="ele.format"
  />
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
</style>