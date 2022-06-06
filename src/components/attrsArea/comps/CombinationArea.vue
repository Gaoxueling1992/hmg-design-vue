<template>
  <div class="title marginT10 marginB5 fontW500">布局方式</div>
  <a-radio-group
    name="layout"
    v-model:value="activeCompObj.layout"
  >
    <a-radio value="top">吸顶</a-radio>
    <a-radio value="middle">分散</a-radio>
  </a-radio-group>
  <div class="title marginT10 marginB5 fontW500">对齐方式</div>
  <a-radio-group
    name="align"
    v-model:value="activeCompObj.align"
  >
    <a-radio value="left">左对齐</a-radio>
    <a-radio value="center">居中对齐</a-radio>
    <a-radio value="right">右对齐</a-radio>
  </a-radio-group>
  <div class="title marginT10 marginB5 fontW500">内部组件配置</div>
  <a-collapse v-model="activeTab">
    <a-collapse-panel
      v-for="(comp, index) in activeCompObj.compsList"
      :key="comp.id"
      :header="'组件' + (index + 1) + '-' + comp.name"
    >
      <div class="container-item">
        <div class="title marginB5">文本内容</div>
        <a-textarea
          v-model:value="comp.label"
          allowClear
          :auto-size="{ minRows: 2, maxRows: 2 }"
        />
      </div>
      <a-radio-group
        v-if="comp.elName === 'RadInput'"
        class="marginT10 marginB5"
        v-model:value="comp.type"
        name="radioGroup"
      >
        <a-radio value="text">单行</a-radio>
        <a-radio value="textarea">多行</a-radio>
      </a-radio-group>
      <div class="title marginT10 marginB5 fontW500">引导文字</div>
      <a-textarea
        v-model:value="comp.placeholder"
        allowClear
        :auto-size="{ minRows: 2, maxRows: 2 }"
      />
      <div
        class="flex marginT10"
        v-if="comp.elName !== 'RadText'"
      >
        <a-input-group
          compact
          class="marginT5"
        >
          <div class="flex-title">前缀</div>
          <a-input
            class="flex1 marginR5"
            allowClear
            v-model:value="comp.prefix"
          />
        </a-input-group>
        <a-input-group
          compact
          class="marginT5"
        >
          <div class="flex-title">后缀</div>
          <a-input
            class="flex1"
            allowClear
            v-model:value="comp.suffix"
          />
        </a-input-group>
      </div>
      <div
        class="flex marginT10"
        v-if="comp.elName === 'RadNumber'"
      >
        <div class="flex-title marginT10 marginB5">范围</div>
        <a-input-number
          class="flex1 marginR5"
          allowClear
          v-model:value="comp.min"
          :min="0"
          :max="comp.max"
          @change="comp.min = !comp.min ? 0 : comp.min"
        />
        <a-input-number
          class="flex1"
          allowClear
          v-model:value="comp.max"
          :min="comp.min"
          @change="comp.max = !comp.max ? comp.min : comp.max"
        />
      </div>
      <template v-if="comp.elName === 'RadDatetime'">
        <div class="title marginT10 marginB5 fontW500">选择器类型</div>
        <div class="flex">
          <a-select
            class="flex-picker"
            v-model:value="comp.picker"
            :options="pickerList"
            @change="comp.format = pickerMap[comp.picker][0].value"
          />
          <a-select
            class="flex1 flex-format"
            v-model:value="comp.format"
            :options="pickerMap[comp.picker]"
          />
        </div>
      </template>
      <div class="title marginT10 marginB5 fontW500">域值</div>
      <div class="attr-group">
        <a-select
          ref="select"
          v-model:value="comp.domainType"
          @change="comp.threshold = ''"
        >
          <a-select-option value="domain">数据库域值</a-select-option>
          <a-select-option value="TEMP_">临时显示</a-select-option>
          <a-select-option value="PROP_">存储数据</a-select-option>
          <a-select-option value="nosubmit">仅绑定</a-select-option>
        </a-select>
      </div>
      <div class="attr-group">
        <a-select
          v-if="comp.domainType === 'domain'"
          v-model:value="comp.threshold"
          :options="domainList"
          allowClear
          style="width: 100%"
        ></a-select>
        <a-input
          style="width: 100%"
          v-else
          v-model:value="comp.threshold"
          allowClear
        />
      </div>
      <div
        class="title marginT10 fontW500"
        v-if="comp.baseProps"
      >属性</div>
      <template
        v-for="(value, key) in comp.baseProps"
        :key="key"
      >
        <div
          class="attr-group paddingT10"
          v-if="sheet2Form[key] && sheet2Form[key].label"
        >
          <a-checkbox v-model:checked="comp.baseProps[key]">{{ sheet2Form[key].label }}</a-checkbox>
        </div>
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts">
import { defineComponent, inject, reactive } from 'vue';
import { sheet2Form, ruleList } from '@/utils/config';
import { pickerList, pickerMap } from '@/utils/config';
import {
  Input,
  InputNumber,
  RadioGroup,
  Select,
  Checkbox
} from 'ant-design-vue';

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
    const activeTab: any = reactive([]);
    const domainList: any = inject('domainList');

    return {
      activeCompObj,
      activeTab,
      domainList,
      sheet2Form,
      ruleList,
      pickerList,
      pickerMap
    };
  }
});
</script>
<style lang="scss">
.ant-collapse,
.ant-collapse-content {
  background-color: transparent !important;
}
</style>