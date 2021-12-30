<template>
  <div class="container">
    <div class="container-item">
      <div class="title marginB15">添加区域</div>
      <a-row type="flex" justify="start">
        <a-col @click="addArea(item)" v-for="(item, index) in areaList" :key="index" :id="item.areaType" :span="8" class="choose-block-btn">
          {{ item.name }}
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { areaList } from '@/utils/config';

export default defineComponent({
  emits: ['addArea'],
  setup (props, context) {
    const addArea = (value: object) => {
      context.emit('addArea', value)
    }
    return {
      addArea,
      areaList
    }
  }
})
</script>
<style lang="scss" scoped>
.container-item {
  margin-bottom: 20px;
  .choose-block-btn {
    font-size: 14px;
    margin-bottom: 10px;
    &:hover {
      color: var(--color-primary);
    }
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--border-color-base);
  }
}
</style>