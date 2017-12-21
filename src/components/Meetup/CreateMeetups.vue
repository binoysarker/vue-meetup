<template>
  <v-container class="pa-2 ma-2">
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <div>
          <h2 class="pink--text">Create a new meetup</h2>
        </div>
      </v-flex>
    </v-layout>
    <!--form section-->
    <v-layout row wrap>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="title"
              >

              </v-text-field>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                required
                v-model="location"
              >

              </v-text-field>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                required
                v-model="imageUrl"
              >

              </v-text-field>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-card>
                    <v-card-media :src="imageUrl" height="200px">

                    </v-card-media>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                required
                v-model="description"
              >

              </v-text-field>
              <!--date picker-->
              <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    slot="activator"
                    label="Pick a date"
                    v-model="date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="date" locale></v-date-picker>
                </v-flex>
              </v-layout>
              <!--time picker-->
              <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    slot="activator"
                    label="Pick a date"
                    v-model="time"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-time-picker v-model="time" locale formate="24hr"></v-time-picker>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-btn
                    class="primary"
                    :disabled="!formisValid"
                    type="submit"
                  >Create Meetup</v-btn>
                </v-flex>
              </v-layout>

            </v-flex>

          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'CreateMeetups',
    data () {
      return {
        title: '',
        description: '',
        imageUrl: '',
        location: '',
        date: '',
        time: ''
      }
    },
    computed: {
      formisValid () {
        return this.title !== '' &&
          this.description !== '' &&
          this.imageUrl !== '' &&
          this.location !== '' &&
          this.date !== ''
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formisValid) {
          return false
        }
        const meetupDate = {
          title: this.title,
          description: this.description,
          imageUrl: this.imageUrl,
          location: this.location,
          date: this.date
        }
        this.$store.dispatch('createMeetup', meetupDate)
        this.$router.push('/meetups')
      }
    }
  }
</script>

<style scoped>

</style>
