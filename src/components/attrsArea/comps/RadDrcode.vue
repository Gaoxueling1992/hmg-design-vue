<template>
  <div class="title marginT10 marginB5 fontW500">源</div>
  <div class="flex marginT10">
    <a-input
      class="flex1 marginR5"
      v-model:value="activeCompObj.src"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3">底色</div>
    <a-input
      class="flex1 marginR5"
      v-model:value="activeCompObj.background"
    />
    <div class="flex-title2 marginL5">码色</div>
    <a-input
      class="flex1"
      v-model:value="activeCompObj.lineColor"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title1">大小</div>
    <a-input-number v-model:value="activeCompObj.codeHeight" min="20"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');

    return {
      activeCompObj
    };
  }
});
</script>
<style lang="scss" scoped>
.flex-title {
  width: 20px;
}
.flex-title1 {
  width: 40px;
}
.flex-title2 {
  width: 80px;
}
</style>
