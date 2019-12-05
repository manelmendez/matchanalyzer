<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary darken-1">
          <v-btn icon dark @click.native="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Añadir estadísticas del partido</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click.native="close">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row>
          <v-col class="text-center">{{localTeam.name}}</v-col>
          <v-col class="text-center">{{awayTeam.name}}</v-col>
        </v-row>
        <v-row v-for="part of parts" :key="part">
          <v-col class="text-center">
            <v-row>
              <v-col class="text-center">
                Parte {{part}}
              </v-col>
            </v-row>
            <v-row>
              <AddMatchStatsContent :team="localTeam"></AddMatchStatsContent>
              <v-divider vertical></v-divider>
              <AddMatchStatsContent :team="awayTeam"></AddMatchStatsContent>
            </v-row>
            <br><br>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn v-if="parts != 4" fab color="accent" dark @click.stop="parts=parts+1">
              <v-icon class="material-icons">mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
</template>

<script>
import constants from "../../assets/constants/constants";
import AddMatchStatsContent from '../AddMatchStatsContent.vue'
export default {
  props:{
    show: Boolean,
    localTeam: Object,
    awayTeam: Object
  },
  components: {
    AddMatchStatsContent
  },
  data() {
    return {
      constants: constants,
      parts:1,
    }
  },
  created(){
  }
}
</script>

<style>

</style>