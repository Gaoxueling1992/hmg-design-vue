<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-editor-label' : ''"
    @click="focusedEle = ele.id"
    style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
    :style="{
      'text-decoration': ele.styleSheet && ele.styleSheet.textDecoration ? ele.styleSheet.textDecoration : 'none',
      'margin-top': ele.inline ? 0 : '10px',
      'float': ele.inline && !isReadonlyStatus && !ele.baseProps.readonly ? 'left': 'unset',
      'line-height': ele.inline && (isReadonlyStatus || ele.baseProps.readonly) ?  '1.2' : '1.5',
      'display': ele.inline ? 'table-cell' : 'unset'
    }"
  >{{ ele.label }}</div>
  <div
    class="flex1"
    v-show="!isReadonlyStatus && !ele.baseProps.readonly"
    @click="focusedEle = ele.id"
  >
    <div
      class="container container-editor"
      :style="{
        fontSize: ele.fontSize + 'px',
        fontWeight: ele.fontWeight,
        fontStyle: ele.fontStyle,
        textDecoration: ele.textDecoration,
        color: ele.fontColor,
        'display': ele.inline ? 'grid' : 'block'
      }"
      :id="'editor' + ele.id"
      @contextmenu.prevent="clickEditor"
    ></div>
  </div>
  <div
    v-if="isReadonlyStatus || ele.baseProps.readonly"
    class="inherit editor-display-text"
    :style="{
      fontSize: ele.fontSize + 'px',
      fontWeight: ele.fontWeight,
      fontStyle: ele.fontStyle,
      textDecoration: ele.textDecoration,
      color: ele.fontColor,
      'line-height': 1.2,
      'text-decoration': 'inherit',
      'white-space': 'normal',
      'word-break': 'break-all',
      'word-wrap': 'break-word',
      'padding-left': ele.inline ? '5px': '0',
      'display': ele.inline && (isReadonlyStatus || ele.baseProps.readonly) ? 'table-cell' : 'unset',
      minHeight: (ele.containerMinHeight || (ele.inline ? ele.styleSheet.fontSize * 1.4 : 0)) + 'px',
      'vertical-align': 'middle'
    }"
  >
    <div v-html="readonlyValue"></div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  Ref,
  inject,
  toRefs,
  watch,
  computed,
  onBeforeUnmount
} from 'vue';
import E from 'wangeditor';
import { editorMenus, editorFontSizes, editorColors } from '@/utils/config';

export default defineComponent({
  props: ['ele', 'toolbarId', 'lineId'],
  setup(props) {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    const currentReport: Ref<string> = inject('currentReport');
    const splitField: Ref<string> = inject('splitField');
    const currentDec: Ref<string> = inject('currentDec');
    const focusedEle: Ref<string> = inject('focusedEle');

    const readonlyValue = computed(() => {
      if (props.ele.value && splitField.value) {
        let arr =
          props.ele.value.split(
            /<!--[\u4E00-\u9FA5A-Za-z0-9_,;+%()（）\s]+end\s-->/
          ) || [];
        for (let j = 0; j < arr.length; j++) {
          if (arr[j]) {
            if (arr[j].indexOf(`%%${currentReport.value}%%`) !== -1) {
              return arr[j].replace(
                new RegExp(
                  /<!--[\u4E00-\u9FA5A-Za-z0-9_,;+%()（）\s]+start\s-->/g,
                  'gm'
                ),
                ''
              );
            }
          }
        }
      } else {
        return props.ele.value;
      }
    });

    let editor;
    const { ele, lineId } = toRefs(props);
    onMounted(() => {
      let toolbr = document.createElement('div');
      toolbr.setAttribute('id', `toolbar${props.ele.id}`);
      toolbr.setAttribute('class', 'editor-toolbar');
      let container = document.getElementById(props.toolbarId);
      container.appendChild(toolbr);

      const id = `#editor${props.ele.id}`;
      const toolbarid = `#toolbar${props.ele.id}`;
      setTimeout(() => {
        editor = new E(toolbarid, id);
        console.log('editor', editor);
        editor.config.mode = 'default';
        editor.config.menus = editorMenus;
        editor.config.fontSizes = editorFontSizes;
        editor.config.colors = editorColors;
        editor.config.fontNames = [
          '宋体',
          '新宋体',
          '仿宋',
          '楷体',
          '微软雅黑',
          'Times New Roman',
          '隶书',
          '幼圆'
        ];
        editor.create();

        editor.config.onchange = (newHtml) => {
          focusedEle.value = props.ele.id;
          if (splitField.value) {
            calValue(newHtml);
          } else {
            props.ele.value = newHtml;
          }
          let toolbar = document.getElementById(`toolbar${props.ele.id}`);
          if (toolbar) {
            toolbar.style.display = '';
            let top = document.getElementById(lineId.value).offsetTop;
            toolbar.style.top = top - (ele.label && !ele.inline ? 0 : 25) + 'px';
          }
        };
        editor.config.onfocus = function () {
          focusedEle.value = props.ele.id;
          let toolbar = document.getElementById(`toolbar${props.ele.id}`);
          if (toolbar) {
            toolbar.style.display = '';
            let top = document.getElementById(lineId.value).offsetTop;
            toolbar.style.top = top - (ele.label && !ele.inline ? 0 : 25) + 'px';
          }
        };
        editor.config.onblur = function () {
          console.log(focusedEle.value, props.ele.id);
          if (document.getElementById(`toolbar${props.ele.id}`)) {
            document.getElementById(`toolbar${props.ele.id}`).style.display =
              'none';
          }
        };
        const inputCurReport = () => {
          if (props.ele.value) {
            let arr =
              props.ele.value.split(
                /<!--[\u4E00-\u9FA5A-Za-z0-9_,;+%()（）\s]+end\s-->/
              ) || [];
            let hasStr = false;
            for (let j = 0; j < arr.length; j++) {
              if (arr[j]) {
                if (arr[j].indexOf(`%%${currentReport.value}%%`) !== -1) {
                  let newVal = arr[j].replace(
                    new RegExp(
                      /<!--[\u4E00-\u9FA5A-Za-z0-9_,;+%()（）\s]+start\s-->/g,
                      'gm'
                    ),
                    ''
                  );
                  if (newVal !== editor.txt.html()) {
                    editor.txt.html(newVal);
                  }
                  hasStr = true;
                  break;
                }
              }
            }
            if (!hasStr) {
              editor.txt.html('');
            }
          }
        };
        if (splitField.value) {
          inputCurReport();
        } else if (editor && editor.txt) {
          editor.txt.html(props.ele.value);
        }

        const calValue = (h) => {
          if (props.ele.value) {
            let arr =
              props.ele.value.split(
                /<!--[\u4E00-\u9FA5A-Za-z0-9_,;+%()（）\s]+end\s-->/
              ) || [];
            let hasVal = false;
            for (let j = 0; j < arr.length; j++) {
              if (arr[j]) {
                if (arr[j].indexOf(`%%${currentReport.value}%%`) !== -1) {
                  props.ele.value = props.ele.value.replace(
                    arr[j],
                    `<!-- ${currentDec.value}%%${currentReport.value}%%start -->${h}`
                  );
                  hasVal = true;
                  break;
                }
              }
            }
            if (!hasVal) {
              props.ele.value += `<!-- ${currentDec.value}%%${currentReport.value}%%start -->${h}<!-- ${currentDec.value}%%${currentReport.value}%%end -->`;
            }
          } else {
            props.ele.value += `<!-- ${currentDec.value}%%${currentReport.value}%%start -->${h}<!-- ${currentDec.value}%%${currentReport.value}%%end -->`;
          }
        };
      });


      window.addEventListener('message', async (e) => {
        if (
          e.data.type === 'resetReporetDesc' &&
          e.data.currentDec &&
          e.data.oldDesc &&
          props.ele.value
        ) {
          let { currentDec, oldDesc } = e.data;
          let oldV = oldDesc + '%%' + currentReport.value;
          let newV = currentDec + '%%' + currentReport.value;
          props.ele.value = props.ele.value.split(oldV).join(newV);
        } else if (e.data.type === 'setVocabulary') {
          if (+focusedEle.value === +props.ele.id) {
            if (splitField.value) {
              if (props.ele.value) {
                let arr =
                  props.ele.value.split(
                    /<!--[\u4E00-\u9FA5A-Za-z0-9_,;+%()（）\s]+end\s-->/
                  ) || [];
                let hasStr = false;
                for (let j = 0; j < arr.length; j++) {
                  if (arr[j]) {
                    if (arr[j].indexOf(`%%${currentReport.value}%%`) !== -1) {
                      editor.cmd.do('insertHTML', e.data.text);
                      hasStr = true;
                      break;
                    }
                  }
                }
                if (!hasStr) {
                  editor.txt.html(e.data.text);
                }
              } else {
                editor.txt.html(e.data.text);
              }
            } else {
              editor.cmd.do('insertHTML', e.data.text);
            }
          }
        }
      });

      watch(focusedEle, () => {
        if (focusedEle.value !== props.ele.value) {
          if (document.getElementById(`toolbar${props.ele.id}`)) {
            document.getElementById(`toolbar${props.ele.id}`).style.display =
              'none';
          }
        }
      });

      // 切换当前部位时，重算富文本内容
      watch(currentReport, () => {
        inputCurReport();
      });
      watch(
        ele,
        () => {
          if (splitField.value) {
            inputCurReport();
          } else if (props.ele.value !== editor.txt.html()) {
            editor.txt.html(props.ele.value);
          }
        },
        { deep: true }
      );

      if (document.getElementById(`toolbar${props.ele.id}`)) {
        document.getElementById(`toolbar${props.ele.id}`).style.display =
          'none';
      }
    });

    onBeforeUnmount(() => {
      if (editor == null) {
        return;
      }
      let container = document.getElementById(props.toolbarId);
      let toolbar = document.getElementById(`toolbar${props.ele.id}`);
      container.removeChild(toolbar);
      editor.destroy();
      editor = null;
    });

    const clickEditor = (e) => {
      focusedEle.value = props.ele.id;
      if (e.target.classList && e.target.classList[0] === 'aspan') {
        //获取我们自定义的右键菜单
        let menu: any = document.getElementById('context-menu1');
        menu.removeEventListener('click', () => {});

        let childs = menu.childNodes;
        for (let i = childs.length - 1; i >= 0; i--) {
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
        menu.style.display = '';
        menu.style.width = 'fit-content';
        menu.style.padding = '10px';
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';

        menu.onclick = (event: any) => {
          if (event.target.id && event.target.id.indexOf('menu-item') > -1) {
            e.target.innerHTML = event.target.innerHTML;
            setTimeout(() => {
              menu.style.width = '0';
              menu.style.padding = '0';
            });
          }
        };
        window.onclick = (event: any) => {
          if (event.target.id.indexOf('menu-item') === -1) {
            setTimeout(() => {
              menu.style.width = '0';
              menu.style.padding = '0';
            });
          }
        };
      }
    };
    return {
      isReadonlyStatus,
      clickEditor,
      readonlyValue,
      focusedEle
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
  i {
    font-style: italic;
  }
  ul {
    list-style-type: disc;
  }
  li {
    list-style: unset;
  }
}
.w-e-text-container,
.w-e-text {
  height: fit-content !important;
}
.w-e-text {
  min-height: 75px !important;
  padding: 4px 0;
}
.w-e-toolbar .w-e-droplist {
  overflow: auto;
  margin-top: 25px !important;
  border: 1px solid var(--border-color-light);
  border-radius: 4px;
  background-color: var(--color-white);
  color: var(--color-text-regular);
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
#context-menu1 {
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
.w-e-text-container p,
.w-e-menu-panel p {
  font-size: unset !important;
}
.w-e-text p {
  line-height: 1.2;
}
.w-e-text-container .placeholder {
  top: 5px !important;
}
.editor-toolbar {
  z-index: 11 !important;
  background: #fff;
  position: absolute;
  right: 50px;
}
.w-e-toolbar .w-e-menu {
  height: 25px !important;
}
.container-editor {
  z-index: 10 !important;
  .w-e-text-container {
    z-index: 0 !important;
  }
}
</style>