// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import * as firebse from 'firebase'
import router from './router'
import {store} from './store'
import DateFilter from './filters/date'
/*
importing custom css
 */
import css from './assets/css/alert.css'
import Alert from './components/Share/Alert'

Vue.use(Vuetify)
Vue.filter('filterDate', DateFilter)
Vue.component('alert-section', Alert)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  css,
  template: '<App/>',
  components: { App },
  created () {
    firebse.initializeApp({
      apiKey: 'AIzaSyBCXqvjGbrc2OOTRIlVJPhUIvTXL8i80FU',
      authDomain: 'vue-meetup-829c8.firebaseapp.com',
      databaseURL: 'https://vue-meetup-829c8.firebaseio.com',
      projectId: 'vue-meetup-829c8',
      storageBucket: 'vue-meetup-829c8.appspot.com'
    })
    firebse.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
      } else {
        console.log(user + ' is not authenticate')
      }
    })
  }
})
