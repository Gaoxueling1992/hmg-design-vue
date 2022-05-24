<template>
  <div class="title marginT10 marginB5 fontW500">布局方式</div>
  <a-radio-group
    v-model:value="activeCompObj.layout"
    name="layout"
  >
    <a-radio value="1">每行固定图片数</a-radio>
    <a-radio value="2">自动布局</a-radio>
  </a-radio-group>
  <div class="flex marginT10" v-if="activeCompObj.layout === '1'">
    <div class="flex-title3">每行最多图片数</div>
    <a-input-number
      class="flex1 marginR5"
      :max="12"
      :min="2"
      :step="1"
      :precision="0"
      step-strictly
      v-model:value="activeCompObj.perNum"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title1">测试</div>
    <a-input-number
      class="flex1 marginR5"
      :min="1"
      v-model:value="activeCompObj.testTotalNum"
    />
    <div class="flex-title3">张图片效果</div>
  </div>
  <div class="title marginT10 marginB5 fontW500">图片间距</div>
  <div class="flex marginT10">
    <template v-if="activeCompObj.layout === '2' || activeCompObj.layoutType === '2'">
      <div class="flex-title1">水平</div>
      <a-input-number
        class="flex1 marginR5"
        v-model:value="activeCompObj.horSpacing"
      />
    </template>
    <div class="flex-title1">垂直</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.verSpacing"
    />
  </div>
  <div class="title marginT10 marginB5 fontW500">图片大小</div>
  <a-radio-group
    v-model:value="activeCompObj.layoutType"
    name="layoutType"
  >
    <a-radio value="1">固定宽高</a-radio>
    <a-radio value="2">固定宽度</a-radio>
    <a-radio value="3">固定高度</a-radio>
  </a-radio-group>
  <div class="flex marginT10">
    <template v-if="activeCompObj.layoutType !== '3'">
      <div class="flex-title">宽</div>
      <a-input-number
        class="flex1 marginR5"
        v-model:value="activeCompObj.imgWidth"
      />
    </template>
    <template v-if="activeCompObj.layoutType !== '2'">
      <div class="flex-title">高</div>
      <a-input-number
        class="flex1"
        v-model:value="activeCompObj.imgHeight"
      />
    </template>
  </div>
  <div class="flex marginT10">
    <a-checkbox v-model:checked="activeCompObj.hideSelectBtn">隐藏按钮</a-checkbox>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    return {
      activeCompObj
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
  width: 75px;
}
.flex-title3 {
  width: 110px;
}
</style>