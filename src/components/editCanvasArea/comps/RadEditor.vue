<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-editor-label' : ''"
  >{{ ele.label }}</div>
  <div style="flex: 1" :id="'editor' + ele.id"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import E from 'wangeditor';
import { editorMenus, editorFontSizes } from '@/utils/config';

export default defineComponent({
  props: ['ele'],
  setup(props) {
    onMounted(() => {
      const id = `#editor${props.ele.id}`;
      const editor = new E(id);
      editor.config.menus = editorMenus;
      editor.config.fontSizes = editorFontSizes;
      editor.config.fontNames = ["宋体", "新宋体", "仿宋", "楷体", "黑体", "微软雅黑", "Times New Roman", "隶书", "幼圆"];
      editor.create();
    });
  }
});
</script>
<style lang="scss">
.ele-editor-label {
  padding-right: 10px;
}
.w-e-toolbar, .w-e-text-container, .w-e-menu-panel {
  background-color: transparent !important;
}
.w-e-text-container, .w-e-text {
  height: fit-content !important;
}
.w-e-text {
  min-height: 20px !important;
}
.w-e-toolbar .w-e-droplist {
  height: 80px;
  overflow: auto;
  padding-bottom: 30px;
}
</style>