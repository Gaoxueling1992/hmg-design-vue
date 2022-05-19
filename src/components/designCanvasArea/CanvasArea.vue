<template>
  <div
    class="canvas-area"
    :style="{
      ...styleSheet,
      backgroundImage: 'repeating-linear-gradient(transparent, transparent ' + styleSheet.minHeight + ', red ' + styleSheet.minHeight + ', red ' + (parseInt(styleSheet.minHeight) + 0.5) + 'mm)'
    }"
    @click.self.prevent="handleClickCanvas"
  >
    <template v-if="!loading">
      <draggable v-model="lines" @end="dragEnd">
        <div 
          v-for="(line, idx) in lines"
          :key="idx"
          :id="'line' + String(idx)"
        >
          <draggable
            v-model="lines[idx]"
            class="canvas-area-line"
            group="line"
            @end="dragEnd"
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
      </draggable>
    </template>
    <a-spin style="width:100%" v-else/>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs,Ref } from 'vue';
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
    const loading: Ref<boolean> = inject('loading');

    const dragEnd = () => {
      let res = [[]];
      for (let i = 0; i < pageData.lines.length; i++) {
        if (pageData.lines[i].length) {
          res.push(pageData.lines[i]);
          res.push([]);
        }
      }
      pageData.lines = [].concat(res);
    };

    return {
      handleClickCanvas,
      pageData,
      lines,
      styleSheet,
      loading,
      dragEnd
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