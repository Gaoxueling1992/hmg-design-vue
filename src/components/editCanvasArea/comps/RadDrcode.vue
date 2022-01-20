<template>
  <qrcode-vue
    :value="ele.src"
    :size="ele.codeHeight"
    :background="ele.background"
    :foreground="ele.lineColor"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import QrcodeVue from 'qrcode.vue';

export default defineComponent({
  props: ['ele'],
  components: {
    QrcodeVue
  },
  setup () {
    
  },
})
</script>