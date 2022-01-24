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
    mode="multiple"
  >
  </a-select>
  <a-checkbox-group
    v-else-if="ele.layout === 'crosswise'"
    v-model:value="ele.defaultValue"
    :options="ele.options"
  />
  <div v-else>
    <a-checkbox
      v-for="(item, index) in ele.options"
      :key="item.value"
      :checked="ele.defaultValue.indexOf(item.value) > -1"
      @change="changeStatus(item.value, index)"
      class="option"
    >{{item.label}}</a-checkbox>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup(props) {
    const { ele } = toRefs(props);
    const changeStatus = (value: any, index: any) => {
      if (ele.value.defaultValue.indexOf(value) > -1) {
        ele.value.defaultValue.splice(ele.value.defaultValue.indexOf(value), 1);
      } else {
        ele.value.defaultValue.push(value);
      }
    };
    return {
      changeStatus
    };
  }
});
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
}
.option {
  display: block;
  margin-left: 0 !important;
}
</style>