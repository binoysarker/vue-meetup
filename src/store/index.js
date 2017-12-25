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
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbkeys[id] = payload.fbkey
    },
    UnregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload.id), 1)
      Reflect.deleteProperty(state.user.fbkeys, payload)
    },
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    UpdateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.location) {
        meetup.location = payload.location
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      if (payload.time) {
        meetup.time = payload.time
      }
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
    RegisterUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
    //  to register the user in the database
      firebase.database().ref('/users/' + user.id).child('/registration/').push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, fbkey: data.key})
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    UnRegisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbkeys) {
        return
      }
      const fbkey = user.fbkeys[payload]
      firebase.database().ref('/users/' + user.id + '/registration/').child(fbkey).remove()
        .then(() => {
          commit('setLoading', false)
          commit('UnregisterUserFromMeetup', payload)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
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
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id
      }
    // reachout to firebase
    // before starting the whole promis chain let create some variable
      let imageUrl = ''
      let key = ''
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          console.log(data)
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
        //  now to store the file with extension in the firebase storage
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(imageInfo => {
          imageUrl = imageInfo.metadata.downloadURLs[0]
        //  now to update the database with this download url
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        // at last commit change for the image
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key,
            imageUrl: imageUrl
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
            registeredMeetups: [],
            fbkeys: {}
          }
          commit('SetUser', newUser)
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
        registeredMeetups: [],
        fbkeys: {}
      })
    },
    // when the user is signed in then fetch the registration data for that user
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value')
        .then(dataPairs => {
          // const values = dataPairs.val()
          console.log(dataPairs)
          /*
          let registeredMeetups = []
          let swapedPairs = {}
          for (let key in values) {
            registeredMeetups.push(values[key])
            swapedPairs[dataPairs[key]] = key
          }
          console.log(registeredMeetups)
          */
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
            registeredMeetups: [],
            fbkeys: {}
          }
          commit('SetUser', newUser)
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
    },
    UpdateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.location) {
        updateObj.location = payload.location
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      if (payload.time) {
        updateObj.time = payload.time
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('UpdateMeetup', payload)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      if (state.loadedMeetups != null) {
        return state.loadedMeetups.sort((meetupA, meetupB) => {
          return meetupA.time > meetupB.time
        })
      }
    },
    singleloadedMeetup (state, getters) {
      return (Id) => {
        return getters.loadedMeetups.find((meetup) => {
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
