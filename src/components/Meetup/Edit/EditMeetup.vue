<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="450px">
      <v-btn color="pink" dark slot="activator">Edit</v-btn>
      <v-card>
        <v-card-title class="headline">Edit Meetup</v-card-title>
        <v-card-text>
          <v-flex>
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
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="menu1"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                label="Picker in menu"
                v-model="date"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="save">OK</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="menu2"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              max-width="290px"
              min-width="290px">
              <v-text-field
                slot="activator"
                label="Picker in menu"
                v-model="time"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-time-picker v-model="time" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="save">OK</v-btn>
                  </v-card-actions>
                </template>
              </v-time-picker>
            </v-menu>
            <v-text-field
              name="description"
              label="Description"
              id="description"
              multi-line
              required
              v-model="description"
            >

            </v-text-field>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" flat @click.native="onSaveChange">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        menu1: false,
        menu2: false,
        modal: false,
        title: this.singleMeetup.title,
        location: this.singleMeetup.location,
        description: this.singleMeetup.description,
        date: this.singleMeetup.date,
        time: this.singleMeetup.time
      }
    },
    props: ['singleMeetup'],
    methods: {
      onSaveChange () {
        if (this.title.trim() === '' || this.location.trim() === '') {
          return
        }
        this.dialog = false
        this.$store.dispatch('UpdateMeetupData', {
          id: this.singleMeetup.id,
          title: this.title,
          description: this.description,
          date: this.date,
          time: this.time,
          location: this.location
        })
      }
    }
  }
</script>

<style scoped>

</style>
