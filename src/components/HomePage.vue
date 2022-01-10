<template>
  <Header></Header>
  <component :is="activeTab"></component>
</template>
<script lang="ts">
import { defineComponent, provide, ref, Ref, reactive } from 'vue';
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
    const activeTab: Ref<string> = ref<string>('report');
    const domainList = reactive([
      {
        label: '111',
        value: 'aaa'
      },
      {
        label: '222',
        value: 'bbb'
      }
    ])
    provide('activeTab', activeTab);
    provide('domainList',domainList)
    return {
      activeTab
    };
  }
});
</script>