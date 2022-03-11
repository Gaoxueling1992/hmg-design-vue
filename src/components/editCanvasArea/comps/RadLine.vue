<template>
  <a-divider
    v-if="ele.elName === 'RadLine'"
    class="inherit"
    :style="{
      marginTop: ele.styleSheet.paddingTop + 'px',
      marginBottom: ele.styleSheet.paddingBottom + 'px',
      marginLeft: ele.styleSheet.paddingLeft + 'px',
      marginRight: ele.styleSheet.paddingRight + 'px',
      'color': 'rgba(0, 0, 0, 0.85)',
      'font-size': '14px',
      'font-variant': 'tabular-nums',
      'line-height': 1.5715,
      'list-style': 'none',
      'font-feature-settings': 'tnum',
      'border-top': '1px solid rgba(0, 0, 0, 0.06)'
    }"
  >{{ele.label}}</a-divider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['ele'],
  setup () {
    
  },
})
</script>
<style lang="scss" scoped>
.inherit {
  border-color: inherit;
  color: inherit !important;
  background-color: inherit;
  font-size: inherit;
}
</style>