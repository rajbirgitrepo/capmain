var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://cap4g.herokuapp.com/bar_graph/united%20states",
  "method": "GET"
}
$.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
  // var obj = JSON.parse(string);
  var ctx = document.getElementById("myChart4").getContext('2d');
  console.log("data ",dataa['dormant']);
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:dataa['labels'],
      datasets: [{
        label: 'Dormant',
        backgroundColor: "#D2222D",
        data: dataa['dormant'],
      }, {
        label: 'Other School',
        backgroundColor: "#007000",
        data: dataa['otherschool'],
      }],
    },
  options: {
      tooltips: {
        displayColors: true,
        callbacks:{
          mode: 'x',
        },
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false,
          }
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
          type: 'linear',
        }]
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: { position: 'bottom' },
    }
  })
});