<template>
  <v-dialog v-if="show" v-model="show" width="70%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{headline}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md4>
              <v-select
                :items="roundTeams"
                item-text="name"
                return-object
                label="Elige equipo local"
                v-model="team"
                v-on:change="checkTeam"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 md4 class="text-center">
              Resultado
              <v-layout wrap>
                <v-flex xs12 md4 class="text-center">
                  <v-text-field class="centered-input" type="number" min="0" v-model="localTeamGoals" required></v-text-field>
                </v-flex>
                <v-flex xs12 md4 class="text-center align-self-center">-</v-flex>
                <v-flex xs12 md4 class="text-center">
                  <v-text-field class="centered-input" type="number" min="0" v-model="awayTeamGoals" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :items="roundTeams"
                item-text="name"
                return-object
                label="Elige equipo visitante"
                v-model="team2"
                v-on:change="checkTeam"
                required
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.native="(type=='new')?confirm():edit()">Continue</v-btn>
        <v-btn text @click="close()">Cancel</v-btn>
      <v-card-actions>
      <CreateMatchDetails v-if="detailsModal" :show="detailsModal"></CreateMatchDetails>
    </v-card>
  </v-dialog>
  
</template>
<script>
import { mapGetters } from "vuex";
import CreateMatchDetails from "./CreateMatchDetails";
export default {
  name: "CreateMatch",
  components: {
    CreateMatchDetails
  },
  props: {
    show: Boolean,
    type: String,
    roundTeams: Array,
    match: Object,
    round: Number,
  },
  data() {
    return {
      localTeamGoals: this.type == "new" ? 0 : Number(this.match.localTeamGoals),
      awayTeamGoals: this.type == "new" ? 0 : Number(this.match.awayTeamGoals),
      team: this.type == "new" ? "" : this.match.localTeam,
      team2: this.type == "new" ? "" : this.match.awayTeam,
      headline: this.type == "new" ? "Añadir Partido" : "Editar Partido",
      detailsModal: false
    };
  },
  methods: {
    checkTeam(team) {
      // console.log(team);
     
      //   if (team.id == this.competition.myTeam.id) {
      //     console.log("HOLA");
          
      //               this.detailsModal=false

      //     this.detailsModal=true
      //   }
      
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      let match = {
        localTeam: this.team.id,
        awayTeam: this.team2.id,
        localTeamGoals: Number(this.localTeamGoals),
        awayTeamGoals: Number(this.awayTeamGoals),
        competition: this.competition.id,
        round: this.round
      }
      this.$emit("confirm", match);
    },
    edit() {
      let match = {
        localTeam: this.team,
        awayTeam: this.team2,
        localTeamGoals: Number(this.localTeamGoals),
        awayTeamGoals: Number(this.awayTeamGoals),
        competition: this.competition.id,
        round: this.match.round
      }
      this.$emit("edit", match);
    }
  },
  computed: {
    ...mapGetters("competition",["competition"])
  }
};
</script>
<style scoped>
</style>
