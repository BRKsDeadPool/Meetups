<script>
  export default {
    data: () => ({
      email: '',
      password: '',
      password_confirmation: '',
      p1: true,
      p2: true
    }),
    methods: {
      onSignup () {
        console.log({
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
      }
    },
    computed: {
      comparePasswords() {
        return this.password !== this.password_confirmation ? 'As senhas não são iguais!' : ''
      }
    }
  }
</script>

<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
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
                    <v-text-field name="password_confirmation"
                                  id="password_confirmation"
                                  label="Password"
                                  v-model="password_confirmation"
                                  :rules="[comparePasswords]"
                                  :type="p2 ? 'password' : 'text'"
                                  required
                                  :append-icon="p2 ? 'visibility' : 'visibility_off'"
                                  :append-icon-cb="() => (p2 = !p2)"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Registrar</v-btn>
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
