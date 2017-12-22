<template>
  <v-app >

    <!--navigation section-->
    <v-toolbar class="pink darken-1" dark>
      <!--hambarger menue-->
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
      >

      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">MeetUp</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        class="hidden-xs-only"
        v-for="(item,index) in menuItems"
        :key="item.title"
      >
        <v-btn
          flat

          :to="item.link"
        >

          <v-icon left>
            {{item.icon}}
          </v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items
        class="hidden-xs-only"
      >
        <v-btn
          flat
          v-if="userIsAuthenticated"
          @click="onLogout"
        >
          <v-icon left>
            exit_to_app
          </v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!--floating sidebar section navigation menu for mobile device-->

    <v-navigation-drawer
      temporary
      v-model="sideNav"
      absolute
    >
      <v-layout right>
        <v-flex >
          <v-btn
            @click.stop="sideNav = !sideNav"
            color="pink"
            class="sm5"
            small
          >
            close
          </v-btn>
        </v-flex>
      </v-layout>
      <!--all the list items-->
      <v-container>
        <v-layout row>
          <v-flex>
            <v-list>
              <v-list-tile
                v-for="(item,index) in menuItems"
                :key="item.title"
                :to="item.link"
              >
                <v-list-tile-action>
                  <v-icon >{{item.icon}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{item.title}}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="userIsAuthenticated"
              @click="onLogout">
                <v-list-tile-action>
                  <v-icon >exit_to_app</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Log out
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>

    </v-navigation-drawer>
    <!--main section-->
    <main>
      <router-view name="Home"></router-view>
      <router-view name="Meetups"></router-view>
      <router-view name="CreateMeetups"></router-view>
      <router-view name="SingleMeetup"></router-view>
      <router-view name="Profile"></router-view>
      <router-view name="SignIn"></router-view>
      <router-view name="SignUp"></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Signup', link: '/sign-up'},
          {icon: 'lock_open', title: 'Sign in', link: '/sign-in'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'supervisor_account', title: 'Vue Meetups', link: '/meetups'},
            {icon: 'menue', title: 'Organise Meetup', link: '/meetups/new'},
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    created () {
      console.log(this.userIsAuthenticated)
    }
  }
</script>
