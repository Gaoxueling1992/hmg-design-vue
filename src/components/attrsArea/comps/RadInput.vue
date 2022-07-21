<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-01-10 17:11:13
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-21 18:19:12
 * @FilePath: /hmg-design-vue/src/components/attrsArea/comps/RadInput.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-radio-group class="marginT10 marginB5" @change="changeType" v-model:value="activeCompObj.type" name="radioGroup">
    <a-radio value="text">单行</a-radio>
    <a-radio value="textarea">多行</a-radio>
  </a-radio-group>
  <div class="title marginT10 marginB5 fontW500">引导文字</div>
  <a-textarea v-model:value="activeCompObj.placeholder" allowClear :auto-size="{ minRows: 2, maxRows: 2 }"/>
  <div class="flex marginT10">
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
