<template>
  <div class="comps-area">
    <BaseCompArea  @addComp="addComp"></BaseCompArea>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['addComp'],
  setup (props, { emit }) {
    const addComp = (value: string) => {
      emit('addComp', value)
    }

    return {
      addComp
    }
  }
})
</script>
