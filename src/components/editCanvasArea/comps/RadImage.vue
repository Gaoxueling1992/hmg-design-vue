<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-19 11:22:04
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-13 09:55:49
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadImage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-image
    class="img"
    v-if="ele.src"
    :height="ele.imgHeight"
    :width="ele.imgWidth"
    :src="ele.src"
    :preview="false"
    :style="{
      height: ele.imgHeight+ 'px',
      width: ele.imgWidth + 'px'
    }"
  />
  <div
    v-else
    :style="{
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