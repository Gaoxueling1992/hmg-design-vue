<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
#app {
  font-family: var(--font-family-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
