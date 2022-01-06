<template>
  <div class="comp-attr">
    <div class="comp-attr-header">
      <div class="container-item padding10 paddingT20">
        <div class="title marginB5 fontW500">{{activeCompObj.name}}</div>
        <div class="desc fontW400">{{activeCompObj.desc}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue'

export default defineComponent({
  setup () {
    const activeCompObj = inject('activeCompObj')
    return {
      activeCompObj
    }
  },
})
</script>
<style lang="scss" scoped>
.comp-attr {
  .desc {
    color: var(--color-text-secondary);
  }
  .comp-attr-header {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--border-color-base);
    }
  }
}
</style>
