<template>
  <div class="canvas-area" @click="handlClickCanvas">
    {{pdata.elements}}
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, inject } from 'vue'

export default defineComponent({
  props: ['pageData'],
  setup (props) {
    const pdata = toRefs(props.pageData)
    const clickCanvas = inject('clickCanvas')
    const handlClickCanvas = () => {
      clickCanvas()
    }
    return {
      pdata,
      handlClickCanvas
    }
  },
})
</script>

<style lang="scss" scoped>
.canvas-area {
  background-color: var(--color-white);
  border: 1px dashed var(--color-primary);
  margin: 0 auto;
  width: calc(100% - 20px);
  min-height: calc(100% - 20px);
}
</style>