<template>
  <div
    style="min-height: 20px"
    class="inherit"
    :style="{
      marginTop: ele.styleSheet.paddingTop + 'px',
      marginBottom: ele.styleSheet.paddingBottom + 'px',
      marginLeft: ele.styleSheet.paddingLeft + 'px',
      marginRight: ele.styleSheet.paddingRight + 'px',
      'border-color': 'inherit',
      color: 'inherit !important',
      'background-color': 'inherit',
      'font-size': 'inherit'
    }"
    :class="{'ellipsis': ele.styleSheet.wrap === 'noWrap'}"
  >{{ ele.label || '静态文本' }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['ele'],
  setup () {
    
  },
})
</script>
