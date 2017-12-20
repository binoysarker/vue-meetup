<template>
    <v-container>
      <v-layout row wrap >
        <v-flex>
          <v-btn large router to="/meetups" class="pink darken-1">Explore Meetups</v-btn>
          <v-btn large router to="/meetups/new" class="pink darken-1">Organize Meetups</v-btn>
        </v-flex>
      </v-layout>
      <!--carosel section-->
      <v-layout row wrap>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="(item,i) in meetups"
              :src="item.imageUrl"
              :to="'/meetups/'+item.id"
              style="cursor: pointer;"
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
        return this.$store.getters.featuredMeetups
      }
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
