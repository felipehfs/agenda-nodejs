import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import './config/axios'
import {store} from './config/vuex'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
