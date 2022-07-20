<template>
  <div class="title marginT10 marginB5 fontW500">粗细</div>
  <a-input-number
    class="flex1 marginR5"
    style="width: 100%"
    :min="1"
    :precision="0"
    v-model:value="activeCompObj.lineSize"
    @change="activeCompObj.lineSize = !activeCompObj.lineSize ? 1 : activeCompObj.lineSize"
  />
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup () {
    const activeCompObj: any = inject('activeCompObj');
    return {
      activeCompObj
    };
  },
})
</script>
<style lang="scss" scoped>
.ant-radio-group {
  display: flex;
  .ant-radio-wrapper {
    flex: 1;
  }
}
.flex-title {
  width: 32px;
}
</style>
