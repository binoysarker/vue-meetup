import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/AllMeetups'
import CreateMeetups from '@/components/Meetup/CreateMeetups'
import SingleMeetup from '@/components/Meetup/SingleMeetup'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', components: {'Home': Home}},
    {path: '/meetups', components: {'Meetups': Meetups}},
    {path: '/meetups/new', components: {'CreateMeetups': CreateMeetups}},
    {path: '/meetups/:id', components: {'SingleMeetup': SingleMeetup}},
    {path: '/profile', components: {'Profile': Profile}},
    {path: '/sign-in', components: {'SignIn': SignIn}},
    {path: '/sign-up', components: {'SignUp': SignUp}}
  ],
  mode: 'history'
})
