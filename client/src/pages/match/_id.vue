<template>
  <v-container>
    <v-card v-if="dataLoaded">
      <v-toolbar dark color="primary darken-1">
        <v-toolbar-title>Estadísticas del partido</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-toolbar-items>
            <v-btn dark text @click.native="addStats">Guardar</v-btn>
          </v-toolbar-items> -->
      </v-toolbar>
      <v-row v-if="match.localTeam && match.awayTeam">
        <v-col class="text-end">{{ match.localTeam.name }}</v-col>
        <v-col cols="2" class="text-center">VS</v-col>
        <v-col class="text-start">{{ match.awayTeam.name }}</v-col>
      </v-row>
      <v-row
        v-for="(part, index) of match.localTeam.manager
          ? match.localTeam.matchparts
          : match.awayTeam.matchparts"
        :key="part.id"
      >
        <v-col class="text-center">
          <v-row>
            <v-col class="text-center"> Parte {{ index + 1 }} </v-col>
          </v-row>
          <v-row>
            <addMatchStatsContent
              ref="localchild"
              :team="match.localTeam"
              :matchId="Number($route.params.matchId)"
              :matchpart="part"
            ></addMatchStatsContent>
            <!-- <v-divider vertical></v-divider>
              <addMatchStatsContent 
                ref="awaychild" 
                :team="match.awayTeam" 
                :matchId="Number($route.params.matchId)" 
                :matchpart="part"
              ></addMatchStatsContent> -->
          </v-row>
          <br /><br />
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
            v-if="
              this.matchparts.length < 3 &&
              checkManagerTeam(match.localTeam, match.awayTeam)
            "
            fab
            color="accent"
            dark
            @click.stop="addMatchpartDialog = true"
          >
            <v-icon class="material-icons">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <AddMatchpart
      v-if="addMatchpartDialog"
      :show="addMatchpartDialog"
      @close="addMatchpartDialog = false"
      @confirm="createMatchpart"
    ></AddMatchpart>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import constants from '../../assets/constants/constants'
import addMatchStatsContent from '../../components/addMatchStatsContent'
import AddMatchpart from '../../components/modals/AddMatchpart'
export default {
  components: {
    addMatchStatsContent,
    AddMatchpart,
  },
  data() {
    return {
      constants: constants,
      addMatchpartDialog: false,
      dataLoaded: false,
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    checkManagerTeam(team1, team2) {
      if (team1.manager != null || team2.manager != null) {
        return true
      } else return false
    },
    async createMatchpart(data) {
      let matchpart = {
        ...data,
        matchId: this.$route.params.matchId,
        team: this.match.localTeam.manager
          ? this.match.localTeam.id
          : this.match.awayTeam.id,
      }
      let response = await this.addMatchpart(matchpart)
      if (response.status == 200) {
        if (response.data.savedPart.team == this.match.localTeam.id) {
          this.match.localTeam.matchparts.push(response.data.savedPart)
        } else {
          this.match.awayTeam.matchparts.push(response.data.savedPart)
        }
      }
      this.addMatchpartDialog = false
    },
    putData() {
      if (this.matchparts.length != 0) {
        this.match.localTeam.matchparts = []
        this.match.awayTeam.matchparts = []
        for (let matchpart of this.matchparts) {
          if (this.minutes.length != 0)
            matchpart.minutes = this.minutes.filter(
              (minute) => minute.matchpart == matchpart.id
            )
          if (this.goals.length != 0)
            matchpart.goals = this.goals.filter(
              (goal) => goal.matchpart == matchpart.id
            )
          if (this.assists.length != 0)
            matchpart.assists = this.assists.filter(
              (assist) => assist.matchpart == matchpart.id
            )
          if (this.cards.length != 0)
            matchpart.cards = this.cards.filter(
              (card) => card.matchpart == matchpart.id
            )
          if (this.substitutions.length != 0)
            matchpart.substitutions = this.substitutions.filter(
              (substitution) => substitution.matchpart == matchpart.id
            )

          if (matchpart.team == this.match.localTeam.id) {
            this.match.localTeam.matchparts.push(matchpart)
          } else {
            this.match.awayTeam.matchparts.push(matchpart)
          }
        }
      }
    },
    ...mapActions({
      getMatch: 'competition/getMatch',
      getTeam: 'team/getTeam',
      getPlayersByTeamId: 'team/getPlayersByTeamId',
      addMatchpart: 'competition/addMatchpart',
      getMatchpartsByMatchId: 'competition/getMatchpartsByMatchId',
      getMinutesByMatchId: 'competition/getMinutesByMatchId',
      getGoalsByMatchId: 'competition/getGoalsByMatchId',
      getAssistsByMatchId: 'competition/getAssistsByMatchId',
      getCardsByMatchId: 'competition/getCardsByMatchId',
      getSubstitutionsByMatchId: 'competition/getSubstitutionsByMatchId',
    }),
  },
  async created() {
    await this.getMatch(this.$route.params.matchId)
    await this.getMatchpartsByMatchId(this.$route.params.matchId)
    await this.getMinutesByMatchId(this.$route.params.matchId)
    await this.getGoalsByMatchId(this.$route.params.matchId)
    await this.getAssistsByMatchId(this.$route.params.matchId)
    await this.getCardsByMatchId(this.$route.params.matchId)
    await this.getSubstitutionsByMatchId(this.$route.params.matchId)
    this.dataLoaded = true
  },
  computed: {
    match() {
      return this.$store.getters['competition/match']
    },
    matchparts() {
      return this.$store.getters['competition/matchpartsByMatch'](
        this.$route.params.matchId
      )
    },
    minutes() {
      return this.$store.getters['competition/minutesByMatch'](
        this.$route.params.matchId
      )
    },
    goals() {
      return this.$store.getters['competition/goalsByMatch'](
        this.$route.params.matchId
      )
    },
    assists() {
      return this.$store.getters['competition/assistsByMatch'](
        this.$route.params.matchId
      )
    },
    cards() {
      return this.$store.getters['competition/cardsByMatch'](
        this.$route.params.matchId
      )
    },
    substitutions() {
      return this.$store.getters['competition/substitutionsByMatch'](
        this.$route.params.matchId
      )
    },
  },
  watch: {
    async match() {
      await this.getTeam(this.match.localTeam)
      this.match.localTeam = this.$store.getters['team/teamById'](
        this.match.localTeam
      )
      await this.getPlayersByTeamId(this.match.localTeam.id)
      this.match.localTeam.players = this.$store.getters[
        'team/playersByTeamId'
      ](this.match.localTeam.id)
      await this.getTeam(this.match.awayTeam)
      this.match.awayTeam = this.$store.getters['team/teamById'](
        this.match.awayTeam
      )
      await this.getPlayersByTeamId(this.match.awayTeam.id)
      this.match.awayTeam.players = this.$store.getters['team/playersByTeamId'](
        this.match.awayTeam.id
      )
      this.putData()
    },
  },
}
</script>

<style scoped></style>
