<template>
  <div :style="{
      'text-align': ele.align,
      height: '100%',
      width: '100%'
    }">
    <div
      v-for="item in ele.compsList"
      :key="item.id"
      :style="{
          height: ele.layout === 'top' ? 'auto' : (100/ele.compsList.length + '%'),
          'align-items': ele.inline ? 'center' : '',
          'max-width': '100%',
          'overflow-x': 'hidden',
          'overflow-y': ele.elName === 'rad-editor' ? 'auto' : 'hidden',
          'position': 'relative',
          ...ele.styleSheet,
          fontSize: ele.styleSheet.fontSize + 'px',
          borderWidth: ele.styleSheet.borderWidth + 'px',
          display: ele.inline ? (isReadonlyStatus ? 'inline-block' : 'flex') : 'inline-block',
          padding: '2px 0'
        }"
    >
      <template v-if="item.elName === 'RadText'">
        <div
          style="min-height: 20px"
          class="inherit"
          :class="{'ellipsis': ele.styleSheet.wrap === 'noWrap'}"
        >{{ item.label || '静态文本' }}</div>
      </template>
      <template v-if="item.elName === 'RadInput'">
        <div
          class="inherit"
          v-if="item.label"
          :class="ele.inline ? 'ele-label' : ''"
          :style="{
              'padding-right': ele.inline ? '10px' : 0,
              'display': ele.inline ? 'inline-block' : ''
            }"
          style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
        >{{ item.label }}</div>
        <template v-if="!isReadonlyStatus && !item.baseProps.readonly">
          <a-input
            style="flex: 1"
            class="inherit"
            v-if="item.type !== 'textarea'"
            v-model:value="item.value"
            :placeholder="item.placeholder"
          >
            <template #prefix>
              {{ item.prefix }}
            </template>
            <template #suffix>
              {{ item.suffix }}
            </template>
          </a-input>
          <a-textarea
            style="flex: 1"
            v-model:value="item.value"
            :placeholder="item.placeholder"
            class="inherit"
            v-else
          >
            <template #prefix>
              {{ item.prefix }}
            </template>
            <template #suffix>
              {{ item.suffix }}
            </template>
          </a-textarea>
        </template>
        <div
          v-else
          style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;
    padding-top: 1px;
    padding-bottom: 1px;"
          class="inherit display-text"
        >
          {{ ele.prefix }} {{ ele.value }} {{ ele.suffix }}&nbsp;
        </div>
      </template>
      <template v-if="item.elName === 'RadNumber'">
        <div
          class="inherit"
          v-if="item.label"
          :class="ele.inline ? 'ele-label' : ''"
          :style="{
              'padding-right': ele.inline ? '10px' : 0,
              'display': ele.inline ? 'inline-block' : '',
              'text-decoration': 'inherit'
            }"
          style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;"
        >{{ item.label }}</div>
        <template v-if="!isReadonlyStatus && !item.baseProps.readonly">
          <span>{{item.prefix}}</span>
          <a-input-number
            style="flex: 1"
            :min="item.min"
            :max="item.max"
            class="inherit"
            v-model:value="item.value"
            :placeholder="item.placeholder"
          >
          </a-input-number>
          <span>{{item.suffix}}</span>
        </template>
        <div
          v-else
          style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;text-decoration: inherit;line-height: 30px !important;
                  padding-top: 1px;white-space:normal;word-break: break-all;
                  padding-bottom: 1px;"
          class="inherit display-text"
        >
          {{ item.prefix }} {{ item.value }} {{ item.suffix }}&nbsp;
        </div>
      </template>
      <template v-if="item.elName === 'RadDatetime'">
        <div
          class="inherit"
          style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;text-decoration: inherit;"
          v-if="item.label"
          :class="ele.inline ? 'ele-label' : ''"
          :style="{
      'padding-right': ele.inline ? '10px' : 0,
      'display': ele.inline ? 'inline-block' : ''
    }"
        >{{ item.label }}</div>
        <span>{{item.prefix}} </span>
        <a-date-picker
          v-if="!isReadonlyStatus && !item.baseProps.readonly"
          style="flex: 1"
          class="inherit"
          v-model:value="item.value"
          placeholder="请选择时间"
          :picker="item.picker"
          :format="item.format"
        />
        <div
          v-else
          class="inherit display-text"
          style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;text-decoration: inherit;line-height: 30px !important;
    padding-top: 1px;white-space:normal;word-break: break-all;
    padding-bottom: 1px;"
        >{{item.value ? moment(item.value).format(item.format) : ''}} </div>
        {{item.suffix}}
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import moment from 'moment';

export default defineComponent({
  props: ['ele'],
  setup() {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      isReadonlyStatus,
      moment
    };
  }
});
</script>
<style lang="scss" scoped>
.ele-label {
  padding-right: 10px;
  display: inline-block;
}
.display-text {
  display: inline-block;
}
</style>