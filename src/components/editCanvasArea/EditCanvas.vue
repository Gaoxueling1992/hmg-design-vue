<template>
  <div
    class="edit-canvas"
    :style="{
      ...styleSheet,
      backgroundImage: 'repeating-linear-gradient(transparent, transparent ' + styleSheet.minHeight + ', red ' + styleSheet.minHeight + ', red ' + (parseInt(styleSheet.minHeight) + 0.5) + 'mm)',
      padding: styleSheet.padding
    }"
  >
    <div
      v-for="(line, idx) in lines"
      :key="idx"
      :id="'line' + String(idx)"
      style="padding: 2px 0"
    >
      <div style="position:relative;width:100%;line-height:1" :style="{display: isReadonlyStatus ? '' : 'flex'}">
        <div
          v-for="(ele, index) in line"
          :key="ele.id"
          :style="{
            'align-items': ele.inline && ele.elName !== 'RadEditor' ? 'center' : '',
            'max-width': '100%',
            'overflow-x': 'hidden',
            'overflow-y': ele.elName === 'rad-editor' ? 'auto' : 'hidden',
            'position': 'relative',
            ...ele.styleSheet,
            fontSize: ele.styleSheet.fontSize + 'px',
            borderWidth: ele.styleSheet.borderWidth + 'px',
            display: ele.inline ? (isReadonlyStatus ? 'inline-block' : 'flex') : 'inline-block',
            width: eleWidth(line, index)
          }"
        >
          <component :is="ele.elName" :ele="ele"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs, Ref, computed } from 'vue';
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
import RadSingleSelect from './comps/RadSingleSelect.vue';
import RadMulSelect from './comps/RadMulSelect.vue';
import RadTable from './comps/RadTable.vue';
import RadSignature from './comps/RadSignature.vue';
import CombinationArea from './comps/CombinationArea.vue';

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
    RadNumber: RadNumber,
    RadSingleSelect: RadSingleSelect,
    RadMulSelect: RadMulSelect,
    RadTable: RadTable,
    RadSignature: RadSignature,
    CombinationArea: CombinationArea
  },
  setup() {
    const pageData: any = inject('pageData') || { line: [], styleSheet: {}};
    const { lines, styleSheet } = toRefs(pageData);
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');

    const eleWidth = computed(() => {
      return (line, idx) => {
        if (line[idx].styleSheet.width !== '100%') {
          return line[idx].styleSheet.width;
        } else {
          let totalWidth = 0;
          let count = 0;
          for (let i = 0; i < line.length; i++) {
            if (line[i].styleSheet.width !== '100%') {
              totalWidth += parseInt(line[i].styleSheet.width);
              count ++;
            }
          }
          return Math.floor((100 - totalWidth) / (line.length - count)) + '%'
        }
      }
    });

    return {
      pageData,
      lines,
      styleSheet,
      isReadonlyStatus,
      eleWidth
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
  .ql-container {
    height: auto;
  }
  .ant-input, .ant-input-number-input, .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding-left: 0 !important;
  }
  .display-text {
    line-height: 30px !important;
    padding-top: 1px;
    padding-bottom: 1px;
  }
}
</style>