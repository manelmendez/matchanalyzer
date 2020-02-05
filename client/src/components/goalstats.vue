<template>
  <v-card
    class="mt-9"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="rgb(255,255,255,0.9)"
      elevation="12"
      max-width="calc(100% - 32px)"
      max-height="calc(100% - 32px)"
    >
      <bar-chart :chart-data="this.chartData" :height="this.height" :options="options" class="chartStyle"></bar-chart>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Goles del equipo</div>
      <div class="subheading font-weight-light grey--text">Temporada {{team.season}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import BarChart from '../components/charts/BarChart.js'

  export default {
    components: { BarChart },
    props:[
      'chart-data',
      'height',
      'team'
    ],
    data() {
      return {
        options: {
          title: {
            display: true,
            text: 'Goles por jornada'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Goles'
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Jornadas'
              },
            }]
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