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
    };
    const editTpl = (item: any) => {
      console.log(item);
    };
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
  height: calc(100% - 50px);
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