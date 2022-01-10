<template>
  <div
    :id="ele.id"
    :style="{
      width: ele.eleWidth,
      display: ele.inline ? 'flex' : 'inline-block;',
      'align-items': ele.inline ? 'center' : '',
      'flex': ele.eleWidth ? 'inherit' : 1,
      'max-width': '100%',
      ...ele.styleSheet,
      fontSize: ele.styleSheet.fontSize + 'px',
      borderWidth: ele.styleSheet.borderWidth + 'px'
    }"
    @click.stop="clickEle"
    class="disgn-ele padding5"
    :class="{'disgn-ele-active': activeCompId === ele.id}"
  >
    <template v-if="!ele.noLabel">
      <div class="inherit" :class="ele.inline ? 'ele-label' : ''">{{ele.label || ele.name}}</div>
      <a-input
        style="flex: 1"
        disabled
        class="inherit"
        :placeholder="ele.placeholder"
      />
    </template>
    <template v-else>
      <div
        v-if="ele.elName === 'RadText'"
        style="min-height: 20px"
        class="inherit"
        :class="{'ellipsis': ele.styleSheet.wrap === 'noWrap'}"
      >{{ ele.label || '静态文本' }}</div>
      <a-divider
        v-if="ele.elName === 'RadLine'"
        style="height: 20px"
        class="inherit"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject } from 'vue';

export default defineComponent({
  props: ['ele', 'index'],
  setup(props) {
    const ele: object = reactive(props.ele) || {};
    const activeComp: any = inject('activeComp');
    const activeCompId: string = inject('activeCompId') || '';

    const clickEle = () => {
      activeComp(ele);
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
.inherit {
  border-color: inherit;
  color: inherit;
  background-color: inherit;
  font-size: inherit;
}
</style>