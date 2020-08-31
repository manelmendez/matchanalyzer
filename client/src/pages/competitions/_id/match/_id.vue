<template>
  <v-container>
    <v-card v-if="dataLoaded && teamsLoaded">
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
      <v-row v-for="(part, index) of matchparts" :key="part.id">
        <v-col class="text-center">
          <v-row>
            <v-col class="text-center"> Parte {{ index + 1 }} </v-col>
          </v-row>
          <v-row>
            <addMatchStatsContent
              v-if="match.localTeam.manager || match.awayTeam.manager"
              :team="
                match.localTeam.manager
                  ? match.localTeam
                  : match.awayTeam.manager
                  ? match.awayTeam
                  : null
              "
              :roundId="Number(match.round)"
              :matchId="Number($route.params.matchId)"
              :matchpart="part"
              :prevPartMinutes="getPreviousMinutes(index)"
            ></addMatchStatsContent>
          </v-row>
          <br /><br />
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn
            v-if="
              this.matchparts.length < 4 &&
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
import constants from '../../../../assets/constants/constants'
import addMatchStatsContent from '../../../../components/competition/match/addMatchStatsContent'
import AddMatchpart from '../../../../components/modals/AddMatchpart'
export default {
  components: {
    addMatchStatsContent,
    AddMatchpart
  },
  data() {
    return {
      constants: constants,
      addMatchpartDialog: false,
      dataLoaded: false,
      teamsLoaded: false
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
        roundId: this.match.round,
        team: this.match.localTeam.manager
          ? this.match.localTeam.id
          : this.match.awayTeam.id
      }
      let response = await this.addMatchpart(matchpart)
      this.matchparts.push(response.data.savedPart)
      this.addMatchpartDialog = false
    },
    getPreviousMinutes(index) {
      let prevMinutes = 0
      for (let i = 0; i < index; i++) {
        prevMinutes += parseInt(this.matchparts[index - 1].time)
      }
      return prevMinutes
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
      getSubstitutionsByMatchId: 'competition/getSubstitutionsByMatchId'
    })
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
    }
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
      this.teamsLoaded = true
    }
  }
}
</script>

<style scoped></style>
