<template>
  <div class="comp-attr">
    <div class="comp-attr-header">
      <div class="container-item padding10 paddingT20">
        <div class="title marginB5 fontW500">{{activeCompObj.name}}</div>
        <div class="desc fontW400">{{activeCompObj.desc}}</div>
        <div class="desc fontW400">颜色支持配置为英文、十六进制、RGB和RGBA</div>
      </div>
    </div>
    <div class="padding10 attr-body">
      <div class="container-item">
        <div class="title marginB5 fontW500">文本内容</div>
        <a-textarea
          v-model:value="activeCompObj.label"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </div>
      <div class="attr-group paddingT10" v-if="activeCompObj.domainType">
        <a-select ref="select" v-model:value="activeCompObj.domainType" @change="handleChange">
          <a-select-option value="domain">数据库域值</a-select-option>
          <a-select-option value="temp">临时显示</a-select-option>
          <a-select-option value="prop">存储数据</a-select-option>
        </a-select>
        <a-select
          v-if="activeCompObj.domainType === 'domain'"
          v-model:value="domain"
          :options="domainList"
          style="width: 160px"
        ></a-select>
        <a-input style="width: 160px" v-else v-model:value="domain" allowClear/>
      </div>
      <template v-if="activeCompObj.validate">
        <div class="title marginT10 fontW500">验证</div>
        <div
        v-for="(value, key) in activeCompObj.validate"
        :key="key"
        class="attr-group paddingT10"
        >
          <a-checkbox v-model:checked="activeCompObj.baseProps[key]">{{ sheet2Form[key].label }}</a-checkbox>
        </div>
      </template>
      <template v-if="activeCompObj.baseProps">
        <div class="title marginT10 fontW500">属性</div>
        <div
        v-for="(value, key) in activeCompObj.baseProps"
        :key="key"
        class="attr-group paddingT10"
        >
          <a-checkbox v-model:checked="activeCompObj.baseProps[key]">{{ sheet2Form[key].label }}</a-checkbox>
        </div>
      </template>
      <div class="title marginT10 fontW500">基础样式</div>
      <div
        v-for="(value, key) in activeCompObj.styleSheet"
        :key="key"
        class="attr-group paddingT10"
      >
        <div class="label">{{ sheet2Form[key].label }}</div>
        <component
          class="flex1"
          :is="sheet2Form[key].type"
          v-model:value="activeCompObj.styleSheet[key]"
          :options="sheet2Form[key].options"
        ></component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref, Ref } from 'vue';
import { sheet2Form } from '@/utils/config';
import { Input, InputNumber, RadioGroup, Select, Checkbox } from 'ant-design-vue';

// 处理域值切换逻辑
const handleDomainChange = (domain: Ref<string>) => {
  const handleChange = () => {
    domain.value = '';
  }
  return { handleChange }
}

export default defineComponent({
  components: {
    'a-input': Input,
    'a-input-number': InputNumber,
    'a-select': Select,
    'a-radio-group': RadioGroup,
    'a-checkbox': Checkbox
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    const domain: Ref<string> = ref<string>(activeCompObj.domain);
    const domainList: any = inject('domainList');

    const { handleChange } = handleDomainChange(domain);
    return {
      activeCompObj,
      sheet2Form,
      domainList,
      handleChange,
      domain
    };
  }
});
</script>
<style lang="scss" scoped>
.comp-attr {
  overflow: auto;
  margin-bottom: 50px;
  .attr-body {
    margin-bottom: 50px;
  }
  .desc {
    color: var(--color-text-secondary);
  }
  .comp-attr-header {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--border-color-base);
    }
  }
  .attr-group {
    display: flex;
    align-items: center;
    .label {
      padding-right: 10px;
      width: 66px;
      text-align: justify;
      text-align-last: justify;
    }
    .flex1 {
      flex: 1;
    }
  }
}
</style>
