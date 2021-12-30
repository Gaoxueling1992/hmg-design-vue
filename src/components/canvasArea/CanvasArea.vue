<template>
  <div class="canvas-area" @click="clickCanvas">
    <div v-for="(area, index) in pdata.areas" :key="index" @click.stop="clickArea(index)">
      {{area.type}}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    pageData: Object
  },
  data() {
    return {
      pdata: Object
    }
  },
  methods: {
    clickCanvas () {
      this.$emit('clickCanvas')
    },
    clickArea (index) {
      this.$emit('clickArea', index)
    }
  },
  watch: {
    pageData: {
      handler (val) {
        this.pdata = val
      },
      deep: true,
      immediate: true
    }
  },
})
</script>

<style lang="scss" scoped>
.canvas-area {
  background-color: var(--color-white);
  border: 1px dashed var(--color-primary);
  min-height: 500px;
  .report-area {
    border: 1px dashed var(--border-color-lighter);
  }
}
</style>