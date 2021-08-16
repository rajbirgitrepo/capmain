$(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: "/averagetrend/",
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    //console.log("fuck",dataa[0].bar);

    var options = {
      chart: {
        zoomType: "xy",
        renderTo: "container5",
      },
      title: {
        text: "Average Playback Trend",
      },
      xAxis: [
        {
          categories: [
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
          ],
        },
      ],
      yAxis: [
        {
          //Primary yAxis
          labels: {
            format: "{value}",
            style: {
              color: "#000",
            },
          },
          title: {
            text: "Average Playback Count",
            style: {
              color: "#000",
            },
          },
        },
        {
          //Secondary yAxis
          title: {
            text: "",
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
          opposite: false,
        },
      ],
      tooltip: {
        shared: true,
      },
      legend: {
        layout: "vertical",
        align: "left",
        x: 500,
        verticalAlign: "top",
        y: 30,
        floating: true,
        backgroundColor: "#FFFFFF",
      },
      series: [
        {
          name: "SY 2021-22",
          color: "#01a451",
          type: "column",
          yAxis: 0,
          data: dataa[0].bar,
          tooltip: {},
        },
        {
          name: "SY 2021-2022",
          color: "#ff8300",
          type: "spline",
          yAxis: 0,
          data: dataa[0].curve,
          tooltip: true,
        },
      ],
    };
    var chart = new Highcharts.Chart(options);
  });
});
