<template>
  <div :id="ele.id" :style="{ width: ele.eleWidth }" style="display: inline-block;" class="disgn-ele">
    <div>1111</div>
    <a-input disabled
      :placeholder="ele.placeholder"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'

export default defineComponent({
  props: ['ele'],
  setup (props) {
    const ele = ref(props.ele)
    console.log('setup', ele.placeholder) 
    return {
      ele
    }
  }
})
</script>
<style lang="scss" scoped>
.disgn-ele {
  padding: 10px;
}
</style>