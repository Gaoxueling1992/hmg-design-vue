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
      :header="'组件' + index + '-' + comp.name"
    >
      <div class="container-item">
        <div class="title marginB5">文本内容</div>
        <a-textarea
          v-model:value="comp.label"
          allowClear
          :auto-size="{ minRows: 2, maxRows: 2 }"
        />
      </div>
      <template v-if="comp.elName === 'rad-input' || comp.elName === 'rad-number'">
        <a-radio-group v-if="comp.elName === 'rad-input'" class="marginT10 marginB5" v-model:value="comp.type" name="radioGroup">
          <a-radio value="text">单行</a-radio>
          <a-radio value="textarea">多行</a-radio>
        </a-radio-group>
        <div class="title marginT10 marginB5 fontW500">引导文字</div>
        <a-textarea v-model:value="activeCompObj.placeholder" allowClear :auto-size="{ minRows: 2, maxRows: 2 }"/>
        <div class="flex marginT10" v-if="comp.type === 'text' || comp.elName === 'rad-number'">
          <div class="flex-title">前缀</div>
          <a-input class="flex1 marginR5" allowClear v-model:value="comp.prefix"/>
          <div class="flex-title">后缀</div>
          <a-input class="flex1" allowClear v-model:value="comp.suffix"/>
        </div>
        <div class="flex marginT10" v-if="comp.elName === 'rad-number'">
          <div class="flex-title marginT10 marginB5">范围</div>
          <a-input-number
            class="flex1 marginR5"
            allowClear
            v-model:value="comp.min"
            :min="0"
            :max="comp.max"
          />
          <a-input-number
            class="flex1"
            allowClear
            v-model:value="comp.max"
            :min="comp.min"
          />
        </div>
      </template>
      <template v-if="comp.elName === 'rad-datetime'">
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
          <a-select-option value="temp">临时显示</a-select-option>
          <a-select-option value="prop">存储数据</a-select-option>
        </a-select>
        <a-select
          v-if="comp.domainType === 'domain'"
          v-model:value="comp.threshold"
          :options="domainList"
          allowClear
          style="width: 160px"
        ></a-select>
        <a-input
          style="width: 160px"
          v-else
          v-model:value="comp.threshold"
          allowClear
        />
      </div>
      <div class="title marginT10 fontW500" v-if="comp.validate">验证</div>
      <template
        v-for="(value, key) in comp.validate"
        :key="key"
      >
        <div
          v-if="sheet2Form[key] && sheet2Form[key].label"
          class="attr-group paddingT10"
        >
          <a-checkbox v-model:checked="comp.validate[key]">
            {{ sheet2Form[key].label }}
          </a-checkbox>
        </div>
        <template v-if="key === 'limitLength' && comp.validate[key]">
          <a-input-number
            class="limit-input marginR10 marginT5"
            v-model:value="comp.validate.minLength"
            :min="0"
            :max="comp.validate.maxLength"
          />-
          <a-input-number
            class="limit-input marginL10"
            v-model:value="comp.validate.maxLength"
            :min="comp.validate.minLength"
          />
        </template>
        <div
          class="flex"
          v-if="key === 'limitRule' && comp.validate[key]"
        >
          <a-select
            v-model:value="comp.validate.rule"
            :options="ruleList"
            class="marginT5"
            style="width: 100px"
          ></a-select>
          <a-input
            v-if="comp.validate.rule === 'custom'"
            class="flex1"
            allowClear
            v-model:value="comp.validate.customRule"
          />
        </div>
      </template>
      <div class="title marginT10 fontW500" v-if="comp.baseProps">属性</div>
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

export default defineComponent({
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    const activeTab: any = reactive([]);
    const domainList: any = inject('domainList');
    
    return {
      activeCompObj,
      activeTab,
      domainList,
      sheet2Form, ruleList,
      pickerList, pickerMap
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