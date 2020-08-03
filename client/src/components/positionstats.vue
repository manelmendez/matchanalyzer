<template>
  <v-card class="mt-9">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="rgb(255,255,255,0.9)"
      elevation="12"
      max-width="calc(100% - 32px)"
      max-height="calc(100% - 32px)"
    >
      <line-chart
        :chart-data="this.chartData"
        :height="this.height"
        :options="options"
        class="chartStyle"
      ></line-chart>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Recorrido del equipo</div>
      <div class="subheading font-weight-light grey--text">
        Temporada {{ team.season }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import LineChart from '../components/charts/LineChart.js'

export default {
  components: { LineChart },
  props: ['chart-data', 'height', 'team'],
  data() {
    return {
      options: {
        title: {
          display: true,
          text: 'Posición por jornada'
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: 'Posición'
              },
              ticks: {
                reverse: true,
                max: 16,
                min: 1,
                stepSize: 1
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: 'Jornada'
              }
            }
          ]
        }
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
