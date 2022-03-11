<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : ''
    }"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
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
    class="inherit display-text"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;
    padding-top: 1px;
    padding-bottom: 1px;"
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