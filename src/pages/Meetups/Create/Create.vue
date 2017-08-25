<script>
  export default {
    data: () => ({
      title: '',
      imageUrl: '',
      location: '',
      image: null,
      description: '',
      date: new Date(),
      time: new Date(),
      loading: false
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
        if (!this.image) return
        this.loading = true
        document.body.scrollTop = 0
        let title = this.title,
          location = this.location,
          description = this.description,
          date = this.dateTime,
          image = this.image

        this.$store.dispatch('addMeetup', {
          title,
          image,
          location,
          description,
          date
        })
          .then(() => {
            this.loading = false
            this.$router.push('/meetups')
          })
          .catch(error => {
            this.loading = false
            console.error(error)
          })
      },
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(ev) {
        const files = ev.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>

<template>
  <v-container>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center" style="margin-top: 100px">
        <v-progress-circular indeterminate  class="primary--text" :width="7" :size="70"></v-progress-circular>
        <p>criando rolê...</p>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <v-layout row wrap v-show="!loading">
          <v-flex>
            <h4 class="secondary--text">Organizar rolê</h4>
          </v-flex>
        </v-layout>
        <v-layout row v-show="!loading">
          <v-flex xs12>
            <form @submit.prevent="submitForm">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="title"
                                name="title"
                                id="title"
                                label="Titulo"
                                required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-text-field v-model="location"
                                name="location"
                                id="location"
                                label="Local"
                                required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn raised class="primary" @click="onPickFile" block>Escolher imagem</v-btn>
                  <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <div style="text-align: center">
                    <img :src="imageUrl" style="max-height: 200px; max-width: 400px;">
                  </div>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-text-field v-model="description"
                                name="description"
                                id="description"
                                label="Descrição"
                                required
                                multiLine></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6 class="mb-2">
                  <h5>Escolha uma data</h5>
                  <v-date-picker locale="pt-BR" v-model="date"></v-date-picker>
                </v-flex>
                <v-flex xs12 sm6 class="mb-2">
                  <h5>Escolha um horário</h5>
                  <v-time-picker v-model="time" format="24hr"></v-time-picker>
                </v-flex>
              </v-layout>
              <v-layout row v-if="false">
                <v-flex>
                  <v-time-picker v-model="time" format="24hr"></v-time-picker>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex class="text-xs-right">
                  <v-btn class="primary" type="submit" :disabled="!formIsValid">Criar rolê</v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
