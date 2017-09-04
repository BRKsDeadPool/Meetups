<script>
  export default {
    props: ['meetup'],
    data() {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    methods: {
      saveChanges() {
        const date = new Date(this.meetup.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]

        date.setHours(hours)
        date.setMinutes(minutes)
        let id = this.meetup.id
        this.$store.dispatch('updateMeetup', {date, id})
      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date).toTimeString()
    }
  }
</script>

<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">Editar hora</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Editar Hora do Rolê</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <template scope="{save, cancel}">
                <v-btn class="red--text text--darken-1"
                       flat
                       @click="editDialog = false">fechar</v-btn>
                <v-btn class="blue--text text--darken-1"
                       flat
                       @click="saveChanges">salvar</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
