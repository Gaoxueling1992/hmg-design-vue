<template>
  <div class="title marginT10 marginB5 fontW500 fontS16">{{opportunityMap[ruleType]}}</div>
  <div
    v-for="(item, idx) in rules"
    :key="idx"
  >
    <div class="fontW500">规则{{idx + 1}}
      <i
        class="iconfont icondelete-border fr marginL10"
        @click="deleteIt(idx)"
      ></i>
      <i
        class="iconfont iconedit fr"
        @click="editIt(idx)"
      ></i>
    </div>
    {{opportunityMap[item.opportunity]}} 时,
    <template v-if="item.elType ==='onlytext'">
      {{+item.current===0?'当前控件':('业务控件 ' + item.threshold)}}
    </template>
    <template v-else>当 {{+item.current===0?'当前控件':('业务控件 ' + item.threshold)}} 满足规则
      {{ruleMap[item.elType]['conditionList'].filter((it)=>+it.key === +item.ruleType)[0].value}} 
      <template v-if="+item.ruleType !== 10">
      {{
        ['11', '12'].indexOf(ruleMap[item.elType]['conditionList'].filter((it)=>+it.key === +item.ruleType)[0].key) === -1 ?
        (item.elType === 'date' ? formatDate(item.value) : item.value) :
        (item.elType === 'date' ? formatDate(item.min) : item.min + '-' + item.elType === 'date' ? formatDate(item.max) : item.max)
      }}</template> 时，
    </template>
    执行动作-{{item.name}}
    {{item.content ? (',内容：' + item.content) : ''}}
    {{item.label ? (',标签：' + item.label) : ''}}
    {{item.prefix ? (',前缀：' + item.prefix) : ''}}
    {{item.suffix ? (',后缀：' + item.suffix) : ''}}
    {{item.moreIds ? (',追加签名的域值：' + item.moreIds) : ''}}
    {{item.splitWords ? (',分隔符：' + item.splitWords) : ''}}
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { ruleMap, opportunityMap } from '@/utils/config';

export default defineComponent({
  props: ['rules', 'ruleType'],
  emits: ['editIt', 'deleteIt'],
  setup(props, { emit }) {
    const { rules, ruleType } = toRefs(props);

    const deleteIt = (idx) => {
      emit('deleteIt', idx, ruleType.value);
    };
    const editIt = (idx) => {
      emit('editIt', idx, ruleType.value);
    };

    const formatDate = (date) => {
      let dt = new Date(date);
      let y = dt.getFullYear(),
          m = dt.getMonth()+1,
          d = dt.getDate(),
          h = dt.getHours(),
          mm = dt.getMinutes(),
          ss = dt.getSeconds();

      return '' + y + '年' + m + '月' + d + '日 ' + h + ':' + mm + ':' + ss;
    };

    return { rules, deleteIt, editIt, ruleMap, opportunityMap, formatDate };
  }
});
</script>
