<!--
 * @Author: your name
 * @Date: 2022-01-24 11:18:20
 * @LastEditTime: 2022-03-11 11:28:31
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /web-ris-front/Users/xuelinggao/Documents/develop/hmg-design-vue/src/components/editCanvasArea/comps/RadNumber.vue
-->
<template>
  <div
    class="inherit"
    v-if="ele.label"
    :class="ele.inline ? 'ele-label' : ''"
  >{{ ele.label }}</div>
  <a-input-number
    style="flex: 1"
    :disabled="ele.baseProps.readonly"
    :min="ele.min"
    :max="ele.max"
    class="inherit"
    v-model:value="ele.value"
    :placeholder="ele.placeholder"
    v-if="!isReadonlyStatus"
  >
    <template #prefix>
      {{ ele.prefix }}
    </template>
    <template #suffix>
      {{ ele.suffix }}
    </template>
  </a-input-number>
  <div v-else style="flex: 1" class="inherit display-text">
    {{ ele.prefix }} {{ ele.value }} {{ ele.suffix }}&nbsp;
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, inject } from 'vue'

export default defineComponent({
  props: ['ele'],
  setup () {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      isReadonlyStatus
    };
  },
})
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
  display: inline-block;
}
.display-text {
  display: inline-block;
}
</style>