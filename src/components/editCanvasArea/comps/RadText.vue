<template>
  <div
    style="min-height: 20px"
    class="inherit"
    :style="{
      'border-color': 'inherit',
      color: 'inherit !important',
      'background-color': 'inherit',
      'font-size': 'inherit',
      textAlign: ele.styleSheet.justifyContent,
      width: '100%'
    }"
    :class="{'ellipsis': ele.styleSheet.wrap === 'noWrap'}"
    v-html="ele.label || '静态文本'"
  ></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['ele'],
  setup () {
    
  },
})
</script>
