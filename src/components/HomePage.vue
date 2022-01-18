<template>
  <Header
    @saveTpl="saveTpl"
    @newTpl="newTpl(1)"
  ></Header>
  <component
    :is="activeTab"
    :ref="activeTab"
    @saveTpl="doSave"
  ></component>
  <a-modal
    v-model:visible="visible"
    okText="确定"
    cancelText="取消"
    title="保存"
    @ok="handleOk"
  >
    <div class="marginB10">模版名称：</div>
    <a-input v-model:value="tplName"/>
  </a-modal>
</template>
<script lang="ts">
import {
  defineComponent,
  provide,
  ref,
  Ref,
  reactive,
  getCurrentInstance
} from 'vue';
import Report from './ReportContainer.vue';
import Form from './FormContainer.vue';
import Table from './TableContainer.vue';
import { Modal } from 'ant-design-vue';

// 模版操作
const handelTpl = (
  instance: any,
  activeTab: Ref<string>,
  visible: Ref<boolean>,
  tplName: Ref<string>,
  savePageData: Ref<any>
) => {
  const saveTpl = () => {
    instance.ctx.$refs[activeTab.value].saveTpl();
  };
  const newTpl = (checkSave: number) => {
    instance.ctx.$refs[activeTab.value].newTpl(checkSave);
  };
  const doSave = (val: any) => {
    visible.value = true;
    tplName.value = val.name;
    savePageData.value = {
      ...val
    };
  };
  const handleOk = () => {
    if (!tplName.value) {
      Modal.warning({
        title: '提示',
        content: '请输入模版名称',
        okText: '知道了'
      });
    } else {
      visible.value = false;
      const ls = localStorage.getItem('tplsList');
      let list: any = ls === null ? reactive({}) : reactive(JSON.parse(ls));
      let id = savePageData.value.id || (new Date()).getTime() + '';
      list[id] = {
        ...savePageData.value,
        id: id,
        name: tplName.value
      };
      localStorage.setItem('tplsList', JSON.stringify(list));

      newTpl(0);
    }
  }
  return {
    saveTpl,
    newTpl,
    doSave,
    handleOk
  };
};

export default defineComponent({
  components: {
    ReportContainer: Report,
    TableContainer: Table,
    FormContainer: Form
  },
  setup() {
    const activeTab: Ref<string> = ref<string>('ReportContainer');
    const instance: any = getCurrentInstance();
    const visible: Ref<boolean> = ref<boolean>(false);
    const tplName: Ref<string> = ref<string>('');
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
    const savePageData: Ref<any> = ref<any>({});

    const { saveTpl, newTpl, doSave, handleOk } = handelTpl(instance, activeTab, visible, tplName, savePageData);

    provide('activeTab', activeTab);
    provide('domainList', domainList);
    return {
      activeTab,
      saveTpl,
      newTpl,
      doSave,
      visible,
      tplName,
      handleOk
    };
  }
});
</script>