<template>
  <div class="user-wrapper">
    <div class="content-box">
      <header-search />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="userInfo.imagePhoto"/>
          <span>{{ userInfo.realname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>{{ $t('menu.account-settings') }}</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="1">
            <a href="javascript:" @click="handleLogout">
              <a-icon type="logout"/>
              <span>{{ $t('menu.logout') }}</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <!--<lang-select />-->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LangSelect from '@/components/tools/LangSelect'
import HeaderSearch from '@/components/tools/HeaderSearch'
import i18n from '@/locales'

export default {
  name: 'UserMenu',
  components: {
    LangSelect,
    HeaderSearch
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      return this.Logout({}).then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 16)
      }).catch(err => {
        this.$message.error({
          title: i18n.t('message.error'),
          description: err.msg
        })
      })
    }
  }
}
</script>
