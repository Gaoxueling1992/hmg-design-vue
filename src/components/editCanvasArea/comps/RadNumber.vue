<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label }}</div>
  <a-input-number
    style="flex: 1"
    :disabled="ele.baseProps.readonly"
    :min="ele.min"
    :max="ele.max"
    class="inherit"
    v-model:value="ele.defaultValue"
    :placeholder="ele.placeholder"
  >
    <template #prefix>
      {{ ele.prefix }}
    </template>
    <template #suffix>
      {{ ele.suffix }}
    </template>
  </a-input-number>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['ele'],
  setup () {
    
  },
})
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
}
</style>