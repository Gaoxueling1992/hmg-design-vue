<template>
  <div class="title marginT10 marginB5 fontW500">域值</div>
  <div class="attr-group">
    <a-select
      ref="select"
      v-model:value="activeCompObj.domainType"
      @change="activeCompObj.threshold = ''"
    >
      <a-select-option value="domain">数据库域值</a-select-option>
      <a-select-option value="temp">临时显示</a-select-option>
      <a-select-option value="prop">存储数据</a-select-option>
    </a-select>
    <a-select
      v-if="activeCompObj.domainType === 'domain'"
      v-model:value="activeCompObj.threshold"
      :options="domainList"
      allowClear
      style="width: 160px"
    ></a-select>
    <a-input
      style="width: 160px"
      v-else
      v-model:value="activeCompObj.threshold"
      allowClear
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  setup () {
    const activeCompObj: any = inject('activeCompObj');
    const domainList: any = inject('domainList');
    
    return {
      domainList,
      activeCompObj
    }
  },
})
</script>
