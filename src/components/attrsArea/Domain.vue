<template>
  <div class="title marginT10 marginB5 fontW500">域值</div>
  <div class="attr-group">
    <a-select
      ref="select"
      v-model:value="activeCompObj.domainType"
      @change="handleChange"
    >
      <a-select-option value="domain">数据库域值</a-select-option>
      <a-select-option value="temp">临时显示</a-select-option>
      <a-select-option value="prop">存储数据</a-select-option>
    </a-select>
    <a-select
      v-if="activeCompObj.domainType === 'domain'"
      v-model:value="domain"
      :options="domainList"
      allowClear
      style="width: 160px"
    ></a-select>
    <a-input
      style="width: 160px"
      v-else
      v-model:value="domain"
      allowClear
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, inject } from 'vue';

// 处理域值切换逻辑
const handleDomainChange = (domain: Ref<string>) => {
  const handleChange = () => {
    domain.value = '';
  };
  return { handleChange };
};

export default defineComponent({
  setup () {
    const activeCompObj: any = inject('activeCompObj');
    const domain: Ref<string> = ref<string>(activeCompObj.domain);
    const domainList: any = inject('domainList');

    const { handleChange } = handleDomainChange(domain);
    
    return {
      domain,
      domainList,
      handleChange,
      activeCompObj
    }
  },
})
</script>
