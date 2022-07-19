<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
    style="border-color:inherit;text-decoration: inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
    :style="{
      lineHeight: ele.imgHeight > 30 && ele.type !== 'input' ? ele.imgHeight + 'px' : '30px',
      height: ele.imgHeight > 30 && ele.type !== 'input' ? ele.imgHeight+ 'px' : '30px',
      'vertical-align': 'top',
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : '',
      'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration ?  ele.styleSheet.textDecoration : 'none'
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
          v-if="!isReadonlyStatus && !ele.baseProps.readonly"
          v-model:value="ele.value"
          :placeholder="ele.placeholder"
        >
        </a-input>
        <div
          v-else
          style="border-color:inherit;text-decoration: inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;padding-top: 1px;padding-bottom: 1px;"
          class="inherit display-text"
          :style="{
            float: ele.imagePosi === 'right' ? 'left' : '',
            lineHeight: ele.imgHeight > 30 && ele.imagePosi === 'right' ? ele.imgHeight + 'px !important' : '30px',
            'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration ?  ele.styleSheet.textDecoration : 'none'
          }"
        >
          {{ ele.value }}&nbsp;
        </div>
      </template>
      <div
        v-if="ele.type !== 'input'"
        :style="{float: ele.imagePosi === 'right' ? 'left' : '',display: 'block'}"
      >
        <img
          class="img"
          :height="ele.imgHeight"
          :width="ele.imgWidth"
          :src="ele.src"
          v-if="ele.src"
          alt="签名"
          :style="{
            lineHeight: ele.imgHeight+ 'px',
            float: 'left',
            margin: '3px'
          }"
        />
        <template v-if="ele.srcs">
          <span v-if="ele.src" style="float: left">{{ele.splitWords}}</span>
          <template
            v-for="(src, idx) in ele.srcs"
            :key="idx"
          >
            <img
              class="img"
              :height="ele.imgHeight"
              :width="ele.imgWidth"
              :src="src"
              alt="签名"
              :style="{
              lineHeight: ele.imgHeight+ 'px',
              float: 'left',
              margin: '3px'
            }"
            />
            <span v-if="idx < ele.srcs.length - 1" style="float: left">{{ele.splitWords}}</span>
          </template>
        </template>
      </div>
    </template>
    <template v-else>
      <div
        v-if="ele.type !== 'input'"
        :style="{float: ele.imagePosi === 'left' ? 'left' : '',display: 'block'}"
      >
        <img
          class="img"
          :height="ele.imgHeight"
          :width="ele.imgWidth"
          :src="ele.src"
          v-if="ele.src"
          alt="签名"
          :style="{
            lineHeight: ele.imgHeight+ 'px',
            float: 'left',
            margin: '3px'
          }"
        />
        <template v-if="ele.srcs">
          <span v-if="ele.src" style="float: left">{{ele.splitWords}}</span>
          <template
            v-for="(src, idx) in ele.srcs"
            :key="idx"
          >
            <img
              class="img"
              :height="ele.imgHeight"
              :width="ele.imgWidth"
              :src="src"
              alt="签名"
              :style="{
              lineHeight: ele.imgHeight+ 'px',
              float: 'left',
              margin: '3px'
            }"
            />
            <span v-if="idx < ele.srcs.length - 1" style="float: left">{{ele.splitWords}}</span>
          </template>
        </template>
      </div>
      <template v-if="ele.type !== 'image'">
        <a-input
          style="flex: 1"
          :disabled="ele.baseProps.readonly"
          class="inherit"
          v-if="!isReadonlyStatus && !ele.baseProps.readonly"
          v-model:value="ele.value"
          :placeholder="ele.placeholder"
        >
        </a-input>
        <div
          v-else
          style="border-color:inherit;text-decoration: inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;padding-top: 1px;padding-bottom: 1px;"
          class="inherit display-text"
          :style="{
            float: ele.imagePosi === 'left' ? 'left' : '',
            lineHeight: ele.imgHeight > 30 && ele.imagePosi === 'left' ? ele.imgHeight + 'px !important' : '30px',
            'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration ?  ele.styleSheet.textDecoration : 'none'
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
  props: ['ele', 'toolbarId', 'lineId'],
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