<script>
  export default {
    data: () => ({
      email: '',
      password: '',
      p1: true,
      p2: true
    }),
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {
          email: this.email,
          password: this.password
        })
      },
      onDismissed() {
        this.$store.dispatch('clearAuthError')
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      },
      loading() {
        return this.$store.getters.loading
      },
      error() {
        return this.$store.getters.authError
      }
    },
    watch: {
      user(value) {
        if (value !== null && value !== 'undefined') {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed">{{ error.message }}</app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email"
                                  id="email"
                                  label="E-mail"
                                  v-model="email"
                                  type="email"
                                  required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password"
                                  id="password"
                                  label="Password"
                                  v-model="password"
                                  :type="p1 ? 'password' : 'text'"
                                  required
                                  :append-icon="p1 ? 'visibility' : 'visibility_off'"
                                  :append-icon-cb="() => (p1 = !p1)"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :loading="loading" :disabled="loading">
                      <span class="custom-loader" slot="loader">
                        <v-icon light>cached</v-icon>
                      </span>
                      Entrar
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
