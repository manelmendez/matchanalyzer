<template>
  <v-container fluid v-if="this.teamStats.stats">
    <v-row justify="center">
      <v-col class="text-center" xs=12 sm=6 md=6 lg=4>
        Posicion en liga: {{this.teamStats.position}}
      </v-col>
      <v-col class="text-center" xs=12 sm=6 md=6 lg=4>
        Puntos: {{this.teamStats.stats.points}}
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="text-center" xs=12 sm=6 md=6 lg=4>
        Goles: {{this.teamStats.stats.goals}}
      </v-col>
      <v-col class="text-center" xs=12 sm=6 md=6 lg=4>
        Victorias: {{this.teamStats.stats.wins}}
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid v-else style="height:100%">
    <v-row style="height:100%">
      <v-col align-self="center" class="text-center">No hay datos</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from 'axios'

export default {
  props: {
    team: Object
  },
  data() {
    return {
      teamStats: this.team
    }
  },
  methods: {
    getTeamStats() {
      console.log("HOLA");
      
      axios.get('getTeamStats/'+this.team.id+'/competition/'+this.team.competition).then(response => {
        console.log(response);
        this.teamStats=response.data.teamStats
      }).catch((err) => {
        console.log(err);
        this.teamStats=null
      })
    }
  },
  async created() {
    this.getTeamStats()
  },
  computed: {

  }
}
</script>

<style>

</style>