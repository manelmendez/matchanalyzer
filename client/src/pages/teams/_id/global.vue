<template>
  <v-container fluid>
    {{team.name}}
    <v-row>
      <v-col cols=6>
        <statscard :chart-data="datacollection" :height="200" :team="team"/>
      </v-col>
      <v-col cols=6>
        <matchstats :chart-data="piedatacollection" :height="200" :team="team"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import statscard from '../../../components/statscard'
import matchstats from '../../../components/matchstats'
  export default {
    components: {
      statscard,
      matchstats
    },
    data: () => ({
      constants: constants,
    }),
    async created() {
      //do something after creating vue instance
      await this.getTeam(this.$route.params.id)
      await this.getCompetition(this.team.competition)
      await this.getCompetitionRounds(this.team.competition)
    },
    methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (16 - 1)) + 1
      },
      ...mapActions({
        getTeam: 'team/getTeam',
        getCompetition: 'competition/getCompetition',
        getCompetitionRounds: 'competition/getCompetitionRounds',
      })
    },
    computed: {
      ...mapGetters({
        rankedTeams: 'competition/rankedTeams',
        statsPerRound: 'competition/statsPerRound',
        team: 'team/team'
      }),
      datacollection: function () {      
        let labels = []
        let positions = []
        for (let i = 0; i < this.statsPerRound.length; i++) {
          // labels.push(this.statsPerRound[i].name)
          labels.push("J"+(i+1))
          for (let j = 0; j < this.statsPerRound[i].ranking.length; j++) {
            if (this.statsPerRound[i].ranking[j].id == this.team.id) {
              positions.push(j+1)
            }
          } 
        }     
        return {
          labels: labels,
          datasets: [
            {
              label: 'Posición',
              data: positions,
              backgroundColor: "transparent"
            }, 
          ],
        }
      },
      piedatacollection() {
        let victorias = 0
        let empates = 0
        let derrotas = 0
        for (let i = 0; i < this.rankedTeams.length; i++) {
          if (this.rankedTeams[i].id == this.team.id) {
            victorias = this.rankedTeams[i].stats.wins
            empates = this.rankedTeams[i].stats.draws
            derrotas = this.rankedTeams[i].stats.loses
          }
        }        
        return {
          labels: ["Victorias","Empates","Derrotas"],
          datasets: [
            {
              data: [victorias, empates, derrotas],
              backgroundColor: ['rgb(117, 255, 131)','rgb(255, 212, 71)','rgb(255, 117, 117)'],
            }, 
          ]
        }
      },
    },
  }
</script>
<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
    color: #257747
  }
</style>