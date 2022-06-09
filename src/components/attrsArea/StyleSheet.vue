<template>
  <div class="title marginT10 fontW500">基础样式</div>
  <div
    v-for="(value, key) in activeCompObj.styleSheet"
    :key="key"
    class="attr-group paddingT10"
  >
    <template v-if="sheet2Form[key]">
      <div class="label">{{ sheet2Form[key].label }}</div>
      <component
        class="flex1"
        :is="sheet2Form[key].type"
        v-model:value="activeCompObj.styleSheet[key]"
        :options="sheet2Form[key].options"
        :num="0"
        :min="key === 'fontWeight' ? 300 : key === 'fontSize' ? 12 : (key === 'borderWidth' ? 0 : -Infinity)"
        :max="key === 'fontWeight' ? 800 : (key === 'fontSize' && activeCompObj.elName === 'RadLine' ? 20 : Infinity)"
        :step="key === 'fontWeight' ? 100 : 1"
        @change="changeStyleSheet(key)"
      ></component>
    </template>
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
    const changeStyleSheet = (key) => {
      if (activeCompObj.value.styleSheet && !activeCompObj.value.styleSheet[key]) {
        console.log(key)
        switch (key) {
          case 'fontWeight':
            activeCompObj.value.styleSheet[key] = 300;
            break;
          case 'fontSize':
            activeCompObj.value.styleSheet[key] = 12;
            break;
          case 'borderWidth':
          case 'paddingTop':
          case 'paddingBottom':
          case 'paddingLeft':
          case 'paddingRight':
            activeCompObj.value.styleSheet[key] = 0;
            break;
        }
      }
    };
    return {
      activeCompObj,
      sheet2Form,
      changeStyleSheet
    }
  },
})
</script>
