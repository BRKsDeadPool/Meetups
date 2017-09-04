<script>
  export default {
    props: ['meetup'],
    data() {
      return {
        editDialog: false,
        editableDate: null
      }
    },
    methods: {
      saveChanges() {
        const date = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        date.setUTCDate(newDay)
        date.setUTCMonth(newMonth)
        date.setUTCFullYear(newYear)
        let id = this.meetup.id
        this.$store.dispatch('updateMeetup', {date, id})
      }
    },
    created () {
      this.editableDate = new Date(this.meetup.date)
    }
  }
</script>

<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">Editar data</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Editar Data do Rolê</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker locale="pt-BR" v-model="editableDate" style="width: 100%" actions>
              <template scope="{save, cancel}">
                <v-btn class="red--text text--darken-1"
                       flat
                       @click="editDialog = false">fechar</v-btn>
                <v-btn class="blue--text text--darken-1"
                       flat
                       @click="saveChanges">salvar</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
