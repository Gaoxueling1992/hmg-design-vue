<template>
  <div class="title marginT10 marginB5 fontW500">选择器类型</div>
  <a-select
    class="flex-picker"
    v-model:value="activeCompObj.picker"
    :options="pickerList"
    @change="changePicker"
  />
  <a-select
    class="flex-format marginT5"
    v-model:value="activeCompObj.format"
    :options="pickerMap[activeCompObj.picker]"
  />
  <div class="flex marginT10">
    <div class="flex-title">前缀</div>
    <a-input class="flex1 marginR5" allowClear v-model:value="activeCompObj.prefix"/>
    <div class="flex-title">后缀</div>
    <a-input class="flex1" allowClear v-model:value="activeCompObj.suffix"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { pickerList, pickerMap } from '@/utils/config';

export default defineComponent({
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    const changePicker = (value: string) => {
      activeCompObj.value.format = pickerMap[value][0].value;
    };
    return {
      activeCompObj,
      pickerList,
      pickerMap,
      changePicker
    };
  }
});
</script>
<style lang="scss" scoped>
.flex-format,
.flex-picker {
  width: 100%;
}
</style>