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
            'width': '100%',
            'padding': line.length > 0 ? '2px 0' : '0',
            'overflow': 'hidden'
          }"
        >
          <div
            style="position:relative;width:100%;"
            :style="{display: isReadonlyStatus ? '' : 'flex'}"
          >
            <template
              v-for="(ele, index) in line"
              :key="ele.id"
            >
              <div
                v-if="ele.display !== false"
                :style="{
                'align-items': ele.inline && ele.elName !== 'RadEditor' ? 'center' : '',
                'max-width': '100%',
                'overflow-x': 'hidden',
                'overflow-y': ele.elName === 'rad-editor' ? 'auto' : 'hidden',
                'position': 'relative',
                ...ele.styleSheet,
                fontSize: ele.styleSheet && ele.styleSheet.fontSize ? ele.styleSheet.fontSize + 'px' : 'inherit',
                borderWidth: ele.styleSheet && ele.styleSheet.borderWidth ? ele.styleSheet.borderWidth + 'px' : 0,
                display: ele.inline ? (isReadonlyStatus ? (ele.elName === 'RadEditor' ? 'table-row' : 'table-cell') : 'flex') : (isReadonlyStatus ? (ele.elName === 'RadEditor' ? 'table-row' : 'table-cell') : 'inline-block'),
                width: eleWidth(line, index),
                'vertical-align': 'middle',
                'text-align': ele.styleSheet && ele.styleSheet.justifyContent === 'center' ? 'center' :  (ele.styleSheet && ele.styleSheet.justifyContent === 'right' ? 'end' : 'start'),
                float: 'left',
                paddingTop: ele.styleSheet && +ele.styleSheet.paddingTop ? (ele.styleSheet.paddingTop + 'px !important') : ele.elName === 'RadLine' ? '10px !important' :  '2px !important',
                paddingBottom: ele.styleSheet && +ele.styleSheet.paddingBottom ? (ele.styleSheet.paddingBottom + 'px !important') : ele.elName === 'RadLine' ? '10px !important' : '2px !important',
                paddingLeft: ele.styleSheet && +ele.styleSheet.paddingLeft ? (ele.styleSheet.paddingLeft  + 'px !important') : '0px',
                paddingRight: ele.styleSheet && +ele.styleSheet.paddingRight ? (ele.styleSheet.paddingRight + 'px !important') : '0px',
                'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration && ele.elName !== 'RadEditor' ?  ele.styleSheet.textDecoration : 'none'
              }"
              :id="ele.id"
              >
                <component
                  v-if="!ele.baseProps || !ele.baseProps.hideOnPrint || !isReadonlyStatus"
                  :is="ele.elName"
                  :ele="ele"
                ></component>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div id="edit-canvas-body">
        <div
          v-for="(line, idx) in bodyLines"
          :key="idx"
          :id="'line' + String(idx)"
          :style="{
            'display': '',
            'width': '100%',
            'overflow': 'hidden'
          }"
        >
          <div
            style="position:relative;width:100%;"
            :style="{display: isReadonlyStatus ? '' : 'flex'}"
          >
            <template
              v-for="(ele, index) in line"
              :key="ele.id"
            >
              <div
                :style="{
                'align-items': ele.inline && ele.elName !== 'RadEditor' ? 'center' : '',
                'max-width': '100%',
                'overflow-x': 'hidden',
                'overflow-y': ele.elName === 'rad-editor' ? 'auto' : 'hidden',
                'position': 'relative',
                ...ele.styleSheet,
                fontSize: ele.styleSheet && ele.styleSheet.fontSize ? ele.styleSheet.fontSize + 'px' : 'inherit',
                borderWidth: ele.styleSheet && ele.styleSheet.borderWidth ? ele.styleSheet.borderWidth + 'px' : 0,
                display: ele.inline ? (isReadonlyStatus ? (ele.elName === 'RadEditor' ? 'table-row' : 'table-cell') : 'flex') : (isReadonlyStatus ? (ele.elName === 'RadEditor' ? 'table-row' : 'table-cell') : 'inline-block'),
                width: eleWidth(line, index),
                'vertical-align': 'middle',
                'text-align': ele.styleSheet && ele.styleSheet.justifyContent === 'center' ? 'center' :  (ele.styleSheet && ele.styleSheet.justifyContent === 'right' ? 'end' : 'start'),
                float: 'left',
                paddingTop: ele.styleSheet && +ele.styleSheet.paddingTop ? (ele.styleSheet.paddingTop + 'px !important') : ele.elName === 'RadLine' ? '10px !important' :  '2px !important',
                paddingBottom: ele.styleSheet && +ele.styleSheet.paddingBottom ? (ele.styleSheet.paddingBottom + 'px !important') : ele.elName === 'RadLine' ? '10px !important' : '2px !important',
                paddingLeft: ele.styleSheet && +ele.styleSheet.paddingLeft ? (ele.styleSheet.paddingLeft  + 'px !important') : '0px',
                paddingRight: ele.styleSheet && +ele.styleSheet.paddingRight ? (ele.styleSheet.paddingRight + 'px !important') : '0px',
                'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration && ele.elName !== 'RadEditor' ?  ele.styleSheet.textDecoration : 'none'
              }"
              :id="ele.id"
              v-if="ele.display !== false"
              >
                <component
                  v-if="!ele.baseProps || !ele.baseProps.hideOnPrint || !isReadonlyStatus"
                  :is="ele.elName"
                  :ele="ele"
                ></component>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div id="edit-canvas-footer">
        <div
          v-for="(line, idx) in footerLines"
          :key="idx"
          :id="'line' + String(idx)"
          :style="{
            'display': '',
            'width': '100%',
            'overflow': 'hidden'
          }"
        >
          <div
            style="position:relative;width:100%;"
            :style="{'display': isReadonlyStatus ? '' : 'flex'}"
          >
            <template
              v-for="(ele, index) in line"
              :key="ele.id"
            >
              <div
                :style="{
                  'align-items': ele.inline && ele.elName !== 'RadEditor' ? 'center' : '',
                  'max-width': '100%',
                  'overflow-x': 'hidden',
                  'overflow-y': ele.elName === 'rad-editor' ? 'auto' : 'hidden',
                  'position': 'relative',
                  ...ele.styleSheet,
                  fontSize: ele.styleSheet && ele.styleSheet.fontSize ? ele.styleSheet.fontSize + 'px' : 'inherit',
                  borderWidth: ele.styleSheet && ele.styleSheet.borderWidth ? ele.styleSheet.borderWidth + 'px' : 0,
                  display: ele.inline ? (isReadonlyStatus ? (ele.elName === 'RadEditor' ? 'table-row' : 'table-cell') : 'flex') : (isReadonlyStatus ? (ele.elName === 'RadEditor' ? 'table-row' : 'table-cell') : 'inline-block'),
                  width: eleWidth(line, index),
                  'vertical-align': 'middle',
                  'text-align': ele.styleSheet && ele.styleSheet.justifyContent === 'center' ? 'center' :  (ele.styleSheet && ele.styleSheet.justifyContent === 'right' ? 'end' : 'start'),
                  float: 'left',
                  paddingTop: ele.styleSheet && +ele.styleSheet.paddingTop ? (ele.styleSheet.paddingTop + 'px !important') : ele.elName === 'RadLine' ? '10px !important' :  '2px !important',
                  paddingBottom: ele.styleSheet && +ele.styleSheet.paddingBottom ? (ele.styleSheet.paddingBottom + 'px !important') : ele.elName === 'RadLine' ? '10px !important' : '2px !important',
                  paddingLeft: ele.styleSheet && +ele.styleSheet.paddingLeft ? (ele.styleSheet.paddingLeft  + 'px !important') : '0px',
                  paddingRight: ele.styleSheet && +ele.styleSheet.paddingRight ? (ele.styleSheet.paddingRight + 'px !important') : '0px',
                  'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration && ele.elName !== 'RadEditor' ?  ele.styleSheet.textDecoration : 'none'
                }"
                :id="ele.id"
                v-if="ele.display !== false"
              >
                <component
                  v-if="(!ele.baseProps || !ele.baseProps.hideOnPrint || !isReadonlyStatus)"
                  :is="ele.elName"
                  :ele="ele"
                ></component>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <a-spin
      v-else
      size="large"
      style="width: 100%"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  inject,
  toRefs,
  Ref,
  computed,
  ref,
  provide
} from 'vue';
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
    const pageData: any = inject('pageData') || { line: [], styleSheet: {} };
    const {
      lines,
      styleSheet,
      pageHeaderId,
      pageFooterId,
      headerLine,
      footerLine
    } = toRefs(pageData);
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    const loading: Ref<boolean> = inject('loading');
    const focusedEle: Ref<string> = ref<string>('');

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
              count++;
            }
          }
          return ((100 - totalWidth) / (line.length - count)).toFixed(2) + '%';
        }
      };
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
      if (footerLine.value < 9999) {
        return lines.value.slice(footerLine.value, lines.value.length);
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
      headerLine,
      footerLine,
      headerLines,
      footerLines,
      bodyLines,
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
  .ql-container {
    height: auto;
  }
  .ant-input,
  .ant-input-number-input,
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding-left: 0 !important;
    font-style: inherit !important;
  }
  .display-text {
    line-height: 30px !important;
    padding-top: 1px;
    padding-bottom: 1px;
  }
}
</style>