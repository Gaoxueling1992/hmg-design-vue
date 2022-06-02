<template>
  <div
    class="picker-flex-edit"
    v-if="ele.value && ele.value.length"
  >
    <draggable
      v-model="ele.value"
      @end="consoleIt"
    >
      <div
        v-for="(item, index) in ele.value"
        :key="item.id"
        :span="calSpan(ele, ele.value.length)"
        :style="{
          width: calSpan(ele, ele.value.length)/24*100 + '%',
          float: 'left'
        }"
        @mouseover.native="mouseEnter=+String(index)"
        @mouseleave.native="mouseEnter=-1"
      >
        <div
          :style="{
              width: ele.layoutType === '3' ? 'auto' : ele.imgWidth + 'px',
              height: ele.layoutType === '2' ? 'auto' : ele.imgHeight + 'px',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              marginTop: ele.verSpacing / 2 + 'px',
              marginBottom: ele.verSpacing / 2 + 'px',
            }"
        >
          <img
            style="height:100%;width:100%;"
            :style="{
                paddingLeft: ele.horSpacing / 2 + 'px',
                paddingRight: ele.horSpacing / 2 + 'px',
                width: ele.layoutType !== '3' ? '100%' : 'unset',
                height: ele.layoutType !== '2' ? '100%' : 'unset'
              }"
            :src="item.url"
          >
          <div
            v-show="mouseEnter === +String(index)"
            class="iconfont iconclose"
            @click="deleteImg(index, item)"
          ></div>
        </div>
      </div>
    </draggable>
  </div>
  <div
    class="picker-flex-text"
    v-else-if="!isReadonlyStatus"
  >上传图片</div>
  <a-upload
    name="pic"
    class="pic-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    accept="image/png, image/jpeg, image/jpg"
    v-if="!isReadonlyStatus && !ele.hideSelectBtn"
  >
    <a-button>
      点击上传
    </a-button>
  </a-upload>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  Ref,
  inject,
  watch,
  onMounted
} from 'vue';
import { message } from 'ant-design-vue';
import { VueDraggableNext } from 'vue-draggable-next';

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
  components: {
    draggable: VueDraggableNext
  },
  setup(props) {
    const { ele } = toRefs(props);
    const pageId: any = inject('pageId');
    const loading = ref<boolean>(false);
    const mouseEnter = ref<number>(-1);

    const consoleIt = () => {
      let newList = [];
      let applyedImgs = [];
      for (let i = 0; i < ele.value.value.length; i++) {
        ele.value.value[i].tempPrintFlag = i + 1;
        newList.push(ele.value.value[i].imageInstanceUid);
        applyedImgs.push(ele.value.value[i]);
      }
      window.parent.postMessage(
        {
          type: 'afterDraggedImgs',
          newList: JSON.stringify(newList),
          applyedImgs: JSON.stringify(applyedImgs),
          pageId: pageId.value
        },
        '*'
      );
    };

    window.addEventListener('message', async (e) => {
      if (e.data.type === 'applyImg') {
        let item = JSON.parse(e.data.data);
        for (let i = 0; i < ele.value.value.length; i++) {
          if (ele.value.value[i].imageInstanceUid === item.imageInstanceUid) {
            return;
          }
        }
        ele.value.value.push(JSON.parse(e.data.data));
      } else if (e.data.type === 'deleteImg') {
        for (let i = 0; i < ele.value.value.length; i++) {
          if (ele.value.value[i].imageInstanceUid === e.data.data) {
            ele.value.value.splice(i, 1);
          }
        }
      }
    });

    const beforeUpload = (file: any) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('仅支持上传png和jpeg格式的图片');
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        message.error('不支持上传10M以上的图片');
      }

      if (isJpgOrPng && isLt2M) {
        getBase64(file, (base64Url: string) => {
          ele.value.value.push({
            url: base64Url,
            id: Math.random() + ''
          });
        });
      }

      return false;
    };

    const deleteImg = (index: any, item: any) => {
      window.parent.postMessage(
        { type: 'deleteImg', data: JSON.stringify(item), pageId: pageId.value },
        '*'
      );
      ele.value.value.splice(index, 1);
      mouseEnter.value = -1;
    };
    onMounted(() => {
      watch(
        ele,
        (val, oldVal) => {
          window.parent.postMessage(
            {
              type: 'tempSaveApplyImgs',
              data: JSON.stringify(val.value),
              pageId: pageId.value
            },
            '*'
          );
        },
        { deep: true }
      );
    });

    const isReadonlyStatus: Ref<boolean> = inject('isReadonlyStatus');
    return {
      calSpan,
      loading,
      beforeUpload,
      mouseEnter,
      deleteImg,
      isReadonlyStatus,
      consoleIt
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
  .iconclose {
    font-size: 18px;
    position: absolute;
    right: 2px;
    top: 2px;
    z-index: 3;
    background: var(--color-white);
    line-height: 18px;
    &:hover {
      color: var(--color-primary);
    }
  }
  .ant-row {
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