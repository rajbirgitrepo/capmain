$(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: "/mapinfo",
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var data = JSON.parse(response);
    $("#container").highcharts("Map", {
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom",
        },
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
            enabled: true,
            format: "{point.code}",
          },
        },
      ],
    });
  });
});
function createDynamic(url) {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var data1 = JSON.parse(response);
    console.log(data1.data.length);

    $("#next").prepend(
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th> <th>SCHOOL PLAYBACK COUNT</th> <th>LAST PLAYBACK DATE</th> <th>USER COUNT</th></tr ></thead ><tbody>'
    );

    for (var i = 0; i < data1.data.length; i++) {
      var datain = data1.data[i];
      var resultDiv = createDynamicDiv(datain);
      $("#dataTable").append(resultDiv);
    }
    $("#dataTable").append("</tbody></table>");
    dataTab();
    cardscroll();
  });
}
function dataTab() {
  $("#dataTable").DataTable({
    dom: '<"toolbar">frtip',
  });
}
function createDynamicDiv(userList) {
  var dynamicDiv = "";
  console.log(userList);

  dynamicDiv +=
    "<tr >" +
    "<td>" +
    userList[0] +
    "</td>" +
    "<td>" +
    userList[1] +
    "</td>" +
    "<td>" +
      userList[2] +
      "</td>" +
    "<td>" +
    userList[3] +
    "</td>" +
    "<td>" +
    userList[4] +
    "</td>" +
    "<td>" +
    userList[5] +
    "</td>" +
    "<td>" +
    userList[6] +
    "</td>" +
    "</tr>";

  return dynamicDiv;
}

