<template>
  <v-dialog v-if="show" v-model="show" width="70%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ headline }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                :items="roundTeams"
                item-text="name"
                return-object
                label="Elige equipo local"
                v-model="team"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
              Resultado
              <v-row wrap>
                <v-col cols="12" md="4" class="text-center">
                  <v-text-field
                    class="centered-input"
                    type="number"
                    min="0"
                    v-model="localTeamGoals"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="text-center align-self-center"
                  >-</v-col
                >
                <v-col cols="12" md="4" class="text-center">
                  <v-text-field
                    class="centered-input"
                    type="number"
                    min="0"
                    v-model="awayTeamGoals"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                :items="roundTeams"
                item-text="name"
                return-object
                label="Elige equipo visitante"
                v-model="team2"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click.native="type == 'new' ? confirm() : edit()"
          >Continue</v-btn
        >
        <v-btn text @click="close()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CreateMatch',
  props: {
    show: Boolean,
    type: String,
    roundTeams: Array,
    match: Object,
    round: Number,
  },
  data() {
    return {
      localTeamGoals:
        this.type == 'new' ? 0 : Number(this.match.localTeamGoals),
      awayTeamGoals: this.type == 'new' ? 0 : Number(this.match.awayTeamGoals),
      team: this.type == 'new' ? '' : this.match.localTeam,
      team2: this.type == 'new' ? '' : this.match.awayTeam,
      headline: this.type == 'new' ? 'Añadir Partido' : 'Editar Partido',
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      let match = {
        localTeam: this.team.id,
        awayTeam: this.team2.id,
        localTeamGoals: Number(this.localTeamGoals),
        awayTeamGoals: Number(this.awayTeamGoals),
        competition: this.competition.id,
        round: this.round,
      }
      this.$emit('confirm', match)
    },
    edit() {
      let match = {
        localTeam: this.team,
        awayTeam: this.team2,
        localTeamGoals: Number(this.localTeamGoals),
        awayTeamGoals: Number(this.awayTeamGoals),
        competition: this.competition.id,
        round: this.match.round,
      }
      this.$emit('edit', match)
    },
  },
  computed: {
    ...mapGetters('competition', ['competition']),
  },
}
</script>
<style scoped>
.centered-input >>> input {
  text-align: center;
}
</style>
