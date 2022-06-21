<template>
  <div class="comps-area">
    <CustomCompArea></CustomCompArea>
    <BaseCompArea></BaseCompArea>
    <CompsBlockArea class="marginT10"></CompsBlockArea>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.comps-area {
  padding-bottom: 10px;
}
</style>
