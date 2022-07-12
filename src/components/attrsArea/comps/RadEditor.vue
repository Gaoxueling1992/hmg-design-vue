<template>
  <div class="title marginT10 marginB5 fontW500">预设富文本内部样式</div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">编辑时内容区域最小高度</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.editingMinHeight"
      :min="50"
      @change="activeCompObj.editingMinHeight = !activeCompObj.editingMinHeight ? 50 : activeCompObj.editingMinHeight"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">打印时内容区域最小高度</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.containerMinHeight"
      :min="0"
      @change="activeCompObj.containerMinHeight = !activeCompObj.containerMinHeight ? 0 : activeCompObj.containerMinHeight"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">颜色</div>
    <a-input
      class="flex1"
      v-model:value="activeCompObj.fontColor"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">字号</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.fontSize"
      :min="12"
      @change="activeCompObj.fontSize = !activeCompObj.fontSize ? 12 : activeCompObj.fontSize"
    /> 
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">粗细</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.fontWeight"
      :min="300"
      step="100"
      @change="activeCompObj.fontWeight = !activeCompObj.fontWeight ? 300 : activeCompObj.fontWeight"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3 marginR5">样式</div>
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
