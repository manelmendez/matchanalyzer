<template>
  <v-row justify-center>
    <v-col cols=12 sm=5 md=4>
      <v-card class="match elevation-2" @click="$router.push('/teams/'+match.localTeam.id+'/competitionstats')">
        <v-row
          align="center"
          justify="center"
          :class="resultClass(match.localTeamGoals,match.awayTeamGoals)"
        >
          <v-col>
            <v-img 
              :src="constants.ADDRESS+match.localTeam.avatar"
              @error="match.localTeam.avatar=constants.DEFAULT_TEAM_URL"
              aspect-ratio="10"
              contain
            ></v-img> {{match.localTeam.name}}
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols=12 sm=2 md=2>
      <v-card class="match elevation-2">
        <v-row
          align="center"
          justify="center"
          class="result"
        ><v-col>{{match.localTeamGoals}} - {{match.awayTeamGoals}}</v-col></v-row>
      </v-card>
    </v-col>
    <v-col cols=12 sm=5 md=4>
      <v-card class="match elevation-2" @click="$router.push('/teams/'+match.awayTeam.id+'/competitionstats')">
        <v-row
          align="center"
          justify="center"
          :class="resultClass(match.awayTeamGoals,match.localTeamGoals)"
        >
        <v-col>
          <v-img 
            justify="center"
            :src="constants.ADDRESS+match.awayTeam.avatar"
            @error="match.awayTeam.avatar=constants.DEFAULT_TEAM_URL"
            aspect-ratio="10"
            contain
          ></v-img>{{match.awayTeam.name}}
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols=12 sm=12 md=2>
      <v-card class="match-actions elevation-2">
        <v-card-text class="text-center">
          <v-row>
            <v-col v-if="match.awayTeam.manager != null || match.localTeam.manager != null">
              <v-tooltip top v-if="match.awayTeam.manager != null || match.localTeam.manager != null">
                <template v-slot:activator="{ on }">
                  <v-btn x-small text icon color="green lighten-2" @click.stop="addStatsDialog=true" v-on="on">
                    <v-icon size="18">fa-file-alt</v-icon>
                  </v-btn>
                </template>
                <span>Añadir stats</span>
              </v-tooltip>
            </v-col>
            <v-col>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn x-small text icon color="info" @click.stop="roundDialog=true" v-on="on">
                    <v-icon size="18">edit</v-icon>
                  </v-btn>
                </template>
                <span>Editar partido</span>
              </v-tooltip>
            </v-col>
            <v-col>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn x-small text icon color="error" @click.stop="deleteDialog=true" v-on="on">
                    <v-icon size="18">delete</v-icon>
                  </v-btn>
                </template>
                <span>Eliminar partido</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <CreateMatch
      v-if="roundDialog"
      :show="roundDialog"
      type="edit"
      :roundTeams="newRoundTeams"
      :match="match"
      @close="roundDialog=!roundDialog"
      @edit="updateMatchFunction"
    ></CreateMatch>
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      type="match"
      @close="deleteDialog=!deleteDialog"
      @delete="deleteMatchFunction"
    ></DeleteDialog>
    <AddMatchStats 
      v-if="addStatsDialog"
      :show="addStatsDialog"
      :localTeam="match.localTeam"
      :awayTeam="match.awayTeam"
      @close="addStatsDialog=!addStatsDialog"
      @addStats="addStats"> </AddMatchStats>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import CreateMatch from "./modals/CreateMatch";
import DeleteDialog from "./modals/DeleteDialog";
import AddMatchStats from "./modals/AddMatchStats"
import constants from "../assets/constants/constants"
export default {
  name: "RoundMatch",
  components: {
    CreateMatch,
    DeleteDialog,
    AddMatchStats
  },
  props: {
    match: Object
  },
  data() {
    return {
      constants: constants,
      roundDialog: false,
      deleteDialog: false,
      addStatsDialog: false
    };
  },
  methods: {
    resultClass(goals1, goals2) {
      if (goals1 == goals2) return "draw";
      else if (goals1 > goals2) return "victory";
      else return "lose";
    },
    async deleteMatchFunction() {
      this.$emit("loading")
      await this.deleteMatch(this.match.id)
      await this.getCompetition(this.$route.params.id);
      this.deleteDialog = false;
      this.$emit("loading")
    },
    async updateMatchFunction(match) {      
      if (match.localTeam == match.awayTeam) {
        alert("No puedes seleccionar el mismo equipo en ambos lados");
      }
      else {
        let data = {
          id: this.match.id,
          body: match
        }
        this.$emit("loading")
        await this.updateMatch(data)
        await this.getCompetition(this.$route.params.id)
        this.roundDialog = false
        this.$emit("loading") 
      }
    },
    addStats(data){
      console.log(data)
      this.addStatsDialog = false
    },
    ...mapActions("competition", [
      "updateMatch",
      "deleteMatch",
      "getCompetition"
    ])
  },
  computed: {
    ...mapGetters("competition", ["selectedRound", "roundTeams", "competition"]),
    newRoundTeams() {
      return [...this.roundTeams, this.match.localTeam, this.match.awayTeam];
    }
  }
};
</script>
<style scoped>
.match {
  text-align: center;
  height: 100%;
}
.match-actions {
  text-align: center;
  height: 100%;
}
.victory {
  background-color: rgba(117, 255, 131, 0.55);
  height: 100%;
  width: 100%;
}
.draw {
  background-color: rgba(255, 212, 71, 0.55);
  height: 100%;
  width: 100%;
}
.lose {
  background-color: rgba(255, 117, 117, 0.55);
  height: 100%;
  width: 100%;
}
.result {
  background-color: rgba(199, 199, 199, 0.55);
  height: 100%;
  width: 100%;
}
</style>
