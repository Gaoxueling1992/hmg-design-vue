<!--
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2021-12-29 16:28:36
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-07-20 17:02:20
 * @FilePath: /hmg-design-vue/src/components/TableContainer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>提示：保存前请先选中需要保存的表格区域</div>
  <div id="luckysheet" @workbookCreateAfter="workbookCreateAfter"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import config from '@/utils/tableConfig';
import { message } from 'ant-design-vue';

export default defineComponent({
  props: ['ele'],
  setup(props, { emit }) {
    let info = null;
    const saveTpl = () => {
      let cells = luckysheet.getRangeValue();
      if (cells.length === 1 && cells[0][0] === null) {
        message.error('请选择需要保存的表格区域');
        return;
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
    const workbookCreateAfter = () => {
      console.log(11112222)
    }
    return { saveTpl, editTpl, workbookCreateAfter };
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