<template>
  <div class="canvas-area" @click="clickCanvas">
    {{pdata.elements}}
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: ['pageData'],
  setup (props, { emit }) {
    const pdata = toRefs(props.pageData)
    const clickCanvas = () => {
      emit('clickCanvas')
    }
    return {
      pdata,
      clickCanvas
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