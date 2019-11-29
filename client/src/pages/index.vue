<template>
  <v-container class="homeContent" fluid>
    <v-col class="content">
      <v-row class="group"> 
        <v-col v-if="this.myTeams.length == 0">
          No tienes equipos
        </v-col>
        <v-list v-else>
          <v-list-item
            v-for="team in this.myTeams"
            :key="team.id"
          >
            <v-list-item-content>
              <v-list-item-title v-text="team.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-row>
      <v-row class="group">
        <v-col v-if="this.competitions.length == 0">
          No tienes competiciones
        </v-col>
        <v-list v-else>
          <v-list-item
            v-for="competition in this.competitions"
            :key="competition.id"
          >
            <v-list-item-content>
              <v-list-item-title v-text="competition.myTeam.name + ' - ' + competition.discipline + ' - ' + competition.category + ' - ' + competition.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "index",
  methods: {
    ...mapActions({
      getUserCompetitions:'competition/getUserCompetitions',
      getUserTeams:'team/getUserTeams'
    }),
  },
  computed: {
    ...mapGetters({
      user:'user/user',
      myTeams:'team/myTeams',
      competitions:'competition/competitions'
    })
  },
  created() {
    //do something after creating vue instance
    this.getUserCompetitions(this.user.id)
    this.getUserTeams(this.user.id)
  }
}
</script>
<style scoped>
.homeContent {
  height: 100%;
}
.content {
  height: 100%;
}
.group {
  background-color: var(--v-item-base);
  height: 50%;
}
</style>
