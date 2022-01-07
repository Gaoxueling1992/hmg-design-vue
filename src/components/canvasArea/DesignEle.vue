<template>
  <div
    :id="ele.id"
    :style="{
      width: ele.eleWidth,
      display: ele.inline ? 'flex' : 'inline-block;',
      'align-items': ele.inline ? 'center' : '',
      'flex': ele.eleWidth ? 'inherit' : 1
    }"
    @click.stop="clickEle"
    class="disgn-ele padding5"
    :class="{'disgn-ele-active': activeCompId === ele.id}"
  >
    <template
      v-if="!ele.noLabel"
      :style="{
      ...ele.styleSheet,
      fontSize: ele.styleSheet.fontSize + 'px'
    }"
    >
      <div :class="ele.inline ? 'ele-label' : ''">{{ele.label || ele.name}}</div>
      <a-input
        style="flex: 1"
        disabled
        :placeholder="ele.placeholder"
      />
    </template>
    <template v-else>
      <div
        v-if="ele.elName === 'RadText'"
        :style="{
          ...ele.styleSheet,
          fontSize: ele.styleSheet.fontSize + 'px'
        }"
        style="min-height: 20px"
      >{{ ele.label || '静态文本' }}</div>
      <a-divider
        v-if="ele.elName === 'RadLine'"
        :style="{
          ...ele.styleSheet,
          fontSize: ele.styleSheet.fontSize + 'px'
        }"
        style="height: 20px"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject } from 'vue';

export default defineComponent({
  props: ['ele', 'index'],
  setup (props) {
    const ele: object = reactive(props.ele) || {};
    const activeComp: any = inject('activeComp');
    const activeCompId: string = inject('activeCompId') || '';

    const clickEle = () => {
      activeComp({...ele});
    };

    return {
      ele,
      clickEle,
      activeCompId
    };
  }
});
</script>
<style lang="scss" scoped>
.disgn-ele {
  flex: 1;
  &:hover {
    background: var(--background-color-base);
  }
  .ele-label {
    padding-right: 10px;
  }
}
.disgn-ele-active {
  background: var(--color-btn-bglight);
}
.ant-divider-horizontal {
  margin: 0;
}
</style>