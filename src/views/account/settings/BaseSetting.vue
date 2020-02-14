<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item
            label="昵称"
          >
            <a-input placeholder="给自己起个名字" />
          </a-form-item>
          <a-form-item
            label="Bio"
          >
            <a-textarea rows="4" placeholder="You are not alone."/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary">提交</a-button>
            <a-button style="margin-left: 8px">保存</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>

  </div>
</template>

<script>
import AvatarModal from '@/components/tools/AvatarModal'

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  methods: {
    setavatar (url) {
      this.option.img = url
    }
  }
}
</script>
