<template>
  <v-container fluid v-if="this.teamStats.stats">
    <v-row justify="center">
      <v-col class="text-center" cols="6" sm="6" md="3" lg="3">
        <v-card class="elevation-0">
          <v-card-title style="justify-content: center; word-break: keep-all;">
            Posicion en liga
          </v-card-title>
          <v-card-text>
            <p style="font-size: 40px;">{{ this.teamStats.position }}</p>
            <v-icon
              v-if="
                this.teamStats.position == 1 ||
                this.teamStats.position == 2 ||
                this.teamStats.position == 3
              "
              x-large
              size="1000px"
              :color="(this.teamStats.position == 1 ? colors.yellow.darken3 : this.teamStats.position == 2 ? colors.blueGrey.lighten1 : this.teamStats.position == 3 ? colors.deepOrange.darken1 : '')"
            >
              mdi-trophy
            </v-icon>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="6" sm="6" md="3" lg="3">
        <v-card class="elevation-0">
          <v-card-title style="justify-content: center;">
            Puntos
          </v-card-title>
          <v-card-text>
            <p style="font-size: 40px;">
              {{ this.teamStats.stats.points }}/{{
                this.teamStats.stats.gamesPlayed * 3
              }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="6" sm="6" md="3" lg="3">
        <v-card class="elevation-0">
          <v-card-title style="justify-content: center;">
            Goles
          </v-card-title>
          <v-card-text>
            <p style="font-size: 40px;">{{ this.teamStats.stats.goals }}</p>
            <v-icon x-large size="1000px">mdi-soccer </v-icon>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="6" sm="6" md="3" lg="3">
        <v-card class="elevation-0">
          <v-card-title style="justify-content: center; word-break: keep-all;">
            Resumen partidos
          </v-card-title>
          <v-card-text>
            <pie-chart
              :chart-data="matchesdatacollection"
              :height="250"
              :options="options"
              class="chartStyle"
            ></pie-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid v-else style="height: 100%;">
    <v-row style="height: 100%;">
      <v-col align-self="center" class="text-center">No hay datos</v-col>
    </v-row>
  </v-container>
</template>

<script>
import colors from 'vuetify/lib/util/colors'
import axios from 'axios'
import PieChart from '../components/charts/PieChart.js'

export default {
  props: {
    team: Object,
  },
  components: {
    PieChart,
  },
  data() {
    return {
      teamStats: this.team,
      colors: colors,
      options: {
        legend: {
          display: false,
          labels: {
            // This more specific font property overrides the global property
            fontColor: this.$vuetify.theme.parsedTheme.item.base,
          },
        },
        cutoutPercentage: 50,
      },
    }
  },
  methods: {
    getTeamStats() {
      axios
        .get(
          'getTeamStats/' +
            this.team.id +
            '/competition/' +
            this.team.competition
        )
        .then((response) => {
          this.teamStats = response.data.teamStats
        })
        .catch((err) => {
          console.log(err)
          this.teamStats = null
        })
    },
  },
  async created() {
    this.getTeamStats()
  },
  computed: {
    matchesdatacollection() {
      let victorias = this.teamStats.stats.wins
      let empates = this.teamStats.stats.draws
      let derrotas = this.teamStats.stats.loses
      return {
        labels: ['Victorias', 'Empates', 'Derrotas'],
        datasets: [
          {
            data: [victorias, empates, derrotas],
            backgroundColor: [
              'rgb(115, 199, 132)',
              'rgb(255, 212, 71)',
              'rgb(255, 117, 117)',
            ],
            borderColor: [
              'rgba(115, 199, 132,0)',
              'rgba(255, 212, 71,0)',
              'rgba(255, 117, 117,0)',
            ],
          },
        ],
      }
    },
  },
}
</script>

<style scoped></style>
