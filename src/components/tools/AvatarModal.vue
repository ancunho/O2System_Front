<template>

  <a-modal
    title="上传图片"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="800"
    :footer="null"
    @cancel="cancelHandel">
    <a-row>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img"/>
        </div>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
          <a-button icon="upload">选择图片</a-button>
        </a-upload>
      </a-col>
      <a-col :lg="{span: 1, offset: 2}" :md="2">
        <a-button icon="plus" @click="changeScale(1)"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="minus" @click="changeScale(-1)"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="undo" @click="rotateLeft"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="redo" @click="rotateRight"/>
      </a-col>
      <a-col :lg="{span: 2, offset: 6}" :md="2">
        <a-button type="primary" @click="finish()">保存</a-button>
      </a-col>
    </a-row>
  </a-modal>

</template>
<script>
import { uploadFileUrl } from '@/api/common'

export default {
  data () {
    return {
      visible: false,
      confirmLoading: false,
      fileList: [],
      uploading: false,
      action: '',
      options: {
        img: '',
        autoCrop: true,
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true
      },
      previews: {}
    }
  },
  methods: {
    edit (type, id) {
      this.action = `?type=${type}&id=${id}`
      console.log(this.action)
      this.visible = true
    },
    close () {
      this.visible = false
    },
    cancelHandel () {
      this.close()
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    beforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
      }

      return false
    },
    // 上传图片（点击上传按钮）
    finish (type) {
      const _this = this
      const formData = new FormData()
      this.$refs.cropper.getCropBlob((data) => {
        formData.append('singleImageUpload', data, this.fileName)
        this.$http.post(uploadFileUrl + this.action, formData)
          .then((response) => {
            _this.$emit('ok', response.data)
            _this.visible = false
          }).catch()
      })
    },
    realTime (data) {
      this.previews = data
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
