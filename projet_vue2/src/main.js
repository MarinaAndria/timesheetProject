import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import VueApexCharts from 'vue-apexcharts'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

const toastrConfigs = {
  position: 'top right',
  showDuration: 50,
  timeOut: 5000
}
Vue.use(CxltToastr, toastrConfigs)


Vue.use(VueCookies);
Vue.config.productionTip = false
Vue.component('apexchart', VueApexCharts)

// set auth header
axios.defaults.headers.common['Authorization'] = `er ${store.state.token}`;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
