<script>
  export default {
    props: ['meetup'],
    data() {
      return {
        editDialog: false,
        title: this.meetup.title,
        description: this.meetup.description

      }
    },
    computed: {
      canUpdate() {
        return (!this.title.trim() ||
          !this.description.trim())
      }
    },
    methods: {
      saveChanges() {
        if (this.canUpdate) return

        let meetup = this.meetup
        let payload = {...meetup}
        payload['title'] = this.title
        payload['description'] = this.description

        this.$store.dispatch('updateMeetup', payload)

        this.editDialog = false
      }
    }
  }
</script>

<template>
  <v-dialog width="90vh" persistent v-model="editDialog">
    <v-btn fab slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Editar Rolê</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                id="title"
                label="Titulo"
                required
                v-model="title"></v-text-field>
              <v-text-field
                name="description"
                id="description"
                label="Descrição"
                required
                multiLine
                rows="10"
                v-model="description"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="red--text text--darken-1" @click="editDialog = false">cancelar</v-btn>
              <v-btn flat class="blue--text text--darken-1" @click="saveChanges" :disabled="canUpdate">salvar</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
