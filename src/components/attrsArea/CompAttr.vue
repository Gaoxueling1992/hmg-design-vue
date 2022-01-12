<template>
  <div class="comp-attr">
    <div class="comp-attr-header">
      <div class="container-item padding10 paddingT20">
        <div class="title marginB5 fontW500">{{activeCompObj.name}}</div>
        <div class="desc fontW400">{{activeCompObj.desc}}</div>
        <div class="desc fontW400">颜色支持配置为英文、十六进制、RGB和RGBA。</div>
      </div>
    </div>
    <div class="padding10 attr-body">
      <div class="container-item">
        <div class="title marginB5 fontW500">文本内容</div>
        <a-textarea
          v-model:value="activeCompObj.label"
          allowClear
          :auto-size="{ minRows: 2, maxRows: 2 }"
        />
      </div>
      <a-checkbox
        v-if="!activeCompObj.noLabel"
        v-model:checked="activeCompObj.inline"
        class="marginT10"
      >左侧标签</a-checkbox>
      <component :is="activeCompObj.elName"></component>
      <Domain v-if="activeCompObj.domainType"></Domain>
      <Validate v-if="activeCompObj.validate"></Validate>
      <BaseProps v-if="activeCompObj.baseProps"></BaseProps>
      <StyleSheet v-if="activeCompObj.styleSheet"></StyleSheet>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { sheet2Form } from '@/utils/config';
import RadInput from './comps/RadInput.vue';
import RadNumber from './comps/RadNumber.vue';
import RadDatetime from './comps/RadDatetime.vue';
import RadImage from './comps/RadImage.vue';
import RadSingleSelect from './comps/RadSingleSelect.vue';
import RadMulSelect from './comps/RadMulSelect.vue';

export default defineComponent({
  components: {
    RadInput: RadInput,
    RadNumber: RadNumber,
    RadDatetime: RadDatetime,
    RadImage: RadImage,
    RadSingleSelect: RadSingleSelect,
    RadMulSelect: RadMulSelect
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
<style lang="scss">
.comp-attr {
  overflow: auto;
  margin-bottom: 50px;
  .limit-input {
    width: calc(50% - 20px);
  }
  .attr-body {
    margin-bottom: 50px;
  }
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
      width: 66px;
      text-align: justify;
      text-align-last: justify;
    }
    .flex1 {
      flex: 1;
    }
  }
}
</style>
