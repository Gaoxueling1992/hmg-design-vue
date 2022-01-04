<template>
  <div class="container">
    <div class="container-item">
      <div class="title marginB15">控件</div>
      <a-row type="flex" justify="start">
        <template v-for="item in list" :key="item.elName">
          <a-col :span="12">
            <a-button @click="addComp(item.elName)" size="small" class="container-item-btn" :ghost="true">
              {{ item.title }}
            </a-button>
          </a-col>
        </template>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { compsList } from '@/utils/config';

export default defineComponent({
  emits: ['addComp'],
  setup (props, { emit }) {
    const list: Array<object> = compsList

    const addComp = (value: string) => {
      emit('addComp', value)
    }

    return {
      list,
      addComp
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