<template>
  <div class="canvas-area" @click.self="handleClickCanvas">
    <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }">
      <div v-for="(line, idx) in lines" :key="idx" :id="'line' + idx" class="margin10">
        <draggable v-model="lines[idx]" group="line" class="canvas-area-line">
          <transition-group>
            <DesignEle v-for="ele in line" :ele="ele" :key="ele.id"></DesignEle>
          </transition-group>
        </draggable>
      </div>
    </draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

// 画布点击
const handleClickCanvasFn = () => {
  const clickCanvas: any = inject('clickCanvas')
  const handleClickCanvas = () => {
    clickCanvas()
  }
  return { handleClickCanvas }
}

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup () {
    const { lines } = toRefs(inject('pageData')) 
    const { handleClickCanvas } = handleClickCanvasFn()

    return {
      handleClickCanvas,
      lines
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
  .canvas-area-line {
    display: flex;
    position: relative;
  }
}
</style>