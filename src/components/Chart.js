import React, { PureComponent } from 'react';
import ReactEchartsCore from 'echarts-for-react';
import moment from 'moment';

import echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class ChartComponent extends PureComponent {
  getOption = data => ({
    color: ['#21ba45'],
    calculable: true,
    xAxis: [
      {
        type: 'time',
        boundaryGap: true,
        axisLabel: {
          formatter: (value, idx) =>
            idx === 0 ? moment(value).format('D-M-YYYY') : moment(value).format('HH:mm'),
        },
        axisTick: {
          show: true,
          interval: 'auto',
          length: 10,
        },
        splitLine: {
          show: true,
          interval: 'auto',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
        handleIcon:
          'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
    ],
    series: [
      {
        name: 'Power',
        type: 'line',
        smooth: true,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)',
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)',
            },
          ]),
        },
        data,
      },
    ],
    title: {
      text: 'Power',
      subtext: 'Discovergy',
      left: '10%'
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        const d = moment(params[0].data[0]);
        let output = `<p>Date: <b>${moment(params[0].data[0]).format('D-M-YYYY HH:mm')}</b></p>
        <i style="text-align: left">Power: <b>${params[0].data[1]}<b></i>`;
        return output;
      },
    },
    toolbox: {
      show: true,
      showTitle: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          title: 'Data Zoom'
        },
        mark: { show: true, title: 'Mark' },
        // dataView: { show: true, readOnly: false, title: 'Data View' },
        magicType: { show: true, type: ['line', 'bar'], title: { line: 'Line Chart', bar: 'Bar Chart'}},
        restore: { show: true, title: 'Restore' },
        saveAsImage: { show: true, title: 'Save as Image' },
      },
      right: '10%'
    },
  });
  // getOption = () => {
  //   return {
  //     title: {
  //       text: '',
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'shadow',
  //         label: {
  //           show: true
  //         }
  //       }
  //     },
  //     toolbox: {
  //       show: true,
  //       feature: {
  //         mark: { show: true },
  //         dataView: { show: true, readOnly: false },
  //         magicType: { show: true, type: ['line', 'bar'] },
  //         restore: { show: true },
  //         saveAsImage: { show: true }
  //       }
  //     },
  //     calculable: true,
  //     legend: {
  //       data: ['Day', 'Power'],
  //     },
  //     radar: {
  //       indicator:
  //     }
  //   }
  // }

  render() {
    return (
      <ReactEchartsCore
        ref={e => {
          this.echarts_react = e;
        }}
        option={this.getOption(this.props.chartData)}
      />
    );
  }
}

export default ChartComponent;