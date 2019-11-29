<template>
  <v-container fluid>
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-row v-if="rounds.length == 0">
      <v-card class="results">
        <v-card-text class="text-center">
          Aun no hay ninguna jornada disputada
          <br>
          <v-btn fab color="accent" dark>
            <i class="material-icons" @click="createRound()">add</i>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row v-else>
      <v-card class="results">
        <v-card-title>
          <v-row justify="space-between">
            <v-col md="3">
              <v-select
                small
                :items="rounds"
                item-text="name"
                required
                v-model="round"
                class="headline"
                return-object
                @change="changeResultRound"
              ></v-select>
            </v-col>
            <v-col md="3">
              <v-btn small rounded color="blue-grey" class="white--text resultBtn" @click="createRound()">
                Nueva Jornada
                <v-icon right dark>add</v-icon>
              </v-btn>
              <v-btn
                small
                v-if="round.id == rounds[rounds.length -1].id"
                rounded
                color="red lighten-2"
                class="white--text resultBtn"
                @click.stop="deleteDialog=!deleteDialog"
              >
                Borrar Jornada
                <v-icon right dark>delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="text-center" v-if="rounds">
          <v-col v-if="rounds[selectedRound -1].matches.length == 0">
            Aún no has añadido partidos en esta jornada
          </v-col>
          <v-col v-else>
            <v-container>
              <RoundMatch v-for="match in matches" :key="match.id" :match="match" @loading="loading"></RoundMatch>
            </v-container>
          </v-col>
          <br>
          <v-btn v-if="roundTeams.length != 0" fab color="accent" dark @click.stop="roundDialog=!roundDialog, roundType='new'">
            <i class="material-icons">add</i>
          </v-btn>
        </v-card-text>
      </v-card>
      <CreateMatch v-if="roundDialog" :show="roundDialog" type="new" :roundTeams="roundTeams" :round="rounds[selectedRound -1].id" @close="roundDialog=!roundDialog" @confirm="createMatch"></CreateMatch>
      <DeleteDialog :show="deleteDialog" type="jornada" @close="deleteDialog=!deleteDialog" @delete="deleteRoundFunction"></DeleteDialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import RoundMatch from "../../../components/RoundMatch"
import DeleteDialog from "../../../components/modals/DeleteDialog"
import CreateMatch from "../../../components/modals/CreateMatch"
export default {
  components: {
    RoundMatch,
    DeleteDialog,
    CreateMatch
  },
  data: () => ({
    roundDialog: false,
    deleteDialog: false,
    loading: false
  }),
  methods: {
    createRound() {
      let body = {
        name: "Jornada " + (this.rounds.length + 1),
        competition: this.competition.id
      };
      this.addRound(body)
    },
    createMatch(newMatch) {
      console.log(newMatch);
      
      // let body = {
      //   match: newMatch.match,
      //   localTeamStats: newMatch.localTeamStats,
      //   awayTeamStats: newMatch.awayTeamStats
      // }
      if (newMatch.localTeam == newMatch.awayTeam) {
        alert("No puedes seleccionar el mismo equipo en ambos lados");
      }
      // else if (this.team.id == this.competition.myTeam.id || this.team2.id == this.competition.myTeam.id) {
      //   alert("Uno de ellos es tu equipo, rellena las estadísticas")
      // }
      else {
        this.loading=true
        this.addMatch(newMatch).then(response => {
          if (response.status == 200) {
            this.roundDialog = false
            this.loading = false
          }
          else {
            this.roundDialog = false
            this.loading = false
          }
        })
        .catch((e)=>{
          console.log(e)
          this.roundDialog = false
          this.loading = false
        })
      }
    },
    
    changeResultRound(item) {
      //coger el numero de round y ponerlo en selectedRound
      let str = item.name;
      var res = str.split(" ");
      this.changeRound(res[1]);
    },
    
    deleteRoundFunction() {
      let body = {
        round: this.round
      };
      let data = {
        id: this.round.id,
        body: body
      };
      this.loading = true
      this.deleteRound(data).then(response => {
        if (response.status == 200) {
          this.getCompetition(this.$route.params.id);
          this.deleteDialog=false
          this.loading = false
        }
        else {
          this.deleteDialog = false
          this.loading = false
        }
      });
    },
    ...mapActions("competition",[
      "getCompetition",
      "addRound",
      "addMatch",
      "changeRound",
      "deleteRound"
    ])
  },
  computed: {
    ...mapGetters("competition",["competition", "roundTeams", "selectedRound", "matches", "rounds"]),
    round: {
      get: function() {
        return this.rounds[this.selectedRound - 1];
      },
      // setter
      set: function(newValue) {
        return this.rounds[this.selectedRound - 1];
      }
    }
  }
}
</script>
<style>
.centered-input input {
  text-align: center;
}
.resultBtn{
  width: 100%;
}
.results {
  width: 100%;
}
</style>