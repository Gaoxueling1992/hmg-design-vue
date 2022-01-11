<template>
  <div class="title marginT10 fontW500">验证</div>
  <template
    v-for="(value, key) in activeCompObj.validate"
    :key="key"
  >
    <div
      v-if="sheet2Form[key] && sheet2Form[key].label"
      class="attr-group paddingT10"
    >
      <a-checkbox v-model:checked="activeCompObj.validate[key]">
        {{ sheet2Form[key].label }}
      </a-checkbox>
    </div>
    <template v-if="key ==='limitLength' && activeCompObj.validate[key]">
      <a-input
        class="limit-input marginR10 marginT5"
        v-model:value="activeCompObj.validate.minLength"
      />-
      <a-input
        class="limit-input marginL10"
        v-model:value="activeCompObj.validate.maxLength"
      />
    </template>
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
