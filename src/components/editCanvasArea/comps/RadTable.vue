<template>
  <div
    v-if="tableTpl && tableTpl.id"
    class="rad-table"
  >
    <table border="1" @contextmenu.prevent.stop="chooseTable">
      <tr
        v-for="(line, index) in tbList"
        :key="index"
      >
        <template
          v-for="(item, idx) in line"
          :key="idx"
        >
          <td
            :style="item ? item.style : {}"
            :colspan="item && item.mc && item.mc.cs || 1"
            :rowspan="item && item.mc && item.mc.rs || 1"
            :width="(item && item.mc && item.mc.cs || 1)/tds * 100 + '%'"
            :height="(item && item.mc && item.mc.rs || 1) * 30 + 'px'"
          >
            <span v-if="item && item.m">{{ item.m }}</span>
            <span v-else>
              <a-input
                v-if="!isReadonlyStatus"
                class="table-cell"
                :id="'cell' + String(index) + '_' + String(idx)"
                @keyup.up="toup(index, idx)"
                @keyup.down="todown(index, idx)"
                @keyup.left="toleft(index, idx)"
                @keyup.right="toright(index, idx)"
                v-model:value="inputs[index + '' + idx]"
              />
              <span v-else class="table-display-text">{{inputs[index + '' + idx]}}&nbsp;</span>
            </span>
          </td>
        </template>
      </tr>
    </table>
  </div>
  <div
    v-else-if="!isReadonlyStatus"
    class="picker-flex-text"
    @click="chooseTable"
  >选择表格</div>
  <a-modal
    v-model:visible="chooseTableInner"
    :footer="null"
    title="选择模版"
  >
    <a-list size="small" bordered :data-source="tableList">
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
import { defineComponent, inject, computed, Ref, ref, reactive } from 'vue';

// 字体转换方法
const transFamily = (ff) => {
  switch (ff) {
    case 0:
      return 'Times New Roman';
    case 1:
      return 'Arial';
    case 2:
      return 'Tahoma';
    case 3:
      return 'Verdana';
    case 4:
      return 'Microsoft YaHei';
    case 5:
      return 'SimSun';
    case 6:
      return 'SimHei';
    case 7:
      return 'KaiTi';
    case 8:
      return 'FangSong';
    case 9:
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
  props: ['ele'],
  setup() {
    const tableTpl: any = inject('tableTpl') || ref<object>({});
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    const inputs: Ref<object> = ref<object>({});
    const tds: Ref<number> = ref<number>(0);
    const chooseTableInner: Ref<boolean> = ref<boolean>(false);
    const chooseTableOpen: any = inject('chooseTableOpen') || 'null';
    let tableList: any = inject('tableList');

    window.addEventListener('message', (e) => {
      console.log('table', e)
      if (e.data.type === 'tableDetail') {
        tableTpl.value = JSON.parse(e.data.data);
      }
    });

    const chooseTable = () => {
      if (chooseTableOpen && (chooseTableOpen.value === true || chooseTableOpen.value === false)) {
        chooseTableOpen.value = true;
      } else {
        chooseTableInner.value = true;
      }
    };

    const applyTpl = (item) => {
      window.parent.postMessage({ type: 'fetchTableDetail', id: item.id }, '*');
      chooseTableInner.value = false;
    };

    const tbList = computed(() => {
      let list = [];
      if (tableTpl.value.list) {
        list = JSON.parse(JSON.stringify(tableTpl.value.list));
      } else {
        list = JSON.parse(tableTpl.value.content);
      }
      console.log(list)
      tds.value = list['0'].length;
      for (let key in list) {
        const row = list[key];
        for (let i in row) {
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
            for (let index = 1; index < row[i].mc.rs; index++) {
              list[+key + index + ''].splice(i, row[i].mc.cs);
            }
          } else if (row[i] && row[i].mc && row[i].mc.cs && row[i].mc.cs > 1) {
            row.splice(i + 1, row[i].mc.cs - 1);
          } else if (row[i] && row[i].mc && row[i].mc.rs && row[i].mc.rs > 1) {
            for (let index = +key + 1; index <= row[i].mc.rs; index++) {
              list[index + ''].splice(i, 1);
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
                !row[i].ht || row[i].ht === 1
                  ? 'left'
                  : row[i].ht === 0
                  ? 'center'
                  : 'right',
              verticalAlign:
                !row[i].vt || row[i].vt === 0
                  ? 'middle'
                  : row[i].ht === 1
                  ? 'top'
                  : 'bottom',
              transform: `rotate(${row[i].rt}deg)`,
              writingMode: !row[i].rt || row[i].rt !== 3 ? '' : 'tb-rl',
              whiteSpace: !row[i].tb || row[i].tb === 2 ? '' : 'nowrap',
              wordBreak: 'break-all',
              overflow: 'hidden'
            };
          }
        }
      }
      return list;
    });

    const { toup, todown, toleft, toright } = dealWithKeyup();

    return {
      chooseTable,
      tableTpl,
      tbList,
      toup, todown, toleft, toright,
      isReadonlyStatus,
      inputs,
      tds,
      chooseTableInner,
      tableList, applyTpl
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
