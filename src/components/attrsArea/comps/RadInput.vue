<template>
  <div class="title marginT10 marginB5 fontW500">引导文字</div>
  <a-textarea v-model:value="activeCompObj.placeholder" :auto-size="{ minRows: 2, maxRows: 2 }"/>
  <a-radio-group class="marginT10 marginB5" v-model:value="activeCompObj.type" name="radioGroup">
    <a-radio value="text">单行</a-radio>
    <a-radio value="textarea">多行</a-radio>
  </a-radio-group>
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
</style>
