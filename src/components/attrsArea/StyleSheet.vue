<template>
  <div class="title marginT10 fontW500">基础样式</div>
  <div
    v-for="(value, key) in activeCompObj.styleSheet"
    :key="key"
    class="attr-group paddingT10"
  >
    <div class="label">{{ sheet2Form[key].label }}</div>
    <component
      class="flex1"
      :is="sheet2Form[key].type"
      v-model:value="activeCompObj.styleSheet[key]"
      :options="sheet2Form[key].options"
      :num="0"
    ></component>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import {
  Input,
  InputNumber,
  RadioGroup,
  Select,
  Checkbox
} from 'ant-design-vue';
import { sheet2Form } from '@/utils/config';

export default defineComponent({
  components: {
    'a-input': Input,
    'a-input-number': InputNumber,
    'a-select': Select,
    'a-radio-group': RadioGroup,
    'a-checkbox': Checkbox,
  },
  setup () {
    const activeCompObj: any = inject('activeCompObj');
    return {
      activeCompObj,
      sheet2Form
    }
  },
})
</script>
