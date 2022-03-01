<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-editor-label' : ''"
  >{{ ele.label }}</div>
  <div class="flex1" v-show="!isReadonlyStatus">
    <div
      :id="'toolbar' + ele.id"
      class="toolbar"
    ></div>
    <div
      class="container"
      :id="'editor' + ele.id"
    ></div>
  </div>
  <div
    v-show="isReadonlyStatus"
    class="inherit editor-display-text"
  >
    <div v-html="ele.defaultValue"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, inject } from 'vue';
import E from 'wangeditor';
import { editorMenus, editorFontSizes } from '@/utils/config';

export default defineComponent({
  props: ['ele'],
  setup(props) {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    onMounted(() => {
      const id = `#editor${props.ele.id}`;
      const toolbarid = `#toolbar${props.ele.id}`;
      const editor = new E(toolbarid, id);
      editor.config.menus = editorMenus;
      editor.config.fontSizes = editorFontSizes;
      editor.config.fontNames = [
        '宋体',
        '新宋体',
        '仿宋',
        '楷体',
        '黑体',
        '微软雅黑',
        'Times New Roman',
        '隶书',
        '幼圆'
      ];
      editor.create();
      editor.txt.html(props.ele.defaultValue);
      editor.config.onchange = (newHtml) => {
        props.ele.defaultValue = newHtml;
      };
      editor.config.onfocus = function () {
        document.getElementById(`toolbar${props.ele.id}`).style.display = '';
      };
      editor.config.onblur = function (newHtml) {
        document.getElementById(`toolbar${props.ele.id}`).style.display =
          'none';
      };
      document.getElementById(`toolbar${props.ele.id}`).style.display = 'none';
    });
    return {
      isReadonlyStatus
    };
  }
});
</script>
<style lang="scss">
.ele-editor-label {
  padding-right: 10px;
  display: inline-block;
  vertical-align: top;
  padding-top: 4px;
}
.w-e-toolbar,
.w-e-text-container,
.w-e-menu-panel {
  background-color: transparent !important;
}
.w-e-text-container,
.w-e-text {
  height: fit-content !important;
}
.w-e-text {
  min-height: 32px !important;
  padding: 4px 0;
}
.w-e-toolbar .w-e-droplist {
  height: 80px;
  overflow: auto;
  padding-bottom: 30px;
}
.container {
  border: 1px solid var(--border-color-lighter);
  &:hover {
    border: 1px solid var(--color-primary);
    box-shadow: 0 0 0 2px rgb(10 104 179 / 20%);
  }
}
.w-e-toolbar h1,
.w-e-text-container h1,
.w-e-menu-panel h1 {
  font-size: inherit;
}
.w-e-text p,
.w-e-text h1,
.w-e-text h2,
.w-e-text h3,
.w-e-text h4,
.w-e-text h5,
.w-e-text table,
.w-e-text pre {
  margin: 0;
}
font[size='3'] {
  font-size: 14px;
}
.editor-display-text {
  line-height: 1.5 !important;
  padding: 4px 0;
  font-size: 16px;
  display: inline-block;
}
</style>