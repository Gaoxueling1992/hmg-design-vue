<template>
  <div
    class="picker-flex-edit"
    v-if="ele.defaultValue && ele.defaultValue.length"
  >
    <a-row :gutter="[ele.horSpacing, ele.verSpacing]">
      <a-col
        v-for="(item, index) in ele.defaultValue"
        :key="item.id"
        :span="calSpan(ele, ele.defaultValue.length)"
      >
        <div
          :style="{
          width: ele.layoutType === '3' ? 'auto' : ele.imgWidth + 'px',
          height: ele.layoutType === '2' ? 'auto' : ele.imgHeight + 'px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative'
        }"
          @mouseover.native="mouseEnter=+String(index)"
          @mouseleave.native="mouseEnter=-1"
        >
          <a-image :src="item.url" />
          <!-- <div
            v-if="mouseEnter === +index"
            class="image-modal"
          ></div> -->
          <div
            v-if="mouseEnter === +String(index)"
            class="iconfont iconclose1"
            @click="deleteImg(index)"
          ></div>
        </div>
      </a-col>
    </a-row>
  </div>
  <div
    class="picker-flex-text"
    v-else
  >上传图片</div>
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
    const mouseEnter = ref<number>(-1);

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
          ele.value.defaultValue.push({
            url: base64Url,
            id: Math.random() + ''
          });
        });
      }

      return false;
    };

    const deleteImg = (index: any) => {
      ele.value.defaultValue.splice(index, 1);
      mouseEnter.value = -1;
    };
    return {
      calSpan,
      loading,
      beforeUpload,
      mouseEnter,
      deleteImg
    };
  }
});
</script>
<style lang="scss">
.picker-flex-text {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.picker-flex-edit {
  .ant-image {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    img {
      pointer-events: none;
    }
  }
  .image-modal {
    display: block;
    width: 100px;
    height: 100px;
    top: 0;
    background: var(--background-color-base);
    opacity: 0.7;
    position: absolute;
    z-index: 2;
  }
  .ant-image-img {
    height: 100%;
    width: 100%;
  }
  .iconclose1 {
    font-size: 18px;
    position: absolute;
    right: 2px;
    top: 2px;
    z-index: 3;
    color: var(--color-white);
    line-height: 18px;
    &:hover {
      color: var(--color-primary);
    }
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