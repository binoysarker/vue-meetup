<template>
  <v-container>
    <v-layout
      row
      v-for="(item,i) in meetups"
      :key="item.id"
      class="mb-2"
    >
      <v-flex xs12>
        <v-card
          class="primary"

        >
          <v-container fluid>
            <v-layout
              row
            >
              <v-flex xs5 md4 sm3>
                <v-card-media
                  :src="item.imageUrl"
                  height="150px"
                  width="120px"

                ></v-card-media>
              </v-flex>
              <!--description about the meetup-->
              <v-flex xs7 md8 sm9>
                <v-card-title primary-title>
                  <div class="white--text">
                    <h2 >{{item.title}}</h2>
                    <p>{{item.date}}</p>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    flat
                    class="pink darken-1"
                    :to="'/meetups/'+item.id"
                  >
                    <v-icon left>
                      arrow_forward
                    </v-icon>
                    Vue Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'AllMeetups',
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      }
    }
  }
</script>

<style scoped>

</style>
