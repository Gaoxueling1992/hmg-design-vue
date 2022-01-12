<template>
  <div class="title marginT10 marginB5 fontW500">类型</div>
  <a-radio-group class="marginB5" v-model:value="activeCompObj.type" name="radioGroup">
    <a-radio value="select">下拉</a-radio>
    <a-radio value="radio">平铺</a-radio>
  </a-radio-group>
  <div class="title marginT10 marginB5 fontW500">排列方式</div>
  <a-radio-group class="marginB5" v-model:value="activeCompObj.layout" name="radioGroup">
    <a-radio value="crosswise">横向排列</a-radio>
    <a-radio value="lengthways">纵向排列</a-radio>
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