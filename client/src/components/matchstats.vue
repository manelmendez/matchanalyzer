<template>
  <v-card class="mt-9">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="rgb(255,255,255,0.95)"
      elevation="12"
      max-width="calc(100% - 32px)"
      max-height="calc(100% - 32px)"
    >
      <pie-chart
        :chart-data="this.chartData"
        :height="this.height"
        :options="options"
        class="chartStyle"
      ></pie-chart>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Partidos del equipo</div>
      <div class="subheading font-weight-light grey--text">
        Temporada {{ team.season }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import PieChart from '../components/charts/PieChart.js'

export default {
  components: { PieChart },
  props: ['chart-data', 'height', 'team'],
  data() {
    return {
      options: {
        title: {
          display: false,
          text: '% victorias / empates / derrotas'
        },
        borderColor: 'red',
        cutoutPercentage: 50
      }
    }
  }
}
</script>
<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
.chartStyle {
  padding-bottom: 10px;
}
</style>
