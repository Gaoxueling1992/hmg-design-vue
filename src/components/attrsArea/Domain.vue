<template>
  <div class="title marginT10 marginB5 fontW500">域值</div>
  <a-select
    ref="select"
    v-model:value="activeCompObj.domainType"
    @change="activeCompObj.threshold = ''"
  >
    <a-select-option value="domain">数据库域值</a-select-option>
    <a-select-option value="TEMP_">临时显示</a-select-option>
    <a-select-option value="PROP_">存储数据</a-select-option>
    <a-select-option value="nosubmit">仅绑定</a-select-option>
  </a-select>
  <a-select
    v-if="activeCompObj.domainType === 'domain'"
    v-model:value="activeCompObj.threshold"
    :options="domainList"
    :allowClear="activeCompObj.threshold"
    style="width: 100%"
    class="marginT5"
  ></a-select>
  <a-input
    style="width: 100%"
    class="marginT5"
    v-else
    v-model:value="activeCompObj.threshold"
    allowClear
  />
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
    <rule-list
      v-if="activeCompObj.rules && activeCompObj.rules['init'] && activeCompObj.rules['init'].length"
      :rules="activeCompObj.rules['init']"
      ruleType="init"
      @deleteIt="deleteIt"
      @editIt="editIt"
    ></rule-list>
    <rule-list
      v-if="activeCompObj.rules && activeCompObj.rules['change'] && activeCompObj.rules['change'].length"
      :rules="activeCompObj.rules['change']"
      ruleType="change"
      @deleteIt="deleteIt"
      @editIt="editIt"
    ></rule-list>
    <rule-list
      v-if="activeCompObj.rules && activeCompObj.rules['submit'] && activeCompObj.rules['submit'].length"
      :rules="activeCompObj.rules['submit']"
      ruleType="submit"
      @deleteIt="deleteIt"
      @editIt="editIt"
    ></rule-list>
    <template v-if="editingRule">
      <div class="title marginT10 marginB5 fontW500 fontS16">{{editingIdx === -1 ? '新增' : '编辑' + opportunityMap[editingOp]}}规则{{editingIdx === -1 ? '' : editingIdx+1}}(域值用${xx}代替)</div>
      <div class="title marginB5">执行时机</div>
      <a-select
        v-model:value="ruleObj.opportunity"
        :disabled="editingIdx !== -1"
      >
        <a-select-option
          v-for="(value, key) in opportunityMap"
          :key="key"
          :value="key"
        >{{value}}</a-select-option>
      </a-select>
      <div class="title marginT10 marginB5">执行条件</div>
      <a-input-group
        compact
        class="marginT5"
      >
        <a-select
          style="width: 40%"
          v-model:value="ruleObj.current"
          @change="changeCurrent"
        >
          <a-select-option
            v-if="activeCompObj.elType!=='other'"
            :value="0"
          >当前控件({{ruleMap[activeCompObj.elType].n}})</a-select-option>
          <a-select-option :value="1">业务字段</a-select-option>
        </a-select>
        <template v-if="ruleObj.current === 1">
          <a-select
            style="width: 40%"
            v-model:value="ruleObj.threshold"
            :options="domainList"
            :allowClear="ruleObj.threshold"
          ></a-select>
          <a-select
            style="width: 20%"
            v-model:value="ruleObj.elType"
            @change="changeElType"
          >
            <template
              v-for="(value, key) in ruleMap"
              :key="key"
            >
              <a-select-option
                :value="key"
                v-if="key !== 'other' && key !== 'onlytext'"
              >
                {{value.n}}
              </a-select-option>
            </template>
          </a-select>
        </template>
      </a-input-group>
      <template v-if="!(ruleObj.current === 0 && activeCompObj.elName === 'RadText') && !(ruleObj.current === 0 && ruleObj.elType === 'onlytext')">
        <a-input-group
          compact
          class="marginT5"
          v-if="
            ((ruleObj.current === 0 && ['text', 'singles', 'muls'].indexOf(activeCompObj.elType) > -1) ||
            (ruleObj.current === 1 && ['text', 'singles', 'muls'].indexOf(ruleObj.elType) > -1))
          "
        >
          <a-select
            style="width: 35%"
            v-model:value="ruleObj.type"
            @change="changeType"
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
        <a-input-group
          compact
          class="marginT5"
          v-if="
            (ruleObj.current === 0 && ['number', 'imgp'].indexOf(activeCompObj.elType) > -1) ||
            (ruleObj.current === 1 && ['number', 'imgp'].indexOf(ruleObj.elType) > -1)
          "
        >
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
          <a-input-number
            v-if="ruleObj.type>1"
            style="width: 70%"
            v-model:value="ruleObj.value"
          ></a-input-number>
          <template v-else>
            <a-input-number
              class="marginL5"
              style="width: 30%"
              :min="0"
              :max="ruleObj.max"
              v-model:value="ruleObj.min"
            ></a-input-number> -
            <a-input-number
              style="width: 30%"
              :min="ruleObj.min"
              :max="99999"
              v-model:value="ruleObj.max"
            ></a-input-number>
          </template>
        </a-input-group>
        <a-input-group
          compact
          class="marginT5"
          v-if="
            (ruleObj.current === 0 && activeCompObj.elType === 'date') ||
            (ruleObj.current === 1 && ruleObj.elType === 'date')
          "
        >
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
          <a-date-picker
            v-if="+ruleObj.type>1 && ruleObj.type<6"
            style="width: 70%"
            v-model:value="ruleObj.value"
          />
          <a-range-picker
            v-else-if="+ruleObj.type<2"
            style="width: 70%"
            v-model:value="ruleObj.value"
          />
        </a-input-group>
        <a-input-group
          compact
          class="marginT5"
          v-if="
            (ruleObj.current === 0 && activeCompObj.elType === 'table') ||
            (ruleObj.current === 1 && ruleObj.elType === 'table')
          "
        >
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
      </template>
      <div class="title marginT10 marginB5">执行动作</div>
      <a-input-group
        compact
        class="marginT5"
      >
        <a-select
          v-model:value="ruleObj.id"
          style="width: 40%"
          class="marginT5"
          @change="changeId"
        >
          <a-select-option
            v-for="value in actionList[ruleObj.current === 1 ? ruleObj.elType : activeCompObj.elType]"
            :value="value.key"
            :key="value.key"
          >
            {{value.value}}
          </a-select-option>
        </a-select>
      </a-input-group>
      <a-input-group
        compact
        class="marginT5"
        v-if="ruleObj.id>4"
      >
        值
        <a-input v-model:value="ruleObj.content"></a-input>
      </a-input-group>
      <a-input-group
        compact
        class="marginT5"
        v-if="+ruleObj.id === 6 && (
          (ruleObj.current === 0 && activeCompObj.elType !== 'onlytext') ||
          (ruleObj.current === 1 && ruleObj.elType !== 'onlytext')
        )"
      >
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
import { defineComponent, inject, ref, Ref } from 'vue';
import { ruleMap, actionList, opportunityMap } from '@/utils/config';
import { Modal } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    const domainList: any = inject('domainList');
    const visibleDrawer: Ref<boolean> = ref<boolean>(false);
    console.log(ruleMap[activeCompObj.value.elType])
    const initRule = {
      opportunity: 'init',
      type: ruleMap[activeCompObj.value.elType] && ruleMap[activeCompObj.value.elType].conditionList ? ruleMap[activeCompObj.value.elType].conditionList[0] : '',
      value: '',
      min: 0,
      max: 9999,
      threshold: '',
      current: 0,
      elType: activeCompObj.value.elType,
      id: actionList[activeCompObj.value.elType][0].key,
      name: actionList[activeCompObj.value.elType][0].value,
      content: '',
      label: ''
    };
    const ruleObj: any = ref({
      ...initRule
    });
    const editingRule: Ref<boolean> = ref<boolean>(false);
    const editingIdx = ref<number>(-1);
    const editingOp = ref<string>('');

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
      switch (
        ruleObj.value.current === 0
          ? activeCompObj.value.elType
          : ruleObj.value.elType
      ) {
        case 'onlytext':
          break;
        case 'text':
          if (ruleObj.value.type < 6 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          }
          break;
        case 'imgp':
          if (ruleObj.value.type > 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          }
          break;
        case 'number':
          console.log(ruleObj.value);
          if (ruleObj.value.type > 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          }
          break;
        case 'muls':
          if (ruleObj.value.type <= 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          }
          break;
        case 'singles':
          if (ruleObj.value.type <= 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          }
          break;
        case 'date':
          if (
            ruleObj.value.type > 1 &&
            ruleObj.value.type < 6 &&
            !ruleObj.value.value
          ) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          }
          break;
      }
      if (ruleObj.value.id > 4 && !ruleObj.value.content) {
        let value;
        if (ruleObj.value.current === 0) {
          value =
            actionList[activeCompObj.value.elType][ruleObj.value.id].value;
        } else {
          value = actionList[ruleObj.value.elType][ruleObj.value.id].value;
        }
        Modal.warning({
          title: '提示',
          content: `请输入完整${value}内容`,
          okText: '知道了'
        });
        return;
      }
      editingRule.value = false;
      if (editingIdx.value === -1) {
        if (!activeCompObj.value.rules[ruleObj.value.opportunity]) {
          activeCompObj.value.rules[ruleObj.value.opportunity] = [];
        }
        activeCompObj.value.rules[ruleObj.value.opportunity].push({
          ...ruleObj.value
        });
      } else {
        activeCompObj.value.rules[ruleObj.value.opportunity].splice(
          editingIdx.value,
          1,
          {
            ...ruleObj.value
          }
        );
      }
      ruleObj.value = {
        ...initRule
      };
    };

    const deleteIt = (idx, opportunity) => {
      activeCompObj.value.rules[opportunity].splice(idx, 1);
    };

    const editIt = (idx, opportunity) => {
      editingRule.value = true;
      ruleObj.value = {
        ...activeCompObj.value.rules[opportunity][idx]
      };
      editingIdx.value = idx;
      editingOp.value = opportunity;
    };

    const addRule = () => {
      editingRule.value = true;
      ruleObj.value = {
        opportunity: 'init',
        type: ruleMap[activeCompObj.value.elType] && ruleMap[activeCompObj.value.elType].conditionList ? ruleMap[activeCompObj.value.elType].conditionList[0] : '',
        value: '',
        min: 0,
        max: 9999,
        threshold: '',
        current: 0,
        elType: activeCompObj.value.elType,
        id: actionList[activeCompObj.value.elType][0].key,
        name: actionList[activeCompObj.value.elType][0].value,
        content: '',
        label: ''
      };
      editingIdx.value = -1;
      editingOp.value = '';
    };

    const changeCurrent = () => {
      ruleObj.value.threshold = '';
      ruleObj.value.value = '';
      ruleObj.value.min = 0;
      ruleObj.value.max = 9999;
      ruleObj.value.content = '';
      ruleObj.value.label = '';
      if (ruleObj.value.current === 0) {
        ruleObj.value.elType = activeCompObj.value.elType;
        ruleObj.value.type = ruleMap[activeCompObj.value.elType] && ruleMap[activeCompObj.value.elType].conditionList ? ruleMap[activeCompObj.value.elType].conditionList[0] : '';;
        ruleObj.value.id = actionList[activeCompObj.value.elType][0].key;
        ruleObj.value.name = actionList[activeCompObj.value.elType][0].value;
      } else {
        ruleObj.value.elType = ruleObj.value.elType === 'onlytext' ? 'text' : ruleObj.value.elType;
        ruleObj.value.type = ruleMap[ruleObj.value.elType] && ruleMap[ruleObj.value.elType].conditionList ? ruleMap[ruleObj.value.elType].conditionList[0] : '';;
        ruleObj.value.id = actionList[ruleObj.value.elType][0].key;
        ruleObj.value.name = actionList[ruleObj.value.elType][0].value;
      }
    };

    const changeElType = () => {
      ruleObj.value.id = actionList[ruleObj.value.elType][0].key;
      ruleObj.value.name = actionList[ruleObj.value.elType][0].value;
      ruleObj.value.type = ruleMap[ruleObj.value.elType] && ruleMap[ruleObj.value.elType].conditionList ? ruleMap[ruleObj.value.elType].conditionList[0] : '';
      ruleObj.value.value = '';
      ruleObj.value.min = 0;
      ruleObj.value.max = 9999;
      ruleObj.value.content = '';
      ruleObj.value.label = '';
    };

    const changeId = () => {
      let elType;
      if (ruleObj.value.current === 0) {
        elType = activeCompObj.value.elType;
      } else {
        elType = ruleObj.value.elType;
      }
      ruleObj.value.name = actionList[elType].filter((action) => action.key === ruleObj.value.id)[0].value;
      ruleObj.value.content = '';
      ruleObj.value.label = '';
    };

    const changeType = () => {
      ruleObj.value.id = actionList[ruleObj.value.elType][0].key;
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
      editingOp,
      editIt,
      addRule,
      changeCurrent,
      changeElType,
      changeId,
      changeType
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
.ant-select-clear {
  background: transparent !important;
  right: 26px !important;
}
</style>