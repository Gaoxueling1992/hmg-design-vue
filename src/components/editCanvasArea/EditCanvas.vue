<template>
  <div
    class="edit-canvas"
    :style="styleSheet"
  >
    <div
      v-for="(line, idx) in lines"
      :key="idx"
      :id="'line' + idx"
    >
      <div class="edit-canvas-line">
        <div
          v-for="ele in line"
          :key="ele.id"
          :style="{
            'align-items': ele.inline && ele.elName !== 'RadEditor' ? 'center' : '',
            'flex': ele.styleSheet.width !== '100%' ? 'unset' : 1,
            'max-width': '100%',
            'overflow': 'hidden',
            'position': 'relative',
            ...ele.styleSheet,
            fontSize: ele.styleSheet.fontSize + 'px',
            borderWidth: ele.styleSheet.borderWidth + 'px',
            display: ele.inline ? 'flex' : 'inline-block',
            'padding': '5px'
          }"
        >
          <component :is="ele.elName" :ele="ele"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue';
import RadText from './comps/RadText.vue';
import RadImage from './comps/RadImage.vue';
import RadLine from './comps/RadLine.vue';
import RadInput from './comps/RadInput.vue';
import RadEditor from './comps/RadEditor.vue';
import RadSignalcode from './comps/RadSignalcode.vue';
import RadDrcode from './comps/RadDrcode.vue';
import RadMulitImagepicker from './comps/RadMulitImagepicker.vue';
import RadDatetime from './comps/RadDatetime.vue';
import RadNumber from './comps/RadNumber.vue';

export default defineComponent({
  components: {
    RadText: RadText,
    RadImage: RadImage,
    RadLine: RadLine,
    RadInput: RadInput,
    RadEditor: RadEditor,
    RadSignalcode: RadSignalcode,
    RadDrcode: RadDrcode,
    RadMulitImagepicker: RadMulitImagepicker,
    RadDatetime: RadDatetime,
    RadNumber: RadNumber
  },
  setup() {
    const pageData: any = inject('pageData') || { line: [], styleSheet: {}}
    const { lines, styleSheet } = toRefs(pageData)

    return {
      pageData,
      lines,
      styleSheet
    };
  }
});
</script>

<style lang="scss">
.edit-canvas {
  background-color: var(--color-white);
  border: 1px dashed var(--color-primary);
  margin: 0 auto 20px auto;
  width: calc(100% - 20px);
  .edit-canvas-line {
    display: flex;
    position: relative;
  }
  .ql-container {
    height: auto;
  }
}
</style>