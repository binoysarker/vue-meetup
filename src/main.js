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
import EditMeetup from './components/Meetup/Edit/EditMeetup'
import RegisterMeetup from './components/Meetup/Registration/registerData'

Vue.use(Vuetify)
Vue.filter('filterDate', DateFilter)
Vue.component('alert-section', Alert)
Vue.component('edit-meetup', EditMeetup)
Vue.component('register-section', RegisterMeetup)

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
    // check if the user is authenticated
    firebse.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    // now to fetch all the meetups in the database
    this.$store.dispatch('loadAllMeetups')
  }
})
