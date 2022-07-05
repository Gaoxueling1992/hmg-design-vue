<template>
  <div
    :id="ele.id"
    :style="{
      'align-items': ele.inline ? 'center' : '',
      'flex': ele.styleSheet && ele.styleSheet.width !== '100%' ? 'unset' : 1,
      'max-width': '100%',
      'overflow': 'hidden',
      'position': 'relative',
      ...ele.styleSheet,
      fontSize: ele.styleSheet && ele.styleSheet.fontSize ? ele.styleSheet.fontSize + 'px' : 'inherit',
      borderWidth: ele.styleSheet && ele.styleSheet.borderWidth ? ele.styleSheet.borderWidth + 'px' : 0,
      display: ele.inline && ele.type !== 'comb' ? 'flex' : 'inline-block',
      'text-decoration': ele.type !== 'comb' ? ele.styleSheet.textDecoration : 'unset'
    }"
    @click.stop="clickEle"
    class="disgn-ele padding5"
    :class="'line' + String(idx) + (activeCompId === ele.id ? ' disgn-ele-active' : '') + (ele.elName === 'RadLine' ? ' paddingT10 paddingB10' : '')"
  >
    <!-- 复合组件 -->
    <div v-if="ele.type === 'comb'"
      :class="'line' + String(idx)"
      :style="{
        paddingTop: ele.styleSheet.paddingTop + 'px',
        paddingBottom: ele.styleSheet.paddingBottom + 'px',
        paddingLeft: ele.styleSheet.paddingLeft + 'px',
        paddingRight: ele.styleSheet.paddingRight + 'px',
        width: '100%',
        height: '100%'
      }">
      <div style="font-size:18px" :class="'line' + String(idx)">
        <span :style="{
          'text-decoration': 'none',
          'font-size': '18px',
          color: 'initial',
          'font-weight': '400'
        }">{{ ele.label || ele.name }}</span>
        <i
          class="iconfont iconplus"
          :style="{
            fontSize: '18px'
          }"
          v-if="activeCompId === ele.id"
          @click="openAdd2Comp"
        >
        </i>
      </div>
      <div
        v-if="ele.compsList && ele.compsList.length"
        class="flex-row"
        :class="'line' + String(idx)"
        :style="{
          'text-align': ele.align,
          height: 'calc(100% - 30px)',
          'text-decoration': ele.styleSheet.textDecoration
        }"
      >
        <div
          v-for="(item, idx) in ele.compsList"
          :key="idx"
          :style="{
            display: 'block',
            padding: '5px 0',
            height: ele.layout === 'top' ? 'auto' : (100/ele.compsList.length + '%')
          }"
        >
          <div :style="{
            display: ele.inline && item.elName !== 'RadText' ? 'flex' : 'inline-block',
            ...ele.styleSheet,
            fontSize: ele.styleSheet.fontSize + 'px',
            border: 'none'
          }">
            <div
              v-if="item.elName === 'RadText'"
              style="min-height: 20px"
              :style="{
                textAlign: ele.styleSheet.justifyContent
              }"
              :class="{'ellipsis': item.styleSheet.wrap === 'noWrap'}"
              v-html="item.label ||  '静态文本'"
            ></div>
            <template v-else>
              <div
                class="inherit"
                :class="ele.inline ? 'ele-label' : ''"
              >{{ item.label || item.name }}</div>
              <a-input
                style="flex: 1"
                disabled
                class="inherit"
                :placeholder="item.placeholder"
              >
                <template #prefix>
                  {{ item.prefix }}
                </template>
                <template #suffix>
                  {{ item.suffix }}
                </template>
              </a-input>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!ele.noLabel"
      :class="'line' + String(idx)"
      :style="{
        paddingTop: ele.styleSheet.paddingTop + 'px',
        paddingBottom: ele.styleSheet.paddingBottom + 'px',
        paddingLeft: ele.styleSheet.paddingLeft + 'px',
        paddingRight: ele.styleSheet.paddingRight + 'px',
        display: ele.inline ? 'flex' : '',
        width: '100%'
      }">
      <div
        class="inherit"
        :class="ele.inline ? 'ele-label' + ' line' + String(idx) : 'line' + String(idx)"
      >{{ ele.label || ele.name }}</div>
      <a-input
        style="flex: 1"
        disabled
        class="inherit"
        :placeholder="ele.placeholder"
      >
        <template #prefix>
          {{ ele.prefix }}
        </template>
        <template #suffix>
          {{ ele.suffix }}
        </template>
      </a-input>
    </div>
    <div v-else
      :class="'line' + String(idx)"
      :style="{
        paddingTop: ele.styleSheet.paddingTop + 'px',
        paddingBottom: ele.styleSheet.paddingBottom + 'px',
        paddingLeft: ele.styleSheet.paddingLeft + 'px',
        paddingRight: ele.styleSheet.paddingRight + 'px',
        display: ele.inline && ele.elName !== 'RadText' ? 'flex' : '',
        width: '100%'
      }">
      <div
        v-if="ele.elName === 'RadText'"
        style="min-height: 20px"
        class="inherit"
        :class="ele.styleSheet.wrap === 'noWrap' ? ' ellipsis' + ' line' + String(idx) : 'line' + String(idx)"
        :style="{
          textAlign: ele.styleSheet.justifyContent
        }"
        v-html="ele.label || '静态文本'"
      ></div>
      <a-divider
        v-if="ele.elName === 'RadLine'"
        class="inherit"
        :class="'line' + String(idx)"
      >{{ele.label}}</a-divider>
      <div v-if="ele.elName === 'RadImage' || ele.elName === 'RadSignalcode' || ele.elName === 'RadDrcode'" :class="'line' + String(idx)">
        <template v-if="(ele.elName === 'RadDrcode' && ele.img) || (ele.src && ele.elName !== 'RadDrcode') ">
          <a-image
            v-if="ele.elName === 'RadImage'"
            class="img"
            :height="ele.imgHeight"
            :width="ele.imgWidth"
            :src="ele.src"
            :style="{
              height: ele.imgHeight+ 'px',
              width: ele.imgWidth + 'px'
            }"
            :class="'line' + String(idx)"
          />
          <template v-else-if="ele.elName === 'RadSignalcode'">
            <div v-if="ele.displayValue && ele.textPosition === 'top'" style="text-align:center" :class="'line' + String(idx)"
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
              :class="'line' + String(idx)"
            />
            <div v-if="ele.displayValue && ele.textPosition === 'bottom'" style="text-align:center"
              :style="{
                'width': textWidth + 'px',
                'text-align': ele.textAlign,
                'font-size': ele.textSize + 'px'
              }"
              :class="'line' + String(idx)">
              {{ele.text}}
            </div>
          </template>
          <a-image
            v-if="ele.img"
            class="img"
            :height="ele.imgHeight"
            :width="ele.imgWidth"
            :src="ele.img"
            :class="'line' + String(idx)"
            :style="{
              height: ele.imgHeight+ 'px',
              width: ele.imgWidth + 'px'
            }"
          />
        </template>
        <div
          :class="'line' + String(idx)"
          :style="{
            height: ele.imgHeight+ 'px'
          }"
          v-else
        >请上传要展示的{{ele.name}}</div>
      </div>
      <div v-if="ele.elName === 'RadTable'">
        <table
          border="1"
          :style="{
            height: ele.imgHeight+ 'px'
          }"
          :class="'line' + String(idx)"
        >
          <tr>
            <th>表头1</th>
            <th>表头2</th>
          </tr>
          <tr>
            <td>数据1</td>
            <td>数据2</td>
          </tr>
        </table>
      </div>
      <div
        v-if="ele.elName === 'RadMulitImagepicker'"
        class="picker-flex"
        :class="'line' + String(idx)"
      >
        <a-row :gutter="[ele.horSpacing, ele.verSpacing]">
          <a-col
            v-for="item in +ele.testTotalNum"
            :key="item"
            :span="calSpan(ele)"
          >
            <div :style="{
              width: ele.layoutType === '3' ? 'auto' : ele.imgWidth + 'px',
              height: ele.layoutType === '2' ? 'auto' : ele.imgHeight + 'px',
              border: '1px solid grey',
              margin: '0 auto',
              textAlign: 'center'
            }">图片
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- 操作区域 -->
    <div
      class="oper"
      v-if="activeCompId === ele.id"
    >
      <span
        class="delete-item"
        @click="copyEle"
      >
        <a-tooltip placement="top" :mouseEnterDelay="0.5">
          <template #title>
            <span>复制</span>
          </template>
          <i class="iconfont iconcopy"></i>
        </a-tooltip>
      </span>
      <span
        class="delete-item"
        @click="deleteEle"
      >
        <a-tooltip placement="top" :mouseEnterDelay="0.5">
          <template #title>
            <span>删除</span>
          </template>
          <i class="iconfont icondelete-border"></i>
        </a-tooltip>
      </span>
      <span
        class="delete-item"
        :class="{'active-bg': pageHeaderId === ele.id}"
        @click="setFixedArea(ele, 'header', idx)"
      >
        <a-tooltip placement="top" :mouseEnterDelay="0.5">
          <template #title>
            <span>{{+pageHeaderId === +ele.id ? '取消设为页眉'  : '设为页眉'}}</span>
          </template>
          <i class="iconfont iconup_top"></i>
        </a-tooltip>
      </span>
      <span
        class="delete-item"
        :class="{'active-bg': pageFooterId === ele.id}"
        @click="setFixedArea(ele, 'footer', idx)"
      >
        <a-tooltip placement="top" :mouseEnterDelay="0.5">
          <template #title>
            <span>{{pageFooterId === ele.id ? '取消设为页脚' : '设为页脚'}}</span>
          </template>
          <i class="iconfont icondown_btm"></i>
        </a-tooltip>
      </span>
    </div>
    <a-modal
      title="添加控件(拖拽排序)"
      :visible="addComp"
      cancelText="关闭"
      okText="确定"
      @cancel="addComp=false"
      @ok="confirm2Comp"
    >
      <template v-for="(item, index) in list">
        <button
          :key="index"
          v-if="item.isForm===true"
          class="comb-comp"
          @click="addComp2Comb(item)"
        >
          {{item.title}}
        </button>
      </template>
      <div
        class="comp-canvas"
        v-if="tempCompList && tempCompList.length"
      >
        <draggable v-model="tempCompList">
          <div
            v-for="item in tempCompList"
            :key="item.id"
            class="comb-comp-selected"
          >
            <i class="iconfont icondrag paddingR10"></i>
            {{item.name}}
            <i
              class="fr iconfont iconclose paddingL10 delete-comp"
              @click="deleteIt(item.id)"
            ></i>
            <a-select
              v-model:value="item.threshold"
              :options="domainList"
              style="width:150px;"
              class="fr"
            ></a-select>
          </div>
        </draggable>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject, ref, Ref, onMounted, watch } from 'vue';
import Vue3Barcode from 'vue3-barcode';
import QrcodeVue from 'qrcode.vue';
import { compsList, compBaseConfig } from '@/utils/config';
import { VueDraggableNext } from 'vue-draggable-next';

// 图片选择器 计算布局
const calSpan = (ele: any) => {
  let span;
  if (ele.layout === '1') {
    span = 24 / +ele.perNum;
  } else {
    if (ele.testTotalNum === 3) {
      span = 24 / +ele.testTotalNum;
    } else {
      span = 24 / Math.ceil(Math.sqrt(ele.testTotalNum));
    }
  }
  return span;
};

// 操作控件
const handleEleOperate = (ele: any, props: any) => {
  const index: any = ref(props.index) || {};
  const idx: any = ref(props.idx) || {};
  const activeComp: any = inject('activeComp');
  const copyComp: any = inject('copyComp');
  const deleteComp: any = inject('deleteComp');
  const deleteEle = () => {
    deleteComp(idx, ele.id);
  };
  const copyEle = () => {
    copyComp(ele);
  };
  const clickEle = () => {
    activeComp(ele);
  };
  return {
    deleteEle,
    copyEle,
    clickEle
  };
};

export default defineComponent({
  props: ['ele', 'index', 'idx'],
  components: {
    Vue3Barcode,
    QrcodeVue,
    draggable: VueDraggableNext
  },
  setup(props) {
    const ele: any = reactive(props.ele) || {};
    const activeCompId: string = inject('activeCompId') || '';
    const addComp: Ref<boolean> = ref<boolean>(false);
    const list: Array<any> = compsList;
    const domainList: any = inject('domainList');
    const setFixedArea: any = inject('setFixedArea');
    const pageFooterId: Ref<string> = inject('pageFooterId');
    const pageHeaderId: Ref<string> = inject('pageHeaderId');
    const tempCompList: Ref<any> = ref<any>([]);

    const textWidth: Ref = ref<number>(0);
    onMounted(() => {
      if (ele.elName === 'RadSignalcode' && ele.text && document.getElementById(ele.id) && document.getElementById(ele.id).getElementsByClassName('vue3-barcode-element')) {
        textWidth.value = document.getElementById(ele.id).getElementsByClassName('vue3-barcode-element')[0].getBoundingClientRect().width;
      }
    });
    watch(
      () => ele, 
      () => {
        if (ele.elName === 'RadSignalcode' && ele.text && document.getElementById(ele.id) && document.getElementById(ele.id).getElementsByClassName('vue3-barcode-element')) {
          setTimeout(() => {
            textWidth.value = document.getElementById(ele.id).getElementsByClassName('vue3-barcode-element')[0].getBoundingClientRect().width;
            console.log('textWidth', textWidth.value);
          });
        }
      },
      { deep: true }
    );

    const { deleteEle, copyEle, clickEle } = handleEleOperate(ele, props);

    const addComp2Comb = (item) => {
      const id: string = new Date().getTime() + '';
      const baseConfig = reactive({
        ...compBaseConfig[item.elName],
        styleSheet: {
          ...compBaseConfig[item.elName].styleSheet
        },
        baseProps: {
          ...compBaseConfig[item.elName].baseProps
        },
        rules: {}
      });
      tempCompList.value.push({
        ...baseConfig,
        id
      });
    };
    const deleteIt = (id) => {
      for (let i = 0; i < tempCompList.value.length; i++) {
        if (tempCompList.value[i].id === id) {
          tempCompList.value.splice(i, 1);
          break;
        }
      }
    };

    const confirm2Comp = () => {
      addComp.value = false;
      ele.compsList = JSON.parse(JSON.stringify(tempCompList.value));
    };

    const openAdd2Comp = () => {
      addComp.value = true;
      tempCompList.value = JSON.parse(JSON.stringify(ele.compsList));
    };

    return {
      ele,
      activeCompId,
      calSpan,
      deleteEle,
      copyEle,
      clickEle,
      addComp,
      list,
      addComp2Comb,
      domainList,
      deleteIt,
      setFixedArea, pageFooterId, pageHeaderId,
      textWidth,
      openAdd2Comp,
      tempCompList,
      confirm2Comp
    };
  }
});
</script>
<style lang="scss">
.disgn-ele-active {
  background: var(--color-btn-bglight);
}
.disgn-ele {
  &:hover {
    background: var(--background-color-base);
  }
  .ele-label {
    padding-right: 10px;
  }
  .ant-divider-horizontal {
    margin: 0;
  }
  .inherit {
    border-color: inherit;
    color: inherit !important;
    background-color: inherit;
    font-size: inherit;
  }
  table {
    width: 100%;
  }
  .picker-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .oper {
    position: absolute;
    top: 2px;
    right: 10px;
    font-size: 13px;
    font-weight: initial;
    .delete-item {
      margin-left: 5px;
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: var(--color-white1);
      border-radius: 10px;
      .iconfont {
        padding-left: 4px;
        font-size: 12px;
        color: var(--color-black);
      }
    }
    .active-bg {
      background-color: var(--color-primary);
      .iconfont {
        color: var(--color-white1);
      }
    }
  }
}
.flex-row {
  width: 100%;
}
.comb-comp {
  margin: 5px;
}
.comp-canvas {
  border: 1px solid var(--border-color-base);
  padding: 5px;
  .comb-comp-selected {
    padding: 5px;
  }
}
.ant-select-dropdown {
  z-index: 10005 !important;
}
.delete-comp {
  line-height: 32px;
  height: 32px;
}
.icontext {
  display: block;
  text-align: center;
  vertical-align: middle;
}
.disgn-ele {
  .iconplus {
    color: var(--color-text-regular) !important;
    padding-left: 5px;
  }
}
</style>