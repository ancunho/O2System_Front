/**
 * Vue i18n loader
 * created by @musnow
 * https://github.com/musnow
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// default language
import zhCN from './lang/zh-CN'
import koKR from './lang/ko-KR'
// change default accept-language
import { axios } from '@/utils/request'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

Vue.use(VueI18n)
Vue.use(VueStorage, config.storageOptions)

export const defaultLang = 'zh-CN'

const messages = {
  'zh-CN': {
    ...zhCN
  },
  'ko-KR': {
    ...koKR
  }
}

const i18n = new VueI18n({
  locale: Vue.ls.get('lang') !== null ? Vue.ls.get('lang') : defaultLang,
  fallbackLocale: defaultLang,
  messages
})

export default i18n

const loadedLanguages = [defaultLang]

// 从缓存設置中加载当前语言
if (Vue.ls.get('lang') !== null && defaultLang !== Vue.ls.get('lang')) {
  loadLanguageAsync(Vue.ls.get('lang'))
}

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

/**
 * i18n Render
 * @param key
 * @returns rendered string
 */
export function i18nRender (key) {
  return i18n.t(key)
}

export function loadLanguageAsync (lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    Vue.ls.set('lang', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          i18n.setLocaleMessage(lang, msg.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}
