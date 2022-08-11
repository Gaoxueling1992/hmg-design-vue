<template>
  <div class="container marginB10">
    <div class="cus-container-item">
      <div class="title marginB10">常用控件</div>
      <template
        v-for="(cat, catIdx) in customCompTemp"
        :key="catIdx"
      >
        <div class="title marginT5 marginB5">{{cat.category}}</div>
        <a-row
          type="flex"
          justify="start"
        >
          <draggable
            :span="12"
            v-model="cat.domains"
            :group="{ name: 'line', pull: 'clone', put: false }"
            :clone="cloneDog"
            style="width:100%;display:flex;flex-wrap:wrap;row-gap:10px;column-gap:10px;"
            @end="dragEnd"
          >
            <a-button
              v-for="domain in cat.domains"
              :key="domain.option"
              @click="handleAddComp(domain)"
              class="container-item-btn ellipsis"
              :ghost="true"
            >
              {{ domain.name }}
            </a-button>
          </draggable>
        </a-row>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup() {
    const customComp: any = inject('customComp');
    const customCompTemp = computed(() => {
      return customComp.value;
    });
    const addComp: any = inject('addComp');
    const returnComp: any = inject('returnComp');
    const pageData: any = inject('pageData');

    const handleAddComp = (value) => {
      if (value.types && value.types.length) {
        let elName = value.types[0];
        if (elName === 'rad-operator') {
          elName = 'rad-signature';
        }
        const label = value.name;
        const threshold = value.option;
        const elValue =
          value.values && value.values.length ? value.values[0] : null;
        addComp(elName, { label, threshold, elValue });
      } else {
        console.error('后台配置信息不全');
      }
    };

    const cloneDog = (value) => {
      if (value.types && value.types.length) {
        let elName = value.types[0];
        if (elName === 'rad-operator') {
          elName = 'rad-signature';
        }
        const label = value.name;
        const threshold = value.option;
        const elValue =
          value.values && value.values.length ? value.values[0] : null;
        return returnComp(elName, { label, threshold, elValue });
      } else {
        console.error('后台配置信息不全');
      }
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
      customCompTemp,
      handleAddComp,
      cloneDog,
      dragEnd
    };
  }
});
</script>

<style lang="scss">
.cus-container-item {
  padding: 5px;
  .container-item-btn {
    width: calc(50% - 5px) !important;
    border-color: var(--border-color-base) !important;
    color: var(--color-text-primary) !important;
    &:hover {
      border-color: var(--color-primary) !important;
      color: var(--color-primary) !important;
    }
  }
  .ant-btn > span {
    display: contents;
  }
}
</style>