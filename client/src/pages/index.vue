<template>
  <v-container class="homeContent" fluid>
    <v-row justify="center">
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
          <v-card-text v-else>
            <v-carousel
              :dark="$vuetify.theme.dark"
              :light="!$vuetify.theme.dark"
              :height="
                $vuetify.breakpoint.name == 'xl'
                  ? 300
                  : $vuetify.breakpoint.name == 'lg'
                  ? 200
                  : $vuetify.breakpoint.name == 'md'
                  ? 200
                  : 400
              "
              :cycle="false"
              :continuous="true"
              :interval="6000"
              :hide-delimiter-background="true"
            >
              <v-carousel-item v-for="team in this.myTeams" :key="team.id">
                <h5 class="text-center">{{ team.name }}</h5>
                <teamCarousel :team="team"></teamCarousel>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-card class="animated fadeInRight">
          <v-card-title class="justify-center"
            ><v-badge inline color="primary" :content="this.competitions.length"
              >Competiciones {{$vuetify.breakpoint.name}}</v-badge
            ></v-card-title
          >
          <v-card-text v-if="this.competitions.length == 0" class="text-center"
            >Aún no hay competiciones</v-card-text
          >
          <v-card-text v-else>
            <v-carousel
              :dark="$vuetify.theme.dark"
              :light="!$vuetify.theme.dark"
              :height="
                $vuetify.breakpoint.name == 'xl'
                  ? 300
                  : $vuetify.breakpoint.name == 'lg'
                  ? 200
                  : $vuetify.breakpoint.name == 'md'
                  ? 200
                  : 400
              "
              :cycle="hover ? false : true"
              :continuous="true"
              :interval="6000"
              :hide-delimiter-background="true"
            >
              <v-carousel-item
                v-for="competition in this.competitions"
                :key="competition.id"
              >
                <h5 class="text-center">{{ competition.name }}</h5>
                <competitionCarousel
                  :competition="competition"
                ></competitionCarousel>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import teamCarousel from "../components/index/teamCarousel";
import competitionCarousel from "../components/index/competitionCarousel";

export default {
  name: "index",
  components: {
    teamCarousel,
    competitionCarousel,
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    ...mapActions({
      getUserCompetitions: "competition/getUserCompetitions",
      getUserTeams: "team/getUserTeams",
    }),
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      myTeams: "team/myTeams",
      competitions: "competition/competitions",
    }),
  },
  async created() {
    await this.getUserCompetitions(this.user.id);
    await this.getUserTeams(this.user.id);
  },
};
</script>
<style scoped>
.homeContent {
  height: 100%;
}
.cardContent {
  height: 100%;
}
</style>
