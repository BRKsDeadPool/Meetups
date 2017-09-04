<script>
  export default {
    props: ['meetup'],
    data() {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegistered() {
        return this.$store.getters.user.registeredMeetups.findIndex(meetup => {
            return meetup === this.meetup
          }) >= 0
      },
      message() {
        return this.userIsRegistered ? 'Não poderei ir :(' : 'Estarei Presente!'
      }
    },
    methods: {
      onAgree() {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterFromMeetup', this.meetup)
        } else {
          this.$store.dispatch('registerToMeetup', this.meetup)
        }
      }
    }
  }
</script>

<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn accent slot="activator" primary> {{ message }}</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-show="userIsRegistered">Não pode mais participar do rolê ?</v-card-title>
            <v-card-title v-show="!userIsRegistered">Deseja participar do rolê ?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>Você sempre pode mudar de ideia depois.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text text--darken-1"
                     flat
                     @click="registerDialog = false">Cancelar


              </v-btn>
              <v-btn class="green--text text--darken-1"
                     flat
                     @click="onAgree">Confirmar
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
