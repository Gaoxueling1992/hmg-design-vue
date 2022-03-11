<!--
 * @Author: your name
 * @Date: 2022-02-14 17:44:05
 * @LastEditTime: 2022-03-11 11:28:38
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /web-ris-front/Users/xuelinggao/Documents/develop/hmg-design-vue/src/components/editCanvasArea/comps/RadSignature.vue
-->
<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    :style="{
      lineHeight: ele.imgHeight+ 'px',
      height: ele.imgHeight+ 'px',
      'vertical-align': 'top'
    }"
  >{{ ele.label }}</div>
  <div
    :class="{
      'flex flex1': !isReadonlyStatus
    }"
    :style="{
      flexDirection: ele.imagePosi === 'right' ? 'row' : (ele.imagePosi === 'left' ? 'row-reverse' : (ele.imagePosi === 'up' ? 'column-reverse' : 'column')),
      display: isReadonlyStatus ? 'inline-block' : ''
    }"
  >
    <template v-if="ele.type !== 'image'">
      <a-input
        style="flex: 1"
        :disabled="ele.baseProps.readonly"
        class="inherit"
        v-if="!isReadonlyStatus"
        v-model:value="ele.value"
        :placeholder="ele.placeholder"
      >
      </a-input>
      <div
        v-else
        style="flex: 1"
        class="inherit display-text"
        :style="{
          float: isReadonlyStatus ? '' : 'left'
        }"
      >
        {{ ele.value }}&nbsp;
      </div>
    </template>
    <template v-if="ele.type !== 'input' && (( isReadonlyStatus) || !isReadonlyStatus)">
      <a-image
        class="img"
        :height="ele.imgHeight"
        :width="ele.imgWidth"
        :src="ele.src"
        v-if="ele.src"
        alt="签名"
        :style="{
          height: ele.imgHeight+ 'px',
          lineHeight: ele.imgHeight+ 'px',
          width: ele.imgWidth + 'px',
          display: 'block',
          border: '1px solid',
          float: isReadonlyStatus ? 'left' : ''
        }"
      />
      <span
        v-else
        class="default-img"
        :style="{
        height: ele.imgHeight+ 'px',
        lineHeight: ele.imgHeight+ 'px',
        width: ele.imgWidth + 'px',
        float: isReadonlyStatus ? 'left' : ''
      }"
      >签名</span>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';

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
.default-img {
  display: block;
  border: 1px solid;
  text-align: center;
}
.display-text {
  display: inline-block;
}
</style>