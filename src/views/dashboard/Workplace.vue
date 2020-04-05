<template>
  <page-view :avatar="userInfo.imagePhoto" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ userInfo.realname }}</div>
      <div>巴拉巴拉巴拉</div>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { PageView } from '@/layouts'
import { mapGetters } from 'vuex'

export default {
  name: 'Workplace',
  components: {
    PageView
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      timeFix: timeFix()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
