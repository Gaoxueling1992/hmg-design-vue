<template>
  <div
    class="picker-flex-edit"
    v-if="ele.imgList && ele.imgList.length"
  >
    <a-row :gutter="[ele.horSpacing, ele.verSpacing]">
      <a-col
        v-for="item in ele.imgList"
        :key="item.id"
        :span="calSpan(ele, ele.imgList.length)"
      >
        <div :style="{
          width: ele.layoutType === '3' ? 'auto' : ele.imgWidth + 'px',
          height: ele.layoutType === '2' ? 'auto' : ele.imgHeight + 'px',
          margin: '0 auto',
          textAlign: 'center'
        }">
          <a-image :src="item.url" />
        </div>
      </a-col>
    </a-row>
  </div>
  <div
    class="picker-flex-text"
    v-else
  >可上传本地图片或直接应用图片</div>
  <a-upload
    name="pic"
    class="pic-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    accept="image/png, image/jpeg, image/jpg"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      点击上传
    </a-button>
  </a-upload>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';

// 图片选择器 计算布局
const calSpan = (ele: any, length: number) => {
  let span;
  if (ele.layout === '1') {
    span = 24 / +ele.perNum;
  } else {
    if (length === 3) {
      span = 24 / +length;
    } else {
      span = 24 / Math.ceil(Math.sqrt(length));
    }
  }
  return span;
};

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export default defineComponent({
  props: ['ele'],
  setup(props) {
    const { ele } = toRefs(props);
    const loading = ref<boolean>(false);

    const beforeUpload = (file: any) => {
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
        getBase64(file, (base64Url: string) => {
          ele.value.imgList.push({
            url: base64Url,
            id: Math.random() + ''
          });
        });
      }

      return false;
    };
    return {
      calSpan,
      loading,
      beforeUpload
    };
  }
});
</script>
<style lang="scss">
.picker-flex-edit,
.picker-flex-text {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.picker-flex-edit {
  .ant-image {
    height: 100%;
    width: 100%;
  }
  .ant-image-img {
    height: 100%;
    width: 100%;
  }
}
.picker-flex-text {
  border: 1px solid var(--border-color-lighter);
  padding: 20px;
}
.pic-uploader {
  float: right;
}
.w-e-dp-title {
  display: none !important;
}
</style>