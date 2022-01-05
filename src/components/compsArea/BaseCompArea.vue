<template>
  <div class="container">
    <div class="container-item">
      <div class="title marginB15">控件</div>
      <a-row type="flex" justify="start">
        <a-col :span="12" v-for="item in list" :key="item.elName">
          <a-button @click="handleAddComp(item.elName)"  class="container-item-btn" :ghost="true">
            {{ item.title }}
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import { compsList } from '@/utils/config';

export default defineComponent({
  setup () {
    const list: Array<object> = compsList
    const addComp: any = inject('addComp')

    const handleAddComp = (value: string) => {
      addComp(value)
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
  margin-bottom: 20px;
  .container-item-btn {
    width: 100px !important;
    margin-bottom: 10px;
  }
}
</style>