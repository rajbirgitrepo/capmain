var seriesOptions = [],
  seriesCounter = 0,
  names = ['SY19-20', 'SY18-19', 'SY17-18'];

/**
 * Create the chart when all data is loaded
 * @returns {undefined}
 */
function createChart() {

  Highcharts.stockChart('container3', {

    rangeSelector: {
      selected: 4
    },

    yAxis: {
      labels: {
        formatter: function () {
          return (this.value );
        }
      },
      plotLines: [{
        value: 0,
        width: 2,
        color: 'silver'
      }]
    },

    plotOptions: {
      series: {
        compare: 'percent',
        showInNavigator: true
      }
    },

    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}',
      valueDecimals: 2,
      split: true
    },

    series: seriesOptions
  });
}

function success(data) {
  var name = this.url.match(/(SY19-20|SY18-19|SY17-18)/)[0].toUpperCase();
  var i = names.indexOf(name);
  seriesOptions[i] = {
    name: name,
    data: data
  };

  // As we're loading the data asynchronously, we don't know what order it
  // will arrive. So we keep a counter and create the chart when all the data is loaded.
  seriesCounter += 1;

  if (seriesCounter === names.length) {
    createChart();
  }
}

Highcharts.getJSON(
  'https://raw.githubusercontent.com/Ash0077/i3os/master/SY19-20.json',
  success
);
Highcharts.getJSON(
  'https://raw.githubusercontent.com/Ash0077/i3os/master/SY18-19.json',
  success
);
Highcharts.getJSON(
  'https://raw.githubusercontent.com/Ash0077/i3os/master/SY17-18.json',
  success
);