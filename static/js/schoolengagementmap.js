$(function () {
    var settings = {
      async: true,
      crossDomain: true,
      url: "/mapinfo",
      method: "GET",
    };
    $.ajax(settings).done(function (response) {
      var data = JSON.parse(response);
      $("#containermap2").highcharts("Map", {
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "bottom",
          },
        },
        title: {
          text: 'State Wise School Count (USA)',
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: true,
        },
        colorAxis: {
          min: 0,
          stops: [
            [0, "#B6EDAB"],
            [0.5, Highcharts.getOptions().colors[1]],
          ],
        },
        series: [
          {
            data: data,
            mapData: Highcharts.maps["countries/us/custom/us-all-territories"],
            joinBy: "hc-key",
            name: "Random data",
            events: {
              click: function (e) {
                {
                  $("#next").empty();
                  $("#btnExport").show();
  
                  URL = "/map/" + e.point.name;
  
                  console.log(URL);
                  createDynamic(URL);
                }
              },
            },
            states: {
              hover: {
                color: "#BADA55",
              },
            },
            dataLabels: {
              enabled: false,
              format: "{point.code}",
            },
          },
        ],
      });
    });
  });
  