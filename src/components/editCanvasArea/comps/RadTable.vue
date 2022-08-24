<template>
  <div
    v-if="tableTpl && tableTpl.id"
    class="rad-table"
    style="padding: 0 2px"
  >
    <table
      border="1"
      style="width: 100%;border-collapse: collapse !important;margin-top:5px;margin-bottom:5px;"
      @contextmenu.prevent.stop="chooseTable"
      class="inner-split"
    >
      <tr
        v-for="(line, index) in tbList"
        :key="index"
      >
        <template
          v-for="(item, idx) in line"
          :key="idx"
        >
          <td
            :style="item ? {
              ...item.style,
              width: (item && item.mc && item.mc.cs || 1)/tds * 100 + '%'
             } : {}"
            style="padding: 2px;"
            :colspan="item && item.mc && item.mc.cs || 1"
            :rowspan="item && item.mc && item.mc.rs || 1"
            :width="(item && item.mc && item.mc.cs || 1)/tds * 100 + '%'"
            :height="(item && item.mc && item.mc.rs || 1) * 30 + 'px'"
          >
            <span v-if="item && item.m">{{ item.m }}</span>
            <span v-else-if="item && item.ct && item.ct.s && item.ct.s.length">
              <span v-for="(vv, ix) in item.ct.s" :key="ix"
                :style="{
                  fontFamily: transFamily(vv.ff),
                  color: vv.fc,
                  fontWeight: !vv.bl || vv.bl === 0 ? 'normal' : 'bold',
                  fontStyle: ele.styleSheet.fontStyle === 'normal' && !vv.it || vv.it === 0 ? 'normal' : 'italic',
                  fontSize: vv.fs + 'px',
                  textDecoration:
                    !vv.cl || vv.cl === 0 ? '' : 'line-through',
                }">
                {{vv.v}}
              </span>
            </span>
            <span v-else>
              <a-input
                v-if="!isReadonlyStatus && !ele.baseProps.readonly"
                class="table-cell"
                :id="'cell' + String(index) + '_' + String(idx)"
                @keyup.up="toup(index, idx)"
                @keyup.down="todown(index, idx)"
                @keyup.left="toleft(index, idx)"
                @keyup.right="toright(index, idx)"
                v-model:value="inputs[index + '' + idx]"
              />
              <span
                v-else
                style="line-height: 24px;line-height: 30px !important;padding-top: 1px;padding-bottom: 1px;"
                class="table-display-text"
              >{{inputs[index + '' + idx]}}&nbsp;</span>
            </span>
          </td>
        </template>
      </tr>
    </table>
  </div>
  <div
    v-else-if="!isReadonlyStatus && !ele.baseProps.readonly"
    class="picker-flex-text"
    @click="chooseTable"
  >选择表格</div>
  <a-modal
    v-model:visible="chooseTableInner"
    :footer="null"
    title="选择模版"
  >
    <a-list
      size="small"
      bordered
      :data-source="tableList"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.title }}
          <template #actions>
            <a @click="applyTpl(item)">应用</a>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, inject, computed, Ref, ref } from 'vue';

// 字体转换方法
const transFamily = (ff) => {
  // ["Times New Roman","微软雅黑","宋体","黑体","楷体","仿宋","新宋体"]
  switch (ff) {
    case 0:
    case 'Times New Roman':
      return 'Times New Roman';
    case 4:
    case '微软雅黑':
      return 'Microsoft YaHei';
    case 5:
    case '宋体':
      return 'SimSun';
    case 6:
    case '黑体':
      return 'SimHei';
    case 7:
    case '楷体':
      return 'KaiTi';
    case 8:
    case '仿宋':
      return 'FangSong';
    case 9:
    case '新宋体':
      return 'NSimSun';
  }
};

// 按键处理方法
const dealWithKeyup = () => {
  let list = [];
  let list2 = [];
  const rlList = () => {
    list = [];
    const inps = document.getElementsByClassName('table-cell');
    for (let i = 0; i < inps.length; i++) {
      const id = inps[i].id;
      list.push(id);
    }
  };
  const rlList2 = () => {
    list2 = [];
    const inps = document.getElementsByClassName('table-cell');
    for (let i = 0; i < inps.length; i++) {
      const id = inps[i].id;
      list2.push(id);
    }
    list2.sort((a, b) => {
      return a.split('_')[1] - b.split('_')[1];
    });
  };
  const toup = (r, i) => {
    rlList2();
    let idx = list2.indexOf('cell' + r + '_' + i);
    if (idx - 1 < 0) {
      idx = list2.length;
    }
    document.getElementById(list2[idx - 1]).focus();
  };
  const todown = (r, i) => {
    rlList2();
    let idx = list2.indexOf('cell' + r + '_' + i);
    if (idx + 1 >= list2.length) {
      idx = -1;
    }
    document.getElementById(list2[idx + 1]).focus();
  };
  const toleft = (r, i) => {
    rlList();
    let idx = list.indexOf('cell' + r + '_' + i);
    if (idx - 1 < 0) {
      idx = list.length;
    }
    document.getElementById(list[idx - 1]).focus();
  };
  const toright = (r, i) => {
    rlList();
    let idx = list.indexOf('cell' + r + '_' + i);
    if (idx + 1 >= list.length) {
      idx = -1;
    }
    document.getElementById(list[idx + 1]).focus();
  };
  return {
    toup,
    todown,
    toleft,
    toright
  };
};

export default defineComponent({
  props: ['ele', 'toolbarId', 'lineId'],
  setup(props) {
    const tableTpl: any = ref(props.ele.value);
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    const inputs: Ref<object> = ref(props.ele.inputs);
    const tds: Ref<number> = ref<number>(0);
    const chooseTableInner: Ref<boolean> = ref<boolean>(false);
    const chooseTableOpen: any = 'null';
    const pageId: any = inject('pageId');
    let tableList: any = inject('tableList');

    window.addEventListener('message', (e) => {
      if (e.data.type === 'tableDetail') {
        let data = JSON.parse(e.data.data);
        if (data.eleId === props.ele.id) {
          tableTpl.value = data;
          props.ele.value = data;
        }
      }
    });

    const chooseTable = () => {
      if (isReadonlyStatus.value || props.ele.baseProps.readonly) {
        return;
      }
      if (
        chooseTableOpen &&
        (chooseTableOpen.value === true || chooseTableOpen.value === false)
      ) {
        chooseTableOpen.value = true;
      } else {
        chooseTableInner.value = true;
      }
    };

    const applyTpl = (item) => {
      window.parent.postMessage({ type: 'fetchTableDetail', id: item.id, eleId: props.ele.id, pageId: pageId.value }, '*');
      chooseTableInner.value = false;
    };

    const tbList = computed(() => {
      let list = [];
      if (tableTpl.value.list) {
        list = JSON.parse(JSON.stringify(tableTpl.value.list));
      } else {
        list = JSON.parse(tableTpl.value.content);
      }
      tds.value = list['0'].length;
      for (let key = list.length -1; key >= 0; key--) {
        const row = list[key];
        for (let i = row.length - 1; i >= 0; i--) {
          // 处理合并单元格逻辑
          if (
            row[i] &&
            row[i].mc &&
            row[i].mc.cs &&
            row[i].mc.rs &&
            row[i].mc.cs > 1 &&
            row[i].mc.rs > 1
          ) {
            row.splice(+i + 1, row[i].mc.cs - 1);
            for (let index = row[i].mc.rs - 1; index > 0; index--) {
              console.log(+key + index, i,  row[i].mc.cs)
              list[+key + index].splice(i, row[i].mc.cs);
            }
          } else if (row[i] && row[i].mc && row[i].mc.cs && row[i].mc.cs > 1) {
            row.splice(+i + 1, row[i].mc.cs - 1);
          } else if (row[i] && row[i].mc && row[i].mc.rs && row[i].mc.rs > 1) {
            for (let index = row[i].mc.rs - 1; index > 0; index--) {
              if (list[index]) {
                list[+key + index].splice(i, 1);
              }
            }
          }
          if (row && row[i]) {
            row[i].style = {
              backgroundColor: row[i].bg,
              fontFamily: transFamily(row[i].ff),
              color: row[i].fc,
              fontWeight: !row[i].bl || row[i].bl === 0 ? 'normal' : 'bold',
              fontStyle: !row[i].it || row[i].it === 0 ? 'normal' : 'italic',
              fontSize: row[i].fs + 'px',
              textDecoration:
                !row[i].cl || row[i].cl === 0 ? '' : 'line-through',
              textAlign:
                !row[i].ht || +row[i].ht === 1
                  ? 'left'
                  : +row[i].ht === 0
                  ? 'center'
                  : 'right',
              verticalAlign:
                !row[i].vt || +row[i].vt === 2
                  ? 'bottom'
                  : +row[i].vt === 1
                  ? 'top'
                  : 'middle',
              transform: `rotate(${row[i].rt}deg)`,
              writingMode: !row[i].rt || row[i].rt !== 3 ? '' : 'tb-rl',
              whiteSpace: !row[i].tb || +row[i].tb === 1 ? 'nowrap' : '',
              wordBreak: 'break-all',
              overflow: 'hidden'
            };
          }
        }
      }
      console.log('result', list);
      return list;
    });

    const { toup, todown, toleft, toright } = dealWithKeyup();

    return {
      chooseTable,
      tableTpl,
      tbList,
      toup,
      todown,
      toleft,
      toright,
      isReadonlyStatus,
      inputs,
      tds,
      chooseTableInner,
      tableList,
      applyTpl,
      transFamily
    };
  }
});
</script>
<style lang="scss">
.rad-table {
  .picker-flex-text {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: initial;
    color: val(--color-text-regular) !important;
    font-style: normal;
  }
  .op {
    overflow: hidden;
    margin-top: 3px;
    height: 32px;
    line-height: 32px;
  }
  table {
    width: 100%;
    tr {
      // display: flex;
    }
    td {
      padding: 2px;
      // flex: 1;
    }
  }
  .ant-input {
    padding: 0;
  }
  .table-display-text {
    line-height: 24px;
  }
}
</style>
