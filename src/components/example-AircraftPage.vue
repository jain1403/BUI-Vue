<template>
  <div class="aircraft-page">
    <h4 class="page-heading">Aircraft Page</h4>

    <canvas id="myChart" ref="chart"></canvas>
  </div>
</template>

<script>
  import Chart from 'chart.js'

  export default {
    name: 'aircraft-page',
    mounted () {
      var ctx = this.$refs.chart

      // eslint-disable-next-line
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Service', 'Stable', 'Service Pending', 'New Flight', 'Barrel Rolling', 'Grounded'],
          datasets: [{
            label: 'Aircraft Statuses',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              '#CB2027',
              '#265DAB',
              '#C7B42E',
              '#059748',
              '#7B3A96',
              '#DF5C24'
            ],
            borderColor: [
              '#CB2027',
              '#265DAB',
              '#C7B42E',
              '#059748',
              '#7B3A96',
              '#DF5C24'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    }
  }
</script>

<style scoped>
  .aircraft-page {
    padding: 20px;
  }
</style>
