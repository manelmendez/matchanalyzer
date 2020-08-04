<template>
  <v-container fluid grid-list-md>
    <v-row v-if="competition.teams.length == 0">
      <v-card class="no-teams">
        <v-card-text class="text-center"
          >No hay equipos en la competición.</v-card-text
        >
      </v-card>
    </v-row>
    <v-card v-if="rounds && rounds.length != 0">
      <v-card-title>
        <v-row justify="space-between">
          <v-col md="3">
            <v-select
              small
              :items="rounds"
              item-text="name"
              required
              :value="round"
              class="headline"
              return-object
              @change="changeResultRound"
            ></v-select>
          </v-col>
          <v-col md="3">
            <v-row>
              <v-col>
                <v-btn
                  text
                  small
                  :disabled="round.id == rounds[0].id"
                  @click="this.previousRound"
                >
                  <v-icon left>mdi-chevron-double-left</v-icon>Anterior
                </v-btn>
              </v-col>
              <v-col>
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
        </v-row>
      </v-card-title>
    </v-card>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4">
        <v-card v-if="topScorers.length != 0" class="mt-9 no-teams">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="primary"
            elevation="12"
            max-width="calc(100% - 32px)"
            max-height="calc(100% - 32px)"
          >
            <v-card class="transparent">
              <v-card-text v-for="i in 4" :key="i" class="white--text">
                <v-row no-gutters>
                  <v-col cols="9">
                    <v-avatar tile size="36">
                      <v-img
                        :src="constants.ADDRESS + topScorers[i - 1].avatar"
                        @error="
                          topScorers[i - 1].avatar = constants.DEFAULT_TEAM_URL
                        "
                        contain
                      />
                    </v-avatar>
                    {{ topScorers[i - 1].name }}</v-col
                  >
                  <v-col align-self="center"
                    >{{ topScorers[i - 1].stats.goals }}
                    <v-icon class="white--text">mdi-soccer</v-icon></v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
          </v-sheet>
          <v-card-text class="pt-0">
            <v-card-title class="justify-center"
              >Equipos más goleadores</v-card-title
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4">
        <v-card v-if="mostTrashed.length != 0" class="mt-9 no-teams">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="primary"
            elevation="12"
            max-width="calc(100% - 32px)"
            max-height="calc(100% - 32px)"
          >
            <v-card class="transparent">
              <v-card-text v-for="i in 4" :key="i" class="white--text">
                <v-row no-gutters>
                  <v-col cols="9">
                    <v-avatar tile size="36">
                      <v-img
                        :src="constants.ADDRESS + mostTrashed[i - 1].avatar"
                        @error="
                          mostTrashed[i - 1].avatar = constants.DEFAULT_TEAM_URL
                        "
                        contain
                      />
                    </v-avatar>
                    {{ mostTrashed[i - 1].name }}</v-col
                  >
                  <v-col
                    >{{ mostTrashed[i - 1].stats.againstGoals }}
                    <v-icon class="white--text">mdi-soccer</v-icon></v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
          </v-sheet>
          <v-card-text class="pt-0">
            <v-card-title class="justify-center"
              >Equipos menos goleados</v-card-title
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4">
        <v-card v-if="topDifference.length != 0" class="mt-9 no-teams">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="primary"
            elevation="12"
            max-width="calc(100% - 32px)"
            max-height="calc(100% - 32px)"
          >
            <v-card class="transparent">
              <v-card-text v-for="i in 4" :key="i" class="white--text">
                <v-row no-gutters>
                  <v-col cols="9">
                    <v-avatar tile size="36">
                      <v-img
                        :src="constants.ADDRESS + topDifference[i - 1].avatar"
                        @error="
                          topDifference[i - 1].avatar =
                            constants.DEFAULT_TEAM_URL
                        "
                        contain
                      />
                    </v-avatar>
                    {{ topDifference[i - 1].name }}</v-col
                  >
                  <v-col
                    >{{ topDifference[i - 1].stats.goalDif }}
                    <v-icon class="white--text">mdi-soccer</v-icon></v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
          </v-sheet>
          <v-card-text class="pt-0">
            <v-card-title class="justify-center"
              >Mejor diferencia de goles</v-card-title
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="1"
        v-for="team in competition.teams"
        :key="team.id"
      >
        <v-card
          class="teamCard d-flex flex-column"
          min-height="100%"
          @click.native.stop="
            $router.push('/teams/' + team.id + '/competitionstats')
          "
        >
          <v-col>
            <v-img
              justify="center"
              :src="constants.ADDRESS + team.avatar"
              @error="team.avatar = constants.DEFAULT_TEAM_URL"
              aspect-ratio="2"
              contain
            ></v-img>
          </v-col>
          <v-card-text class="title-card text-center grow">
            <b>{{ team.name }}</b>
          </v-card-text>
          <v-card-text class="text-center" height="100%">
            <!-- Nº de jugadores: {{team.players.length}}   -->
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  icon
                  color="info"
                  @click.stop=";(updatingTeam = team), (dialog = true)"
                  v-on="on"
                >
                  <v-icon size="18">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar equipo</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  icon
                  color="error"
                  v-on="on"
                  @click.stop=";(deletingTeam = team.id), (deleteDialog = true)"
                >
                  <v-icon size="18">delete</v-icon>
                </v-btn>
              </template>
              <span>Borrar equipo</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="top"
      transition="slide-y-reverse-transition"
      fixed
    >
      <template v-slot:activator>
        <v-btn v-model="fab" fab color="accent" dark>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            dark
            small
            color="green"
            @click.stop="dialog = !dialog"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Añadir equipo a competición</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            dark
            small
            color="indigo"
            @click.stop="addOwnTeam = !addOwnTeam"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Añadir equipo propio</span>
      </v-tooltip>
    </v-speed-dial>
    <v-dialog v-model="addOwnTeam" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Selecciona el equipo que quieres añadir</v-card-title
        >
        <v-card-text>
          <v-select
            :items="myTeamsWithoutCompetition"
            item-text="name"
            return-object
            v-model="team"
            label="Seleccionar Equipo"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="addOwnTeam = false">Cancelar</v-btn>
          <v-btn color="primary" @click="addMyTeam()">Añadir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <CreateTeam
      v-if="dialog"
      :team="(updatingTeam ? updatingTeam : null)"
      :show="dialog"
      @confirm="confirm"
      @close=";(dialog = !dialog), (updatingTeam = null)"
    ></CreateTeam>
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      type="team"
      @close=";(deleteDialog = !deleteDialog), (deletingTeam = null)"
      @delete="deleteTeamFunction"
    ></DeleteDialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import CreateTeam from '../../../components/modals/CreateTeam'
import DeleteDialog from '../../../components/modals/DeleteDialog'
export default {
  components: {
    CreateTeam,
    DeleteDialog
  },
  data() {
    return {
      fab: false,
      constants: constants,
      dialog: false,
      deleteDialog: false,
      updatingTeam: null,
      deletingTeam: null,
      addOwnTeam: false,
      team: ''
    }
  },
  methods: {
    async confirm() {
      this.dialog = false
      if (this.updatingTeam) {
        await this.getCompetition(this.competition.id)
      }
    },
    async deleteTeamFunction() {
      await this.deleteTeam(this.deletingTeam)
      await this.getCompetition(this.competition.id)
      this.deleteDialog = false
    },
    async addMyTeam() {
      this.team.competition = Number(this.$route.params.id)
      let body = {
        team: this.team
      }
      let data = {
        body: body,
        id: this.team.id
      }
      await this.updateTeam(data)
      this.addOwnTeam = false
    },
    changeResultRound(item) {
      //coger el numero de round y ponerlo en selectedRound
      let str = item.name
      let res = str.split(' ')
      this.changeRound(res[1])
    },
    ...mapActions({
      getCompetition: 'competition/getCompetition',
      deleteTeam: 'team/deleteTeam',
      updateTeam: 'team/updateTeam',
      changeRound: 'competition/changeRound',
      previousRound: 'competition/previousRound',
      nextRound: 'competition/nextRound'
    })
  },
  async created() {
    // await this.changeRound(this.rounds.length -1)
  },
  computed: {
    ...mapGetters({
      competition: 'competition/competition',
      myTeams: 'team/myTeams',
      rounds: 'competition/rounds',
      round: 'competition/round',
      selectedRound: 'competition/selectedRound',
      rankedTeams: 'competition/rankedTeams',
      topScorers: 'competition/topScorers',
      mostTrashed: 'competition/mostTrashed',
      topDifference: 'competition/topDifference'
    }),
    myTeamsWithoutCompetition() {
      let teams = []
      for (let i = 0; i < this.myTeams.length; i++) {
        if (
          this.myTeams[i].competition == null ||
          !this.myTeams[i].competition
        ) {
          teams.push(this.myTeams[i])
        }
      }
      return teams
    }
  }
}
</script>
<style scoped>
.no-teams {
  width: 100%;
}
.teamCard {
  cursor: pointer;
}
.title-card {
  font-size: 15px;
}
</style>
