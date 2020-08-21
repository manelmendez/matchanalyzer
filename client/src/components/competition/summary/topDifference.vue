<template>
  <v-card class="mt-9">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="primary"
      elevation="12"
      max-width="calc(100% - 32px)"
      max-height="calc(100% - 32px)"
    >
      <v-list class="transparent">
        <v-list-item v-for="i in 4" :key="i" class="white--text">
          <v-list-item-avatar tile>
            <v-img
              :src="constants.ADDRESS + topDifference[i - 1].avatar"
              @error="topDifference[i - 1].avatar = constants.DEFAULT_TEAM_URL"
              contain
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              v-text="topDifference[i - 1].name"
            ></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              {{ topDifference[i - 1].stats.goalDif
              }}<v-icon class="white--text">mdi-soccer</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <!-- <v-card class="transparent">
        <v-card-text v-for="i in 4" :key="i" class="white--text">
          <v-row no-gutters>
            <v-col cols="9">
              <v-avatar tile size="36">
                <v-img
                  :src="constants.ADDRESS + topDifference[i - 1].avatar"
                  @error="
                    topDifference[i - 1].avatar =
                      constants.DEFAULT_TEAM_URL
                  "
                  contain
                />
              </v-avatar>
              {{ topDifference[i - 1].name }}</v-col
            >
            <v-col
              >{{ topDifference[i - 1].stats.goalDif }}
              <v-icon class="white--text">mdi-soccer</v-icon></v-col
            >
          </v-row>
        </v-card-text>
      </v-card> -->
    </v-sheet>
    <v-card-text class="pt-0">
      <v-card-title class="justify-center"
        >Mejor diferencia de goles</v-card-title
      >
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

<style scoped></style>
