<template>
  <v-container fluid v-if="rounds">
    <v-row v-if="rounds.length == 0">
      <v-card class="no-data">
        <v-card-text class="text-center">
          Aun no hay ninguna jornada disputada
          <br />
        </v-card-text>
      </v-card>
    </v-row>
    <v-row v-else>
      <v-card>
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
        <v-card-text>
          <classificationTable :rankedTeams="rankedTeams"></classificationTable>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import classificationTable from '../../../components/classificationTable'
export default {
  name: 'classification',
  components: {
    classificationTable,
  },
  data: () => ({
    constants: constants,
  }),
  methods: {
    changeResultRound(item) {
      //coger el numero de round y ponerlo en selectedRound
      let str = item.name
      let res = str.split(' ')
      this.changeRound(res[1])
    },
    ...mapActions('competition', ['changeRound', 'previousRound', 'nextRound']),
  },
  computed: {
    ...mapGetters('competition', [
      'competition',
      'selectedRound',
      'rankedTeams',
      'rounds',
      'round',
    ]),
  },
}
</script>
<style scoped>
.no-data {
  width: 100%;
}
</style>
