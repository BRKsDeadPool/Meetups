<script>
  export default {
    data: () => ({
      title: '',
      imageUrl: '',
      location: '',
      description: '',
      date: new Date(),
      time: new Date()
    }),
    computed: {
      formIsValid() {
        return this.title !== '' &&
          this.imageUrl !== '' &&
          this.location !== '' &&
          this.description !== ''
      },
      dateTime() {
        let date = new Date(this.date)

        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]

          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      submitForm() {
        if (!this.formIsValid) return
        let title = this.title,
          imageUrl = this.imageUrl,
          location = this.location,
          description = this.description,
          date = this.dateTime

        console.log('submit')

        this.$store.dispatch('addMeetup', {
          title,
          imageUrl,
          location,
          description,
          date
        })
        this.$router.push('/meetups')
      }
    }
  }
</script>

<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="secondary--text">Organizar encontro</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="submitForm">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="title"
                            name="title"
                            id="title"
                            label="Titulo"
                            required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="location"
                            name="location"
                            id="location"
                            label="Local"
                            required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="imageUrl"
                            name="imageUrl"
                            id="imageUrl"
                            label="Imagem"
                            required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <div style="text-align: center">
                <img :src="imageUrl" style="max-height: 200px; max-width: 400px;">
              </div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="description"
                            name="description"
                            id="description"
                            label="Descrição"
                            required
                            multiLine></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <h5>Escolha uma data e um horário</h5>
              <v-date-picker locale="pt-BR" v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" type="submit" :disabled="!formIsValid">Criar encontro</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
