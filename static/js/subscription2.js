// create the chart

var settings = {
  async: true,
  crossDomain: true,
  url: "https://cloudtrial.herokuapp.com/trail_colud",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);

  var chart = Highcharts.stockChart("container2", {
    chart: {
      type: "column",
    },

    title: {
      text: "Trial Users",
    },
    credits: false,
    xAxis: {
      minRange: 1,
    },
    plotOptions: {
      series: { point: {} },
    },

    navigator: {
      series: {
        color: "#00FF00",
        animation: {
          duration: 0,
        },
      },
      legend: {
        enabled: true,
        itemStyle: {
            fontSize: '10px',
            fontWeight: '200',
        }
      },
      xAxis: {
        minRange: 0,
      },
    },
    yAxis: [
      {
        lineWidth: 1,
        opposite: false,
        title: {
          text: "USER COUNT",
        },
      },
    ],

    series: [
      {
        type: "column",
        color: "#01a451",
        name: "User Count",
        data: dataa.Trail, //Fri, 14 Jul 2017 00:00:00 GMT
        dataGrouping: {
          enabled: false,
        },
      },
    ],
  });
});

function createDynamic(url) {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    success: function() {
      var gif = document.getElementById("gif");
      gif.style.display = "none";
      },
  };
  $.ajax(settings).done(function (response) {
    var data1 = JSON.parse(response);

    $("#next").prepend(
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>AMOUNT</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>USER NAME</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>AMOUNT</th></tr ></thead ><tbody>'
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
    "</tr>";

  return dynamicDiv;
}
