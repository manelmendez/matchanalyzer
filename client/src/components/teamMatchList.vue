<template>
  <v-card>
    <v-card-title>
      Jornadas disputadas
    </v-card-title>
    <v-data-table
      hide-default-header
      hide-default-footer
      dense
      :headers="headers"
      :items="matchList"
      :items-per-page="-1"
      class="elevation-1"
    >
      <template v-slot:item.equipos="{ item }">
        <router-link
          :class="item.localTeam.id == team.id ? 'team' : 'rival'"
          :to="'/teams/' + item.localTeam.id + '/competitionstats'"
          >{{ item.localTeam.name }}</router-link
        >
        -
        <router-link
          :class="item.awayTeam.id == team.id ? 'team' : 'rival'"
          :to="'/teams/' + item.awayTeam.id + '/competitionstats'"
          >{{ item.awayTeam.name }}</router-link
        >
      </template>
      <template v-slot:item.resultados="{ item }">
        {{ item.localTeamGoals }} - {{ item.awayTeamGoals }}
      </template>
      <template v-slot:item.badge="{ item }">
        <v-badge
          v-if="
            (item.localTeam.id == team.id &&
              Number(item.localTeamGoals) > Number(item.awayTeamGoals)) ||
            (item.awayTeam.id == team.id &&
              Number(item.awayTeamGoals) > Number(item.localTeamGoals))
          "
          width="20px"
          height="20px"
          color="success"
          content="G"
          inline
          tile
        ></v-badge>
        <v-badge
          v-if="Number(item.localTeamGoals) == Number(item.awayTeamGoals)"
          width="20px"
          height="20px"
          color="warning"
          content="E"
          inline
          tile
        ></v-badge>
        <v-badge
          v-if="
            (item.localTeam.id == team.id &&
              Number(item.localTeamGoals) < Number(item.awayTeamGoals)) ||
            (item.awayTeam.id == team.id &&
              Number(item.awayTeamGoals) < Number(item.localTeamGoals))
          "
          width="20px"
          height="20px"
          color="error"
          content="P"
          inline
          tile
        ></v-badge>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    team: Object,
    rounds: Array,
  },
  data() {
    return {
      headers: [
        { text: 'Jornada', value: 'roundName' },
        { text: 'Equipos', value: 'equipos' },
        { text: 'Resultado', value: 'resultados' },
        { text: 'Etiqueta', value: 'badge' },
      ],
    }
  },
  computed: {
    matchList() {
      let matches = []
      for (let i = 0; i < this.rounds.length; i++) {
        for (let j = 0; j < this.rounds[i].matches.length; j++) {
          let match = this.rounds[i].matches[j]
          match.roundName = this.rounds[i].name
          if (
            match.localTeam.id == this.team.id ||
            match.awayTeam.id == this.team.id
          ) {
            matches.push(match)
          }
        }
      }
      return matches
    },
  },
}
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.1);
}
.rival {
  text-decoration: none;
}
.team {
  text-decoration: none;
  color: var(--v-primary-lighten2) !important;
}
</style>
