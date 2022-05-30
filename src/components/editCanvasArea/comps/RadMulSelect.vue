<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : '',
      'text-decoration': 'inherit'
    }"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
  >{{ ele.label }}</div>
  <template v-if="!isReadonlyStatus && !ele.baseProps.readonly">
    <span>{{ele.prefix}} </span>
    <a-select
      style="flex: 1"
      :disabled="ele.baseProps.readonly"
      class="inherit"
      v-if="ele.type === 'select'"
      v-model:value="choosedValue"
      :options="ele.options"
      mode="multiple"
      @change="changeChecked"
    >
    </a-select>
    <a-checkbox-group
      v-else-if="ele.layout === 'crosswise'"
      v-model:value="choosedValue"
      :options="ele.options"
      :disabled="ele.baseProps.readonly"
       @change="changeChecked"
    />
    <div v-else>
      <a-checkbox
        v-for="item in ele.options"
        :disabled="ele.baseProps.readonly"
        :key="item.value"
        :checked="choosedValue.indexOf(item.value) > -1"
        @change="changeStatus(item.label, item.value)"
        class="option"
      >{{item.label}}</a-checkbox>
    </div>
    <span>{{ele.suffix}} </span>
  </template>
  <div
    v-else
    class="inherit display-text"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;text-decoration: inherit;display: inline-block;line-height: 30px !important;
    padding-top: 1px;word-break: break-all;
    padding-bottom: 1px;white-space:normal;"
  >
    <span>{{ele.prefix}} </span>
    <template v-for="item in ele.value">
      {{item}}&nbsp;
    </template>
    <span>{{ele.suffix}} </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, Ref, inject, ref } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup(props) {
    const { ele } = toRefs(props);
    const choosedValue: Ref<any> = ref<any>([]);
    for (let i = 0; i < ele.value.options.length; i++) {
      if (ele.value.value.indexOf(ele.value.options[i].label) > -1) {
        choosedValue.value.push(ele.value.options[i].value);
      }
    }
    const changeStatus = (label: any, value: any) => {
      if (ele.value.value.indexOf(label) > -1) {
        ele.value.value.splice(ele.value.value.indexOf(label), 1);
        choosedValue.value.splice(choosedValue.value.indexOf(value), 1);
      } else {
        ele.value.value.push(label);
        choosedValue.value.push(value);
      }
    };
    const changeChecked = () => {
      ele.value.value = [];
      if (!choosedValue.value || !choosedValue.value.length) {
        return;
      }
      for (let i = 0; i < choosedValue.value.length; i++) {
        let sel = ele.value.options.filter(option => option.value === choosedValue.value[i]);
        if (sel) {
          ele.value.value.push(sel[0].label);
        }
      }
    };
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      changeStatus,
      isReadonlyStatus,
      choosedValue,
      changeChecked
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