<template>
  <v-row justify="center" align="center">
    <v-col class="pt-1 pb-1" cols="12" sm="5" md="4">
      <v-card
        :color="resultClass(match.localTeamGoals, match.awayTeamGoals)"
        outlined
      >
        <v-list class="transparent">
          <v-list-item class="grow">
            <v-list-item-avatar tile>
              <v-img
                :src="constants.ADDRESS + match.localTeam.avatar"
                @error="match.localTeam.avatar = constants.DEFAULT_TEAM_URL"
                aspect-ratio="10"
                contain
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-text="match.localTeam.name"
                :title="match.localTeam.name"
              >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col class="pt-1 pb-1" cols="6" sm="2" md="2">
      <v-card color="rgba(199, 199, 199, 0.55)" outlined>
        <v-card-text class="result">
          {{ match.localTeamGoals }} - {{ match.awayTeamGoals }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col class="pt-1 pb-1" cols="12" sm="5" md="4">
      <v-card
        :color="resultClass(match.awayTeamGoals, match.localTeamGoals)"
        outlined
      >
        <v-list class="transparent">
          <v-list-item>
            <v-list-item-avatar tile>
              <v-img
                :src="constants.ADDRESS + match.awayTeam.avatar"
                @error="match.awayTeam.avatar = constants.DEFAULT_TEAM_URL"
                aspect-ratio="10"
                contain
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-text="match.awayTeam.name"
                :title="match.awayTeam.name"
              >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col class="pt-1 pb-1" cols="6" sm="6" md="2">
      <v-card outlined>
        <v-card-text class="text-center pt-0 pb-0">
          <v-row>
            <v-col
              v-if="
                match.awayTeam.manager != null ||
                match.localTeam.manager != null
              "
            >
              <v-tooltip
                top
                v-if="
                  match.awayTeam.manager != null ||
                  match.localTeam.manager != null
                "
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    x-small
                    text
                    icon
                    color="green lighten-2"
                    :to="{ name: 'match-id', params: { matchId: match.id } }"
                    v-on="on"
                  >
                    <v-icon size="18">fa-file-alt</v-icon>
                  </v-btn>
                </template>
                <span>Añadir/editar stats</span>
              </v-tooltip>
            </v-col>
            <v-col>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    x-small
                    text
                    icon
                    color="info"
                    @click.stop="roundDialog = true"
                    v-on="on"
                  >
                    <v-icon size="18">edit</v-icon>
                  </v-btn>
                </template>
                <span>Editar partido</span>
              </v-tooltip>
            </v-col>
            <v-col>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    x-small
                    text
                    icon
                    color="error"
                    @click.stop="deleteDialog = true"
                    v-on="on"
                  >
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
    <v-col cols="10">
      <v-divider></v-divider>
    </v-col>
    <CreateMatch
      v-if="roundDialog"
      :show="roundDialog"
      type="edit"
      :roundTeams="newRoundTeams"
      :match="match"
      @close="roundDialog = !roundDialog"
      @edit="updateMatchFunction"
    ></CreateMatch>
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      type="match"
      @close="deleteDialog = !deleteDialog"
      @delete="deleteMatchFunction"
    ></DeleteDialog>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import CreateMatch from '../modals/CreateMatch'
import DeleteDialog from '../modals/DeleteDialog'
import constants from '../../assets/constants/constants'
export default {
  name: 'RoundMatch',
  components: {
    CreateMatch,
    DeleteDialog
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
    }
  },
  methods: {
    resultClass(goals1, goals2) {
      if (goals1 == goals2) return 'rgba(255, 212, 71, 0.55)'
      else if (goals1 > goals2) return 'rgba(117, 255, 131, 0.55)'
      else return 'rgba(255, 117, 117, 0.55)'
    },
    async deleteMatchFunction() {
      this.$emit('loading')
      await this.deleteMatch(this.match.id)
      await this.getCompetition(this.$route.params.id)
      this.deleteDialog = false
      this.$emit('loading')
    },
    async updateMatchFunction(match) {
      if (match.localTeam == match.awayTeam) {
        alert('No puedes seleccionar el mismo equipo en ambos lados')
      } else {
        let data = {
          id: this.match.id,
          body: match
        }
        this.$emit('loading')
        await this.updateMatch(data)
        await this.getCompetition(this.$route.params.id)
        this.roundDialog = false
        this.$emit('loading')
      }
    },
    ...mapActions('competition', [
      'updateMatch',
      'deleteMatch',
      'getCompetition'
    ])
  },
  computed: {
    ...mapGetters('competition', [
      'selectedRound',
      'roundTeams',
      'competition'
    ]),
    newRoundTeams() {
      return [...this.roundTeams, this.match.localTeam, this.match.awayTeam]
    }
  }
}
</script>
<style scoped>
.match-actions {
  text-align: center;
  height: 100%;
}
.result {
  font-size: 20px;
}
</style>
