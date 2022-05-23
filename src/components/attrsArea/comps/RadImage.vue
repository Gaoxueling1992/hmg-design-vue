<template>
  <div class="title marginT10 marginB5 fontW500">上传图片</div>
  <a-upload
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    accept="image/png, image/jpeg, image/jpg"
  >
    <img height="100" width="100" v-if="activeCompObj.src" :src="activeCompObj.src"/>
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">上传</div>
    </div>
  </a-upload>
  <div class="title marginT10 marginB5 fontW500">图片大小</div>
  <div class="flex marginT10">
    <div class="flex-title">宽</div>
    <a-input-number class="flex1 marginR5" v-model:value="activeCompObj.imgWidth"/>
    <div class="flex-title marginL5">高</div>
    <a-input-number class="flex1" v-model:value="activeCompObj.imgHeight"/>
  </div>
  <div class="title marginT10 marginB5 fontW500">内边距</div>
  <div class="flex marginT10">
    <div class="flex-title">上</div>
    <a-input-number class="flex1 marginR5" v-model:value="activeCompObj.styleSheet.paddingTop"/>
    <div class="flex-title marginL5">下</div>
    <a-input-number class="flex1" v-model:value="activeCompObj.styleSheet.paddingBottom"/>
  </div>
  <div class="flex marginT10">
    <div class="flex-title">左</div>
    <a-input-number class="flex1 marginR5" v-model:value="activeCompObj.styleSheet.paddingLeft"/>
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
    PlusOutlined,
  },
  setup () {
    const activeCompObj: any = inject('activeCompObj');
    const fileList = ref([]);
    const loading = ref<boolean>(false);

    const beforeUpload = (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('仅支持上传png和jpeg格式的图片');
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        message.error('不支持上传10M以上的图片');
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
      beforeUpload,
    };
  },
})
</script>
<style lang="scss" scoped>
.flex-title {
  width: 20px;
}
</style>
