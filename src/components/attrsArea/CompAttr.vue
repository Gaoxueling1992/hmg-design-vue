<template>
  <div class="comp-attr">
    <div class="comp-attr-header">
      <div class="container-item padding10 paddingT20">
        <div class="title marginB5 fontW500">{{activeCompObj.name}}</div>
        <div class="desc fontW400">{{activeCompObj.desc}}</div>
      </div>
    </div>
    <div class="padding10">
      <div class="container-item">
        <div class="title marginB5 fontW500">文本内容</div>
        <a-textarea
          v-model:value="activeCompObj.label"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </div>
      <div
        v-for="(value, key) in activeCompObj.styleSheet"
        :key="key"
        class="attr-group paddingT10"
      >
        <div class="label">{{ sheet2Form[key].label}}</div>
        <component
          class="flex1"
          :is="sheet2Form[key].type"
          v-model:value="activeCompObj.styleSheet[key]"
          :options="sheet2Form[key].options"
        ></component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { sheet2Form } from '@/utils/config.ts';
import { Input, InputNumber, Select } from 'ant-design-vue';
// import { ElColorPicker } from 'element-plus';

export default defineComponent({
  components: {
    'a-input': Input,
    'a-input-number': InputNumber,
    'a-select': Select,
    // 'el-color-picker': ElColorPicker
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    return {
      activeCompObj,
      sheet2Form
    };
  }
});
</script>
<style lang="scss" scoped>
.comp-attr {
  .desc {
    color: var(--color-text-secondary);
  }
  .comp-attr-header {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--border-color-base);
    }
  }
  .attr-group {
    display: flex;
    align-items: center;
    .label {
      padding-right: 10px;
    }
    .flex1 {
      flex: 1;
    }
  }
}
</style>
