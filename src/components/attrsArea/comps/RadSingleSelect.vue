<template>
  <div class="title marginT10 marginB5 fontW500">类型</div>
  <a-radio-group
    class="marginT10 marginB5"
    v-model:value="activeCompObj.type"
    name="radioGroup"
  >
    <a-radio value="select">下拉</a-radio>
    <a-radio value="radio">平铺</a-radio>
  </a-radio-group>
  <template v-if="activeCompObj.type === 'radio'">
    <div class="title marginT10 marginB5 fontW500">排列方式</div>
    <a-radio-group
      class="marginB5"
      v-model:value="activeCompObj.layout"
      name="radioGroup"
    >
      <a-radio value="crosswise">横向排列</a-radio>
      <a-radio value="lengthways">纵向排列</a-radio>
    </a-radio-group>
  </template>
  <div class="title marginT10 fontW500">选项</div>
  <draggable
    v-model="activeCompObj.options"
    group="line"
    v-if="activeCompObj.options && activeCompObj.options.length"
  >
    <template v-for="(option, index) in activeCompObj.options">
      <div
        v-if="option && option.value"
        :key="option.value"
        class="paddingT5"
      >
        <i class="iconfont icondrag"></i>
        <a-input
          size="small"
          class="input-width"
          v-model:value="option.label"
          @click="clickIt(option)"
          @blur="changeDefault(option, 1)"
        />
        <div class="option-op">
          <a-radio
            @click="changeDefault(option, 0)"
            :checked="option.label===activeCompObj.value"
          ></a-radio>
          <i
            class="iconfont icondelete-border"
            @click="deleteOption(index, option)"
          ></i>
        </div>
      </div>
    </template>
  </draggable>
  <div
    class="op marginT10"
    @click="addOption"
  >
    <i class="iconfont iconplus paddingR5 paddingL5"></i>添加选项
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, watch } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    let focusOption = '';
    if (activeCompObj.value.options && activeCompObj.value.options.length) {
      activeCompObj.value.options = activeCompObj.value.options.filter(
        (option) => option && option.label && option.value
      );
    }
    if (!activeCompObj.value.options || !activeCompObj.value.options.length) {
      activeCompObj.value.options = [];
      activeCompObj.value.options.push({
        value: 1,
        label: '选项1'
      });
      activeCompObj.value.value = '选项1';
    }
    watch(() => activeCompObj,
      () => {
        if (activeCompObj.value.options && activeCompObj.value.options.length) {
          activeCompObj.value.options = activeCompObj.value.options.filter(
            (option) => option && option.label && option.value
          );
        }
        if (!activeCompObj.value.options || !activeCompObj.value.options.length) {
          activeCompObj.value.options= [];
          activeCompObj.value.options.push({
            value: 1,
            label: '选项1'
          });
          activeCompObj.value.value = '选项1';
        }
      },
      { deep: true }
    );
    const addOption = () => {
      const index = activeCompObj.value.options.length;
      let indexMax = index;
      if (indexMax > 1) {
        activeCompObj.value.options.forEach((option) => {
          indexMax = option.value > indexMax ? option.value : indexMax;
        });
      }
      activeCompObj.value.options.forEach((option) => {
        if (option.label === ('选项' + (index === 0 ? 1 : (indexMax + 1)))) {
          indexMax ++;
        }
      });
      activeCompObj.value.options.push({
        value:
          index === 0 ? 1 : (indexMax + 1),
        label:
          '选项' +
          (index === 0 ? 1 : (indexMax + 1))
      });
      if (index === 0 && activeCompObj.value.options && activeCompObj.value.options[0]) {
        activeCompObj.value.value = activeCompObj.value.options[0].label;
      }
    };
    const deleteOption = (index: any, option: any) => {
      if (activeCompObj.value.options.length === 1) {
        message.warning('选择器至少有一个选项，无法删除');
        return;
      }
      activeCompObj.value.options.splice(index, 1);
      if (option.label === activeCompObj.value.value && activeCompObj.value.options && activeCompObj.value.options[0]) {
        activeCompObj.value.value = activeCompObj.value.options[0].label;
      }
    };
    const clickIt = (option: any) => {
      focusOption = option.label;
    };
    const changeDefault = (option: any, op = 0) => {
      console.log('start-----')
      // 输入重复的选项，提示
      if (op === 1) {
        let cur = activeCompObj.value.options.filter(
          (opt) => {
            return opt && opt.label && option && option.label && opt.label === option.label
          }
        );
        if (cur.length > 1) {
          message.warning('无法添加重复的选项');
          option.label = focusOption;
          return;
        }
      }
      // op 0 单选 1输入
      if (focusOption === activeCompObj.value.value || op === 0) {
        activeCompObj.value.value = option.label;
        focusOption = option.label;
      }
    };
    return {
      activeCompObj,
      addOption,
      deleteOption,
      changeDefault,
      clickIt
    };
  }
});
</script>
<style lang="scss" scoped>
.op,
.iconfont {
  font-size: var(--size-f4);
}
.op {
  color: var(--color-primary);
}
.option-op {
  float: right;
}
.options {
  width: 100%;
}
.iconfont {
  &:hover {
    color: var(--color-primary);
  }
}
.icondelete-border {
  font-size: var(--size-f3);
}
.input-width {
  width: 160px;
}
.attr-body {
  .op {
    width: fit-content;
    &:hover {
      cursor: pointer;
    }
  }
  .icondrag, .icondelete-border {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>