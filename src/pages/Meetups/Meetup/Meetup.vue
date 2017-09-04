<script>
  import Sharer from './sharer'
  import EditMeetup from './Edit/EditMeetupDialog.vue'
  import EditMeetupDate from './Edit/EditMeetupDateDialog.vue'
  import EditMeetupTime from './Edit/EditMeetupTimeDialog.vue'
  import RegisterMeetup from './Register/RegisterDialog.vue'
  import commentForm from './Comment/commentForm.vue'

  export default {
    props: ['id'],
    components: {
      EditMeetup,
      commentForm,
      EditMeetupDate,
      EditMeetupTime,
      RegisterMeetup
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      meetup() {
        return this.$store.getters.selectMeetup(this.id)
      },
      meta() {
        if (!this.meetup) return null

        const title = this.meetup.title
        const url = window.location.href
        const hashtags = [
          'Partiu'+this.meetup.location,
          'XFindMeetup'
        ].join(', ')
        return {
          url,
          title,
          hashtags
        }
      },
      isCreator() {
        if (!this.$store.getters.user) return false
        return this.meetup.creatorId === this.$store.getters.user.id
      }
    },
    methods: {
      share(e) {
        let sharer = new Sharer(e.target.parentNode)
        sharer.share()
      }
    }
  }
</script>

<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center" style="margin-top: 100px">
        <v-progress-circular indeterminate  class="primary--text" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else-if="!loading && meetup" class="mb-2">
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h5 class="primary--text">{{ meetup.title }}</h5>
            <template v-if="isCreator">
              <v-spacer></v-spacer>
              <edit-meetup :meetup="meetup"></edit-meetup>
            </template>
          </v-card-title>
          <v-card-media :src="meetup.imageUrl">
            <div class="meetup--image"></div>
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div><edit-meetup-date :meetup="meetup" v-if="isCreator"></edit-meetup-date><edit-meetup-time :meetup="meetup" v-if="isCreator"></edit-meetup-time></div>
            <div>
              <p v-html="meetup.description.replace(/\n/g, '<br/>')"></p>
            </div>
          </v-card-text>
          <v-card-actions v-if="meetup">
            <template>
              <span class="hidden-sm-and-down">Compartilhe:</span>
              <v-btn icon @click="share" data-network="facebook" :data-url="meta.url">
                <v-icon class="blue--text text--darken-4">fa-facebook</v-icon>
              </v-btn>
              <v-btn icon @click="share" data-network="twitter" :data-url="meta.url" :data-title="meta.title" :data-hashtags="meta.hashtags">
                <v-icon class="blue--text text--lighten-2">fa-twitter</v-icon>
              </v-btn>
              <v-btn icon @click="share" data-network="googleplus" :data-url="meta.url">
                <v-icon class="red--text">fa-google-plus</v-icon>
              </v-btn>
              <v-btn class="hidden-md-and-up" icon  @click="share" data-network="whatsapp" :data-url="meta.url" :data-title="meta.title">
                <v-icon class="green--text">fa-whatsapp</v-icon>
              </v-btn>
            </template>
            <v-spacer></v-spacer>
            <register-meetup :meetup="meetup.id" v-if="!isCreator"></register-meetup>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading && meetup">
      <v-flex xs12>
        <comment-form/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
