<template>
  <div class="title marginT10 marginB5 fontW500">选择器类型</div>
  <div class="flex">
    <a-select
      class="flex-picker"
      v-model:value="activeCompObj.picker"
      :options="pickerList"
      @change="changePicker"
    />
    <a-select
      class="flex1 flex-format"
      v-model:value="activeCompObj.format"
      :options="pickerMap[activeCompObj.picker]"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { pickerList, pickerMap } from '@/utils/config';

export default defineComponent({
  setup () {
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
  },
})
</script>
<style lang="scss" scoped>
.flex-picker {
  width: 71px;
}
.flex-format {
  max-width: 165px;
}
</style>