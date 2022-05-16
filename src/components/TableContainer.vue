<template>
  <div>提示：保存前请先选中需要保存的表格区域</div>
  <div id="luckysheet"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import config from '@/utils/tableConfig';

export default defineComponent({
  props: ['ele'],
  setup(props, { emit }) {
    let info = null;
    const saveTpl = () => {
      let cells = luckysheet.getRangeValue();
      if (cells.length === 1 && cells[0][0] === null) {
        console.log('----', luckysheet.getcellvalue())
        cells = luckysheet.getcellvalue();
      }
      emit('saveTpl', { pageData: cells, type: 1 });
      window.parent.postMessage(
        {
          type: 'doSaveDesigner',
          pageData: JSON.stringify(cells),
          info: JSON.stringify(info),
          newPage: info && info.id ? false : true,
          pageId: 'designer'
        },
        '*'
      );
    };
    const editTpl = (item: any) => {
      let itmm = JSON.parse(item);
      let reg = new RegExp(`^([^]*)(v2)([^]*)$`);
      itmm.title = itmm.title.replace(reg, '$1$3');
      info = {
        id: itmm.id,
        title: itmm.title,
        departmentId: itmm.departmentId
      };
      let content = JSON.parse(itmm.content);
      content.forEach((row, rowNum) => {
        row.forEach((cell, cellNum) => {
          luckysheet.setCellValue(rowNum, cellNum, cell);
        });
      });
    };

    window.addEventListener('message', (e) => {
      switch (e.data.type) {
        case 'saveTableDesinger':
          saveTpl();
          break;
        case 'resetTableData':
          editTpl(e.data.data);
          break;
      }
    });
    return { saveTpl, editTpl };
  },
  mounted() {
    this.$nextTick(() => {
      luckysheet.create(config);
    });
  }
});
</script>
<style lang="scss">
#luckysheet {
  width: 100%;
  height: calc(100vh - 22px);
  position: relative;
  .luckysheet_info_detail,
  .luckysheet-sheet-area {
    display: none !important;
  }
  .luckysheet-grid-window {
    background-color: transparent !important;
  }
}
</style>