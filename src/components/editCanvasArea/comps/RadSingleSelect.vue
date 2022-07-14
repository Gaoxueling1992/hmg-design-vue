<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-24 14:03:26
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-14 14:06:03
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadSingleSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    style="border-color:inherit;text-decoration: inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
    :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : ''
    }"
  >{{ ele.label }}</div>
  <span>{{ele.prefix}} </span>
  <template v-if="!isReadonlyStatus && !ele.baseProps.readonly">
    <a-select
      style="flex: 1"
      :disabled="ele.baseProps.readonly"
      class="inherit"
      v-if="ele.type === 'select'"
      v-model:value="choosedValue"
      :options="ele.options"
      @change="changeValue"
    >
    </a-select>
    <a-radio-group
      v-else-if="ele.layout === 'crosswise'"
      v-model:value="choosedValue"
      :disabled="ele.baseProps.readonly"
      :options="ele.options"
      @change="changeValue"
    />
    <div v-else>
      <a-radio
        v-for="item in ele.options"
        :key="item.value"
        :checked="item.label === ele.value"
        :disabled="ele.baseProps.readonly"
        class="option"
        @click="clickIt(item.label)"
      >{{item.label}}</a-radio>
    </div>
  </template>
  <div
    v-else
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;
    padding-top: 1px;text-decoration: inherit;white-space:normal;word-break: break-all;
    padding-bottom: 1px;"
    class="inherit display-text"
  >
    {{ele.value}}
  </div>
  <span>{{ele.suffix}} </span>
</template>
<script lang="ts">
import { defineComponent, Ref, inject, ref } from 'vue';

export default defineComponent({
  props: ['ele', 'toolbarId', 'lineId'],
  setup(props) {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    const choosedValue: Ref<string> = ref<string>('');
    let chooseedOption = props.ele.options.filter(
      (option) => option.label === props.ele.value
    );
    if (chooseedOption && chooseedOption[0]) {
      choosedValue.value = chooseedOption[0].value;
    }
    const changeValue = () => {
      props.ele.value = props.ele.options.filter(
        (option) => option.value === choosedValue.value
      )[0].label;
    };
    const clickIt = (label) => {
      props.ele.value = label;
    };
    return {
      isReadonlyStatus,
      changeValue,
      choosedValue,
      clickIt
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