<template>
  <div class="title marginT10 fontW500">属性</div>
  <template
    v-for="(value, key) in activeCompObj.baseProps"
    :key="key"
  >
    <div
      class="attr-group paddingT10"
      v-if="sheet2Form[key] && sheet2Form[key].label"
    >
      <a-checkbox v-model:checked="activeCompObj.baseProps[key]">{{ sheet2Form[key].label }}</a-checkbox>
    </div>
  </template>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { sheet2Form } from '@/utils/config';

export default defineComponent({
  setup () {
    const activeCompObj: any = inject('activeCompObj');
    return {
      activeCompObj,
      sheet2Form
    };
  },
})
</script>

