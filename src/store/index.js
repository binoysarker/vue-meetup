import Vue from 'vue'
import * as firebase from 'firebase'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: null,
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
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
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadAllMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              time: obj[key].time,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id
      }
    //  reachout to firebase
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          console.log(data)
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      commit('createMeetup', meetup)
    },
    SignUserUp ({commit}, payload) {
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
          this.$router.push('/')
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    // for auto sign in the user
    autoSignIn ({commit}, payload) {
      commit('SetUser', {
        id: payload.uid,
        registeredMeetups: []
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
          this.$router.push('/')
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('SetUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.time > meetupB.time
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
      if (state.loadedMeetups === null) {
        return false
      } else {
        return getters.loadedMeetups.slice(0, 5)
      }
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
