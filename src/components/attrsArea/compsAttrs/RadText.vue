<template>
  <div class="rad-text">
    <div class="container-item">
      <div class="title marginB5 fontW500">文本内容</div>
      <a-textarea
        v-model:value="activeCompObj.defaultValue"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </div>
    <div v-for="(value, key) in activeCompObj.styleSheet" :key="key">
      {{ value }} {{ key }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup () {
    const activeCompObj: any = inject('activeCompObj')
    return {
      activeCompObj
    }
  },
})
</script>
