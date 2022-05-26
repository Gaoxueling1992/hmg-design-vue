<template>
  <div
    :style="{
      height: ele.styleSheet.fontSize / 2 + 'px',
      'border-top': '1px solid ' + ele.styleSheet.color,
      'text-align': 'center',
      'color': ele.styleSheet.color,
      'font-size': ele.styleSheet.fontSize + 'px',
      'font-variant': 'tabular-nums',
      'line-height': 1,
      'list-style': 'none',
      'font-feature-settings': 'tnum',
    }"
  >
    <span :style="{
      position: 'relative',
      top: -ele.styleSheet.fontSize/2 + 'px',
      background: isReadonlyStatus ? '#fff' : bg,
      padding: ele.label ? '0 5px' : '0',
      'max-width': '80%',
      'white-space': 'nowrap',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    }">{{ele.label}}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, inject } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup() {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    const bg = window.themeVariables['--background-color-main'];
    return {
      isReadonlyStatus,
      bg
    };
  }
});
</script>
<style lang="scss" scoped>
.inherit {
  border-color: inherit;
  color: inherit !important;
  background-color: inherit;
  font-size: inherit;
}
</style>