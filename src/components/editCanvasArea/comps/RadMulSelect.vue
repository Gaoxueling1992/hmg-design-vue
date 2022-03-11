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
      v-model:value="ele.value"
      :options="ele.options"
      mode="multiple"
    >
    </a-select>
    <a-checkbox-group
      v-else-if="ele.layout === 'crosswise'"
      v-model:value="ele.value"
      :options="ele.options"
    />
    <div v-else>
      <a-checkbox
        v-for="(item, index) in ele.options"
        :key="item.value"
        :checked="ele.value.indexOf(item.value) > -1"
        @change="changeStatus(item.value, index)"
        class="option"
      >{{item.label}}</a-checkbox>
    </div>
  </template>
  <div
    v-else
    style="flex: 1"
    class="inherit display-text"
  >
    <template v-for="item in ele.options">
      <span
        :key="item.value"
        v-if="ele.value.indexOf(item.value) > -1"
      >
        {{item.label}}&nbsp;
      </span>
    </template>
    &nbsp;
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, Ref, inject } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup(props) {
    const { ele } = toRefs(props);
    const changeStatus = (value: any, index: any) => {
      if (ele.value.value.indexOf(value) > -1) {
        ele.value.value.splice(ele.value.value.indexOf(value), 1);
      } else {
        ele.value.value.push(value);
      }
    };
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      changeStatus,
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
  margin-left: 0 !important;
}
.display-text {
  display: inline-block;
}
</style>