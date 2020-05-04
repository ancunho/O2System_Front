<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <h1>
        <span class="open">{{ title }}</span>
        <span class="close">{{ title2 }}</span>
      </h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '江苏科玛销售日志管理系统',
      required: false
    },
    title2: {
      type: String,
      default: '江苏科玛',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
