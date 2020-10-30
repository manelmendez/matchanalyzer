<template>
  <v-container fluid>
    <v-card v-if="team">
      <v-card-title>
        <v-row align="center">
          <v-col justify="center" cols="12" sm="6">
            <v-chip label>
              <v-avatar left>
                <v-img
                  v-if="team.avatar"
                  :src="constants.ADDRESS + team.avatar"
                  @error="team.avatar = constants.DEFAULT_TEAM_URL"
                  alt="avatar"
                  :contain="true"
                  height="40"
                  width="40"
                />
              </v-avatar>
              {{ team.name }}
            </v-chip>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-card
              v-if="team.competition != null"
              outline
              class="rounded-xl"
              color="primary darken-1"
              :to="{
                name: 'summary',
                params: { id: team.competition, roundId: 'latest' }
              }"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle class="white--text">
                    Ir a la competición
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon large class="white--text">mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col v-if="team.competition != null && pichichiList && cardList">
            <PichichiChart
              class="mt-2"
              :chart-data="pichichiList"
              :height="breakpoint == 'xs' ? 250 : 150"
            ></PichichiChart>
            <CardsChart
              class="mt-2"
              :chart-data="cardList"
              :height="breakpoint == 'xs' ? 250 : 150"
            ></CardsChart>
          </v-col>
          <v-col>
            <v-data-table
              v-if="players"
              :headers="headers"
              :items="players"
              class="elevation-1 text-center"
              hide-default-footer
              :items-per-page="-1"
            >
              <template v-slot:[`item.avatar`]="{ item }">
                <v-row class="text-center">
                  <v-img
                    :src="constants.ADDRESS + item.avatar"
                    @error="item.avatar = constants.DEFAULT_PLAYER_URL"
                    alt="avatar"
                    :contain="true"
                    height="40"
                    width="40"
                  />
                </v-row>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      text
                      icon
                      color="info"
                      @click=";(editingPlayer = item), (dialog = true)"
                      v-on="on"
                    >
                      <v-icon size="18">mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar jugador</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      text
                      icon
                      color="error"
                      v-on="on"
                      @click="
                        ;(deletingPlayer = item.id), (deleteDialog = true)
                      "
                    >
                      <v-icon size="18">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Borrar jugador</span>
                </v-tooltip>
              </template>
              <template v-slot:no-data>
                <v-col>
                  <v-alert :value="true" type="error" icon="warning">
                    No hay jugadores en este equipo :(
                  </v-alert>
                </v-col>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          color="accent"
          dark
          bottom
          right
          fixed
          @click.stop="dialog = !dialog"
          v-on="on"
        >
          <v-icon class="material-icons">mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Añadir jugador</span>
    </v-tooltip>
    <CreatePlayer
      v-if="dialog"
      :player="editingPlayer ? editingPlayer : null"
      :show="dialog"
      @confirm="createPlayer"
      @close=";(dialog = !dialog), (editingPlayer = null)"
    ></CreatePlayer>
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      type="player"
      @close=";(deleteDialog = !deleteDialog), (deletingPlayer = null)"
      @delete="deletePlayerFunction"
    ></DeleteDialog>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import CreatePlayer from '../../../components/modals/CreatePlayer'
import DeleteDialog from '../../../components/modals/DeleteDialog'
import constants from '../../../assets/constants/constants'
import PichichiChart from '../../../components/team/pichichiChart'
import CardsChart from '../../../components/team/cardsChart'
import colors from 'vuetify/lib/util/colors'
export default {
  name: 'team',
  components: {
    CreatePlayer,
    DeleteDialog,
    PichichiChart,
    CardsChart
  },
  data: () => ({
    deletingPlayer: null,
    editingPlayer: null,
    deleteDialog: false,
    constants: constants,
    colors: colors,
    dialog: false,
    headers: [
      { text: '', align: 'center', sortable: false, value: 'avatar' },
      { text: 'Nombre', align: 'center', sortable: true, value: 'name' },
      { text: 'Posición', value: 'position', align: 'center' },
      { text: 'Año de nacimiento', value: 'year', align: 'center' },
      { text: 'Acciones', value: 'actions', align: 'center' }
    ]
  }),
  methods: {
    createPlayer() {
      this.dialog = false
    },
    async deletePlayerFunction() {
      await this.deletePlayer(this.deletingPlayer)
      this.deleteDialog = false
    },
    ...mapActions({
      getTeam: 'team/getTeam',
      getPlayersByTeamId: 'team/getPlayersByTeamId',
      getTeamScorers: 'team/getTeamScorers',
      getTeamCards: 'team/getTeamCards',
      deletePlayer: 'team/deletePlayer'
    })
  },
  computed: {
    team() {
      return this.$store.getters['team/teamById'](this.$route.params.id)
    },
    players() {
      return this.$store.getters['team/playersByTeamId'](this.$route.params.id)
    },
    pichichiList() {
      if (this.$store.getters['team/pichichiList'].length != 0) {
        const list = this.$store.getters['team/pichichiList']
        const primero = list[0]
        const segundo = list[1]
        const tercero = list[2]
        const cuarto = list[3]
        const quinto = list[4]
        const labels = []
        const goals1 = []
        const goals2 = []
        const goals3 = []
        const goals4 = []
        const goals5 = []
        const rounds = list[0].roundsGoals.length
        for (let i = 0; i < rounds; i++) {
          // labels.push(this.statsPerRound[i].name)
          labels.push('J' + (i + 1))
          goals1.push(primero.roundsGoals[i])
          goals2.push(segundo.roundsGoals[i])
          goals3.push(tercero.roundsGoals[i])
          goals4.push(cuarto.roundsGoals[i])
          goals5.push(quinto.roundsGoals[i])
        }
        let style = getComputedStyle(document.body)
        const primaryColor = style.getPropertyValue('--v-primary-base')
        const secondaryColor = style.getPropertyValue('--v-secondary-base')
        const color3 = this.colors.shades.black
        const color4 = this.colors.indigo.base
        const color5 = this.colors.cyan.base

        return {
          labels: labels,
          datasets: [
            {
              label: primero.playerName,
              data: goals1,
              backgroundColor: 'rgb(0,0,0,0.1)',
              borderColor: primaryColor,
              fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: segundo.playerName,
              data: goals2,
              backgroundColor: 'rgb(0,0,0,0)',
              borderColor: secondaryColor,
              fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: tercero.playerName,
              data: goals3,
              backgroundColor: 'rgb(0,0,0,0)',
              borderColor: color3,
              fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: cuarto.playerName,
              data: goals4,
              backgroundColor: 'rgb(0,0,0,0)',
              borderColor: color4,
              fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: quinto.playerName,
              data: goals5,
              backgroundColor: 'rgb(0,0,0,0)',
              borderColor: color5,
              fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            }
          ]
        }
      } else {
        return undefined
      }
    },
    cardList() {
      if (this.$store.getters['team/cardList'].length != 0) {
        const list = this.$store.getters['team/cardList']
        const primero = list[0]
        const segundo = list[1]
        const tercero = list[2]
        const labels = []
        const cards1 = []
        const cards2 = []
        const cards3 = []
        const rounds = list[0].roundCards.length
        for (let i = 0; i < rounds; i++) {
          // labels.push(this.statsPerRound[i].name)
          labels.push('J' + (i + 1))
          cards1.push(primero.roundCards[i])
          cards2.push(segundo.roundCards[i])
          cards3.push(tercero.roundCards[i])
        }
        let style = getComputedStyle(document.body)
        const primaryColor = style.getPropertyValue('--v-primary-base')
        const secondaryColor = style.getPropertyValue('--v-secondary-base')
        const accentColor = style.getPropertyValue('--v-error-base')

        return {
          labels: labels,
          datasets: [
            {
              label: primero.playerName,
              data: cards1,
              backgroundColor: 'rgb(0,0,0,0.1)',
              borderColor: primaryColor,
              fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: segundo.playerName,
              data: cards2,
              backgroundColor: 'rgb(0,0,0,0.1)',
              borderColor: secondaryColor,
              fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            },
            {
              label: tercero.playerName,
              data: cards3,
              backgroundColor: 'rgb(0,0,0,0.1)',
              borderColor: accentColor,
              fill: 'start' //esto provoca que se pinte la parte de abajo de la linia (por hacer el reverse)
            }
          ]
        }
      } else {
        return undefined
      }
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name
    }
  },
  async created() {
    await this.getTeam(this.$route.params.id)
    await this.getPlayersByTeamId(this.$route.params.id)
    if (this.team.competition != null) {
      await this.getTeamScorers({
        teamId: this.$route.params.id,
        competitionId: this.team.competition
      })
      await this.getTeamCards({
        teamId: this.$route.params.id,
        competitionId: this.team.competition
      })
    }
  }
}
</script>
<style scoped></style>
