<template>
  <Header
    @saveTpl="saveTpl"
    @newTpl="newTpl"
  ></Header>
  <component :is="activeTab" :ref="activeTab"></component>
</template>
<script lang="ts">
import { defineComponent, provide, ref, Ref, reactive, getCurrentInstance } from 'vue';
import Report from './ReportContainer.vue';
import Form from './FormContainer.vue';
import Table from './TableContainer.vue';

export default defineComponent({
  components: {
    ReportContainer: Report,
    TableContainer: Table,
    FormContainer: Form
  },
  setup() {
    const activeTab: Ref<string> = ref<string>('ReportContainer');
    const instance: any = getCurrentInstance()
    const domainList = reactive([
      {
        label: '111',
        value: 'aaa'
      },
      {
        label: '222',
        value: 'bbb'
      }
    ]);

    const saveTpl = () => {
      instance.ctx.$refs[activeTab.value].saveTpl()
    };
    const newTpl = () => {
      instance.ctx.$refs[activeTab.value].newTpl()
    };

    provide('activeTab', activeTab);
    provide('domainList', domainList);
    return {
      activeTab,
      saveTpl, newTpl
    };
  }
});
</script>