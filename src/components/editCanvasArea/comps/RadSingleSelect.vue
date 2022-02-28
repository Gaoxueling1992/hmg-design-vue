<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label }}</div>
  <template v-if="!isReadonlyStatus">
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
  <div v-else style="flex: 1" class="inherit display-text">
    <template v-for="item in ele.options">
      <span :key="item.value" v-if="item.value === ele.defaultValue">
        {{item.label}}&nbsp;
      </span>
    </template>
  </div>
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