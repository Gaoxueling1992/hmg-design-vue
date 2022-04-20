<template>
  <div class="title marginT10 marginB5 fontW500">域值</div>
  <div class="attr-group">
    <a-select
      ref="select"
      v-model:value="activeCompObj.domainType"
      @change="activeCompObj.threshold = ''"
    >
      <a-select-option value="domain">数据库域值</a-select-option>
      <a-select-option value="temp">临时显示</a-select-option>
      <a-select-option value="prop">存储数据</a-select-option>
    </a-select>
    <a-select
      v-if="activeCompObj.domainType === 'domain'"
      v-model:value="activeCompObj.threshold"
      :options="domainList"
      allowClear
      style="width: 160px"
    ></a-select>
    <a-input
      style="width: 160px"
      v-else
      v-model:value="activeCompObj.threshold"
      allowClear
    />
  </div>
  <a-button
    type="primary"
    class="add-script"
    @click="addScript"
  >添加业务规则</a-button>
  <a-drawer
    v-model:visible="visibleDrawer"
    class="custom-class"
    title="业务规则配置"
    placement="right"
    @close="editingRule=false"
  >
    <template v-if="activeCompObj.rules.length">
      <div class="title marginT10 marginB5 fontW500 fontS16">已有规则</div>
      <div v-for="(item, idx) in activeCompObj.rules" :key="idx">
        <div class="fontW500">规则{{idx + 1}}
          <i class="iconfont icondelete-border fr marginL10" @click="deleteIt(idx)"></i>
          <i class="iconfont iconedit fr" @click="editIt(idx)"></i>
        </div>
        {{opportunityMap[item.opportunity]}} 时, 当 {{+item.current===0?'当前控件':('业务控件 ' + item.threshold)}}
        {{ruleMap[item.elType]['conditionList'][item.type]}} {{item.value}} 时，
        执行动作-{{actionList[item.id]}}{{item.content ? (',内容：' + item.content) : ''}}{{item.label ? (',标签：' + item.label) : ''}}
      </div>
    </template>
    <template v-if="editingRule">
      <div class="title marginT10 marginB5 fontW500 fontS16">{{editingIdx === -1 ? '新增' : '编辑'}}规则{{editingIdx === -1 ? '' : editingIdx+1}}(域值用${xx}代替)</div>
      <div class="title marginB5">执行时机</div>
      <a-select v-model:value="ruleObj.opportunity">
        <a-select-option v-for="(value, key) in opportunityMap" :key="key" :value="key">{{value}}</a-select-option>
      </a-select>
      <div class="title marginT10 marginB5">执行条件</div>
      <a-input-group compact class="marginT5">
        <a-select
          style="width: 40%"
          v-model:value="ruleObj.current"
          @change="
            ruleObj.threshold='';
            ruleObj.elType='text';
            ruleObj.type='0';
            ruleObj.value='';
            ruleObj.min=0;
            ruleObj.max=9999;
          "
        >
          <a-select-option v-if="activeCompObj.elType!=='other'"  :value="0">当前控件({{ruleMap[activeCompObj.elType].n}})</a-select-option>
          <a-select-option :value="1">业务字段</a-select-option>
        </a-select>
        <a-input
          v-if="ruleObj.current === 1"
          style="width: 40%"
          v-model:value="ruleObj.threshold"
        ></a-input>
        <a-select
          style="width: 20%"
          v-if="ruleObj.current === 1"
          v-model:value="ruleObj.elType"
        >
          <template
            v-for="(value, key) in ruleMap"
            :key="key"
          >
            <a-select-option
              :value="key"
              v-if="key !== 'other'"
            >
              {{value.n}}
            </a-select-option>
          </template>
        </a-select>
      </a-input-group>
      <a-input-group compact class="marginT5"
        v-if="
          (ruleObj.current === 0 && ['text', 'singles', 'muls'].indexOf(activeCompObj.elType) > -1) ||
          (ruleObj.current === 1 && ['text', 'singles', 'muls'].indexOf(ruleObj.elType) > -1)
        ">
        <a-select
          style="width: 35%"
          v-model:value="ruleObj.type"
          @change="ruleObj.value=''"
        >
          <a-select-option
            v-for="(value, key) in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
            :value="key"
            :key="key"
          >
            {{value}}
          </a-select-option>
        </a-select>
        <a-input
          style="width: 65%"
          v-model:value="ruleObj.value"
          v-if="ruleObj.type <= 5"
        >
        </a-input>
      </a-input-group>
      <a-input-group compact class="marginT5"
        v-if="
          (ruleObj.current === 0 && ['number', 'imgp'].indexOf(activeCompObj.elType) > -1) ||
          (ruleObj.current === 1 && ['number', 'imgp'].indexOf(ruleObj.elType) > -1)
        ">
        <a-select
          v-model:value="ruleObj.type"
          @change="ruleObj.value='';ruleObj.min=0;ruleObj.max=9999"
          style="width: 30%"
        >
          <a-select-option
            v-for="(value, key) in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
            :value="key"
            :key="key"
          >
            {{value}}
          </a-select-option>
        </a-select>
        <a-input-number v-if="ruleObj.type>1" style="width: 70%" v-model:value="ruleObj.value"></a-input-number>
        <template v-else>
          <a-input-number class="marginL5" style="width: 30%" :min="0" :max="ruleObj.max" v-model:value="ruleObj.min"></a-input-number> -
          <a-input-number style="width: 30%" :min="ruleObj.min" :max="99999" v-model:value="ruleObj.max"></a-input-number>
        </template>
      </a-input-group>
      <a-input-group compact class="marginT5"
        v-if="
          (ruleObj.current === 0 && activeCompObj.elType === 'date') ||
          (ruleObj.current === 1 && ruleObj.elType === 'date')
        ">
        <a-select
          v-model:value="ruleObj.type"
          @change="
            ruleObj.value='';
            ruleObj.min=0;
            ruleObj.max=9999
          "
          style="width: 30%"
        >
          <a-select-option
            v-for="(value, key) in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
            :value="key"
            :key="key"
          >
            {{value}}
          </a-select-option>
        </a-select>
        <a-date-picker v-if="+ruleObj.type>1 && ruleObj.type<6" style="width: 70%" v-model:value="ruleObj.value"/>
        <a-range-picker v-else-if="+ruleObj.type<2" style="width: 70%" v-model:value="ruleObj.value" />
      </a-input-group>
      <a-input-group compact class="marginT5"
        v-if="
          (ruleObj.current === 0 && activeCompObj.elType === 'table') ||
          (ruleObj.current === 1 && ruleObj.elType === 'table')
        ">
        <a-select
          style="width: 35%"
          v-model:value="ruleObj.type"
          @change="ruleObj.value=''"
        >
          <a-select-option
            v-for="(value, key) in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
            :value="key"
            :key="key"
          >
            {{value}}
          </a-select-option>
        </a-select>
      </a-input-group>
      <div class="title marginT10 marginB5">执行动作</div>
      <a-input-group compact class="marginT5">
        <a-select
          v-model:value="ruleObj.id"
          style="width: 40%"
          class="marginT5"
        >
          <a-select-option
            v-for="(value, key) in actionList"
            :value="key"
            :key="key"
          >
            {{value}}
          </a-select-option>
        </a-select>
      </a-input-group>
      <a-input-group compact class="marginT5" v-if="ruleObj.id>4">
        值
        <a-input v-model:value="ruleObj.content"></a-input>
      </a-input-group>
      <a-input-group compact class="marginT5" v-if="+ruleObj.id === 6">
        标签
        <a-input v-model:value="ruleObj.label"></a-input>
      </a-input-group>
      <a-button
        type="primary"
        class="marginT20"
        @click="saveRule"
      >保存规则</a-button>
      <a-button
        class="marginT20 marginL10"
        @click="editingRule=false"
      >取消</a-button>
    </template>
    <div
      v-else
      class="add-rule marginT20"
      @click="addRule"
    ><i class="iconfont iconplus"></i>添加规则</div>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, inject, ref, Ref, reactive } from 'vue';
import { ruleMap, actionList, opportunityMap } from '@/utils/config';
import { Modal } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    const domainList: any = inject('domainList');
    const visibleDrawer: Ref<boolean> = ref<boolean>(false);
    const ruleObj: any = ref({
      opportunity: 'init',
      type: '0',
      value: '',
      min: 0,
      max: 9999,
      threshold: '',
      current: 0,
      elType: 'text',
      id: '0',
      content: '',
      label: ''
    });
    const editingRule: Ref<boolean> = ref<boolean>(false);
    const editingIdx = ref<number>(-1);

    const addScript = () => {
      visibleDrawer.value = true;
      if (activeCompObj.value.elType === 'other') {
        ruleObj.value.current = 1;
      } else {
        ruleObj.value.current = 0;
      }
    };

    const saveRule = () => {
      if (ruleObj.value.current === 1 && !ruleObj.value.threshold) {
        Modal.warning({
          title: '提示',
          content: '请输入业务字段域值',
          okText: '知道了'
        });
        return;
      }
      switch (ruleObj.value.elType) {
        case 'text':
          if (ruleObj.value.type < 6 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          };
          break;
        case 'imgp':
          if (ruleObj.value.type > 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          };
          break;
        case 'number':
          console.log(ruleObj.value)
          if (ruleObj.value.type > 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          };
          break;
        case 'muls':
          if (ruleObj.value.type <= 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          };
          break;
        case 'singles':
          if (ruleObj.value.type <= 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          };
          break;
        case 'date':
          if (ruleObj.value.type > 1 && ruleObj.value.type < 6 && !ruleObj.value.value) {
           Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          };
          break;
      }
      if (ruleObj.value.id > 4 && !ruleObj.value.content) {
        Modal.warning({
          title: '提示',
          content: `请输入完整${actionList[ruleObj.value.id]}内容`,
          okText: '知道了'
        });
        return;
      }
      editingRule.value = false;
      if (editingIdx.value === -1) {
        activeCompObj.value.rules.push({
          ...ruleObj.value
        });
      } else {
        activeCompObj.value.rules.splice(editingIdx.value, 1, {
          ...ruleObj.value
        })
      }
      ruleObj.value= {
        opportunity: 'init',
        type: '0',
        value: '',
        min: 0,
        max: 9999,
        threshold: '',
        current: 0,
        elType: 'text',
        id: '0',
        content: '',
        label: ''
      };
    };

    const deleteIt = (idx) => {
      activeCompObj.value.rules.splice(idx, 1);
    };

    const editIt = (idx) => {
      editingRule.value = true;
      ruleObj.value = {
        ...activeCompObj.value.rules[idx]
      };
      editingIdx.value = idx;
    };
     
    const addRule = () => {
      editingRule.value = true;
      ruleObj.value = {
        opportunity: 'init',
        type: '0',
        value: '',
        min: 0,
        max: 9999,
        threshold: '',
        current: 0,
        elType: 'text',
        id: '0',
        content: '',
        label: ''
      };
      editingIdx.value = -1
    };

    return {
      domainList,
      activeCompObj,
      addScript,
      visibleDrawer,
      ruleMap,
      ruleObj,
      editingRule,
      actionList,
      saveRule,
      opportunityMap,
      deleteIt,
      editingIdx,
      editIt,
      addRule
    };
  }
});
</script>
<style lang="scss">
.add-script {
  width: 100%;
  margin-top: 10px;
}
.custom-class {
  .ant-drawer-content-wrapper {
    width: 500px !important;
  }
}
.add-rule {
  color: var(--color-primary);
}
</style>