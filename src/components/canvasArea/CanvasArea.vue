<template>
  <div class="canvas-area" @click="handlClickCanvas">
    <DesignEle v-for="ele in elements" :ele="ele" :id="ele.id" :key="ele.id"></DesignEle>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue'

export default defineComponent({
  setup () {
    const clickCanvas: any = inject('clickCanvas')
    const { elements } = toRefs(inject('pageData'))
    const handlClickCanvas = () => {
      clickCanvas()
    } 

    return {
      handlClickCanvas,
      elements
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