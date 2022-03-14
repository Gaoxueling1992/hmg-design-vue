<template>
  <div class="title marginT10 marginB5 fontW500">源</div>
  <div class="flex marginT10">
    <a-input
      class="flex1 marginR5"
      v-model:value="activeCompObj.src"
    />
  </div>
  <div class="flex marginT10 dr-demo">
    <qrcode-vue
      :value="activeCompObj.src"
      size="100"
      :background="activeCompObj.background"
      :foreground="activeCompObj.lineColor"
      :id="'canvas' + activeCompObj.id"
    />
    <a-button
      type="primary"
      v-if="activeCompObj.src"
      class="apply-btn"
      @click="applyDr"
    >生成图片</a-button>
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
import { defineComponent, inject } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import QrcodeVue from 'qrcode.vue';

export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
    QrcodeVue
  },
  setup() {
    const activeCompObj: any = inject('activeCompObj');

    const applyDr = () => {
      const id = 'canvas' + activeCompObj.value.id;
      const canvas: any = document.getElementById(id);
      activeCompObj.value.img = canvas.toDataURL('image/png', 1);
    };
    return {
      activeCompObj,
      applyDr
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
.dr-demo {
  position: relative;
}
.apply-btn {
  position: absolute;
  top: 30px;
  right: 50px;
}
</style>
