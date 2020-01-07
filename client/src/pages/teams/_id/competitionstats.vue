<template>
  <v-container fluid>
    {{team.name}}
    <v-row>
      <v-col xs=12 sm=12 md=6 lg=4>
        <positionstats :chart-data="positiondatacollection" :height="250" :team="team"/>
      </v-col>
      <v-col xs=12 sm=12 md=6 lg=4>
        <matchstats :chart-data="matchesdatacollection" :height="250" :team="team"/>
      </v-col>
      <v-col xs=12 sm=12 md=6 lg=4>
        <goalstats :chart-data="goalsdatacollection" :height="250" :team="team"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import positionstats from '../../../components/positionstats'
import matchstats from '../../../components/matchstats'
import goalstats from '../../../components/goalstats'
  export default {
    components: {
      positionstats,
      matchstats,
      goalstats,
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
      getTeamGoals () {
        let goalsperround = []
        let againstgoalsperround = []
        for (let i = 0; i < this.rounds.length; i++) {
          for (let j = 0; j < this.rounds[i].matches.length; j++) {
            if (this.rounds[i].matches[j].localTeam.id == this.team.id) {
              goalsperround.push(this.rounds[i].matches[j].localTeamGoals)
              againstgoalsperround.push(this.rounds[i].matches[j].awayTeamGoals)
            }
            if (this.rounds[i].matches[j].awayTeam.id == this.team.id) {
              goalsperround.push(this.rounds[i].matches[j].awayTeamGoals)
              againstgoalsperround.push(this.rounds[i].matches[j].localTeamGoals)
            }
          }
        }
        let goals = {
          goalsperround,
          againstgoalsperround
        }
        return goals
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
        team: 'team/team',
        rounds: 'competition/rounds'
      }),
      positiondatacollection: function () {      
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
              backgroundColor: "rgb(0,0,0,0.1)",
              borderColor: 'rgb(76,180,179)',
              fill: "start" //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            }, 
          ],
        }
      },
      matchesdatacollection() {
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
              backgroundColor: ['rgb(115, 199, 132)','rgb(255, 212, 71)','rgb(255, 117, 117)'],
              borderColor: ['rgba(115, 199, 132,0)','rgba(255, 212, 71,0)','rgba(255, 117, 117,0)']
            }, 
          ]
        }
      },
      goalsdatacollection() {
        let goals = this.getTeamGoals()
        let labels = []        
        for (let i = 0; i < goals.goalsperround.length; i++) {
          // labels.push(this.statsPerRound[i].name)
          labels.push("J"+(i+1))
        }     
        return {
          labels: labels,
          datasets: [
            {
              label: 'Goles a favor',
              data: goals.goalsperround,
              backgroundColor: "rgba(220,0,0,0.2)",
              borderWidth: 1,
              borderColor: "rgb(220,0,0)"
            }, 
            {
              label: 'Goles en contra',
              data: goals.againstgoalsperround,
              backgroundColor: "rgba(0,0,220,0.2)",
              borderWidth: 1,
              borderColor: "rgb(0,0,220)"
            }, 
          ],
        }
      },
    },
  }
</script>
<style>
.a {
  color: rgb(115, 199, 132)
}
</style>