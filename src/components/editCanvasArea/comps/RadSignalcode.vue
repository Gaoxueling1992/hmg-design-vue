<template>
  <Vue3Barcode
    :value="ele.src"
    :background="ele.background"
    :lineColor="ele.lineColor"
    :displayValue="ele.displayValue"
    :text="ele.text"
    :textAlign="ele.textAlign"
    :textPosition="ele.textPosition"
    :fontSize="ele.textSize"
    :width="ele.codeWidth"
    :height="ele.codeHeight"
    :margin="0"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Vue3Barcode from 'vue3-barcode';

export default defineComponent({
  props: ['ele'],
  components: {
    Vue3Barcode
  },
  setup () {
    
  },
})
</script>