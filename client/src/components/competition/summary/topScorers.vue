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
              :src="constants.ADDRESS + topScorers[i - 1].avatar"
              @error="topScorers[i - 1].avatar = constants.DEFAULT_TEAM_URL"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              v-text="topScorers[i - 1].name"
              :title="topScorers[i - 1].name"
            ></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon small>
              {{ topScorers[i - 1].stats.goals
              }}<v-icon class="white--text">mdi-soccer</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-sheet>
    <v-card-text class="pt-0">
      <div class="text-center title mb-2">Equipos más goleadores</div>
    </v-card-text>
  </v-card>
</template>

<script>
import constants from '../../../assets/constants/constants'
export default {
  props: {
    topScorers: {
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
