<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-20 14:42:08
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-13 09:55:43
 * @FilePath: /hmg-design-vue/src/components/editCanvasArea/comps/RadDrcode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-image
    class="img"
    :height="ele.imgHeight"
    :width="ele.imgWidth"
    :src="ele.img"
    :preview="false"
    :style="{
      height: ele.imgHeight+ 'px',
      width: ele.imgWidth + 'px'
    }"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['ele'],
  components: {
  },
  setup () {
    
  },
})
</script>