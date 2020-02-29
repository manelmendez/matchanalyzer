<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary darken-1">
          <v-btn icon dark @click.native="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Añadir estadísticas del partido</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click.native="addStats">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row>
          <v-col class="text-center">{{localTeam.name}}</v-col>
          <v-col class="text-center">{{awayTeam.name}}</v-col>
        </v-row>
        <v-row v-for="part of parts" :key="part">
          <v-col class="text-center">
            <v-row>
              <v-col class="text-center">
                Parte {{part}}
              </v-col>
            </v-row>
            <v-row>
              <addMatchStatsContent ref="localchild" :team="localTeamWithPlayers" :matchId="matchId" :previousData="localMatchparts[part -1]"></addMatchStatsContent>
              <v-divider vertical></v-divider>
              <addMatchStatsContent ref="awaychild" :team="awayTeamWithPlayers" :matchId="matchId" :previousData="awayMatchparts[part -1]"></addMatchStatsContent>
            </v-row>
            <br><br>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn v-if="parts != 4" fab color="accent" dark @click.stop="parts=parts+1">
              <v-icon class="material-icons">mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import constants from "../../assets/constants/constants";
import addMatchStatsContent from '../addMatchStatsContent.vue'
export default {
  props:{
    show: Boolean,
    localTeam: Object,
    awayTeam: Object,
    matchId: Number
  },
  components: {
    addMatchStatsContent
  },
  data() {
    return {
      constants: constants,
      parts:1,
      localTeamWithPlayers: this.localTeam,
      awayTeamWithPlayers: this.awayTeam,
      localMatchparts: [],
      awayMatchparts: []
    }
  },
  methods: {
    close() {
      this.$emit("close")
    },
    addStats() {
      let myTeamParts = []
      let child='localchild'
      if(this.localTeam.manager==null) {
        child = 'awaychild'
      }
      for (let i = 0; i < this.parts; i++) {        
        let part = {
          formation: this.$refs[child][i].formacion,
          time: this.$refs[child][i].duration,
          team: this.$refs[child][i].team.id,
          match: this.matchId,
          players: this.$refs[child][i].players,
          goals: this.$refs[child][i].goals,
          cards: this.$refs[child][i].cards,
          substitutions: this.$refs[child][i].subs
        }
        myTeamParts.push(part)
      }
      console.log(myTeamParts);
      this.addMatchparts(myTeamParts).then((value) => {
        this.$emit('confirm')
      })
    },
    putData(data) {
      if (data) {
        for (let matchpart of data.matchParts) {
          matchpart.minutes = data.minutes.filter(minute => minute.matchpart == matchpart.id);
          matchpart.goals = data.goals.filter(goal => goal.matchpart == matchpart.id);
          matchpart.assists = data.assists.filter(assist => assist.matchpart == matchpart.id);
          matchpart.cards = data.cards.filter(card => card.matchpart == matchpart.id);
          matchpart.substitutions = data.substitutions.filter(substitution => substitution.matchpart == matchpart.id);
          if (matchpart.team == this.localTeam.id) {
            this.localMatchparts.push(matchpart)
          }
          else {
            this.awayMatchparts.push(matchpart)
          }
        }
        console.log(this.localMatchparts);
        
      }      
    },
    ...mapActions({
      getTeam: 'team/getTeam',
      addMatchparts: 'competition/addMatchparts',
      getMatchpartsByMatchId: 'competition/getMatchpartsByMatchId'
    })
  },
  async created(){
    let data = await this.getMatchpartsByMatchId(this.matchId)
    this.localTeamWithPlayers = await this.getTeam(this.localTeam.id)
    this.awayTeamWithPlayers = await this.getTeam(this.awayTeam.id)
    console.log(data);
    
    this.putData(data)
  }
}
</script>

<style scoped>

</style>