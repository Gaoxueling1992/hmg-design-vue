<template>
  <a-divider
    v-if="ele.elName === 'RadLine'"
    class="inherit"
    :style="{
      marginTop: ele.styleSheet.paddingTop + 'px',
      marginBottom: ele.styleSheet.paddingBottom + 'px',
      marginLeft: ele.styleSheet.paddingLeft + 'px',
      marginRight: ele.styleSheet.paddingRight + 'px',
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