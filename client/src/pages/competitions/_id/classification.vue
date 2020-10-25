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
      <v-card style="width: 100%">
        <v-card-title>
          <v-row justify="space-between" align="center">
            <v-col cols="6" md="3">
              <v-select
                dense
                :items="rounds"
                item-text="name"
                required
                :value="round"
                return-object
                @change="changeResultRound"
              ></v-select>
            </v-col>
            <v-col cols="6" md="3">
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
            <v-col cols="12" md="3" align-self="center">
              <v-row justify="center" align="center">
                <v-switch
                  dense
                  label="Ver detalles"
                  v-model="details"
                ></v-switch>
              </v-row>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <classificationTable
            :rankedTeams="rankedTeams"
            :details="details"
          ></classificationTable>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import classificationTable from '../../../components/competition/classificationTable'
export default {
  name: 'classification',
  components: {
    classificationTable
  },
  data: () => ({
    constants: constants,
    details: false
  }),
  methods: {
    changeResultRound(item) {
      let str = item.name
      let res = str.split(' ')
      this.$router.push({
        name: 'classification',
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
        name: 'classification',
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
        name: 'classification',
        params: {
          id: this.$route.params.id,
          roundId: Number(actualRound) + 1
        }
      })
    }
  },
  computed: {
    ...mapGetters('competition', ['competition', 'rounds']),
    round() {
      return this.$store.getters['competition/round'](
        this.$route.params.roundId
      )
    },
    rankedTeams() {
      return this.$store.getters['competition/rankedTeams'](
        this.$route.params.roundId
      )
    }
  }
}
</script>
<style scoped>
.no-data {
  width: 100%;
}
</style>
