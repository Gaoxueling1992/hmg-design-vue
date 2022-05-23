<template>
  <a-image
    class="img"
    v-if="ele.src"
    :height="ele.imgHeight"
    :width="ele.imgWidth"
    :src="ele.src"
    :style="{
      marginTop: ele.styleSheet.paddingTop + 'px',
      marginBottom: ele.styleSheet.paddingBottom + 'px',
      marginLeft: ele.styleSheet.paddingLeft + 'px',
      marginRight: ele.styleSheet.paddingRight + 'px',
      height: ele.imgHeight+ 'px',
      width: ele.imgWidth + 'px'
    }"
  />
  <div
    v-else
    :style="{
      marginTop: ele.styleSheet.paddingTop + 'px',
      marginBottom: ele.styleSheet.paddingBottom + 'px',
      marginLeft: ele.styleSheet.paddingLeft + 'px',
      marginRight: ele.styleSheet.paddingRight + 'px',
      height: ele.imgHeight+ 'px',
      width: ele.imgWidth + 'px',
      border: '1px solid'
    }"
  ></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup() {}
});
</script>