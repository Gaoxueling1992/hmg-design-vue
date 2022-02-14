<template>
  <div
    v-if="tableTpl.id"
    class="rad-table"
  >
    <table border="1">
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
          >
            <span v-if="item && item.m">{{ item.m }}</span>
            <span v-else>
              <a-input
                class="table-cell"
                :id="'cell' + index + '_' + idx"
                @keyup.up="up(index, idx)"
                @keyup.down="down(index, idx)"
                @keyup.left="left(index, idx)"
                @keyup.right="right(index, idx)"
              />
            </span>
          </td>
        </template>
      </tr>
    </table>
    <div class="op">
      当前模版：{{tableTpl.name}}
      <a-button
        class="fr"
        type="primary"
        @click="chooseTable"
      >
        重新选择
      </a-button>
    </div>
  </div>
  <div
    v-else
    class="picker-flex-text"
    @click="chooseTable"
  >选择表格</div>
</template>
<script lang="ts">
import { defineComponent, inject, computed } from 'vue';

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
    console.log(list2);
  };
  const up = (r, i) => {
    rlList2();
    let idx = list2.indexOf('cell' + r + '_' + i);
    if (idx - 1 < 0) {
      idx = list2.length;
    }
    document.getElementById(list2[idx - 1]).focus();
  };
  const down = (r, i) => {
    rlList2();
    let idx = list2.indexOf('cell' + r + '_' + i);
    if (idx + 1 >= list2.length) {
      idx = -1;
    }
    document.getElementById(list2[idx + 1]).focus();
  };
  const left = (r, i) => {
    rlList();
    let idx = list.indexOf('cell' + r + '_' + i);
    if (idx - 1 < 0) {
      idx = list.length;
    }
    document.getElementById(list[idx - 1]).focus();
  };
  const right = (r, i) => {
    rlList();
    let idx = list.indexOf('cell' + r + '_' + i);
    if (idx + 1 >= list.length) {
      idx = -1;
    }
    document.getElementById(list[idx + 1]).focus();
  };
  return {
    up,
    down,
    left,
    right
  };
};

export default defineComponent({
  props: ['ele'],
  setup() {
    const chooseTableOpen: any = inject('chooseTableOpen');
    const tableTpl: any = inject('tableTpl');
    const chooseTable = () => {
      chooseTableOpen.value = true;
    };

    const tbList = computed(() => {
      let list = [];
      if (tableTpl.value.list) {
        list = JSON.parse(JSON.stringify(tableTpl.value.list));
      }
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
            row.splice(i + 1, row[i].mc.cs - 1);
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

    const { up, down, left, right } = dealWithKeyup();

    return {
      chooseTable,
      tableTpl,
      tbList,
      up, down, left, right
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
      display: flex;
    }
    td {
      padding: 2px;
      flex: 1;
    }
  }
}
</style>
