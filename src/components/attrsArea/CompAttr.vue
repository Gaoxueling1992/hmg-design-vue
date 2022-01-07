<template>
  <div class="comp-attr">
    <div class="comp-attr-header">
      <div class="container-item padding10 paddingT20">
        <div class="title marginB5 fontW500">{{activeCompObj.name}}</div>
        <div class="desc fontW400">{{activeCompObj.desc}}</div>
      </div>
    </div>
    <component class="padding10" :is="activeCompObj.elName"></component>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
import RadText from './compsAttrs/RadText.vue'
import RadInput from './compsAttrs/RadInput.vue'
import RadDatetime from './compsAttrs/RadDatetime.vue'
import RadLine from './compsAttrs/RadLine.vue'
import RadNumber from './compsAttrs/RadNumber.vue'

export default defineComponent({
  components: {
    RadText,
    RadInput,
    RadDatetime,
    RadLine,
    RadNumber
  },
  setup () {
    const activeCompObj: any = inject('activeCompObj')
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
