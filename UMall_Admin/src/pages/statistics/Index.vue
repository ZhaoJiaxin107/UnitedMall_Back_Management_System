<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="chart1" ref="chart1"></div>
    </el-col>
    <el-col :span="12">
      <div class="chart2" ref="chart2"></div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted () {
    this.$nextTick(() => {
      this.echartInit1()
      this.echartInit2()
    })
  },
  methods: {
    echartInit1 () {
      // 初始化 echarts.init(DOM)
      // console.log(echarts)
      const chartObj = echarts.init(this.$refs.chart1)
      // 定义图表的选项
      const option1 = {
        xAxis: {
          // x坐标的设置
          type: 'category',
          // x坐标的描述
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          // y坐标的设置
          type: 'value'
        },
        series: [
          {
            // data要展示的数据
            data: [230, 130, 264, 228, 135, 224, 320],
            // type: 'line'
            type: 'bar'
          }
        ]
      }
      // 设置图片的选项
      chartObj.setOption(option1)
    },
    echartInit2 () {
      const chartObj = echarts.init(this.$refs.chart2)
      var base = +new Date(1968, 9, 3)
      var oneDay = 24 * 3600 * 1000
      var date = []

      var data = [Math.random() * 300]

      for (var i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay))
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        )
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
      }

      const option2 = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          text: '大数据量面积图'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10
          }
        ],
        series: [
          {
            name: '模拟数据',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: data
          }
        ]
      }
      // 设置图片的选项
      chartObj.setOption(option2)
    }
  }
}
</script>

<style scoped>
.chart1 {
  width: 100%;
  height: 400px;
  /* border: 1px solid #e43961; */
}
.chart2 {
  width: 100%;
  height: 400px;
  /* border: 1px solid #e43961; */
}
</style>
