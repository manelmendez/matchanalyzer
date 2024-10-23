<template>
  <v-card class="mt-5">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="primary"
      elevation="12"
      max-width="calc(100% - 32px)"
      max-height="calc(100% - 32px)"
    >
      <v-list class="transparent" dense>
        <v-list-item v-for="i in 4" :key="i" class="white--text">
          <v-list-item-avatar tile size="30">
            <v-img
              :src="constants.ADDRESS + topDifference[i - 1].avatar"
              @error="topDifference[i - 1].avatar = constants.DEFAULT_TEAM_URL"
              contain
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title :title="topDifference[i - 1].name">
              {{ topDifference[i - 1].name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon small>
              {{ topDifference[i - 1].stats.goalDif
              }}<v-icon class="white--text">mdi-soccer</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-sheet>
    <v-card-text class="pt-0">
      <div class="text-center title mb-2">Mejor diferencia de goles</div>
    </v-card-text>
  </v-card>
</template>

<script>
import constants from '../../../assets/constants/constants'
export default {
  props: {
    topDifference: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      constants: constants
    }
  }
}
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
