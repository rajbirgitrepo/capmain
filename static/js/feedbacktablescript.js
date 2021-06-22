var settings = {
  async: true,
  crossDomain: true,
  url: "http://127.0.0.1:5000/schoolfeedbackrating",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log(dataa);

  // Create the chart
  Highcharts.chart("container12", {
    chart: {
      type: "column",
    },
    title: {
      text: "Feedback Rating (2019 - Present)",
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
      labels: {
        style: {
          color: "black",
        },
      },
    },
    yAxis: [
      {
        lineWidth: 1,
        title: {
          text: "FEEDBACK RATING COUNT",
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
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        point: {
          events: {
            click: function () {
              //console.log("hellooooo",this);
              // alert(' value: ' + this.series.name[0]);

              //console.log("fuck u",URL);

              $("#next").empty();
              $("#btnExport").show();

              URL =
                "http://127.0.0.1:5000/schoolsearch/" +
                this.name +
                "/" +
                this.series.name[0];

              console.log(URL);
              createDynamic(URL);
            },
          },
        },
        borderWidth: 0,
        dataLabels: {
          enabled: false,
          format: "{point.y}",
        },
      },
    },
    series: [
      {
        name: "OVERALL",
        color: "#01a451",
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}<br>',
        },
        data: [
          {
            name: "5 STAR",
            y: dataa.Total[0].S5,
            drilldown: "5 STAR",
          },
          {
            name: "4 STAR",
            y: dataa.Total[0].S4,
            drilldown: "4 STAR",
          },
          {
            name: "3 STAR",
            y: dataa.Total[0].S3,
            drilldown: "3 STAR",
          },
          {
            name: "2 STAR",
            y: dataa.Total[0].S2,
            drilldown: "2 STAR",
          },
          {
            name: "1 STAR",
            y: dataa.Total[0].S1,
            drilldown: "1 STAR",
          },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          name: "5 STAR",
          id: "5 STAR",
          data: dataa.D5,
        },
        {
          name: "4 STAR",
          id: "4 STAR",
          data: dataa.D4,
        },
        {
          name: "3 STAR",
          id: "3 STAR",
          data: dataa.D3,
        },
        {
          name: "2 STAR",
          id: "2 STAR",
          data: dataa.D2,
        },
        {
          name: "1 STAR",
          id: "1 STAR",
          data: dataa.D1,
        },
      ],
    },
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
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>STATE</th><th>CITY</th><th>PRACTICE COUNT</th><th>USER NAME</th><th>USER EMAIL</th><th>AUDIO NAME</th><th>COMMENT</th><th>COMMENT DATE</th><th>LAST PRACTICE DATE</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable" style="display:none;"><thead ><tr><th>SCHOOL NAME</th><th>STATE</th><th>CITY</th><th>PRACTICE COUNT</th><th>USER NAME</th><th>USER EMAIL</th><th>AUDIO NAME</th><th>COMMENT</th><th>COMMENT DATE</th><th>LAST PRACTICE DATE</th></tr ></thead ><tbody>'
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
    "<td>" +
    userList[7] +
    "</td>" +
    "<td>" +
    userList[8] +
    "</td>" +
    "<td>" +
    userList[9] +
    "</td>" +
    "</tr>";

  return dynamicDiv;
}
