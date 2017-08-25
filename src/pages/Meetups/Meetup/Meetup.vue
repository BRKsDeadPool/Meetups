<script>
  export default {
    props: ['id'],
    computed: {
      meetup() {
        return this.$store.getters.selectMeetup(this.id)
      }
    }
  }
</script>

<template>
  <v-container v-if="meetup">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ meetup.title }}</h6>
          </v-card-title>
          <v-card-media :src="meetup.imageUrl" height="400px"></v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div>
              <p v-html="meetup.description.replace('\n', '<br/>')"></p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Registrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
