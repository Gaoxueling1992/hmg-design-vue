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
    v-if="!isReadonlyStatus"
  >
    <template #prefix>
      {{ ele.prefix }}
    </template>
    <template #suffix>
      {{ ele.suffix }}
    </template>
  </a-input-number>
  <div v-else style="flex: 1" class="inherit display-text">
    {{ ele.prefix }} {{ ele.defaultValue }} {{ ele.suffix }}&nbsp;
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
}
</style>