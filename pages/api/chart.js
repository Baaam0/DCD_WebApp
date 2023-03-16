const ChartJsImage = require('chartjs-to-image');

const myChart = new ChartJsImage();
myChart.setConfig({
  type: 'bar',
  data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
});

