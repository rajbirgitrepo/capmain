var settings = {
  async: true,
  crossDomain: true,
  url: "http://127.0.0.1:5000/submonth",
  method: "GET",
  success: function() {
    var gif = document.getElementById("gif");
    gif.style.display = "none";
    },
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  $(function () {
    $("#container5").highcharts({
      chart: {
        zoomType: "xy",
      },
      
      credits: { enabled: false },
      title: {
        text: "Revenue by Month",
      },
      xAxis: [
        {
          categories: dataa.month,
          labels: {
            rotation: 0,
          },
        },
      ],
      legend: {
        enabled: true,
        itemStyle: {
            fontSize: '10px',
            fontWeight: '200',
        }
      },
      
      yAxis: [
        {
          //Primary yAxis
          lineWidth: 1,
          labels: {
            format: "{value}",
            style: {
              color: "#000",
            },
          },
          title: {
            text: "COST ($)",
            style: {
              color: "#000",
            },
          },
          opposite: false,
        },
        {
          //Secondary yAxis
          title: {
            text: "Projection",
            style: {
              color: "#4572A7",
            },
          },
          labels: {
            format: "{value}",
            style: {
              color: "#4572A7",
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },
      plotOptions: {
        borderWidth: 2,
        series: {
          point: {
            events: {
              click: function () {
                var string = this.category;
                text = string[0].toUpperCase() + string.slice(1).toLowerCase();
                URL = "http://127.0.0.1:5000/submonth/" + text;
                $("#next").empty();
                $("#btnExport").show();
                console.log(URL);
                createDynamic(URL);
                cardscroll();
              },
            },
          },
        },
      },
      series: [

        {
          name: "AMOUNT ($) (2021)",
          color: "#01a451",
          type: "column",
          data: dataa.amount,
          tooltip: {},
        },
        {
          name: "AMOUNT ($) (2020) ",
          color: "#ADADAD",
          type: "column",
          data: dataa.amount2020,
          tooltip: {},
        },
        {
          name: "PROJECTION(2021) ",
          zoneAxis: 'x',
        zones: [{
            value: 10
        }, 
        {
            dashStyle: 'dot'
        }
      ],
          color: "#01a451",
          type: "line",
          data: dataa.projection2021,
          tooltip: {},
          yAxis:1
        },{
          name: "CUMULATIVE 2020",
          color: "#FF5F1F",
          type: "line",
          data: dataa.cumlsy,
          tooltip: {},
          yAxis:1
        }
        
      ],
    });
  });
});

