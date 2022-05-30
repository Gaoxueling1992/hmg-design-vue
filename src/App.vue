<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  name: 'App',
  data () {
    return {
      locale: zhCN
    }
  },
  created() {
    if (location.href.indexOf('isEditor') > -1) {
      document.getElementById('vite-app').style.overflow = 'auto';
    } else {
      document.getElementById('vite-app').style.overflow = 'hidden';
    }
  }
});
</script>
<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
#vite-app {
  font-family: var(--font-family-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background-color: var(--background-color-base);
  width: 100%;
  margin: 0 auto;
  // overflow: auto;
}
</style>
