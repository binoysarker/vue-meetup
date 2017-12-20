import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg',
        id: '1',
        title: 'title1',
        date: '2017-10-2'
      },
      {
        imageUrl: 'https://travel.usnews.com/static-travel/images/destinations/44/empire_state_building_getty_zsolt_hlinka.jpg',
        id: '2',
        title: 'title2',
        date: '2017-10-3'
      },
      {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrpgpEXcX-iIJGpcPN_g-OSWFoPpUfeieO8NvPyUQGyRZ1ByB',
        id: '3',
        title: 'title3',
        date: '2017-10-4'
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2015/09/13/14/06/new-york-938212_960_720.jpg',
        id: '4',
        title: 'title4',
        date: '2017-10-5'
      }
    ],
    user: {
      id: '1',
      name: '',
      registeredMeetups: []
    }
  },
  mutations: {},
  actions: {},
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
    }
  }
})
