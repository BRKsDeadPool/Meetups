<script>
  export default {
    name: 'RegisterPage',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  }
</script>

<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="display-3 text-xs-center">Registre-se</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3 xl4 offset-xl4>
        <v-card>
          <v-card-text>
            <form @submit.prevent>
              <v-text-field
              v-model="name"
              label="Nome"
              data-vv-name="Nome"
              required
              :error-messages="errors.collect('Nome')"></v-text-field>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
