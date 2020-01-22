<template>
  <v-container fluid v-if="this.teamStats.stats">
    <v-row justify="center">
      <v-col class="text-center" cols="12" sm="6" md="3" lg="3">
        <v-card class="elevation-0">
          <v-card-title style="justify-content: center">
            Posicion en liga
          </v-card-title>
          <v-card-text>
            <p style="font-size: 40px">{{this.teamStats.position}}</p>
            <v-icon x-large size="1000px" :color="(this.teamStats.position == 1 ? 'gold' : this.teamStats.position == 2 ? 'blue' : this.teamStats.position == 3 ? 'red' : '')">mdi-trophy
            </v-icon>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="12" sm="6" md="3" lg="3">
        <v-card class="elevation-0">
          <v-card-title style="justify-content: center">
            Puntos
          </v-card-title>
          <v-card-text>  
            <p style="font-size: 40px">{{this.teamStats.stats.points}}</p>
          </v-card-text>
        </v-card>
      </v-col>
    
      <v-col class="text-center" cols="12" sm="6" md="3" lg="3">
        <v-card class="elevation-0">
          <v-card-title style="justify-content: center">
            Goles
          </v-card-title>
          <v-card-text>
              <p style="font-size: 40px">{{this.teamStats.stats.goals}}</p>
              <v-icon x-large size="1000px">mdi-soccer
              </v-icon>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="12" sm="6" md="3" lg="3">
        <v-card class="elevation-0">
          <v-card-title style="justify-content: center">
            Victorias
          </v-card-title>
          <v-card-text >
              <p style="font-size: 40px">{{this.teamStats.stats.wins}} / {{this.teamStats.stats.gamesPlayed}}</p>
              <v-icon x-large size="1000px">mdi-check
              </v-icon>
          </v-card-text>
        </v-card>
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