<template>
  <v-container fluid>
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-row v-if="rounds.length == 0">
      <v-card class="results">
        <v-card-text class="text-center">
          Aun no hay ninguna jornada disputada
          <br />
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
            <v-col cols="12" md="3">
              <v-select
                :items="rounds"
                item-text="name"
                required
                :value="round"
                return-object
                @change="changeResultRound"
              ></v-select>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    text
                    small
                    :disabled="round.id == rounds[0].id"
                    @click="this.previousRound"
                  >
                    <v-icon left>mdi-chevron-double-left</v-icon>Anterior
                  </v-btn>
                </v-col>
                <v-col class="text-center">
                  <v-btn
                    text
                    small
                    :disabled="round.id == rounds[rounds.length - 1].id"
                    @click="this.nextRound"
                  >
                    Siguiente<v-icon right>mdi-chevron-double-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="3">
              <v-row class="fill-height" justify="center" align="center">
                <v-col cols="6" sm="6">
                  <v-btn
                    small
                    text
                    elevation="0"
                    color="success"
                    class="resultBtn"
                    @click="createRound()"
                  >
                    Nueva Jornada
                    <v-icon right dark>add</v-icon>
                  </v-btn>
                  <v-btn
                    small
                    v-if="round.id == rounds[rounds.length - 1].id"
                    text
                    color="error"
                    class="resultBtn"
                    @click.stop="deleteDialog = !deleteDialog"
                  >
                    Borrar Jornada
                    <v-icon right dark>delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="text-center" v-if="rounds">
          <v-col v-if="round.matches.length == 0">
            Aún no has añadido partidos en esta jornada
          </v-col>
          <v-col v-else>
            <roundMatch
              v-for="match in matches"
              :key="match.id"
              :match="match"
              @loading="loading = !loading"
            ></roundMatch>
          </v-col>
          <br />
          <v-btn
            v-if="roundTeams.length != 0"
            fab
            color="accent"
            dark
            @click.stop=";(roundDialog = !roundDialog), (roundType = 'new')"
          >
            <i class="material-icons">add</i>
          </v-btn>
        </v-card-text>
      </v-card>
      <CreateMatch
        v-if="roundDialog"
        :show="roundDialog"
        type="new"
        :roundTeams="roundTeams"
        :round="Number(round.id)"
        @close="roundDialog = !roundDialog"
        @confirm="createMatch"
      ></CreateMatch>
      <DeleteDialog
        :show="deleteDialog"
        type="jornada"
        @close="deleteDialog = !deleteDialog"
        @delete="deleteRoundFunction"
      ></DeleteDialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import roundMatch from '../../../components/competition/roundMatch'
import DeleteDialog from '../../../components/modals/DeleteDialog'
import CreateMatch from '../../../components/modals/CreateMatch'
export default {
  components: {
    roundMatch,
    DeleteDialog,
    CreateMatch
  },
  data() {
    return {
      roundDialog: false,
      deleteDialog: false,
      loading: false
    }
  },
  methods: {
    createRound() {
      let body = {
        name: 'Jornada ' + (this.rounds.length + 1),
        competition: this.competition.id
      }
      this.addRound(body)
    },
    async createMatch(newMatch) {
      if (newMatch.localTeam == newMatch.awayTeam) {
        alert('No puedes seleccionar el mismo equipo en ambos lados')
      } else {
        this.loading = true
        await this.addMatch(newMatch)
        this.roundDialog = false
        this.loading = false
      }
    },
    changeResultRound(item) {
      //coger el numero de round y ponerlo en selectedRound
      let str = item.name
      let res = str.split(' ')
      this.$router.push({
        name: 'results',
        params: {
          id: this.$route.params.id,
          roundId: res[1]
        }
      })
    },
    previousRound() {
      const actualRound =
        this.$route.params.roundId == 'latest'
          ? this.rounds.length
          : this.$route.params.roundId
      this.$router.push({
        name: 'results',
        params: {
          id: this.$route.params.id,
          roundId: Number(actualRound) - 1
        }
      })
    },
    nextRound() {
      const actualRound =
        this.$route.params.roundId == 'latest'
          ? this.rounds.length
          : this.$route.params.roundId
      this.$router.push({
        name: 'results',
        params: {
          id: this.$route.params.id,
          roundId: Number(actualRound) + 1
        }
      })
    },
    async deleteRoundFunction() {
      this.loading = true
      await this.deleteRound(this.round.id)
      await this.getCompetition(this.$route.params.id)
      this.deleteDialog = false
      this.loading = false
    },
    ...mapActions('competition', [
      'getCompetition',
      'addRound',
      'addMatch',
      'deleteRound'
    ])
  },
  computed: {
    ...mapGetters('competition', ['competition', 'rounds']),
    roundTeams() {
      return this.$store.getters['competition/roundTeams'](
        this.$route.params.roundId
      )
    },
    round() {
      return this.$store.getters['competition/round'](
        this.$route.params.roundId
      )
    },
    matches() {
      return this.$store.getters['competition/matches'](
        this.$route.params.roundId
      )
    }
  }
}
</script>
<style scoped>
.centered-input input {
  text-align: center;
}
.resultBtn {
  width: 100%;
}
.results {
  width: 100%;
}
</style>
