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
      宽：<a-input-number
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
      <div class="title marginB5 fontW500">分页</div>
       <a-radio-group v-model:value="pageNumType" name="pageNumType" @change="handlePageChange('pageNumType', pageNumType)">
        <a-radio :value="0">不展示</a-radio>
        <a-radio :value="1">第 x 页</a-radio>
        <a-radio :value="2">第 x/n 页</a-radio>
      </a-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, toRefs } from 'vue';
import { tplTypeList } from '@/utils/config';

// 处理pageData
const pageDataEffet = () => {
  const pageData: any = inject('pageData');
  const { name, pageType, width, minHeight, pageNumType } = toRefs(pageData);
  const changePageConfig: any = inject('changePageConfig');
  const changePageSize: any = inject('changePageSize');

  // 页面设置
  const handlePageChange = (key: string, value: string) => {
    changePageConfig({ key, value });
  };
  const handlePageSize = (key: string, value: number) => {
    changePageSize({ key, value });
  };
  return { name, pageType, width, minHeight, pageNumType, handlePageChange, handlePageSize };
};

export default defineComponent({
  setup() {
    const {
      name,
      pageType,
      width,
      minHeight,
      pageNumType,
      handlePageChange,
      handlePageSize
    } = pageDataEffet();

    return {
      name,
      pageType,
      width,
      minHeight,
      pageNumType,
      tplTypeList,
      handlePageChange,
      handlePageSize
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
