<template>
  <v-container class="homeContent" fluid>
    <v-row class="justify-center">
      <v-col>
        <v-card class="animated fadeInRight">
          <v-card-title class="justify-center"
            ><v-badge inline color="primary" :content="this.myTeams.length"
              >Equipos</v-badge
            ></v-card-title
          >
          <v-card-text v-if="this.myTeams.length == 0" class="text-center"
            >Aún no hay equipos</v-card-text
          >
          <carousel
            v-else
            autoplayHoverPause
            :per-page="1"
            :loop="true"
            :autoplay="true"
            :autoplayTimeout="4000"
            paginationActiveColor="var(--v-primary-darken1)"
            paginationColor="var(--v-item-lighten2)"
          >
            <slide v-for="team in this.myTeams" :key="team.id">
              <h5 class="text-center">{{ team.name }}</h5>
              <teamCarousel :team="team"></teamCarousel>
            </slide>
          </carousel>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col>
        <v-card class="animated fadeInRight">
          <v-card-title class="justify-center"
            ><v-badge inline color="primary" :content="this.competitions.length"
              >Competiciones</v-badge
            ></v-card-title
          >
          <v-card-text v-if="this.competitions.length == 0" class="text-center"
            >Aún no hay competiciones</v-card-text
          >
          <carousel
            v-else
            :per-page="1"
            :loop="true"
            :autoplay="true"
            :autoplayTimeout="4000"
            paginationActiveColor="var(--v-primary-darken1)"
            paginationColor="var(--v-item-lighten2)"
          >
            <slide
              v-for="competition in this.competitions"
              :key="competition.id"
            >
              <h5 class="text-center">{{ competition.name }}</h5>
              <competitionCarousel
                :competition="competition"
              ></competitionCarousel>
            </slide>
          </carousel>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import teamCarousel from '../components/teamCarousel'
import competitionCarousel from '../components/competitionCarousel'

export default {
  name: 'index',
  components: {
    Carousel,
    Slide,
    teamCarousel,
    competitionCarousel
  },
  methods: {
    ...mapActions({
      getUserCompetitions: 'competition/getUserCompetitions',
      getUserTeams: 'team/getUserTeams'
    })
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      myTeams: 'team/myTeams',
      competitions: 'competition/competitions'
    })
  },
  async created() {
    await this.getUserCompetitions(this.user.id)
    await this.getUserTeams(this.user.id)
  }
}
</script>
<style scoped>
.homeContent {
  height: 100%;
}
.cardContent {
  height: 100%;
}
</style>
