<template>
  <Header></Header>
  <component :is="activeTab"></component>
</template>
<script lang="ts">
import { defineComponent, provide, ref, Ref } from 'vue';
import Report from './Report.vue';
import Form from './Form.vue';
import Table from './Table.vue';

export default defineComponent({
  components: {
    report: Report,
    table: Table,
    form: Form
  },
  setup() {
    const activeTab: Ref<string> = ref<string>('form');
    provide('activeTab', activeTab);
    return {
      activeTab
    };
  }
});
</script>