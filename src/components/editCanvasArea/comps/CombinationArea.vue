<template>
  <template v-if="!isReadonlyStatus">
    <!-- <a-input
      :disabled="ele.baseProps.readonly"
      class="inherit"
      v-if="ele.type !== 'textarea'"
      v-model:value="ele.value"
      :placeholder="ele.placeholder"
    > -->
    {{ ele }}
  </template>
  <div v-else style="
    border-color:inherit;
    color:inherit !important;
    background-color: inherit;
    font-size: inherit;
    display: inline-block;
    line-height: 30px !important;
    padding-top: 1px;
    padding-bottom: 1px;" class="inherit display-text">
    {{ ele }}&nbsp;
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