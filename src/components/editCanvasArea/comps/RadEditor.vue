<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-editor-label' : ''"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;line-height:1.5;margin-top:10px;"
  >{{ ele.label }}</div>
  <div
    class="flex1"
    v-show="!isReadonlyStatus"
  >
    <div
      :id="'toolbar' + ele.id"
      class="toolbar"
    ></div>
    <div
      class="container container-editor"
      :style="{
        fontSize: ele.fontSize + 'px',
        fontWeight: ele.fontWeight,
        fontStyle: ele.fontStyle,
        textDecoration: ele.textDecoration
      }"
      :id="'editor' + ele.id"
      @click="clickEditor"
    ></div>
  </div>
  <div
    v-show="isReadonlyStatus"
    class="inherit editor-display-text"
    :style="{
      fontSize: ele.fontSize + 'px',
      fontWeight: ele.fontWeight,
      fontStyle: ele.fontStyle,
      textDecoration: ele.textDecoration,
      'line-height': 1.2
    }"
  >
    <div v-html="ele.value"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, inject, ref } from 'vue';
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
      editor.txt.html(props.ele.value);
      editor.config.onchange = (newHtml) => {
        props.ele.value = newHtml;
        if (document.getElementById(`toolbar${props.ele.id}`)) {
          document.getElementById(`toolbar${props.ele.id}`).style.display = '';
        }
      };
      editor.config.onfocus = function () {
        if (document.getElementById(`toolbar${props.ele.id}`)) {
          document.getElementById(`toolbar${props.ele.id}`).style.display = '';
        }
      };
      editor.config.onblur = function () {
        if (document.getElementById(`toolbar${props.ele.id}`)) {
          document.getElementById(`toolbar${props.ele.id}`).style.display =
            'none';
        }
      };
      if (document.getElementById(`toolbar${props.ele.id}`)) {
        document.getElementById(`toolbar${props.ele.id}`).style.display = 'none';
      }
    });
    const clickEditor = (e) => {
      if (e.target.classList && e.target.classList[0] === 'aspan') {
        console.log(e, e.target.classList);
        //获取我们自定义的右键菜单
        let menu: any = document.getElementById('context-menu');
        menu.removeEventListener('click', () => {});

        let childs = menu.childNodes; 
        for(let i = childs .length - 1; i >= 0; i--) {
          menu.removeChild(childs[i]);
        }

        const list = e.target.dataset.controlinfo;
        list.split('q,q').forEach((ll, index) => {
          let span = document.createElement('div');
          span.id = 'menu-item' + index;
          let tt = document.createTextNode(ll);
          span.appendChild(tt);
          menu.appendChild(span);
        });

        //根据事件对象中鼠标点击的位置，进行定位
        menu.style.width = 'fit-content';
        menu.style.padding = '10px';
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';

        menu.onclick = (event: any) => {
          console.log('fsjkafh', e);
          if (event.target.id && event.target.id.indexOf('menu-item') > -1) {
            e.target.innerHTML = event.target.innerHTML;
            setTimeout(() => {
              menu.style.width = '0';
              menu.style.padding = '0';
            });
          }
        }
      }
    };
    return {
      isReadonlyStatus,
      clickEditor
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
.container-editor {
  .aspan {
    color: var(--color-primary);
    text-decoration: underline;
    position: relative;
  }
}
#context-menu {
  width: 0; /*设置为0 隐藏自定义菜单*/
  z-index: 10001;
  overflow: hidden; /*隐藏溢出的元素*/
  background: var(--background-color-base);
  box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
  position: absolute; /*自定义菜单相对与body元素进行定位*/
  padding: 10px;
  div {
    width: fit-content;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 25px;
    line-height: 25px;
    white-space: nowrap;
  }
}
.w-e-text-container p, .w-e-menu-panel p {
  font-size: unset !important;
}
.w-e-text p {
  line-height: 1.2;
}
</style>