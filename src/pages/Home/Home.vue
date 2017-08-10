<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    goMeetup(id) {
      this.$router.push({
        name: 'Meetup',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background: rgba(0,0,0,.5);
    padding: 20px;
    color: white;
  }
</style>

<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn class="info" large to="/meetups">Explorar Encontros</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn class="info" large to="/meetup/new">Organizar Encontro</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-carousel>
        <v-carousel-item style="cursor:pointer;"
                         v-for="(meetup, i) in meetups"
                         :key="i" :src="meetup.imageUrl"
                         @click.native="goMeetup(meetup.id)">
          <div class="title">{{ meetup.title }}</div>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Junte-se aos encontros!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
