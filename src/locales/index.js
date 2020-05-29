import Vue from 'vue'
import VueI18n from 'vue-i18n'
import storage from 'store'
// import moment from 'moment'
import ElementLocale from 'element-ui/lib/locale'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
// default lang
import zhCN from './lang/zh-CN'
import enUS from './lang/en'

Vue.use(VueI18n)

export const defaultLang = 'zh-CN'

const messages = {
  'zh-CN': {
    ...zhLocale,
    ...zhCN
  },
  'en-Us': {
    ...enLocale,
    ...enUS
  }
}

const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

const loadedLanguages = [defaultLang]

function setI18nLanguage (lang) {
  i18n.locale = lang
  // request.headers['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang = defaultLang) {
  console.log(1)
  return new Promise(resolve => {
    // 缓存语言设置
    storage.set('lang', lang)
    console.log(2)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          const locale = msg.default
          console.log(3)
          i18n.setLocaleMessage(lang, locale)
          console.log(4)
          loadedLanguages.push(lang)
          // moment.updateLocale(locale.momentName, locale.momentLocale)
          return setI18nLanguage(lang)
        })
      }
      console.log(5)
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}

export function i18nRender (key) {
  return i18n.t(`${key}`)
}

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
