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
        <form>
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
                  <fieldset>
                    <input type="file">
                  </fieldset>
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
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-btn class="primary" :disabled="!formisValid">Create Meetup</v-btn>
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
        location: ''
      }
    },
    computed: {
      formisValid () {
        return this.title !== '' &&
          this.description !== '' &&
          this.imageUrl !== '' &&
          this.location !== ''
      }
    }
  }
</script>

<style scoped>

</style>
