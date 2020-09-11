import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification'

import 'vue-toast-notification/dist/theme-default.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'

Vue.use(BootstrapVue)
Vue.use(VueToast)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
