<template>
  <Header
    @saveTpl="saveTpl"
    @newTpl="newTpl(1)"
    @chooseTpl="chooseTpl"
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
  <a-modal
    v-model:visible="visible1"
    okText="确定"
    cancelText="取消"
    title="选择模版"
    @ok="handleOk"
  >
    111
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
  activeTab: Ref<string>
) => {
  const visible: Ref<boolean> = ref<boolean>(false);
  const visible1: Ref<boolean> = ref<boolean>(false);
  const tplName: Ref<string> = ref<string>('');
  const savePageData: Ref<any> = ref<any>({});
  // 触发保存
  const saveTpl = () => {
    instance.ctx.$refs[activeTab.value].saveTpl();
  };
  // 新建
  const newTpl = (checkSave: number) => {
    instance.ctx.$refs[activeTab.value].newTpl(checkSave);
  };
  // 保存确认
  const doSave = (val: any) => {
    if (!val.name) {
      visible.value = true;
      tplName.value = val.name;
      savePageData.value = {
        ...val
      };
    } else {
      tplName.value = val.name;
      handleOk();
    }
  };
  // 保存写库
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
  };
  // 选择模版
  const chooseTpl = () => {
    visible1.value = true;
  };
  return {
    saveTpl, newTpl, doSave, handleOk, chooseTpl,
    visible, visible1, tplName
  };
};

export default defineComponent({
  components: {
    ReportContainer: Report,
    TableContainer: Table,
    FormContainer: Form
  },
  setup() {
    const instance: any = getCurrentInstance(); 
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
    ]);
    
    const {
      saveTpl, newTpl, doSave, handleOk, chooseTpl,
      visible, tplName, visible1
    } = handelTpl(instance, activeTab);

    provide('activeTab', activeTab);
    provide('domainList', domainList);

    return {
      activeTab,
      saveTpl, newTpl, doSave, chooseTpl, handleOk,
      visible, visible1,
      tplName
    };
  }
});
</script>