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
      <v-flex xs12 sm10 offset-sm1 md10 offset-md1>
        <v-card :class="getColor(meetup, i)">
          <v-container fluid class="hidden-xs-only">
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media style="cursor: pointer" @click="goTo(meetup.id)" :src="meetup.imageUrl" height="200px"></v-card-media>
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
                    <span>Detalhes do rolê</span>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid class="hidden-sm-and-up">
            <v-layout row>
              <v-flex xs12>
                <v-card-title primary-title>
                  <div>
                    <h4 class="white--text" style="cursor: pointer;" @click="goTo(meetup.id)">{{ meetup.title }}</h4>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-card-media style="cursor: pointer" @click="goTo(meetup.id)" :src="meetup.imageUrl" height="200px"></v-card-media>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <div class="text-xs-center white--text mt-1">{{ meetup.date | mobileDate }}</div>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-card-actions>
                  <v-btn flat block @click.native="goTo(meetup.id)">
                    <v-icon left>arrow_forward</v-icon>
                    <span>Detalhes do rolê</span>
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
