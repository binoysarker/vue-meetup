<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div>
                <h3 class="headline">Welcome to meetup website</h3>
                <div>
                  <p>This is a website to set meetup time and date with your desired one. This website is designed using vue js, vuex and vuetify to design this website</p>
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap >
        <v-flex>
          <v-btn large router to="/meetups" class="pink darken-1">Explore Meetups</v-btn>
          <v-btn large router to="/meetups/new" class="pink darken-1">Organize Meetups</v-btn>
        </v-flex>
      </v-layout>
      <!--carosel section-->
      <!--loading section-->
      <v-layout row wrap>
        <v-flex xs12 class="text-sm-center">
          <v-progress-circular
            indeterminate
            :width="7"
            :size="70"
            v-if="loading"
            color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="!loading">
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="(item,i) in meetups"
              :src="item.imageUrl"
              :key="item.id">
              <!--custom text-->
              <div class="title">{{item.title}}</div>

            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
      <!--simple paragraph section-->
      <v-layout row wrap>
        <v-flex >
          <p class="headline text-lg-center">Welcome to this awesome meeting</p>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'Home',
    computed: {
      meetups () {
        try {
          return this.$store.getters.featuredMeetups
        } catch (error) {
          console.log(error)
        }
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    created () {
      // console.log(this.meetups.imageUrl)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  position: absolute;
  color: white;
  background-color: rgba(0,0,0,0.5);
  padding: 20px;
  font-size: 11px;
}
</style>
