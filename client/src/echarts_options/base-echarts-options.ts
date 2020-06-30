let barOptions = {
  title: {
    text: '事项柱形统计图',
    subtext: '各级事项完成对比'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      snap: false,
    }
  },
  xAxis: {
    data: ['一星', '二星', '三星', '四星', '五星'],
    name: '事项',
   
  },
  legend: {
    data: ['未完成', '已完成'],
    orient: 'vertical',
    right: 0,
  },
  yAxis: {},
  series: [
    {
      name: '未完成',
      type: 'bar',
      itemStyle: {
        color: '#F56C6C',
      },
      data: [5, 3, 8, 12, 15],
    },
    {
      name: '已完成',
      type: 'bar',
      itemStyle: {
        color: '#67C23A',
      },
      data: [25, 9, 5, 8, 5],
    }
  ]
}
let pieOptions = {
  title: {
    text: '事项饼形统计图',
    subtext: '各级事项占比',
  },
  legend: {
    orient: 'vertical',
    right: 0,
    selected: {
      '已完成': false,
      '未完成': false,
    }
  },
  tooltip: {},
  series: [
    {
      name: '事项汇总',
      type: 'pie',
      radius: '65%',
      roseType: 'angle',
      data: [
        { value: 30, name: '一星事项' },
        { value: 12, name: '二星事项' },
        { value: 13, name: '三星事项' },
        { value: 20, name: '四星事项' },
        { value: 20, name: '五星事项' },
        { value: 52, name: '已完成' },
        { value: 43, name: '未完成' },
      ]
    }
  ]
}
let lineOptions = {
  title: {
    text: '事项折线统计图',
    subtext: '事项完成趋势',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      snap: false,
    }
  },
  xAxis: {
    data: ['一星', '二星', '三星', '四星', '五星'],
    name: '事项',
   
  },
  legend: {
    data: ['未完成', '已完成', '总事项'],
    orient: 'vertical',
    right: 0,
    selected: {
      '总事项': false,
    },
  },
  yAxis: {},
  series: [
    {
      name: '未完成',
      type: 'line',
      itemStyle: {
        color: '#F56C6C',
      },
      data: [5, 3, 8, 12, 15],
    },
    {
      name: '已完成',
      type: 'line',
      itemStyle: {
        color: '#67C23A',
      },
      data: [25, 9, 5, 8, 5],
    },
    {
      name: '总事项',
      type: 'line',
      itemStyle: {
        color: '#0EBFED'
      },
      data: [30, 12, 13, 20, 20],
    }
  ]
}

export { barOptions, pieOptions, lineOptions };