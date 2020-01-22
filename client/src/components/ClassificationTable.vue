<template>
  <v-card>
    <v-data-table v-if="rankedTeams"
      :headers="headers"
      :items="rankedTeams"
      class="elevation-1 text-xs-center"
      hide-default-footer
      :items-per-page="-1"
    >
      <template v-slot:item="{ item, index }">
        <tr :class="setClass(index)">
          <td class="text-xs-center">{{ index+1 }}</td>
          <td class="text-xs-center">
            <v-list-item-avatar :tile="true" style="cursor:pointer" @click="$router.push('/teams/'+item.id+'/competitionstats')">
              <v-img :src="constants.ADDRESS+item.avatar" @error="item.avatar=constants.DEFAULT_TEAM_URL" contain>
            </v-list-item-avatar>
          </td>
          <td class="text-xs-center">{{ item.name }}</td>
          <td class="text-xs-center">{{ item.stats.points }}</td>
          <td class="text-xs-center">{{ item.stats.gamesPlayed }}</td>
          <td class="text-xs-center">{{ item.stats.wins }}</td>
          <td class="text-xs-center">{{ item.stats.draws }}</td>
          <td class="text-xs-center">{{ item.stats.loses }}</td>
          <td class="text-xs-center">{{ item.stats.goals }}</td>
          <td class="text-xs-center">{{ item.stats.againstGoals }}</td>
          <td class="text-xs-center">{{ item.stats.goalDif }}</td>
          <td class="text-xs-center"></td>
          <td class="text-xs-center">{{ item.stats.homePoints }}</td>
          <td class="text-xs-center">{{ item.stats.homeGamesPlayed }}</td>
          <td class="text-xs-center">{{ item.stats.homeWins }}</td>
          <td class="text-xs-center">{{ item.stats.homeDraws }}</td>
          <td class="text-xs-center">{{ item.stats.homeLoses }}</td>
          <td class="text-xs-center">{{ item.stats.homeGoals }}</td>
          <td class="text-xs-center">{{ item.stats.homeAgainstGoals }}</td>
          <td class="text-xs-center">{{ item.stats.homeGoalDif }}</td>
          <td class="text-xs-center"></td>
          <td class="text-xs-center">{{ item.stats.awayPoints }}</td>
          <td class="text-xs-center">{{ item.stats.awayGamesPlayed }}</td>
          <td class="text-xs-center">{{ item.stats.awayWins }}</td>
          <td class="text-xs-center">{{ item.stats.awayDraws }}</td>
          <td class="text-xs-center">{{ item.stats.awayLoses }}</td>
          <td class="text-xs-center">{{ item.stats.awayGoals }}</td>
          <td class="text-xs-center">{{ item.stats.awayAgainstGoals }}</td>
          <td class="text-xs-center">{{ item.stats.awayGoalDif }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-col>
          <v-alert :value="true" type="error" icon="warning">
            Aún no están los datos de esta jornada :(
          </v-alert>
        </v-col>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import constants from '../assets/constants/constants'

export default {
  name: "ClassificationTable",
  props: {
    rankedTeams: Array
  },
  data() {
    return {
      constants: constants,
      headers: [
        { text: 'P', align: 'center', sortable: false, value: 'name'},
        { text: '', align: 'center', sortable: false, value: ''},
        { text: 'Nombre', align: 'center', sortable: false, value: 'name'},
        { text: 'PTS', value: 'points', align: 'center', sortable: false,},
        { text: 'PJ', value: 'gamesPlayed', align: 'center', sortable: false,},
        { text: 'V', value: 'wins', align: 'center', sortable: false,},
        { text: 'E', value: 'draws', align: 'center', sortable: false,},
        { text: 'D', value: 'loses', align: 'center', sortable: false,},
        { text: 'GF', value: 'goals', align: 'center', sortable: false,},
        { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
        { text: 'DG', value: 'goalDif', align: 'center', sortable: false,},
        { text: 'En Casa', sortable: false },
        { text: 'PTS', value: 'points', align: 'center', sortable: false,},
        { text: 'PJ', value: 'gamesPlayed', align: 'center', sortable: false,},
        { text: 'V', value: 'wins', align: 'center', sortable: false,},
        { text: 'E', value: 'draws', align: 'center', sortable: false,},
        { text: 'D', value: 'loses', align: 'center', sortable: false,},
        { text: 'GF', value: 'goals', align: 'center', sortable: false,},
        { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
        { text: 'DG', value: 'homeGoalDif', align: 'center', sortable: false,},
        { text: 'Fuera', sortable: false },
        { text: 'PTS', value: 'points', align: 'center', sortable: false,},
        { text: 'PJ', value: 'gamesPlayed', align: 'center', sortable: false,},
        { text: 'V', value: 'wins', align: 'center', sortable: false,},
        { text: 'E', value: 'draws', align: 'center', sortable: false,},
        { text: 'D', value: 'loses', align: 'center', sortable: false,},
        { text: 'GF', value: 'goals', align: 'center', sortable: false,},
        { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
        { text: 'DG', value: 'awayGoalDif', align: 'center', sortable: false,},
      ]
    }
  },
  methods:{
    setClass(index) {
      if(index==0) return 'first'
      else if(index==1) return 'second'
      else if(index==this.rankedTeams.length-1||index==this.rankedTeams.length-2||index==this.rankedTeams.length-3) return 'descending'
    }
  }
}
</script>
<style scoped>
.first{
  background-color: rgba(117, 255, 131, 0.55)
}
.first:hover{
  background-color: rgba(117, 255, 131, 0.8) !important
}
/* .second{
  background-color: rgba(255, 216, 117, 0.55)
}
.second:hover{
  background-color: rgba(255, 216, 117, 0.9) !important
} */
.descending{
  background-color: rgba(255, 117, 117, 0.55)
}
.descending:hover{
  background-color: rgba(255, 117, 117, 0.9) !important
}
</style>
