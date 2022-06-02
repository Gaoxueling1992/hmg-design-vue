<template>
  <a-image
    class="img"
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
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['ele'],
  components: {
  },
  setup () {
    
  },
})
</script>