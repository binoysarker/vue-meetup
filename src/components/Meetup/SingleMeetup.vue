<template>
  <v-container>
    <v-layout row wrap>
      <!--loading section-->
      <v-flex xs12 class="text-sm-center">
        <v-progress-circular
          indeterminate
          :width="7"
          :size="70"
          v-if="loading"
          color="primary"></v-progress-circular>
      </v-flex>
      <v-flex xs12 >
        <v-card>
          <v-card-text>
            <h3 class="headline left">{{singleMeetup.title}}</h3>
            <v-spacer></v-spacer>
            <!--open modal to edit the meetup-->
            <edit-meetup
              v-if="userIsCreator"
              :singleMeetup="singleMeetup">
              <template slot="activator" color="warning" class=""></template>
            </edit-meetup>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-card class="primary">
          <v-card-media
            :src="singleMeetup.imageUrl"
            height="400px"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div class="white--text">
              <h3 class="headline mb-0 "></h3>
              <p>on {{singleMeetup.date}} at {{singleMeetup.time}} it takes place in {{singleMeetup.location}}</p>
              <p></p>
            </div>
          </v-card-title>
          <v-card-actions>
            <!--open modal to edit the meetup-->
            <register-section
              v-if="userIsCreator"
              :meetupId="singleMeetup.id"
              :singleMeetup="singleMeetup">
              <template slot="activator" color="warning" class=""></template>
            </register-section>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'SingleMeetup',
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      singleMeetup () {
        return this.$store.getters.singleloadedMeetup(this.$route.params.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.singleMeetup.creatorId
      }
    },
    created () {
      // console.log(this.$route.path)
    }
  }
</script>

<style scoped>

</style>
