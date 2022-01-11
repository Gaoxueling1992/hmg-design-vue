<template>
  <div class="attr-group paddingT10">
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
