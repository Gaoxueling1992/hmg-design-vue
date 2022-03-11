<template>
  <div class="title marginT10 marginB5 fontW500">类型</div>
  <a-radio-group
    class="marginB5"
    v-model:value="activeCompObj.type"
    name="radioGroup"
  >
    <a-radio value="select">下拉</a-radio>
    <a-radio value="checkbox">平铺</a-radio>
  </a-radio-group>
  <template v-if="activeCompObj.type === 'checkbox'">
    <div class="title marginT10 marginB5 fontW500">排列方式</div>
    <a-radio-group
      v-model:value="activeCompObj.layout"
      name="radioGroup"
    >
      <a-radio value="crosswise">横向排列</a-radio>
      <a-radio value="lengthways">纵向排列</a-radio>
    </a-radio-group>
  </template>
  <a-checkbox-group
    v-model:value="activeCompObj.value"
    style="width: 100%"
    v-if="activeCompObj.options && activeCompObj.options.length"
  >
    <draggable
      v-model="activeCompObj.options"
      group="line"
      v-if="activeCompObj.options && activeCompObj.options.length"
    >
      <div
        v-for="(option, index) in activeCompObj.options"
        :key="option.value"
        class="paddingT5"
      >
        <i class="iconfont icondrag"></i>
        <a-input size="small" class="input-width" v-model:value="option.label"/>
        <div class="option-op">
          <a-checkbox :value="option.value"></a-checkbox>
          <i
            class="iconfont icondelete-border paddingL5"
            @click="deleteOption(index)"
          ></i>
        </div>
      </div>
    </draggable>
  </a-checkbox-group>
  <div
    class="op marginT10"
    @click="addOption"
  >
    <i class="iconfont iconplus paddingR5"></i>添加选项
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    const addOption = () => {
      const index = activeCompObj.value.options.length;
      activeCompObj.value.options.push({
        value:
          index === 0 ? 0 : activeCompObj.value.options[index - 1].value + 1,
        label:
          '选项' +
          (index === 0 ? 0 : activeCompObj.value.options[index - 1].value + 1)
      });
    };
    const deleteOption = (index: any) => {
      activeCompObj.value.options.splice(index, 1);
    };
    return {
      activeCompObj,
      addOption,
      deleteOption
    };
  }
});
</script>
<style lang="scss" scoped>
.op,
.iconfont {
  font-size: var(--size-f4);
}
.op {
  color: var(--color-primary);
}
.option-op {
  float: right;
}
.options {
  width: 100%;
}
.iconfont {
  &:hover {
    color: var(--color-primary);
  }
}
.icondelete-border {
  font-size: var(--size-f3);
}
.input-width {
  width: 160px;
}
</style>