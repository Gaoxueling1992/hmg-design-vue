<template>
  <a-radio-group class="marginT10 marginB5" v-model:value="activeCompObj.type" name="radioGroup">
    <a-radio value="text">单行</a-radio>
    <a-radio value="textarea">多行</a-radio>
  </a-radio-group>
  <div class="title marginT10 marginB5 fontW500">引导文字</div>
  <a-textarea v-model:value="activeCompObj.placeholder" allowClear :auto-size="{ minRows: 2, maxRows: 2 }"/>
  <div class="flex marginT10" v-if="activeCompObj.type === 'text'">
    <div class="flex-title">前缀</div>
    <a-input class="flex1 marginR5" allowClear v-model:value="activeCompObj.prefix"/>
    <div class="flex-title">后缀</div>
    <a-input class="flex1" allowClear v-model:value="activeCompObj.suffix"/>
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
