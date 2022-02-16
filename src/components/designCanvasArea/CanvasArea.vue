<template>
  <div
    class="canvas-area"
    :style="{
      ...styleSheet,
      backgroundImage: 'repeating-linear-gradient(transparent, transparent ' + styleSheet.minHeight + ', red ' + styleSheet.minHeight + ', red ' + (parseInt(styleSheet.minHeight) + 0.5) + 'mm)'
    }"
    @click.self.prevent="handleClickCanvas"
  >
    <div
      v-for="(line, idx) in lines"
      :key="idx"
      :id="'line' + String(idx)"
    >
      <draggable
        v-model="lines[idx]"
        group="line"
        class="canvas-area-line"
      >
        <transition-group>
          <DesignEle
            v-for="(ele, index) in line"
            :ele="ele"
            :key="ele.id"
            :idx="idx"
            :index="index"
          ></DesignEle>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

// 画布点击
const handleClickCanvasFn = () => {
  const clickCanvas: any = inject('clickCanvas');
  const handleClickCanvas = () => {
    clickCanvas();
  };
  return { handleClickCanvas };
};

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup() {
    const pageData: any = inject('pageData') || { line: [], styleSheet: {}}
    const { lines, styleSheet } = toRefs(pageData)
    const { handleClickCanvas } = handleClickCanvasFn() 

    return {
      handleClickCanvas,
      pageData,
      lines,
      styleSheet
    };
  }
});
</script>

<style lang="scss" scoped>
.canvas-area {
  background-color: var(--color-white);
  border: 1px dashed var(--color-primary);
  margin: 0 auto 20px auto;
  width: calc(100% - 20px);
  .canvas-area-line {
    display: flex;
    position: relative;
  }
}
</style>