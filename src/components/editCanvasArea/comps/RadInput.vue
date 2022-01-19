<template>
  <div
    class="inherit"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label || ele.name }}</div>
  <a-input
    style="flex: 1"
    :disabled="ele.baseProps.readonly"
    class="inherit"
    v-if="ele.type !== 'textarea'"
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
    :disabled="ele.baseProps.readonly"
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