UK = "http://127.0.0.1:5000/parentsmapukraine";
$(function () {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/parentsmap",
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

      colorAxis: {
        min: 0,

        stops: [
          [0, "#b6edab"],
          [0.5, Highcharts.getOptions().colors[1]],
        ],
      },

      series: [
        {
          data: data.data,
          mapData: Highcharts.maps["countries/us/custom/us-all-territories"],
          joinBy: "hc-key",
          name: "Random data",
          tooltip: {
            headerFormat:
              '<span style="font-size:12px">{point.name}</span><br>',
            pointFormat:
              '<span style="font-size:12px">{point.name}</span><br>Parent Count:<span style="font-size:12px">{point.value}<br>',
          },
          events: {
            click: function (e) {
              {
                $("#next").empty();
                $("#btnExport").show();

                URL =
                  "http://127.0.0.1:5000/parentsstateinfo/" +
                  e.point.name;

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

    $("#next").prepend(
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th> <th>SCHOOL PRACTICE COUNT</th> <th>LAST PRACTICE DATE</th> <th>USER COUNT</th></tr ></thead ><tbody>'
    );

    for (var i = 0; i < data1.data.length; i++) {
      var datain = data1.data[i];
      var resultDiv = createDynamicDiv(datain);

      $("#dataTable").append(resultDiv);
    }
    //$('#dataTable1').append('</tbody></table>');
    $("#dataTable").append("</tbody></table>");
    dataTab();

    $("#next1").prepend(
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th> <th>SCHOOL PRACTICE COUNT</th> <th>LAST PRACTICE DATE</th> <th>USER COUNT</th></tr ></thead ><tbody>'
    );
    for (var i = 0; i < data1.data.length; i++) {
      var datain = data1.data[i];

      var resultDiv = createDynamicDiv(datain);
      $("#dataTable1").append(resultDiv);
    }
    $("#dataTable1").append("</tbody></table>");
  });
}
function dataTab() {
  $("#dataTable").DataTable({
    pageLength: 50,
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

