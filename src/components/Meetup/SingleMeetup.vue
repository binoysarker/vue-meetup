<template>
  <v-container>
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
              <h3 class="headline mb-0 ">{{singleMeetup.title}}</h3>
              <p>on {{singleMeetup.date}} it takes place</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci expedita harum illum ipsam iste itaque libero mollitia nihil perspiciatis placeat porro praesentium quasi quibusdam reiciendis reprehenderit, sed similique tempora voluptatum.</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" class="pink darken-1">Share</v-btn>
            <v-btn flat color="orange" class="pink darken-1">Explore</v-btn>
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
      singleMeetup () {
        return this.$store.getters.singleloadedMeetup(this.$route.params.id)
      }
    },
    created () {
      console.log(this.$route.params.id, this.singleMeetup.date)
    }
  }
</script>

<style scoped>

</style>
