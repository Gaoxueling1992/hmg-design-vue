<template>
  <template v-if="!isReadonlyStatus">
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
          ...item.styleSheet,
          fontSize: item.styleSheet.fontSize + 'px',
          borderWidth: ele.styleSheet.borderWidth + 'px',
          display: ele.inline ? (isReadonlyStatus ? 'inline-block' : 'flex') : 'inline-block'
        }"
      >
        <!-- <component :is="item.elName" :ele="{
            ...item,
            inline: ele.inline,
            styleSheet: {
              ...item.styleSheet
            }
          }"> -->
        <!-- </component> -->
        <template v-if="item.elName === 'RadText'">
          <div
            style="min-height: 20px"
            class="inherit"
            :style="{
                marginTop: item.styleSheet.paddingTop + 'px',
                marginBottom: item.styleSheet.paddingBottom + 'px',
                marginLeft: item.styleSheet.paddingLeft + 'px',
                marginRight: item.styleSheet.paddingRight + 'px',
              }"
            :class="{'ellipsis': item.styleSheet.wrap === 'noWrap'}"
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
          <template v-if="!isReadonlyStatus">
            <a-input
              style="flex: 1"
              :disabled="item.baseProps.readonly"
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
              :disabled="item.baseProps.readonly"
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
          {{item.label}}
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
          <a-input-number
            style="flex: 1"
            :disabled="item.baseProps.readonly"
            :min="item.min"
            :max="item.max"
            class="inherit"
            v-model:value="item.value"
            :placeholder="item.placeholder"
            v-if="!isReadonlyStatus"
          >
            <template #prefix>
              {{ item.prefix }}
            </template>
            <template #suffix>
              {{ item.suffix }}
            </template>
          </a-input-number>
          <div
            v-else
            style="border-color:inherit;color:inherit !important;background-color: inherit;font-size: inherit;display: inline-block;line-height: 30px !important;
              padding-top: 1px;
              padding-bottom: 1px;"
            class="inherit display-text"
          >
            {{ item.prefix }} {{ item.value }} {{ item.suffix }}&nbsp;
          </div>
        </template>
        <template v-if="item.elName === 'RadDatetime'">
        </template>
      </div>
    </div>
  </template>
</template>
<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';

export default defineComponent({
  props: ['ele'],
  setup() {
    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      isReadonlyStatus
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