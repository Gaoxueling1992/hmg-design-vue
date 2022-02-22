<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label }}</div>
  <a-date-picker
    v-if="!isReadonlyStatus"
    style="flex: 1"
    :disabled="ele.baseProps.readonly"
    class="inherit"
    v-model:value="ele.defaultValue"
    :picker="ele.picker"
    :format="ele.format"
  />
  <div
    v-else
    style="flex: 1"
    class="inherit display-text"
  >{{moment(ele.defaultValue).format(ele.format)}}</div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import moment from 'moment';

export default defineComponent({
  props: ['ele'],
  setup() {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      isReadonlyStatus,
      moment
    };
  }
});
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
}
</style>