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
      <a-input v-model:value="tplName" @change="handlePageChange('tplName', tplName)" allowClear placeholder="模板名称" />
    </div>
    <div class="container-item padding10">
      <div class="title marginB5 fontW500">纸张</div>
      <a-select v-model:value="tplType" width="100%" @change="handlePageChange('tplType', tplType)">
        <a-select-option v-for="item in tplTypeList" :key="item.value" :value="item.value">
          {{item.label}}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, inject} from 'vue'
import { tplTypeList } from '@/utils/config';

// 处理pageData
const pageDataEffet = () => {
  const tplName = ref<string>('')
  const tplType = ref<string>('a4')
  const changePageConfig: any = inject('changePageConfig')

  // 页面设置
  const handlePageChange = (name: string, value: string) => {
    changePageConfig({ name, value })
  }
  return { tplName, tplType,  handlePageChange }
}

export default defineComponent({
  setup () {
    const { tplName, tplType,  handlePageChange } = pageDataEffet()

    return {
      tplName,
      tplType,
      tplTypeList,
      handlePageChange
    }
  },
})
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
