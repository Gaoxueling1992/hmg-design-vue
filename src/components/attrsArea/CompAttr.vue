<template>
  <div class="comp-attr">
    <div class="comp-attr-header">
      <div class="container-item padding10 paddingT20">
        <div class="title marginB5 fontW500">{{activeCompObj.name}}</div>
        <div class="desc fontW400">{{activeCompObj.desc}}</div>
        <div class="desc fontW400">颜色支持配置为英文、十六进制、RGB和RGBA。</div>
      </div>
    </div>
    <div class="padding10 attr-body">
      <div class="container-item" v-show="activeCompObj.elName !== 'CombinationArea'">
        <div class="title marginB5 fontW500">文本内容</div>
        <div
          id="toolbar"
          class="toolbar"
          style="z-index: 1"
          v-show="activeCompObj.elName === 'RadText'"
        ></div>
        <div
          class="container container-editor-attr"
          id="editor-ct"
          v-show="activeCompObj.elName === 'RadText'"
        ></div>
        <a-textarea
          v-if="activeCompObj.elName !== 'RadText'"
          v-model:value="activeCompObj.label"
          allowClear
          :auto-size="{ minRows: 2, maxRows: 2 }"
        />
      </div>
      <a-checkbox
        v-if="!activeCompObj.noLabel"
        v-model:checked="activeCompObj.inline"
        class="marginT10"
      >左侧标签</a-checkbox>
      <component :is="activeCompObj.elName"></component>
      <Domain v-if="!!activeCompObj.domainType"></Domain>
      <BaseProps v-if="!!activeCompObj.baseProps"></BaseProps>
      <StyleSheet v-if="!!activeCompObj.styleSheet"></StyleSheet>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, watch } from 'vue';
import { sheet2Form } from '@/utils/config';
import RadInput from './comps/RadInput.vue';
import RadNumber from './comps/RadNumber.vue';
import RadDatetime from './comps/RadDatetime.vue';
import RadImage from './comps/RadImage.vue';
import RadSingleSelect from './comps/RadSingleSelect.vue';
import RadMulSelect from './comps/RadMulSelect.vue';
import RadMulitImagepicker from './comps/RadMulitImagepicker.vue';
import RadSignalcode from './comps/RadSignalcode.vue';
import RadDrcode from './comps/RadDrcode.vue';
import RadEditor from './comps/RadEditor.vue';
import RadTable from './comps/RadTable.vue';
import RadSignature from './comps/RadSignature.vue';
import CombinationArea from './comps/CombinationArea.vue';
import { editorFontSizes } from '@/utils/config';
import E from 'wangeditor';

export default defineComponent({
  components: {
    RadInput: RadInput,
    RadNumber: RadNumber,
    RadDatetime: RadDatetime,
    RadImage: RadImage,
    RadSingleSelect: RadSingleSelect,
    RadMulSelect: RadMulSelect,
    RadMulitImagepicker: RadMulitImagepicker,
    RadSignalcode: RadSignalcode,
    RadDrcode: RadDrcode,
    RadEditor: RadEditor,
    RadTable: RadTable,
    RadSignature: RadSignature,
    CombinationArea: CombinationArea
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    let editor: any;
    let id: string = `#editor-ct`;
    let toolbarid: string = `#toolbar`;
    let editorMenus: any = [
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'lineHeight', //
      'foreColor' // 文字颜色
    ];
    let fontNames: any = [
      '宋体',
      '新宋体',
      '仿宋',
      '楷体',
      '微软雅黑',
      'Times New Roman',
      '隶书',
      '幼圆'
    ];

    onMounted(() => {
      if (activeCompObj.value.id && activeCompObj.value.elName === 'RadText') {
        editor = new E(toolbarid, id);
        editor.config.menus = editorMenus;
        editor.config.fontSizes = editorFontSizes;
        editor.config.fontNames = fontNames;
        editor.create();
        if (activeCompObj.value.label) {
          editor.txt.html(activeCompObj.value.label);
        }
        editor.config.onchange = (newHtml) => {
          activeCompObj.value.label = newHtml;
        };
      }
    });
    watch(
      () => activeCompObj,
      () => {
        if (activeCompObj.value.id && activeCompObj.value.elName === 'RadText') {
          if (!editor) {
            editor = new E(toolbarid, id);
            editor.config.menus = editorMenus;
            editor.config.fontSizes = editorFontSizes;
            editor.config.fontNames = fontNames;
            editor.create();
            editor.config.onchange = (newHtml) => {
              activeCompObj.value.label = newHtml;
            };
          }
          if (activeCompObj.value.label && editor.txt.html() !== activeCompObj.value.label) {
            editor.txt.html(activeCompObj.value.label);
          } else if (!activeCompObj.value.label) {
            editor.txt.html('');
          }
        }
      },
      { deep: true }
    );
    return {
      activeCompObj,
      sheet2Form
    };
  }
});
</script>
<style lang="scss">
.comp-attr {
  .w-e-toolbar {
    z-index: 1 !important;
  }
  .limit-input {
    width: calc(50% - 20px);
  }
  .desc {
    color: var(--color-text-secondary);
  }
  .comp-attr-header {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--border-color-base);
    }
  }
  .attr-group {
    display: flex;
    align-items: center;
    .label {
      padding-right: 10px;
      width: 66px;
      text-align: justify;
      text-align-last: justify;
    }
    .flex1 {
      flex: 1;
    }
  }
}
.container-item {
  .ant-input-affix-wrapper-textarea-with-clear-btn .ant-input {
    padding: 4px 20px 4px 11px !important;
  }
}
.attr-body {
  width: 100%;
  overflow: hidden;
}
.container-editor-attr {
  height: 75px !important;
  z-index: 10 !important;
  .w-e-text-container {
    z-index: 0 !important;
  }
  .w-e-text {
    padding: 10px !important;
  }
}
</style>
