<template>
  <div class="picker-flex" v-if="ele.imgList && ele.imgList.length">
    <a-row :gutter="[ele.horSpacing, ele.verSpacing]">
      <a-col
        v-for="item in +ele.imgList"
        :key="item.id"
        :span="calSpan(ele)"
      >
        <div :style="{
          width: ele.layoutType === '3' ? 'auto' : ele.imgWidth + 'px',
          height: ele.layoutType === '2' ? 'auto' : ele.imgHeight + 'px',
          border: '1px solid grey',
          margin: '0 auto',
          textAlign: 'center'
        }">图片
        </div>
      </a-col>
    </a-row>
  </div>
  <div class="picker-flex-text" v-else>可上传本地图片或直接应用图片</div>
  <a-upload
    v-model:file-list="fileList"
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
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';

// 图片选择器 计算布局
const calSpan = (ele: any) => {
  let span;
  if (ele.layout === '1') {
    span = 24 / +ele.perNum;
  } else {
    if (ele.testTotalNum === 3) {
      span = 24 / +ele.testTotalNum;
    } else {
      span = 24 / Math.ceil(Math.sqrt(ele.testTotalNum));
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
  setup (props) {
    // const ele = toRefs(props);
    const fileList = ref([]);
    const loading = ref<boolean>(false);

    const beforeUpload = (file: any) => {
      console.log(file)
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }

      if (isJpgOrPng && isLt2M) {
        // ele.src = getBase64(file, (base64Url: string) => {
        //   ele.src = base64Url;
        // });
      }

      return false;
    };
    return {
      calSpan,
      fileList,
      loading
    }
  },
})
</script>
<style lang="scss" scoped>
.picker-flex, .picker-flex-text {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.picker-flex-text {
  border: 1px solid var(--border-color-lighter);
  padding: 20px;
}
.pic-uploader {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>