<template>
  <div class="title marginT10 marginB5 fontW500">源(不超过30位)</div>
  <div class="flex marginT10">
    <a-input
      class="flex1 marginR5"
      v-model:value="activeCompObj.src"
      :maxlength="30"
      @change="changeSrc"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3">底色</div>
    <a-input
      class="flex1 marginR5"
      v-model:value="activeCompObj.background"
    />
    <div class="flex-title3 marginL5">码色</div>
    <a-input
      class="flex1"
      v-model:value="activeCompObj.lineColor"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title1">规格</div>
    <a-radio-group v-model:value="activeCompObj.codeWidth">
      <a-radio :value="1">细</a-radio>
      <a-radio :value="2">中</a-radio>
      <a-radio :value="3">粗</a-radio>
    </a-radio-group>
  </div>
  <div class="flex marginT10">
    <div class="flex-title1">高度</div>
    <a-input-number
      v-model:value="activeCompObj.codeHeight"
      :min="20"
      @change="activeCompObj.codeHeight = !activeCompObj.codeHeight ? 20 : activeCompObj.codeHeight"
    />
  </div>
  <a-checkbox
    class="marginT10"
    v-model:checked="activeCompObj.displayValue"
    v-if="activeCompObj.src"
  >展示码值</a-checkbox>
  <div
    class="flex marginT10"
    v-if="activeCompObj.displayValue"
  >
    <div class="flex-title1">码值</div>
    <a-input
      v-model:value="activeCompObj.text"
      :maxlength="30"
      placeholder="为空时码值显示源值"
      @change="changeText"
    />
  </div>
  <div
    class="flex marginT10"
    v-if="activeCompObj.displayValue"
  >
    <div class="flex-title1">对齐</div>
    <a-radio-group v-model:value="activeCompObj.textAlign">
      <a-radio value="left">左</a-radio>
      <a-radio value="center">中</a-radio>
      <a-radio value="right">右</a-radio>
    </a-radio-group>
  </div>
  <div
    class="flex marginT10"
    v-if="activeCompObj.displayValue"
  >
    <div class="flex-title1">位置</div>
    <a-radio-group v-model:value="activeCompObj.textPosition">
      <a-radio value="top">顶部</a-radio>
      <a-radio value="bottom">底部</a-radio>
    </a-radio-group>
  </div>
  <div
    class="flex marginT10"
    v-if="activeCompObj.displayValue"
  >
    <div class="flex-title2">文字大小</div>
    <a-input-number
      v-model:value="activeCompObj.textSize"
      :min="12"
      @change="activeCompObj.textSize = !activeCompObj.textSize ? 12 : activeCompObj.textSize"
    />
  </div>
  <div class="title marginT10 marginB5 fontW500" v-if="activeCompObj.src">预览(码值过长可横向滚动查看)</div>
  <div class="barcode-container">
    <Vue3Barcode    
      :value="activeCompObj.src"
      :background="activeCompObj.background"
      :lineColor="activeCompObj.lineColor"
      :displayValue="activeCompObj.displayValue"
      :textAlign="activeCompObj.textAlign"
      :fontSize="activeCompObj.textSize"
      :textPosition="activeCompObj.textPosition"
      textFont="Microsoft YaHei"
      :text="activeCompObj.text"
      :width="activeCompObj.codeWidth"
      :height="activeCompObj.codeHeight"
      :margin="0"
    />
  </div>
  <a-button
    type="primary"
    class="marginT5"
    v-if="activeCompObj.src"
    @click="applySc"
  >{{activeCompObj.img ? '重新' : ''}}生成图片</a-button>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import Vue3Barcode from 'vue3-barcode';

export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
    Vue3Barcode
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    const changeSrc = () => {
      activeCompObj.value.src = activeCompObj.value.src.replace(
        /[^A-Z|0-9|\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g,
        ''
      );
    };

    const changeText = () => {
      activeCompObj.value.text = activeCompObj.value.text.replace(
        /[^A-Z|0-9|\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g,
        ''
      );
    };

    const applySc = () => {
      const SVG = document.getElementsByClassName('vue3-barcode-element')[0];
      const canvas = document.createElement('canvas');

      const XML = new XMLSerializer().serializeToString(SVG);
      const SVG64 = btoa(XML);
      const image64 = 'data:image/svg+xml;base64,' + SVG64;

      activeCompObj.value.img = image64;
    };

    return {
      activeCompObj,
      changeSrc,
      changeText,
      applySc
    };
  }
});
</script>
<style lang="scss" scoped>
.flex-title {
  width: 20px;
}
.flex-title1 {
  width: 40px;
}
.flex-title2 {
  width: 80px;
}
.barcode-container {
  width: 100%;
  overflow-x: auto;
}
</style>
