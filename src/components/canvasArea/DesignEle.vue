<template>
  <div
    :id="ele.id"
    :style="{
      'align-items': ele.inline ? 'center' : '',
      'flex': ele.styleSheet.width !== '100%' ? 'unset' : 1,
      'max-width': '100%',
      'overflow': 'hidden',
      ...ele.styleSheet,
      fontSize: ele.styleSheet.fontSize + 'px',
      borderWidth: ele.styleSheet.borderWidth + 'px',
      display: ele.inline ? 'flex' : 'inline-block'
    }"
    @click.stop="clickEle"
    class="disgn-ele padding5"
    :class="{'disgn-ele-active': activeCompId === ele.id}"
  >
    <template v-if="!ele.noLabel">
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
        <template v-if="ele.src">
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
          <qrcode-vue
            v-else
            :value="ele.src"
            :size="ele.codeHeight"
            :background="ele.background"
            :foreground="ele.lineColor"
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
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject, watch } from 'vue';
import Vue3Barcode from 'vue3-barcode';
import QrcodeVue from 'qrcode.vue';

export default defineComponent({
  props: ['ele', 'index'],
  components: {
    Vue3Barcode,
    QrcodeVue
  },
  setup(props) {
    const ele: any = reactive(props.ele) || {};
    const activeComp: any = inject('activeComp');
    const activeCompId: string = inject('activeCompId') || '';

    const clickEle = () => {
      activeComp(ele);
    };

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

    return {
      ele,
      clickEle,
      activeCompId,
      calSpan
    };
  }
});
</script>
<style lang="scss" scoped>
.disgn-ele {
  &:hover {
    background: var(--background-color-base);
  }
  .ele-label {
    padding-right: 10px;
  }
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
}
table {
  width: 100%;
}
.picker-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.picker-flex-item {
}
</style>