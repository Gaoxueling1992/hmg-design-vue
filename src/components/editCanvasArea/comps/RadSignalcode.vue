<template>
  <Vue3Barcode
    :value="ele.src"
    :background="ele.background"
    :lineColor="ele.lineColor"
    :displayValue="false"
    :width="ele.codeWidth"
    :height="ele.codeHeight"
    :margin="0"
  />
  <div v-if="ele.displayValue" style="text-align:center"
    :style="{
      'width': textWidth + 'px'
    }">
    {{ele.text}}
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import Vue3Barcode from 'vue3-barcode';

export default defineComponent({
  props: ['ele'],
  components: {
    Vue3Barcode
  },
  setup (props) {
    const textWidth: Ref = ref<number>(0);
    onMounted(() => {
      if (props.ele.text) {
        textWidth.value = document.getElementById(props.ele.id).getElementsByClassName('vue3-barcode-element')[0].getBoundingClientRect().width;
      }
    });
    return {
      textWidth
    }
  },
})
</script>