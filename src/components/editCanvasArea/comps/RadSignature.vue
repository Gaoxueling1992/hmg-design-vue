<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    style="border-color:inherit;text-decoration: inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
    :style="{
      lineHeight: ele.imgHeight+ 'px',
      height: ele.imgHeight+ 'px',
      'vertical-align': 'top',
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : ''
    }"
  >{{ ele.label }}</div>
  <div
    :class="{
      'flex flex1': !isReadonlyStatus
    }"
    :style="{
      flexDirection: (ele.imagePosi === 'right' || ele.imagePosi === 'left') ? 'row' : 'column',
      display: isReadonlyStatus ? 'inline-block' : '',
      'text-decoration': 'inherit'
    }"
  >
    <template v-if="ele.imagePosi === 'right' || ele.imagePosi === 'bottom'">
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
          style="border-color:inherit;text-decoration: inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;padding-top: 1px;padding-bottom: 1px;"
          class="inherit display-text"
          :style="{
            float: ele.imagePosi === 'right' ? 'left' : ''
          }"
        >
          {{ ele.value }}&nbsp;
        </div>
      </template>
      <template v-if="ele.type !== 'input'">
        <img
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
            float: ele.imagePosi === 'right' ? 'left' : ''
          }"
        />
      </template>
    </template>
    <template v-else>
      <template v-if="ele.type !== 'input'">
        <img
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
            float: ele.imagePosi === 'left' ? 'left' : ''
          }"
        />
      </template>
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
          style="border-color:inherit;text-decoration: inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;padding-top: 1px;padding-bottom: 1px;"
          class="inherit display-text"
          :style="{
            float: ele.imagePosi === 'left' ? 'left' : ''
          }"
        >
          {{ ele.value }}&nbsp;
        </div>
      </template>
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