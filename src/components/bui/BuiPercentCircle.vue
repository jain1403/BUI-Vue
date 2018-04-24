<template>
  <div class="percent-circle">
  <svg :width="size" :height="size">
    <circle fill="none"
      :cx="getCenter()"
      :cy="getCenter()"
      :r="getRadius()"
      :stroke-width="thickness" />
    <path v-if="value > 0" class="arc" fill="none" :class="threshold"
      :stroke-width="thickness"
      :d="describeArc(value, max)" />
    <text x="50%" y="40%" text-anchor="middle"
      :font-size="getFontSize()">
      <tspan class="percent-text" :dx="percentTextPosition" dy="0.35em" :font-size="getFontSize()">{{ percent || '--' }}</tspan>
      <tspan class="percent-sign" :dx="percentSignPosition" dy="1em" :font-size="getFontSize()*0.6">%</tspan>
    </text>
  </svg>
  </div>
</template>

<style scoped lang="less">
  @import '../../../node_modules/build-ui/src/styles/px-vars.less';

  .percent-circle {
    padding: 12px 22px 22px 22px;
    display: inline-block;

    circle {
      stroke: @gray12;
    }

    path.low-threshold {
        stroke: @red;
    }

    path.med-threshold {
      stroke: @orange;
    }

    path.high-threshold {
      stroke: @green;
    }

    .percent-text {
      fill: @gray4;
    }

    .percent-sign {
      fill: @gray12;
    }

  }

</style>

<script>
  export default {
    name: 'bui-percent-circle',
    data () {
      return {
        percent: this.getPercent(),
        threshold: this.getThreshold(),
        percentTextPosition: this.getPercentTextPosition(),
        percentSignPosition: this.getPercentSignPosition()
      }
    },
    props: {
      size: {
        type: String,
        default: '100'
      },
      max: {
        type: String,
        default: '100'
      },
      value: {
        type: String,
        required: true
      },
      thickness: {
        type: String,
        required: true
      }
    },
    watch: {
      value: function () {
        this.percent = this.getPercent()
        this.getThreshold()
        this.getPercentTextPosition()
        this.getPercentSignPosition()
      }
    },
    methods: {
      getPercent () {
        if (!this.value) {
          return null
        } else {
          var percent = Math.round(this.value / this.max * 100)
          if (percent > 100) {
            return 100
          } else if (percent < 0) {
            return 0
          } else {
            return percent
          }
        }
      },
      getThreshold () {
        if (this.percent <= 33) {
          this.threshold = 'low-threshold'
        } else if (this.percent <= 66) {
          this.threshold = 'med-threshold'
        } else {
          this.threshold = 'high-threshold'
        }
      },
      getPercentTextPosition () {
        if (!this.value) {
          this.percentTextPosition = '-.08em'
        } else if (this.percent < 10) {
          this.percentTextPosition = '-.03em'
        } else if (this.percent < 100) {
          this.percentTextPosition = '-.15em'
        } else {
          this.percentTextPosition = '-.29em'
        }
      },
      getPercentSignPosition () {
        if (!this.value) {
          this.percentSignPosition = '-1.25em'
        } else if (this.percent < 10) {
          this.percentSignPosition = '-1.3em'
        } else if (this.percent < 100) {
          this.percentSignPosition = '-1.6em'
        } else {
          this.percentSignPosition = '-2em'
        }
      },
      getCenter () {
        return this.size * 0.5
      },
      getRadius () {
        return this.size * 0.4
      },
      getFontSize () {
        return this.size * 0.35
      },
     /*
     * Code for this attributed here:
     * http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
     */
      polarToCartesian (centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        }
      },
      describeArc (value, max) {
        var x = this.getCenter()
        var y = this.getCenter()
        var radius = this.getRadius()

        var startAngle = 0
        var endAngle = 360 * (this.percent / 100)
        endAngle = endAngle >= 360 ? 359.99 : endAngle

        var start = this.polarToCartesian(x, y, radius, endAngle)
        var end = this.polarToCartesian(x, y, radius, startAngle)

        var arcSweep = endAngle - startAngle <= 180 ? '0' : '1'

        var d = [
          'M', start.x, start.y,
          'A', radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(' ')

        return d
      }
    },
    mounted () {
      this.getThreshold()
      this.getPercentTextPosition()
      this.getPercentSignPosition()
    }
  }
</script>
