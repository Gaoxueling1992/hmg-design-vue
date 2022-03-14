<template>
  <a-image
    class="img"
    :height="ele.imgHeight"
    :width="ele.imgWidth"
    :src="ele.img"
    :style="{
      marginTop: ele.styleSheet.paddingTop + 'px',
      marginBottom: ele.styleSheet.paddingBottom + 'px',
      marginLeft: ele.styleSheet.paddingLeft + 'px',
      marginRight: ele.styleSheet.paddingRight + 'px',
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