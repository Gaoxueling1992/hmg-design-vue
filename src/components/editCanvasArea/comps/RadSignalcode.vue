<template>
  <div :style="{
    width: '100%',
    height: ele.codeHeight + 'px',
    lineHeight: ele.codeHeight + 'px',
    backgroundColor: ele.background,
    color: ele.lineColor,
    textAlign: ele.textAlign,
    border: '1px solid ' + ele.lineColor
  }" v-if="!ele.img">未生成条形码</div>
  <a-image
    class="img"
    :preview="false"
    v-else
    :height="ele.imgHeight"
    :width="ele.imgWidth"
    :src="ele.img"
    :style="{
      height: ele.imgHeight+ 'px',
      width: ele.imgWidth + 'px'
    }"
  />
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  props: ['ele', 'toolbarId', 'lineId'],
  setup (props) {
    const pageId: any = inject('pageId');
    return {
      pageId
    }
  },
})
</script>