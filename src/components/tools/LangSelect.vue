<template>
  <a-dropdown>
    <span class="action global-lang">
      <a-icon type="global" style="font-size: 16px"/>
    </span>
    <a-menu slot="overlay" style="width: 150px;" @click="SwitchLang">
      <a-menu-item key="zh-CN">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="中文">🇨🇳</span> 中文
        </a>
      </a-menu-item>
      <a-menu-item key="ko-KR">
        <a rel="noopener noreferrer">
          <span role="img" aria-label="한글">🇰🇷</span> 한글
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mixin as langMixin } from '@/store/i18n-mixin'

export default {
  name: 'LangSelect',
  mixins: [langMixin],
  data () {
    return {}
  },
  methods: {
    SwitchLang (row) {
      this.setLang(row.key)
    }
  }
}
</script>
