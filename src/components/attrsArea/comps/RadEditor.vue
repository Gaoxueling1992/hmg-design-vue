<template>
  <div class="title marginT10 marginB5 fontW500">预设富文本样式</div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">颜色</div>
    <a-input
      class="flex1"
      v-model:value="activeCompObj.fontColor"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">字体</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.fontSize"
      :min="12"
    /> 
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">粗细</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.fontWeight"
      :min="300"
      step="100"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">粗细</div>
    <a-radio-group v-model:value="activeCompObj.fontStyle">
      <a-radio value="normal">正常</a-radio>
      <a-radio value="italic">斜体</a-radio>
      <a-radio value="oblique">倾斜</a-radio>
    </a-radio-group>
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">下划线</div>
    <a-radio-group v-model:value="activeCompObj.textDecoration">
      <a-radio value="none">关闭</a-radio>
      <a-radio value="underline">开启</a-radio>
    </a-radio-group>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup () {
    const activeCompObj: any = inject('activeCompObj');
    return {
      activeCompObj
    };
  },
})
</script>
<style lang="scss" scoped>
.ant-radio-group {
  display: flex;
  .ant-radio-wrapper {
    flex: 1;
  }
}
.flex-title {
  width: 32px;
}
</style>
