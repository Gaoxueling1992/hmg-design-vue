<template>
  <div
    class="edit-canvas"
    :style="{
      ...styleSheet,
      backgroundImage: 'repeating-linear-gradient(transparent, transparent ' + styleSheet.minHeight + ', red ' + styleSheet.minHeight + ', red ' + (parseInt(styleSheet.minHeight) + 0.5) + 'mm)',
      padding: styleSheet.padding
    }"
  >
    <template v-if="!loading">
      <div id="edit-canvas-header">
        <div
          v-for="(line, idx) in headerLines"
          :key="idx"
          :id="'line' + String(idx)"
          :style="{
            'display': isReadonlyStatus ? 'table' : '',
            'width': '100%',
            'padding': line.length > 0 ? '2px 0' : '0'
          }"
        >
          <div style="position:relative;width:100%;line-height:1" :style="{display: isReadonlyStatus ? 'table-row' : 'flex'}">
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
                display: ele.inline ? (isReadonlyStatus ? 'table-cell' : 'flex') : (isReadonlyStatus ? 'table-cell' : 'inline-block'),
                width: eleWidth(line, index),
                'padding-top': ele.elName === 'RadLine' ? '10px !important' : '0px !important',
                'padding-bottom': ele.elName === 'RadLine' ? '10px !important' : '0px !important',
                'vertical-align': 'middle',
                'padding-top': ele.elName === 'RadLine' ? '10px' : '0',
                'padding-bottom': ele.elName === 'RadLine' ? '10px' : '0',
                'text-align': ele.styleSheet.justifyContent === 'center' ? 'center' :  (ele.styleSheet.justifyContent === 'right' ? 'end' : 'start')
              }"
            >
              <component v-if="!ele.baseProps || !ele.baseProps.hideOnPrint || !isReadonlyStatus" :is="ele.elName" :ele="ele"></component>
            </div>
          </div>
        </div>
      </div>
      <div id="edit-canvas-body">
        <div
          v-for="(line, idx) in bodyLines"
          :key="idx"
          :id="'line' + String(idx)"
          :style="{
            'display': isReadonlyStatus ? 'table' : '',
            'width': '100%'
          }"
        >
          <div style="position:relative;width:100%;line-height:1" :style="{display: isReadonlyStatus ? 'table-row' : 'flex'}">
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
                display: ele.inline ? (isReadonlyStatus ? 'table-cell' : 'flex') : (isReadonlyStatus ? 'table-cell' : 'inline-block'),
                width: eleWidth(line, index),
                'vertical-align': 'middle',
                'padding-top': ele.elName === 'RadLine' ? '10px' : '0',
                'padding-bottom': ele.elName === 'RadLine' ? '10px' : '0',
                'text-align': ele.styleSheet.justifyContent === 'center' ? 'center' :  (ele.styleSheet.justifyContent === 'right' ? 'end' : 'start')
              }"
            >
              <component v-if="!ele.baseProps || !ele.baseProps.hideOnPrint || !isReadonlyStatus" :is="ele.elName" :ele="ele"></component>
            </div>
          </div>
        </div>
      </div>
      <div id="edit-canvas-footer">
        <div
          v-for="(line, idx) in footerLines"
          :key="idx"
          :id="'line' + String(idx)"
          :style="{
            'display': isReadonlyStatus ? 'table' : '',
            'width': '100%'
          }"
        >
          <div
            style="position:relative;width:100%;line-height:1"
            :style="{'display': isReadonlyStatus ? 'table-row' : 'flex'}">
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
                display: ele.inline ? (isReadonlyStatus ? 'table-cell' : 'flex') : (isReadonlyStatus ? 'table-cell' : 'inline-block'),
                width: eleWidth(line, index),
                'vertical-align': 'middle',
                'padding-top': ele.elName === 'RadLine' ? '10px' : '0',
                'padding-bottom': ele.elName === 'RadLine' ? '10px' : '0',
                'text-align': ele.styleSheet.justifyContent === 'center' ? 'center' :  (ele.styleSheet.justifyContent === 'right' ? 'end' : 'start')
              }"
            >
              <component v-if="!ele.baseProps || !ele.baseProps.hideOnPrint || !isReadonlyStatus" :is="ele.elName" :ele="ele"></component>
            </div>
          </div>
        </div>
      </div>
    </template>
    <a-spin v-else size="large" style="width: 100%" />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs, Ref, computed, ref, provide } from 'vue';
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
    const { lines, styleSheet, pageHeaderId, pageFooterId, headerLine, footerLine } = toRefs(pageData);
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    const loading: Ref<boolean> = inject('loading');
    const focusedEle: Ref<string> = ref<string>('')

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

    for (let i = 0; i < lines.value.length; i++) {
      for (let j = 0; j < lines.value[i].length; j++) {
        if (+pageHeaderId.value === +lines.value[i][j].id) {
          headerLine.value = i;
          break;
        }
      }
      if (headerLine.value === i) {
        break;
      }
    }

    for (let i = 0; i < lines.value.length; i++) {
      for (let j = 0; j < lines.value[i].length; j++) {
        if (+pageFooterId.value === +lines.value[i][j].id) {
          footerLine.value = i;
          break;
        }
      }
      if (footerLine.value === i) {
        break;
      }
    }

    const headerLines = computed(() => {
      if (headerLine.value > -1) {
        return lines.value.slice(0, headerLine.value + 1);
      } else {
        return [];
      }
    });

    const footerLines = computed(() => {
      if (footerLine.value < 9999 ) {
        return lines.value.slice(footerLine.value, lines.value.length)
      } else {
        return [];
      }
    });

    const bodyLines = computed(() => {
      if (headerLine.value > -1 && footerLine.value < 9999) {
        return lines.value.slice(headerLine.value + 1, footerLine.value);
      } else if (headerLine.value > -1 && footerLine.value === 9999) {
        return lines.value.slice(headerLine.value + 1, lines.length);
      } else if (headerLine.value === -1 && footerLine.value < 9999) {
        return lines.value.slice(0, footerLine.value);
      } else {
        return lines.value;
      }
    });

    provide('focusedEle', focusedEle);

    return {
      pageData,
      lines,
      styleSheet,
      isReadonlyStatus,
      eleWidth,
      headerLine, footerLine,
      headerLines, footerLines, bodyLines,
      loading,
      focusedEle
    };
  }
});
</script>

<style lang="scss">
.edit-canvas {
  background-color: var(--color-white);
  border: 1px dashed var(--color-primary);
  width: calc(100% - 20px);
  // margin: 0 auto;
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