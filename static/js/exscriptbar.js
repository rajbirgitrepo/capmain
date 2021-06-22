var settings = {
  async: true,
  crossDomain: true,
  url: "http://127.0.0.1:5000/practicetrendnew",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log(dataa[0].bar, "data");

  Highcharts.chart("container1", {
    chart: {
      type: "column",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "Practice Trend",
    },
    colors: ['#4F1FAF','#462CEE','#8AE02B','#01A451'],
    xAxis: {
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
    yAxis: {
      lineWidth: 1,
      min: 0,
      title: {
        text: "Practice Count",
      },
      stackLabels: {
        enabled: false,
        style: {
          fontWeight: "bold",
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray",
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    legend: {
      enabled: true,
      itemStyle: {
        fontSize: '10px',
        fontWeight: '200'
    }
    },
    plotOptions: {
      series: { point: {} },
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "Clever",
        data: dataa[3].barc,
      },
      {
        name: "Schoology",
        data: dataa[2].bars,
      },
      {
        name: "Family Practice Count(SY2020-2021)",
        data: dataa[1].bar2,
      },
      {
        name: "User Practice Count(SY2020-2021)",
        data: dataa[0].bar,
      },
     
      {
        type: "spline",
        color: "#FF8300",
        name: "Practice Count(SY 2019-2020)",
        data: dataa[0].curve,
      },
    ],
  });
});

$(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/progprac",
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa, "hello");

    Highcharts.chart("container77", {
      chart: {
        type: "column",
      },
      colors: ["#00A651", "#2C9905", "#8AE02B", "#B9FF4F", "#FF8300"],
      title: {
        text: "PROGRAM WISE PRACTICE TREND",
      },
      xAxis: {
        categories: [
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
        ],
        crosshair: false,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Practice Count",
        },
      },
      tooltip: {
        headerFormat: "<span>{point.x}</span><br>",
        pointFormat:
          "<span>{series.name}</span><span{point.name}></span>: <b>{point.y}<b>{series.data2}",
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "PRE-K",
          data: dataa[0].prek,
        },

        {
          name: "ELEMENTARY",
          data: dataa[0].elem,
        },

        {
          name: "MIDDLE",
          data: dataa[0].mid,
        },
        {
          name: "HIGH",
          data: dataa[0].high,
        },
        {
          name: "SOUND PRACTICE /TRANSITION/ ALL",
          data: dataa[0].all,
        },
      ],
    });
  });
});
