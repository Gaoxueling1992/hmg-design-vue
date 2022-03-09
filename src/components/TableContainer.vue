<template>
  <div id="luckysheet"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import config from '@/utils/tableConfig';

export default defineComponent({
  props: ['ele'],
  setup(props, { emit }) {
    const saveTpl = () => {
      emit('saveTpl', { pageData: luckysheet.getRangeValue(), type: 1 });
      window.parent.postMessage({ type: 'doSaveDesigner', pageData: JSON.stringify(luckysheet.getRangeValue()) }, '*');
    };
    const editTpl = (item: any) => {
      console.log(item);
    };

    window.addEventListener('message', (e) => {
      switch(e.data.type) {
        case 'saveTableDesinger':
          saveTpl();
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
  height: 100vh;
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