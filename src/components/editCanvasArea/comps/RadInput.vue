<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label }}</div>
  <template v-if="!isReadonlyStatus">
    <a-input
      style="flex: 1"
      :disabled="ele.baseProps.readonly"
      class="inherit"
      v-if="ele.type !== 'textarea'"
      v-model:value="ele.defaultValue"
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
      v-model:value="ele.defaultValue"
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
  <div v-else style="flex: 1" class="inherit display-text">
    {{ ele.prefix }} {{ ele.defaultValue }} {{ ele.suffix }}&nbsp;
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
}
</style>