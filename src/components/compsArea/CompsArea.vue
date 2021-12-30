<template>
  <div class="comps-area">
    <BlockArea @addArea="addArea"></BlockArea>
    <BaseCompArea v-if="acitveAreaType" @addComp="addComp" :acitveAreaType="acitveAreaType"></BaseCompArea>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['addArea', 'addComp'],
  data() {
    return {
      acitveAreaType: String
    }
  },
  created () {
    this.acitveAreaType = ''
  },
  methods: {
    addArea (value: object) {
      this.$emit('addArea', value)
      this.acitveAreaType = value.areaType
    },
    addComp (value: string) {
      this.$emit('addComp', value)
    }
  },
})
</script>
