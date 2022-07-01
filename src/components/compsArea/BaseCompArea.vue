<template>
  <div class="container">
    <div class="container-item">
      <div class="title marginB15">控件</div>
      <a-row type="flex">
        <draggable
          :span="12"
          v-model="list"
          :group="{ name: 'line', pull: 'clone', put: false }"
          :clone="cloneDog"
          @end="dragEnd"
        >
          <a-button
            v-for="(item, index) in list"
            :key="index"
            @click="handleAddComp(item)"
            class="container-item-btn"
            :ghost="true"
          >
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
  setup() {
    const list: Array<any> = compsList;
    const addComp: any = inject('addComp');
    const returnComp: any = inject('returnComp');
    const pageData: any = inject('pageData');

    const handleAddComp = (value) => {
      addComp(value.elName);
    };

    const cloneDog = (value) => {
      return returnComp(value.elName);
    };

    const dragEnd = () => {
      let res = [[]];
      for (let i = 0; i < pageData.lines.length; i++) {
        if (pageData.lines[i].length) {
          res.push(pageData.lines[i]);
          res.push([]);
        }
      }
      pageData.lines = [].concat(res);
    };
    return {
      list,
      handleAddComp,
      cloneDog,
      dragEnd
    };
  }
});
</script>

<style lang="scss" scoped>
.container-item {
  padding: 5px;
  .container-item-btn {
    width: calc(50% - 6px) !important;
    margin: 0 3px 5px 3px;
    border-color: var(--border-color-base) !important;
    color: var(--color-text-primary) !important;
    &:hover {
      border-color: var(--color-primary) !important;
      color: var(--color-primary) !important;
    }
  }
}
</style>