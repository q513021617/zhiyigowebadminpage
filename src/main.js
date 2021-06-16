import Vue from 'vue'
import App from './App.vue'
import router from './router'
import httpmethods from './tools/http'
import store from './store'
import cors from 'koa2-cors'
import '@/tools/jquery-vender.js'
import mavonEditor from 'mavon-editor'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'mavon-editor/dist/css/index.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/dist/js/adminlte.min.js'
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'
import 'admin-lte/plugins/chart.js/Chart.min.js'
Vue.use(mavonEditor)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  cors,

  httpmethods,
  render: h => h(App)
}).$mount('#app')
