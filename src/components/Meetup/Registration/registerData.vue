<template>
  <v-layout row justify-center>
    <!--loading section-->
    <v-flex xs12 class="text-sm-center">
      <v-progress-circular
        indeterminate
        :width="7"
        :size="70"
        v-if="loading"
        color="primary"></v-progress-circular>
    </v-flex>
    <v-spacer></v-spacer>
    <v-btn color="pink" dark @click.native.stop="dialog = true">{{userIsRegistered ? 'Unregister' : 'Register'}}</v-btn>
    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <v-card-title class="headline" v-if="userIsRegistered">Unregister from meetup ?</v-card-title>
        <v-card-title class="headline" v-else>Register from meetup ?</v-card-title>
        <hr>
        <v-card-text>You can always change your meetup later on</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="onAgree">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    props: ['meetupId'],
    methods: {
      onAgree () {
        this.dialog = false
        if (this.userIsRegistered) {
          this.$store.dispatch('UnRegisterUserFromMeetup', this.meetupId)
        } else {
          this.$store.dispatch('RegisterUserForMeetup', this.meetupId)
        }
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      userIsRegistered () {
        return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    created () {
      console.log(this.userIsRegistered, this.meetupId)
    }
  }
</script>

<style scoped>

</style>
