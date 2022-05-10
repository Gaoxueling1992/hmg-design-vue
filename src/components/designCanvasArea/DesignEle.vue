<template>
  <div
    :id="ele.id"
    :style="{
      'align-items': ele.inline ? 'center' : '',
      'flex': ele.styleSheet.width !== '100%' ? 'unset' : 1,
      'max-width': '100%',
      'overflow': 'hidden',
      'position': 'relative',
      ...ele.styleSheet,
      fontSize: ele.styleSheet.fontSize + 'px',
      borderWidth: ele.styleSheet.borderWidth + 'px',
      display: ele.inline && ele.type !== 'comb' ? 'flex' : 'inline-block'
    }"
    @click.stop="clickEle"
    class="disgn-ele padding5"
    :class="{
      'disgn-ele-active': activeCompId === ele.id,
      'paddingT10 paddingB10': ele.elName === 'RadLine'
    }"
  >
    <template v-if="ele.type === 'comb'">
      <div class="inherit">{{ ele.label || ele.name }}
        <i
          class="iconfont iconplus"
          v-if="activeCompId === ele.id"
          @click="addComp=true"
        >
        </i>
      </div>
      <div
        v-if="ele.compsList && ele.compsList.length && addComp===false"
        class="flex-row"
        :style="{
          'text-align': ele.align,
          height: 'calc(100% - 25px)'
        }"
      >
        <div
          v-for="(item, idx) in ele.compsList"
          :key="idx"
          :style="{
            display: 'block',
            height: ele.layout === 'top' ? 'auto' : (100/ele.compsList.length + '%')
          }"
        >
          <div :style="{
            display: ele.inline ? 'flex' : 'inline-block',
            ...item.styleSheet,
            fontSize: item.styleSheet.fontSize + 'px',
          }">
            <div
              v-if="item.elName === 'RadText'"
              style="min-height: 20px"
              :style="{
                marginTop: item.styleSheet.paddingTop + 'px',
                marginBottom: item.styleSheet.paddingBottom + 'px',
                marginLeft: item.styleSheet.paddingLeft + 'px',
                marginRight: item.styleSheet.paddingRight + 'px'
              }"
              :class="{'ellipsis': item.styleSheet.wrap === 'noWrap'}"
            >{{ item.label || '静态文本' }}</div>
            <div
              v-if="item.elName !== 'RadText'"
              class="inherit"
              :class="ele.inline ? 'ele-label' : ''"
            >{{ item.label || item.name }}</div>
            <a-input
              style="flex: 1"
              disabled
              class="inherit"
              v-if="item.type !== 'textarea' && item.elName !== 'RadText'"
              :placeholder="item.placeholder"
            >
              <template #prefix>
                {{ item.prefix }}
              </template>
              <template #suffix>
                {{ item.suffix }}
              </template>
            </a-input>
            <a-textarea
              style="flex: 1"
              disabled
              class="inherit"
              v-else-if="item.elName !== 'RadText'"
            >
              <template #prefix>
                {{ item.prefix }}
              </template>
              <template #suffix>
                {{ item.suffix }}
              </template>
            </a-textarea>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="!ele.noLabel">
      <div
        class="inherit"
        :class="ele.inline ? 'ele-label' : ''"
      >{{ ele.label || ele.name }}</div>
      <a-input
        style="flex: 1"
        disabled
        class="inherit"
        v-if="ele.type !== 'textarea'"
        :placeholder="ele.placeholder"
      >
        <template #prefix>
          {{ ele.prefix }}
        </template>
        <template #suffix>
          {{ ele.suffix }}
        </template>
      </a-input>
      <a-textarea
        style="flex: 1"
        disabled
        class="inherit"
        v-else
      >
        <template #prefix>
          {{ ele.prefix }}
        </template>
        <template #suffix>
          {{ ele.suffix }}
        </template>
      </a-textarea>
    </template>
    <template v-else>
      <div
        v-if="ele.elName === 'RadText'"
        style="min-height: 20px"
        class="inherit"
        :style="{
          marginTop: ele.styleSheet.paddingTop + 'px',
          marginBottom: ele.styleSheet.paddingBottom + 'px',
          marginLeft: ele.styleSheet.paddingLeft + 'px',
          marginRight: ele.styleSheet.paddingRight + 'px',
        }"
        :class="{'ellipsis': ele.styleSheet.wrap === 'noWrap'}"
      >{{ ele.label || '静态文本' }}</div>
      <a-divider
        v-if="ele.elName === 'RadLine'"
        class="inherit"
        :style="{
          marginTop: ele.styleSheet.paddingTop + 'px',
          marginBottom: ele.styleSheet.paddingBottom + 'px',
          marginLeft: ele.styleSheet.paddingLeft + 'px',
          marginRight: ele.styleSheet.paddingRight + 'px',
        }"
      >{{ele.label}}</a-divider>
      <div v-if="ele.elName === 'RadImage' || ele.elName === 'RadSignalcode' || ele.elName === 'RadDrcode'">
        <template v-if="(ele.elName === 'RadDrcode' && ele.img) || (ele.src && ele.elName !== 'RadDrcode') ">
          <a-image
            v-if="ele.elName === 'RadImage'"
            class="img"
            :height="ele.imgHeight"
            :width="ele.imgWidth"
            :src="ele.src"
            :style="{
              marginTop: ele.styleSheet.paddingTop + 'px',
              marginBottom: ele.styleSheet.paddingBottom + 'px',
              marginLeft: ele.styleSheet.paddingLeft + 'px',
              marginRight: ele.styleSheet.paddingRight + 'px',
              height: ele.imgHeight+ 'px',
              width: ele.imgWidth + 'px'
            }"
          />
          <Vue3Barcode
            v-else-if="ele.elName === 'RadSignalcode'"
            :value="ele.src"
            :background="ele.background"
            :lineColor="ele.lineColor"
            :displayValue="ele.displayValue"
            :text="ele.text"
            :textAlign="ele.textAlign"
            :textPosition="ele.textPosition"
            :fontSize="ele.textSize"
            :width="ele.codeWidth"
            :height="ele.codeHeight"
            :margin="0"
          />
          <a-image
            v-if="ele.img"
            class="img"
            :height="ele.imgHeight"
            :width="ele.imgWidth"
            :src="ele.img"
            :style="{
              marginTop: ele.styleSheet.paddingTop + 'px',
              marginBottom: ele.styleSheet.paddingBottom + 'px',
              marginLeft: ele.styleSheet.paddingLeft + 'px',
              marginRight: ele.styleSheet.paddingRight + 'px',
              height: ele.imgHeight+ 'px',
              width: ele.imgWidth + 'px'
            }"
          />
        </template>
        <div
          :style="{
            marginTop: ele.styleSheet.paddingTop + 'px',
            marginBottom: ele.styleSheet.paddingBottom + 'px',
            marginLeft: ele.styleSheet.paddingLeft + 'px',
            marginRight: ele.styleSheet.paddingRight + 'px',
            height: ele.imgHeight+ 'px'
          }"
          v-else
        >请上传要展示的{{ele.name}}</div>
      </div>
      <div v-if="ele.elName === 'RadTable'">
        <table
          border="1"
          :style="{
            marginTop: ele.styleSheet.paddingTop + 'px',
            marginBottom: ele.styleSheet.paddingBottom + 'px',
            marginLeft: ele.styleSheet.paddingLeft + 'px',
            marginRight: ele.styleSheet.paddingRight + 'px',
            height: ele.imgHeight+ 'px'
          }"
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
    </template>
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
      @ok="addComp=false"
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
        v-if="ele.compsList && ele.compsList.length"
      >
        <draggable v-model="ele.compsList">
          <div
            v-for="(item, ix) in ele.compsList"
            :key="ix"
            class="comb-comp-selected"
          >
            <i class="iconfont icondrag paddingR10"></i>
            {{item.name}}
            <i
              class="fr iconfont iconclose1 paddingL10 delete-comp"
              @click="deleteIt(ix)"
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
import { defineComponent, reactive, inject, ref, Ref } from 'vue';
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
    deleteComp(idx, index);
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
    const idx: any = reactive(props.idx);
    const activeCompId: string = inject('activeCompId') || '';
    const addComp: Ref<boolean> = ref<boolean>(false);
    const list: Array<any> = compsList;
    const domainList: any = inject('domainList');
    const setFixedArea: any = inject('setFixedArea');
    const pageFooterId: Ref<string> = inject('pageFooterId');
    const pageHeaderId: Ref<string> = inject('pageHeaderId');

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
        validate: {
          ...compBaseConfig[item.elName].validate
        },
        rules: []
      });
      ele.compsList.push({
        ...baseConfig,
        id
      });
    };
    const deleteIt = (index) => {
      ele.compsList.splice(index, 1);
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
      setFixedArea, pageFooterId, pageHeaderId
    };
  }
});
</script>
<style lang="scss">
.disgn-ele {
  &:hover {
    background: var(--background-color-base);
  }
  .ele-label {
    padding-right: 10px;
  }
  .disgn-ele-active {
    background: var(--color-btn-bglight);
  }
  .ant-divider-horizontal {
    margin: 0;
  }
  .inherit {
    border-color: inherit;
    color: inherit !important;
    background-color: inherit;
    font-size: inherit;
    text-align: left;
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
</style>