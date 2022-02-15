<template>
  <div class="title marginT10 marginB5 fontW500">引导文字</div>
  <a-textarea v-model:value="activeCompObj.placeholder" allowClear :auto-size="{ minRows: 2, maxRows: 2 }"/>
  <div class="title marginT10 marginB5 fontW500">类型</div>
  <a-radio-group
    class="marginB5"
    v-model:value="activeCompObj.type"
    name="radioGroup"
  >
    <a-radio value="input">电子签名</a-radio>
    <a-radio value="image">手写体签名</a-radio>
    <a-radio value="both">组合</a-radio>
  </a-radio-group>
  <template v-if="activeCompObj.type === 'both'">
    <div class="title marginT10 marginB5 fontW500">手写签名位置</div>
    <a-radio-group
      class="marginB5"
      v-model:value="activeCompObj.imagePosi"
      name="radioGroup"
    >
      <a-radio value="up">上</a-radio>
      <a-radio value="bottom">下</a-radio>
      <a-radio value="left">左</a-radio>
      <a-radio value="right">右</a-radio>
    </a-radio-group>
  </template>
  <template v-if="activeCompObj.type !== 'input'">
    <div class="title marginT10 marginB5 fontW500">签名大小</div>
    <div class="flex">
      <div class="flex-title">宽</div>
      <a-input-number class="flex1 marginR5" :min="10" v-model:value="activeCompObj.imgWidth"/>
      <div class="flex-title marginL5">高</div>
      <a-input-number class="flex1" :min="10" v-model:value="activeCompObj.imgHeight"/>
    </div>
  </template>
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