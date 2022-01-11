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
    <template v-if="key === 'limitLength' && activeCompObj.validate[key]">
      <a-input-number
        class="limit-input marginR10 marginT5"
        v-model:value="activeCompObj.validate.minLength"
        min="0"
        :max="activeCompObj.validate.maxLength"
      />-
      <a-input-number
        class="limit-input marginL10"
        v-model:value="activeCompObj.validate.maxLength"
        :min="activeCompObj.validate.minLength"
      />
    </template>
    <div
      class="flex"
      v-if="key === 'limitRule' && activeCompObj.validate[key]"
    >
      <a-select
        v-model:value="activeCompObj.validate.rule"
        :options="ruleList"
        class="marginT5"
        style="width: 100px"
      ></a-select>
      <a-input
        v-if="activeCompObj.validate.rule === 'custom'"
        class="flex1"
        allowClear
        v-model:value="activeCompObj.validate.customRule"
      />
    </div>
  </template>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { sheet2Form, ruleList } from '@/utils/config';

export default defineComponent({
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    return {
      activeCompObj,
      sheet2Form,
      ruleList
    };
  }
});
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  .flex1 {
    flex: 1;
  }
}
</style>