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
    :footer="null"
    title="选择模版"
  >
    <a-list size="small" bordered :data-source="tplList">
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.name }}
          <template #actions>
            <a @click="editTpl(item)">编辑</a>
            <a @click="deleteTpl(item)">删除</a>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </a-modal>
  <a-modal
    v-model:visible="chooseTableOpen"
    :footer="null"
    title="选择模版"
  >
    <a-list size="small" bordered :data-source="tableList">
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.name }}
          <template #actions>
            <a @click="applyTpl(item)">应用</a>
          </template>
        </a-list-item>
      </template>
    </a-list>
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
import { Modal, message } from 'ant-design-vue';

// 模版操作
const handelTpl = (
  instance: any,
  activeTab: Ref<string>
) => {
  const visible: Ref<boolean> = ref<boolean>(false);
  const visible1: Ref<boolean> = ref<boolean>(false);
  const tplName: Ref<string> = ref<string>('');
  const savePageData: Ref<any> = ref<any>({});
  let tplList: any = reactive([]);
  // 触发保存
  const saveTpl = () => {
    if (instance.ctx.$refs) {
      instance.ctx.$refs[activeTab.value].saveTpl();
    } else if (instance.ctx._.refs) {
      instance.ctx._.refs[activeTab.value].saveTpl();
    }
  };
  // 新建
  const newTpl = (checkSave: number) => {
    if (instance.ctx.$refs) {
      instance.ctx.$refs[activeTab.value].newTpl(checkSave);
    } else if (instance.ctx._.refs) {
      instance.ctx._.refs[activeTab.value].newTpl(checkSave);
    }
  };
  // 保存确认
  const doSave = (val: any) => {
    if (!val.pageData.name) {
      visible.value = true;
      tplName.value = val.pageData.name;
      savePageData.value = {
        ...val.pageData
      };
    } else {
      tplName.value = val.pageData.name;
      savePageData.value = {
        ...val.pageData
      };
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
      const ls = localStorage.getItem(activeTab.value === 'ReportContainer' ? 'tplsList' : 'tablesList');
      let list: any = ls === null ? reactive({}) : reactive(JSON.parse(ls));
      let id = savePageData.value.id || (new Date()).getTime() + '';
      if (activeTab.value === 'ReportContainer') {
        for (let i = savePageData.value.lines.length - 1; i >= 0; i--) {
          if (savePageData.value.lines[i].length === 0) {
            savePageData.value.lines.splice(i, 1);
          } else {
            for(let j = 0; j < savePageData.value.lines[i].length; j++) {
              savePageData.value.lines[i][j].value = savePageData.value.lines[i][j].value;
            }
          }
        }
      }
      console.log(JSON.stringify(savePageData.value));
      if (activeTab.value === 'TableContainer') {
        list[id] = {
          list: savePageData.value,
          id: id,
          name: tplName.value
        };
      } else {
        list[id] = {
          ...savePageData.value,
          id: id,
          name: tplName.value
        };
      }
      localStorage.setItem(activeTab.value === 'ReportContainer' ? 'tplsList' : 'tablesList', JSON.stringify(list));

      message.success('保存成功');
      if (activeTab.value !== 'TableContainer') {
        newTpl(0);
      }
    }
  };
  // 选择模版
  const chooseTpl = () => {
    visible1.value = true;
    const ls = localStorage.getItem(activeTab.value === 'ReportContainer' ? 'tplsList' : 'tablesList');
    const list: any = ls === null ? {} : JSON.parse(ls);
    tplList.length = 0;
    for (let key in list) {
      tplList.push(list[key]);
    }
  };
  // 编辑模版
  const editTpl = (item: any) => {
    visible1.value = false;
    if (instance.ctx.$refs) {
      instance.ctx.$refs[activeTab.value].editTpl(item);
    } else if (instance.ctx._.refs) {
      instance.ctx._.refs[activeTab.value].editTpl(item);
    }
  };
  // 删除模版
  const deleteTpl = (item: any) => {
    const ls = localStorage.getItem(activeTab.value === 'ReportContainer' ? 'tplsList' : 'tablesList');
    let list: any = ls === null ? reactive({}) : reactive(JSON.parse(ls));
    delete list[item.id];
    localStorage.setItem(activeTab.value === 'ReportContainer' ? 'tplsList' : 'tablesList', JSON.stringify(list));

    message.success('删除成功');
    tplList.length = 0;
    for (let key in list) {
      tplList.push(list[key]);
    }
  };
  return {
    saveTpl, newTpl, doSave, handleOk, chooseTpl,
    visible, visible1, tplName, tplList,
    editTpl, deleteTpl
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
    const chooseTableOpen: Ref<boolean> = ref<boolean>(false);
    let tableList: any = reactive([]);
    let tableTpl: Ref<object> = ref<object>({});
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
      visible, tplName, visible1, tplList,
      editTpl, deleteTpl
    } = handelTpl(instance, activeTab);

    provide('activeTab', activeTab);
    provide('domainList', domainList);
    provide('chooseTableOpen', chooseTableOpen);
    provide('tableTpl', tableTpl);

    const ls = localStorage.getItem('tablesList');
    const list: any = ls === null ? {} : JSON.parse(ls);
    tableList.length = 0;
    for (let key in list) {
      tableList.push(list[key]);
    }

    // 应用表格模版
    const applyTpl = (item: any) => {
      tableTpl.value = item;
      chooseTableOpen.value = false;
    };

    return {
      activeTab,
      saveTpl, newTpl, doSave, chooseTpl, handleOk,
      visible, visible1,
      tplName, tplList,
      editTpl, deleteTpl,
      chooseTableOpen, tableList,
      applyTpl
    };
  }
});
</script>