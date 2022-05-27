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
    :allowClear="!!activeCompObj.threshold"
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
    destroyOnClose
    @close="closeDrawer"
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
      <div class="title marginT10 marginB5 fontW500 fontS16">{{editingIdx === -1 ? '新增' : '编辑' + opportunityMap[editingOp]}}规则{{editingIdx === -1 ? '' : editingIdx+1}}</div>
      <div class="tip-color marginT5 marginB5 fontW400 fontS14">说明：域值用${xx}代替,当前控件的值用${current}代替，若规则冲突，以后配置的规则为准。</div>
      <div class="title marginB5">执行时机</div>
      <a-select
        v-model:value="ruleObj.opportunity"
        :disabled="editingIdx !== -1"
        @change="changeOpp"
      >
        <a-select-option
          v-for="(value, key) in opportunityMap"
          :key="key"
          :value="key"
        >{{value}}</a-select-option>
      </a-select>
      <div class="title marginT10 marginB5">执行条件</div>
      <!-- 选择条件控件 -->
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
                v-if="['onlytext', 'table', 'other'].indexOf(key) === -1"
              >
                {{value.n}}
              </a-select-option>
            </template>
          </a-select>
        </template>
      </a-input-group>
      <template v-if="!(ruleObj.current === 0 && activeCompObj.elName === 'RadText') && !(ruleObj.current === 0 && ruleObj.elType === 'onlytext')">
        <!-- 操作人 -->
        <a-input-group
          compact
          class="marginT5"
          v-if="
            ((ruleObj.current === 0 && activeCompObj.elType === 'sig') ||
            (ruleObj.current === 1 && ruleObj.elType === 'sig'))
          "
        >
          <a-select
            style="width: 35%"
            v-model:value="ruleObj.ruleType"
            @change="changeType"
          >
            <a-select-option
              v-for="item in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
              :value="item.key"
              :key="item.key"
            >
              {{item.value}}
            </a-select-option>
          </a-select>
        </a-input-group>
        <!-- 文本 单复选 -->
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
            v-model:value="ruleObj.ruleType"
            @change="changeType"
          >
            <a-select-option
              v-for="item in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
              :value="item.key"
              :key="item.key"
            >
              {{item.value}}
            </a-select-option>
          </a-select>
          <a-input
            style="width: 65%"
            v-model:value="ruleObj.value"
            v-if="ruleObj.ruleType <= 5"
          >
          </a-input>
        </a-input-group>
        <!-- 数值和图片选择器 -->
        <a-input-group
          compact
          class="marginT5"
          v-if="
            (ruleObj.current === 0 && ['number', 'imgp'].indexOf(activeCompObj.elType) > -1) ||
            (ruleObj.current === 1 && ['number', 'imgp'].indexOf(ruleObj.elType) > -1)
          "
        >
          <a-select
            v-model:value="ruleObj.ruleType"
            style="width: 30%"
            @change="changeType"
          >
            <a-select-option
              v-for="item in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
              :value="item.key"
              :key="'' + item.key"
            >
              {{item.value}}
            </a-select-option>
          </a-select>
          <a-input-number
            v-if="[11, 12, 10].indexOf(+ruleObj.ruleType) === -1"
            style="width: 70%"
            v-model:value="ruleObj.value"
          ></a-input-number>
          <template v-else-if="[11, 12].indexOf(+ruleObj.ruleType) > -1">
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
        <!-- 时间 -->
        <a-input-group
          compact
          class="marginT5"
          v-if="
            (ruleObj.current === 0 && activeCompObj.elType === 'date') ||
            (ruleObj.current === 1 && ruleObj.elType === 'date')
          "
        >
          <a-select
            v-model:value="ruleObj.ruleType"
            @change="changeType"
            style="width: 30%"
          >
            <a-select-option
              v-for="item in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
              :value="item.key"
              :key="'' + item.key"
            >
              {{item.value}}
            </a-select-option>
          </a-select>
          <a-date-picker
            v-if="['6','7','10', '11', '12'].indexOf(ruleObj.ruleType) === -1"
            style="width: 70%"
            v-model:value="ruleObj.value"
          />
          <a-range-picker
            v-else-if="['11', '12'].indexOf(ruleObj.ruleType) > -1"
            style="width: 70%"
            v-model:value="ruleObj.value"
          />
        </a-input-group>
        <!-- 表格 -->
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
            v-model:value="ruleObj.ruleType"
            @change="changeType"
          >
            <a-select-option
              v-for="item in ruleMap[ruleObj.current===0?activeCompObj.elType:ruleObj.elType].conditionList"
              :value="item.key"
              :key="'' + item.key"
            >
              {{item.value}}
            </a-select-option>
          </a-select>
        </a-input-group>
      </template>
      <div class="title marginT10 marginB5">执行动作</div>
      <!-- 选择动作 -->
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
          <template
            v-for="value in actionList[ruleObj.current === 1 ? ruleObj.elType : activeCompObj.elType]"
            :key="value.key"
          >
            <a-select-option
              :value="value.key"
              v-if="!value.disableOp || (value.disableOp && value.disableOp.indexOf(ruleObj.opportunity) === -1)"
            >
              {{value.value}}
            </a-select-option>
          </template>
        </a-select>
      </a-input-group>
      <!-- 0 追加前后缀 -->
      <template v-if="ruleObj.id === 0">
        <a-input-group
          compact
          class="marginT5"
        >
          前缀
          <a-input v-model:value="ruleObj.prefix"></a-input>
        </a-input-group>
        <a-input-group
          compact
          class="marginT5"
        >
          后缀
          <a-input v-model:value="ruleObj.suffix"></a-input>
        </a-input-group>
      </template>
      <!-- 提示类型 是否中断提交 -->
      <template v-if="ruleObj.id === 8">
        <a-input-group
          compact
          class="marginT5"
          style="width: 100%"
        >
          <a-select
            ref="select"
            v-model:value="ruleObj.tipType"
            style="width: 50%"
          >
            <a-select-option value="info">信息</a-select-option>
            <a-select-option value="error">错误</a-select-option>
            <a-select-option value="warning">警告</a-select-option>
            <a-select-option value="confirm">确认</a-select-option>
          </a-select>
        </a-input-group>
      </template>
      <!-- >4 !==7 拼接值 -->
      <a-input-group
        compact
        class="marginT5"
        v-if="ruleObj.id>4 && ruleObj.id !== 7"
      >
        {{ruleObj.id === 8 ? '提示文案' : '值'}}
        <a-input v-model:value="ruleObj.content"></a-input>
      </a-input-group>
      <!-- 7 选择表格 -->
      <a-select
        v-model:value="ruleObj.content"
        style="width: 100%"
        v-if="ruleObj.id === 7"
        class="marginT5"
      >
        <template
          v-for="tb in tableList"
          :key="tb.id"
        >
          <a-select-option :value="tb.id">
            {{tb.title}}
          </a-select-option>
        </template>
      </a-select>
      <!-- 6 拼标签 -->
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
      <!-- 6 拼标签 -->
      <template v-if="+ruleObj.id === 6 && activeCompObj.elType === 'sig'">
        <a-input-group
          compact
          class="marginT5"
        >
          获取多签名的域值（逗号分隔）
          <a-input v-model:value="ruleObj.moreIds" @change="changeMoreIds"></a-input>
        </a-input-group>
        <a-input-group
          compact
          class="marginT5"
          v-if="ruleObj.moreIds && ruleObj.moreIds.split(',')[1]"
        >
          手写体签名分隔符
          <a-input v-model:value="ruleObj.splitWords"></a-input>
        </a-input-group>
      </template>
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
    let tableList: any = inject('tableList');
    const initRule = {
      opportunity: 'init',
      ruleType: '10',
      value: '',
      min: 0,
      max: 9999,
      threshold: '',
      prefix: '',
      suffix: '',
      current: 0,
      elType: activeCompObj.value.elType,
      id: actionList[activeCompObj.value.elType][0].key,
      name: actionList[activeCompObj.value.elType][0].value,
      content: '',
      label: '',
      moreIds: '',
      splitWords: '',
      tipType: 'info'
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
      if (ruleObj.value.ruleType === 10) {
        ruleObj.value.value = '';
      }
      switch (
        ruleObj.value.current === 0
          ? activeCompObj.value.elType
          : ruleObj.value.elType
      ) {
        case 'onlytext':
          break;
        case 'text':
          if (+ruleObj.value.ruleType < 6 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          }
          break;
        case 'muls':
          if (+ruleObj.value.ruleType <= 1 && !ruleObj.value.value) {
            Modal.warning({
              title: '提示',
              content: '请输入完整执行条件',
              okText: '知道了'
            });
            return;
          }
          break;
        case 'singles':
          if (+ruleObj.value.ruleType <= 1 && !ruleObj.value.value) {
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
            +ruleObj.value.ruleType > 1 &&
            +ruleObj.value.ruleType < 6 &&
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
      if (
        +ruleObj.value.id > 4 &&
        !ruleObj.value.content &&
        activeCompObj.value.elType !== 'sig'
      ) {
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
    const changeOpp = () => {
      ruleObj.value = {
        opportunity: ruleObj.value.opportunity,
        ruleType: '10',
        value:
          activeCompObj.value.elType === 'number' ||
          activeCompObj.value.elType === 'imgp'
            ? 0
            : '',
        min: 0,
        max: 9999,
        threshold: '',
        prefix: '',
        suffix: '',
        moreIds: '',
        splitWords: '',
        current: 0,
        elType: activeCompObj.value.elType,
        id: actionList[activeCompObj.value.elType][0].key,
        name: actionList[activeCompObj.value.elType][0].value,
        content: '',
        label: '',
        tipType: 'info'
      };
    };

    const addRule = () => {
      editingRule.value = true;
      ruleObj.value = {
        opportunity: 'init',
        ruleType: '10',
        value:
          activeCompObj.value.elType === 'number' ||
          activeCompObj.value.elType === 'imgp'
            ? 0
            : '',
        min: 0,
        max: 9999,
        threshold: '',
        prefix: '',
        suffix: '',
        moreIds: '',
        splitWords: '',
        current: 0,
        elType: activeCompObj.value.elType,
        id: actionList[activeCompObj.value.elType][0].key,
        name: actionList[activeCompObj.value.elType][0].value,
        content: '',
        label: '',
        tipType: 'info'
      };
      editingIdx.value = -1;
      editingOp.value = '';
    };

    const changeCurrent = () => {
      ruleObj.value.threshold = '';
      ruleObj.value.min = 0;
      ruleObj.value.max = 9999;
      ruleObj.value.content = '';
      ruleObj.value.prefix = '';
      ruleObj.value.suffix = '';
      ruleObj.value.label = '';
      ruleObj.value.moreIds = '';
      ruleObj.value.splitWords = '';
      if (ruleObj.value.current === 0) {
        ruleObj.value.elType = activeCompObj.value.elType;
        ruleObj.value.value =
          activeCompObj.value.elType === 'number' ||
          activeCompObj.value.elType === 'imgp'
            ? 0
            : '';
        ruleObj.value.ruleType = '10';
        ruleObj.value.id = actionList[activeCompObj.value.elType][0].key;
        ruleObj.value.name = actionList[activeCompObj.value.elType][0].value;
      } else {
        ruleObj.value.elType =
          ruleObj.value.elType === 'onlytext' ? 'text' : ruleObj.value.elType;
        ruleObj.value.value =
          ruleObj.value.elType === 'number' || ruleObj.value.elType === 'imgp'
            ? 0
            : '';
        ruleObj.value.ruleType = '10';
        ruleObj.value.id = actionList[ruleObj.value.elType][0].key;
        ruleObj.value.name = actionList[ruleObj.value.elType][0].value;
      }
    };

    const changeElType = () => {
      ruleObj.value.id = actionList[ruleObj.value.elType][0].key;
      ruleObj.value.name = actionList[ruleObj.value.elType][0].value;
      ruleObj.value.ruleType = '10';
      ruleObj.value.value =
        ruleObj.value.elType === 'number' || ruleObj.value.elType === 'imgp'
          ? 0
          : '';
      ruleObj.value.moreIds = '';
      ruleObj.value.splitWords = '';
      ruleObj.value.min = 0;
      ruleObj.value.max = 9999;
      ruleObj.value.content = '';
      ruleObj.value.label = '';
      ruleObj.value.prefix = '';
      ruleObj.value.suffix = '';
      ruleObj.value.tipType = 'info';
    };

    const changeId = () => {
      let elType;
      if (ruleObj.value.current === 0) {
        elType = activeCompObj.value.elType;
      } else {
        elType = ruleObj.value.elType;
      }
      ruleObj.value.name = actionList[elType].filter(
        (action) => action.key === ruleObj.value.id
      )[0].value;
      ruleObj.value.content = '';
      ruleObj.value.label = '';
      ruleObj.value.prefix = '';
      ruleObj.value.moreIds = '';
      ruleObj.value.splitWords = '';
      ruleObj.value.suffix = '';
      ruleObj.value.tipType = 'info';
    };

    const changeType = () => {
      ruleObj.value.id = actionList[ruleObj.value.elType][0].key;
      ruleObj.value.name = actionList[ruleObj.value.elType][0].value;
      ruleObj.value.value =
        ruleObj.value.elType === 'number' || ruleObj.value.elType === 'imgp'
          ? 0
          : '';
      ruleObj.value.min = 0;
      ruleObj.value.max = 9999;
      ruleObj.value.content = '';
      ruleObj.value.label = '';
      ruleObj.value.prefix = '';
      ruleObj.value.suffix = '';
      ruleObj.value.moreIds = '';
      ruleObj.value.splitWords = '';
      ruleObj.value.tipType = 'info';
    };

    const closeDrawer = () => {
      editingRule.value = false;
      ruleObj.value = {
        ...initRule
      };
    };
    const changeMoreIds = () => {
      if (!ruleObj.value.moreIds || ruleObj.value.moreIds.indexOf(',') === -1) {
        ruleObj.value.splitWords = '';
      }
    };

    return {
      closeDrawer,
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
      changeType,
      tableList,
      changeOpp,
      changeMoreIds
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
.tip-color {
  color: var(--color-danger);
}
</style>