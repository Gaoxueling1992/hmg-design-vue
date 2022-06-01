<template>
  <div class="title marginT10 marginB5 fontW500">引导文字</div>
  <a-textarea
    v-model:value="activeCompObj.placeholder"
    allowClear
    :auto-size="{ minRows: 2, maxRows: 2 }"
  />
  <div class="flex marginT10">
    <div class="flex-title marginT10 marginB5">前缀</div>
    <a-input
      class="flex1 marginR5"
      allowClear
      v-model:value="activeCompObj.prefix"
    />
    <div class="flex-title marginT10 marginB5">后缀</div>
    <a-input
      class="flex1"
      allowClear
      v-model:value="activeCompObj.suffix"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title marginT10 marginB5">范围</div>
    <a-input-number
      class="flex1 marginR5"
      allowClear
      v-model:value="activeCompObj.min"
      :min="-Infinity"
      :max="activeCompObj.max"
    />
    <a-input-number
      class="flex1"
      allowClear
      v-model:value="activeCompObj.max"
      :min="activeCompObj.min"
      :max="Infinity"
    />
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
  width: 32px;
}
</style>
