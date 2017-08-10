<script>
  import VBtn from "vuetify/src/components/buttons/VBtn";
  import {random} from 'lodash'
  export default {
    components: {VBtn}, computed: {
      meetups() {
        return this.$store.getters.loadedMeetups
      }
    },
    methods: {
      goTo(id) {
        this.$router.push({
          name: 'Meetup',
          params: {
            id
          }
        })
      },
      getColor(meetup, i) {
        let colors = [
          'blue',
        ]


        return [
          colors[random(0, colors.length - 1)]
        ]
      }
    }
  }
</script>

<template>
  <v-container>
    <v-layout row
              wrap
              v-for="(meetup, i) in meetups"
              :key="i"
              class="mt-2">
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
        <v-card :class="getColor(meetup, i)">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media :src="meetup.imageUrl" height="200px"></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h4 class="white--text" style="cursor: pointer;" @click="goTo(meetup.id)">{{ meetup.title }}</h4>
                    <div>{{ meetup.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat @click.native="goTo(meetup.id)">
                    <v-icon left>arrow_forward</v-icon>
                    <span>Detalhes do encontro</span>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
