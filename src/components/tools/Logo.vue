<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <img src="/logo.png" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '콜마',
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
