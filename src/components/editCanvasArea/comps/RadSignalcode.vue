<template>
  <div v-if="ele.displayValue && ele.textPosition === 'top'" style="text-align:center"
    :style="{
      'width': textWidth + 'px',
      'text-align': ele.textAlign,
      'font-size': ele.textSize + 'px'
    }">
    {{ele.text}}
  </div>
  <Vue3Barcode
    :value="ele.src"
    :background="ele.background"
    :lineColor="ele.lineColor"
    :displayValue="false"
    :width="ele.codeWidth"
    :height="ele.codeHeight"
    :margin="0"
    v-if="pageId!=='designer'"
  />
  <div :style="{
    width: textWidth + 'px',
    height: ele.codeHeight + 'px',
    backgroundColor: ele.background,
    color: ele.lineColor,
    textAlign: ele.textAlign,
    border: '1px solid ' + ele.lineColor
  }" v-else>二维码占位符</div>
  <div v-if="ele.displayValue && ele.textPosition === 'bottom'" style="text-align:center"
    :style="{
      'width': textWidth + 'px',
      'text-align': ele.textAlign,
      'font-size': ele.textSize + 'px'
    }">
    {{ele.text}}
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref, inject } from 'vue';
import Vue3Barcode from 'vue3-barcode';

export default defineComponent({
  props: ['ele'],
  components: {
    Vue3Barcode
  },
  setup (props) {
    const textWidth: Ref = ref<number>(0);
    const pageId: any = inject('pageId');
    onMounted(() => {
      if (props.ele.text) {
        textWidth.value = document.getElementById(props.ele.id).getElementsByClassName('vue3-barcode-element')[0].getBoundingClientRect().width;
      }
    });
    return {
      textWidth,
      pageId
    }
  },
})
</script>