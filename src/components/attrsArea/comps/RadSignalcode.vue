<template>
  <div class="title marginT10 marginB5 fontW500">源</div>
  <div class="flex marginT10">
    <a-input
      class="flex1 marginR5"
      v-model:value="activeCompObj.src"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title3">底色</div>
    <a-input
      class="flex1 marginR5"
      v-model:value="activeCompObj.background"
    />
    <div class="flex-title2 marginL5">码色</div>
    <a-input
      class="flex1"
      v-model:value="activeCompObj.lineColor"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title1">规格</div>
    <a-radio-group v-model:value="activeCompObj.codeWidth">
      <a-radio :value="1">细</a-radio>
      <a-radio :value="2">中</a-radio>
      <a-radio :value="3">粗</a-radio>
    </a-radio-group>
  </div>
  <div class="flex marginT10">
    <div class="flex-title1">高度</div>
    <a-input-number v-model:value="activeCompObj.codeHeight" min="20"/>
  </div>
  <a-checkbox
    class="marginT10"
    v-model:checked="activeCompObj.displayValue"
  >展示码值</a-checkbox>
  <div class="flex marginT10" v-if="activeCompObj.displayValue">
    <div class="flex-title1">码值</div>
    <a-input v-model:value="activeCompObj.text"/>
  </div>
  <div class="flex marginT10" v-if="activeCompObj.displayValue">
    <div class="flex-title1">对齐</div>
    <a-radio-group v-model:value="activeCompObj.textAlign">
      <a-radio value="left">左</a-radio>
      <a-radio value="center">中</a-radio>
      <a-radio value="right">右</a-radio>
    </a-radio-group>
  </div>
  <div class="flex marginT10" v-if="activeCompObj.displayValue">
    <div class="flex-title1">位置</div>
    <a-radio-group v-model:value="activeCompObj.textPosition">
      <a-radio value="top">顶部</a-radio>
      <a-radio value="bottom">底部</a-radio>
    </a-radio-group>
  </div>
  <div class="flex marginT10" v-if="activeCompObj.displayValue">
    <div class="flex-title2">文字大小</div>
    <a-input-number v-model:value="activeCompObj.textSize" min="12"/>
  </div>
  <div class="title marginT10 marginB5 fontW500">图片大小</div>
  <div class="flex marginT10">
    <div class="flex-title">宽</div>
    <a-input-number
      class="flex1 marginR5"
      v-model:value="activeCompObj.imgWidth"
    />
    <div class="flex-title marginL5">高</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.imgHeight"
    />
  </div>
  <div class="title marginT10 marginB5 fontW500">内边距</div>
  <div class="flex marginT10">
    <div class="flex-title">上</div>
    <a-input-number
      class="flex1 marginR5"
      v-model:value="activeCompObj.styleSheet.paddingTop"
    />
    <div class="flex-title marginL5">下</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.styleSheet.paddingBottom"
    />
  </div>
  <div class="flex marginT10">
    <div class="flex-title">左</div>
    <a-input-number
      class="flex1 marginR5"
      v-model:value="activeCompObj.styleSheet.paddingLeft"
    />
    <div class="flex-title">右</div>
    <a-input-number
      class="flex1"
      v-model:value="activeCompObj.styleSheet.paddingRight"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');
    const fileList = ref([]);
    const loading = ref<boolean>(false);

    const beforeUpload = (file: any) => {
      console.log(file);
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }

      if (isJpgOrPng && isLt2M) {
        activeCompObj.value.src = getBase64(file, (base64Url: string) => {
          activeCompObj.value.src = base64Url;
        });
      }

      return false;
    };

    return {
      fileList,
      loading,
      activeCompObj,
      beforeUpload
    };
  }
});
</script>
<style lang="scss" scoped>
.flex-title {
  width: 20px;
}
.flex-title1 {
  width: 40px;
}
.flex-title2 {
  width: 80px;
}
</style>
