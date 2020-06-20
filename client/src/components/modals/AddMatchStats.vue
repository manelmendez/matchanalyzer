<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary darken-1">
          <v-btn icon dark @click.native="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Añadir estadísticas del partido</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark text @click.native="addStats">Guardar</v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <v-row>
          <v-col class="text-center">{{localTeam.name}}</v-col>
          <v-col class="text-center">{{awayTeam.name}}</v-col>
        </v-row>
        <v-row v-for="(part, index) of localTeam.manager ? localMatchparts : awayMatchparts" :key="part.id">
          <v-col class="text-center">
            <v-row>
              <v-col class="text-center">
                Parte {{index+1}}
              </v-col>
            </v-row>
            <v-row>
              <addMatchStatsContent 
                ref="localchild" 
                :team="localTeamWithPlayers" 
                :matchId="matchId" 
                :matchpart="part"
              ></addMatchStatsContent>
              <v-divider vertical></v-divider>
              <addMatchStatsContent 
                ref="awaychild" 
                :team="awayTeamWithPlayers" 
                :matchId="matchId" 
                :matchpart="part"
              ></addMatchStatsContent>
            </v-row>
            <br><br>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn v-if="this.matchparts.length < 3" fab color="accent" dark @click.stop="addMatchpartDialog=true">
              <v-icon class="material-icons">mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <AddMatchpart v-if="addMatchpartDialog" :show="addMatchpartDialog" @close="addMatchpartDialog=false" @confirm="createMatchpart"></AddMatchpart>
    </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import constants from "../../assets/constants/constants";
import addMatchStatsContent from '../addMatchStatsContent.vue'
import AddMatchpart from '../modals/AddMatchpart.vue'
import { log } from 'util';
export default {
  props:{
    show: Boolean,
    localTeam: Object,
    awayTeam: Object,
    matchId: Number
  },
  components: {
    addMatchStatsContent,
    AddMatchpart
  },
  data() {
    return {
      constants: constants,
      localTeamWithPlayers: this.localTeam,
      awayTeamWithPlayers: this.awayTeam,
      localMatchparts: [],
      awayMatchparts: [],
      matchparts: [],
      goals: [],
      assists: [],
      cards: [],
      substitutions: [],
      addMatchpartDialog: false
    }
  },
  methods: {
    close() {
      this.$emit("close")
    },
    async createMatchpart(data) {
      let matchpart = {
        ...data,
        matchId: this.matchId,
        team: this.localTeam.manager ? this.localTeam.id : this.awayTeam.id
      }
      let response = await this.addMatchpart(matchpart)      
      if (response.status == 200) {
        if (response.data.savedPart.team == this.localTeam.id) {
          this.localMatchparts.push(response.data.savedPart)
        }
        else {
          this.awayMatchparts.push(response.data.savedPart)
        }
      }
      this.addMatchpartDialog = false
    },
    putData() {
      if (this.matchparts.length != 0) {
        for (let matchpart of this.matchparts) {
          if (this.minutes.length != 0) matchpart.minutes = this.minutes.filter(minute => minute.matchpart == matchpart.id);
          if (this.goals.length != 0) matchpart.goals = this.goals.filter(goal => goal.matchpart == matchpart.id);
          if (this.assists.length != 0) matchpart.assists = this.assists.filter(assist => assist.matchpart == matchpart.id);
          if (this.cards.length != 0) matchpart.cards = this.cards.filter(card => card.matchpart == matchpart.id);
          if (this.substitutions.length != 0) matchpart.substitutions = this.substitutions.filter(substitution => substitution.matchpart == matchpart.id);
          if (matchpart.team == this.localTeam.id) {
            this.localMatchparts.push(matchpart)
          }
          else {
            this.awayMatchparts.push(matchpart)
          }
        }
      }      
    },
    ...mapActions({
      getTeam: 'team/getTeam',
      addMatchpart: 'competition/addMatchpart',
      getMatchpartsByMatchId: 'competition/getMatchpartsByMatchId',
      getMinutesByMatchId: 'competition/getMinutesByMatchId',
      getGoalsByMatchId: 'competition/getGoalsByMatchId',
      getAssistsByMatchId: 'competition/getAssistsByMatchId',
      getCardsByMatchId: 'competition/getCardsByMatchId',
      getSubstitutionsByMatchId: 'competition/getSubstitutionsByMatchId'
    })
  },
  async created(){
    this.matchparts = await this.getMatchpartsByMatchId(this.matchId)
    await this.getMinutesByMatchId(this.matchId)
    this.goals = await this.getGoalsByMatchId(this.matchId)
    this.assists = await this.getAssistsByMatchId(this.matchId)
    this.cards = await this.getCardsByMatchId(this.matchId)
    this.substitutions = await this.getSubstitutionsByMatchId(this.matchId)
    this.localTeamWithPlayers = await this.getTeam(this.localTeam.id)
    this.awayTeamWithPlayers = await this.getTeam(this.awayTeam.id)
    console.log(this.minutes)
    await this.putData()
  },
  computed: {
    minutes() {
      return this.$store.getters['competition/minutesByMatch'](this.matchId)
    }
  },
}
</script>

<style scoped>

</style>