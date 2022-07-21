<template>
  <div class="page-attr">
    <div class="page-attr-header">
      <div class="container-item padding10 paddingT20">
        <div class="title marginB5 fontW500">模板设置</div>
        <div class="desc fontW400">设置模板名称和纸张大小</div>
      </div>
    </div>
    <div class="container-item padding10 paddingT20">
      <div class="title marginB5 fontW500">模板名称</div>
      <a-input
        v-model:value="name"
        @change="handlePageChange('name', name)"
        allowClear
        placeholder="模板名称"
      />
    </div>
    <div class="container-item padding10">
      <div class="title marginB5 fontW500">纸张</div>
      <a-select
        v-model:value="pageType"
        width="100%"
        @change="handlePageChange('pageType', pageType)"
      >
        <a-select-option
          v-for="item in tplTypeList"
          :key="item.value"
          :value="item.value"
        >
          {{item.label}}
        </a-select-option>
      </a-select>
    </div>
    <div class="container-item padding10" v-if="pageType==='custom'">
      宽：
      <a-input-number
        v-model:value="width"
        :keyboard="true"
        :min="10"
        @change="handlePageSize('width', width)"
      />mm
    </div>
    <div class="container-item padding10" v-if="pageType==='custom'">
      高：
      <a-input-number
        v-model:value="minHeight"
        :keyboard="true"
        :min="10"
        @change="handlePageSize('minHeight', minHeight)"
      />mm
    </div>
    <div class="container-item padding10">
      边距：
      <a-input-number
        v-model:value="padding"
        :keyboard="true"
        :min="0"
        :max="Math.min(parseFloat(width), parseFloat(minHeight)) / 2"
        @change="handlePageSize('padding', padding)"
      />mm
    </div>
    <div class="container-item padding10">
      <div class="title marginB5 fontW500">分页</div>
       <a-radio-group v-model:value="pageNumType" name="pageNumType" @change="handlePageChange('pageNumType', pageNumType)">
        <a-radio :value="0">不展示</a-radio>
        <a-radio :value="1">第 x 页</a-radio>
        <a-radio :value="2">第 x/n 页</a-radio>
      </a-radio-group>
    </div>
    <div class="container-item padding10" v-if="+pageNumType > 0">
      <div class="title marginB5 fontW500">页码位置</div>
       <a-radio-group v-model:value="pageNumPosi" name="pageNumPosi" @change="handlePageChange('pageNumPosi', pageNumPosi)">
        <a-radio :value="0">右上角</a-radio>
        <a-radio :value="1">左上角</a-radio>
        <a-radio :value="2">顶部中间位置</a-radio>
        <a-radio :value="3">左下角</a-radio>
        <a-radio :value="4">右下角</a-radio>
        <a-radio :value="5">底部中间位置</a-radio>
      </a-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs, ref, Ref, watch } from 'vue';
import { tplTypeList } from '@/utils/config';

// 处理pageData
const pageDataEffet = () => {
  const pageData: any = inject('pageData');
  const { name, pageType, pageNumType, styleSheet, pageNumPosi } = toRefs(pageData);
  const width: Ref<string> = ref<string>(styleSheet.value.width);
  const minHeight: Ref<string> = ref<string>(styleSheet.value.minHeight);
  const padding: Ref<string> = ref<string>(styleSheet.value.padding);
  const changePageConfig: any = inject('changePageConfig');
  const changePageSize: any = inject('changePageSize');

  // 页面设置
  const handlePageChange = (key: string, value: string) => {
    changePageConfig({ key, value });
  };
  const handlePageSize = (key: string, value: number) => {
    if (key === 'width' && !value) {
      width.value = '10';
      value = 10;
    } else if (key === 'minHeight' && !value) {
      minHeight.value = '10';
      value = 10;
    } else if (key === 'padding' && !value) {
      padding.value = '5';
      value = 5;
    }
    console.log('key-value', key, value);
    changePageSize({ key, value });
  };

  watch(pageType, (val, oldVal) => {
    if (val !== oldVal) {
      width.value = styleSheet.value.width;
      minHeight.value = styleSheet.value.minHeight;
    }
    padding.value = styleSheet.value.padding;
  });
  return { name, pageType, width, minHeight, pageNumType, pageNumPosi, handlePageChange, handlePageSize, padding };
};

export default defineComponent({
  setup() {
    const {
      name,
      pageType,
      width,
      minHeight,
      pageNumType,
      pageNumPosi,
      handlePageChange,
      handlePageSize,
      padding
    } = pageDataEffet();

    return {
      name,
      pageType,
      width,
      minHeight,
      pageNumPosi,
      pageNumType,
      tplTypeList,
      handlePageChange,
      handlePageSize,
      padding
    };
  }
});
</script>
<style lang="scss" scoped>
.page-attr {
  .desc {
    color: var(--color-text-secondary);
  }
  .page-attr-header {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--border-color-base);
    }
  }
  .ant-select {
    width: 100%;
  }
}
</style>
