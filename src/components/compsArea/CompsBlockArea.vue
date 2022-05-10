<template>
  <div class="container">
    <div class="container-item">
      <div class="title marginB15">组合控件</div>
      <a-row type="flex" justify="start">
        <a-col :span="12" v-for="(item, index) in list" :key="index">
          <a-button @click="handleAddComp(item)"  class="container-item-btn" :ghost="true">
            {{ item.title }}
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import { areaList } from '@/utils/config';

export default defineComponent({
  setup () {
    const list: Array<any> = areaList
    const addComp: any = inject('addComp')

    const handleAddComp = (value) => {
      if (value.elName === 'combination-area') {
        addComp(value.elName)
      }
    }

    return {
      list,
      handleAddComp
    }
  },
})
</script>

<style lang="scss" scoped>
.container-item {
  padding: 5px;
  .container-item-btn {
    width: 100% !important;
    margin: 0 5px 5px 5px;
    border-color: var(--border-color-base) !important;
    color: var(--color-text-primary) !important;
    &:hover {
      border-color: var(--color-primary) !important;
      color: var(--color-primary) !important;
    }
  }
}
</style>