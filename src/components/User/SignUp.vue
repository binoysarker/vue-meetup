<template>
  <v-container>
    <!--display error message-->
    <v-layout row wrap v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <alert-section @dismissed="onDismissed" :text="error.message"></alert-section>
      </v-flex>
    </v-layout>
    <v-layout row wrao>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                    name="confirmpassword"
                    label="Password"
                    id="confirmpassword"
                    v-model="confirmpassword"
                    type="password"
                    :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrao>
                  <v-flex xs12>
                    <v-btn
                    type="submit"
                    color="info"
                    :loading="loading"
                    :disabled="loading">
                      Sign Up
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'SignUp',
    data () {
      return {
        email: '',
        password: '',
        confirmpassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.confirmpassword !== this.password ? 'passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignUp () {
      //  Vuex
        this.$store.dispatch('SignUserUp', {email: this.email, password: this.password})
      },
      onDismissed () {
        console.log('dismissed alert')
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style scoped>

</style>
