<template>
  <Header></Header>
  <component :is="activeTab"></component>
</template>
<script lang="ts">
import { defineComponent, provide, ref, Ref, reactive } from 'vue';
import ReportContainer from './ReportContainer.vue';
import FormContainer from './FormContainer.vue';
import TableContainer from './TableContainer.vue';

export default defineComponent({
  components: {
    ReportContainer: ReportContainer,
    TableContainer: TableContainer,
    FormContainer: FormContainer
  },
  setup() {
    const activeTab: Ref<string> = ref<string>('ReportContainer');
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