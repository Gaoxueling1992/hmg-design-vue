<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label }}</div>
  <div
    class="flex1 flex"
    :style="{
      flexDirection: ele.imagePosi === 'right' ? 'row' : (ele.imagePosi === 'left' ? 'row-reverse' : (ele.imagePosi === 'up' ? 'column-reverse' : 'column'))
    }"
  >
    <a-input
      style="flex: 1"
      :disabled="ele.baseProps.readonly"
      class="inherit"
      v-if="ele.type !== 'image'"
      v-model:value="ele.defaultValue"
      :placeholder="ele.placeholder"
    >
    </a-input>
    <template v-if="ele.type !== 'input'">
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
          border: '1px solid'
        }"
      />
      <span
        v-else
        class="default-img"
        :style="{
        height: ele.imgHeight+ 'px',
        lineHeight: ele.imgHeight+ 'px',
        width: ele.imgWidth + 'px'
      }"
      >签名</span>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup() {
  }
});
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
}
.default-img {
  display: block;
  border: 1px solid;
  text-align: center;
}
</style>