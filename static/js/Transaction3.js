var settings = {
  async: true,
  crossDomain: true,
  url: "/modetype",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);

  Highcharts.chart("container3", {
    chart: {
      type: "column",
    },
    colors: ["#01a451"],
    title: {
      text: "Payment Modes Amount (CSY)",
    },
    scrollbar: {
      enabled: true,
    },
    navigator: {
      enabled: true,
      xAxis: { tickPositions: [] },
    },
    legend: {
      enabled: true,
      itemStyle: {
          fontSize: '10px',
          fontWeight: '200',
      }
    },
    xAxis: {
      categories: dataa.amount.Payment_Mode,
      min: 0,
      max: 3,
      crosshair: false,
    },
    yAxis: {
      lineWidth: 1,
      min: 0,
      title: {
        text: "Amount",
      },
    },
    tooltip: {
      headerFormat: "<span>{point.x}</span><br>",
      pointFormat:
        "<span></span><span{point.name}></span>Payment Amount: <b>{point.y}<b>",
    },
    plotOptions: {
      series: {
        colorByPoint: true,
        point: {
          events: {
            click: function () {
              $("#next").empty();
              URL =
                "/pmode/" + this.category;
              $("#btnExport").show();
              console.log(URL);
              createDynamic(URL);

              cardscroll();
            },
          },
        },
      },
    },
    series: [{ name: "Payment Modes", data: dataa.amount.Payment_Mode_Amount }],
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
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>TYPE OF PAYMENT</th><th>PAYMENT DATE</th><th>AMOUNT</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>TYPE OF PAYMENT</th><th>PAYMENT DATE</th><th>AMOUNT</th></tr ></thead ><tbody>'
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