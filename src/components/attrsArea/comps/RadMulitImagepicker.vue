<template>
  <div class="title marginT10 marginB5 fontW500">布局方式</div>
  <a-radio-group v-model:value="activeCompObj.layoutType" name="layoutType">
    <a-radio value="1">固定宽高</a-radio>
    <a-radio value="2">固定每行图片数</a-radio>
    <a-radio value="3">自动布局</a-radio>
  </a-radio-group>
  <template v-if="activeCompObj.layoutType === '1'">
    <div class="title marginT10 marginB5 fontW500">图片大小</div>
    <div class="flex marginT10">
      <div class="flex-title">宽</div>
      <a-input-number
        class="flex1 marginR5"
        v-model:value="activeCompObj.imgWidth"
      />
      <div class="flex-title marginL5">高</div>
      <a-input-number
        class="flex1"
        v-model:value="activeCompObj.imgHeight"
      />
    </div>
  </template>
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
</style>