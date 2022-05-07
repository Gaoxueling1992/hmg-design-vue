<template>
  <div class="container">
    <div class="container-item">
      <div class="title marginB15">控件</div>
      <a-row type="flex" justify="start">
        <draggable :span="12" v-model="list" :group="{ name: 'line', pull: 'clone', put: false }" :clone="cloneDog">
          <a-button v-for="(item, index) in list" :key="index"  @click="handleAddComp(item)"  class="container-item-btn" :ghost="true">
            {{ item.title }}
          </a-button>
        </draggable>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { compsList } from '@/utils/config';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup () {
    const list: Array<any> = compsList
    const addComp: any = inject('addComp')
    const returnComp: any = inject('returnComp')

    const handleAddComp = (value) => {
      addComp(value.elName)
    }

    const cloneDog = (value) => {
      console.log('clonedog', value)
      return returnComp(value.elName)
    }

    return {
      list,
      handleAddComp,
      cloneDog
    }
  },
})
</script>

<style lang="scss" scoped>
.container-item {
  padding: 5px;
  .container-item-btn {
    width: 100px !important;
    margin-bottom: 10px;
  }
}
</style>