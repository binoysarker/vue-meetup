import Vue from 'vue'
import * as firebase from 'firebase'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg',
        id: '1',
        title: 'title1',
        description: 'description1',
        location: 'location1',
        date: new Date(),
        time: new Date()
      },
      {
        imageUrl: 'https://travel.usnews.com/static-travel/images/destinations/44/empire_state_building_getty_zsolt_hlinka.jpg',
        id: '2',
        title: 'title2',
        description: 'description2',
        location: 'location2',
        date: new Date(),
        time: new Date()
      },
      {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrpgpEXcX-iIJGpcPN_g-OSWFoPpUfeieO8NvPyUQGyRZ1ByB',
        id: '3',
        title: 'title3',
        description: 'description3',
        location: 'location3',
        date: new Date(),
        time: new Date()
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2015/09/13/14/06/new-york-938212_960_720.jpg',
        id: '4',
        title: 'title4',
        description: 'description4',
        location: 'location4',
        date: new Date(),
        time: new Date()
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    SetUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state, payload) {
      state.error = null
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: payload.date,
        id: 'slkdfjald'
      }
    //  reachout to firebase
      commit('createMeetup', meetup)
    },
    SignUserUp: function ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          commit('clearError')
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('SetUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    SignUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          commit('clearError')
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('SetUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    singleloadedMeetup (state) {
      return (Id) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === Id
        })
      }
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
