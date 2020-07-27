import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales'
// 导入懒加载组件
import './core/lazy_use'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import './mock'
import bootstrap from './core/bootstrap'
import './permission' // permission control
import './utils/filter' // global filter
import './styles/index.scss'
import './assets/font-awesome/font-awesome.css'

locale.use(lang)

Vue.config.productionTip = false
console.log('i18n', i18n)
new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
