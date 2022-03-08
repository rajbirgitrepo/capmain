//Date functionality start
var d = new Date();
var currMonth = d.getMonth() + 1;
var currYear = d.getFullYear();
var currDate = d.getDate();

var startDate = new Date(currYear, currMonth, currDate);
console.log(startDate);
var e = "2021-08-01";
var f = currYear + "-" + currMonth + "-" + currDate;
$("#stardate").text(e);
$("#finaldate").text(f);
$("#fromd").text(e);
$("#tod").text(f);


var settings = {
  async: true,
  crossDomain: true,
  url: "/quest_activation_by_district",
  method: "GET",
  error: function () {
      zerochart2();
  }
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log(dataa);
  $(function () {
      $("#container10").highcharts({
          chart: {
              // zoomType: "xy",
              type: "bar"
          },
          title: {
              text: "Top 20 Districts Activation",
          },
          credits: {
              enabled: false,
          },
          colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
          xAxis: [{
              categories: dataa.district,
              labels: {
                  style: {
                      fontSize: "10px",
                      rotation: 90,
                  },
              },
              
          },],
          yAxis: [{
              //Primary yAxis
              lineWidth: 1,
              labels: {
                  format: "{value}",
                  style: {
                      color: "#000",
                  },
              },
              title: {
                  text: "User Count",
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
          plotOptions: { borderWidth: 2, series: { point: {} } },
          series: [{
              name: "Playback Count",
              showInLegend: false,
              color: "#01a451",
              type: "bar",
              data: dataa.users,
          },],
      });
  });
});
function zerochart2() {
  $(function () {
      $("#container10").highcharts({
          chart: {
              //zoomType: "xy",
              type: "bar"
          },
          title: {
              text: "Top 20 Districts Activation",
          },
          xAxis: [{
              categories: [],
              labels: {
                  style: {
                      fontSize: "10px",
                      rotation: 90,
                  },
              }
          },],
          yAxis: [{
              //Primary yAxis
              lineWidth: 1,
              labels: {
                  format: "{value}",
                  style: {
                      color: "#000",
                  },
              },
              title: {
                  text: "Playback Count",
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
          plotOptions: { borderWidth: 2, series: { point: {} } },
          series: [{
              name: "Playback Count",
              showInLegend: false,
              color: "#01a451",
              type: "bar",
              data: [],
          },],
      });
  });
}

var settings = {
  "async": true,
  "crossDomain": true,
  "url": '/quest_cards',
  "method": "GET"
}
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);

  $('#c1').text(dataa.total_users_activated);
  $('#c4').text(dataa.users_practiced);
  $('#c5').text(dataa.Mindful_minutes);
  $('#c6').text(dataa.Practice_sessions);
  $('#c7').text(dataa.Total_users_completed);

});
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/questtimeseries",
  "method": "GET"
}
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);



  // $("#c1").text(dataa.total
  //     );

  var chart = Highcharts.stockChart('container', {
    chart: {
      type: 'column'
    },

    title: {
      text: '21 DAY QUEST OPT-IN HISTORY'
    }, credits: { enabled: false },
    xAxis: {
      minRange: 1
    },
    plotOptions: {
      series: {
        point: {

        }
      }
    },

    navigator: {
      series: {
        color: '#00FF00',
        animation: {
          duration: 0,
        }
      },
      xAxis: {
        minRange: 1
      },


    }, yAxis: [{
      lineWidth: 1,
      opposite: false,
      title: {
        text: 'Signup Count'
      }
    }, {
      lineWidth: 1,
      opposite: true,
      title: {
        text: ' Cumulative Count'
      }
    }],

    series: [{
      type: 'column',
      color: '#01a451',
      name: 'Signup Count',
      data: dataa.user, //Fri, 14 Jul 2017 00:00:00 GMT
      dataGrouping: {
        enabled: false,
      },

    },
    {
      type: 'line',
      color: '#FF9933',
      name: 'Total Signup Count',
      data: dataa.Cumuser, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
      dataGrouping: {
        enabled: false,
      },

    }]

  });

});


var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/queststreak",
  "method": "GET"
}
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);

  $("#c2").text(dataa.streak_count
  );
  Highcharts.chart('container1', {
    chart: {
      type: 'column'
    },
    colors: [
      '#00774d',
      '#FF4500'


    ],
    title: {
      text: '21 DAY QUEST STREAK'
    },
    xAxis: {
      type: 'category', min: 1, max: 21,
      crosshair: false
    },
    yAxis: {
      lineWidth: 1,
      min: 0,
      title: {
        text: ' User Count'
      }
    },
    tooltip: {
      headerFormat: '<span>{point.x}:2020</span><br>',
      pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}<b>{series.data2}'
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
      series: {
        point: {
          events: {
            click: function () {
              // console.log("hellooooo",this.category);

              URL = '/queststreaktable/' + this.category;

              console.log(URL);
              Table2()
            }
          }
        }
      }
    },
    series: [{
      name: 'USER STREAK',
      data: dataa.STREAK
    }]
  });
});


// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "/questactivestreak",
//   "method": "GET"
// }
// $.ajax(settings).done(function (response) {
//   var dataa = JSON.parse(response);

//   $("#c3").text(dataa.astreak_count);
//   Highcharts.chart('container2', {
//     chart: {
//       type: 'column'
//     },
//     colors: [
//       '#00774d',
//       '#FF4500'
//     ],
//     title: {
//       text: '21 DAY QUEST ACTIVE STREAK'
//     },
//     xAxis: {
//       type: 'category', min: 1,
//       crosshair: false
//     },
//     yAxis: {
//       lineWidth: 1,
//       min: 0,
//       title: {
//         text: ' User Count'
//       }
//     },
//     tooltip: {
//       headerFormat: '<span>{point.x}:2020</span><br>',
//       pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}<b>{series.data2}'
//     },
//     plotOptions: {
//       column: {
//         pointPadding: 0.2,
//         borderWidth: 0
//       },
//       series: {
//         point: {
//           events: {
//             click: function () {
//               // console.log("hellooooo",this.category);

//               URL = '/questactivestreaktable/' + this.category;

//               console.log(URL);
//               Table2()
//             }
//           }
//         }
//       }
//     },
//     series: [{
//       name: 'USER STREAK',
//       data: dataa.astreak
//     }]
//   });
// });




var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/questusercounts",
  "method": "GET"
}
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  Highcharts.chart('container3', {
    chart: {
      type: 'column'
    },
    colors: [
      '#00774d',
      '#FF4500'


    ],
    title: {
      text: '21 DAY QUEST USER STATUS'
    },
    xAxis: {
      categories: dataa.name,
      crosshair: false
    },
    yAxis: {
      lineWidth: 1,
      title: {
        text: ' User Count'
      }
    },
    tooltip: {
      headerFormat: '<span>{point.x}:2020</span><br>',
      pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}<b>{series.data2}'
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      },
      series: {
        point: {
          events: {
            click: function () {
              // console.log("hellooooo",this.category);

              URL = '/queststreaktable/' + this.category;

              console.log(URL);
              Table2()
            }
          }
        }
      }
    },
    series: [{
      name: 'USER STREAK',
      data: dataa.count
    }]
  });
});

$('#firstnametable').val('5f2609807a1c0000950bb477');
$("#gif").empty();
$("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
createDynamic('/dis_streak_report/5f2609807a1c0000950bb477')
$('#firstnametable').change(function () {
  giftable();
  $('#next').empty();
  $('#next1').empty();
  var value = $(this).val();
  var url = '/dis_streak_report/' + value;
  createDynamic(url)
});


function giftable() {
  console.log("gif is run");
  var gif = document.getElementById("gif");
  gif.style.display = "block";
}


function createDynamic(url) {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    success: function () {
      var gif = document.getElementById("gif");
      gif.style.display = "none";
    },
  };
  $.ajax(settings).done(function (response) {
    var data1 = JSON.parse(response);

    $("#next").prepend(
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr> <th>USER NAME</th><th>EMAIL ID</th><th>SIGNUP DATE</th><th>SCHOOL NAME</th><th>STATE</th><th>PLAYBACK COUNT</th><th>MINDFUL MINUTES</th><th>LAST PLAYBACK DATE</th><th>LAST LOGIN DATE</th><th>RENEWABLE DATE</th><th>QUEST OBTAINED DATE</th><th>QUEST STREAK</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr> <th>USER NAME</th><th>EMAIL ID</th><th>SIGNUP DATE</th><th>SCHOOL NAME</th><th>STATE</th><th>PLAYBACK COUNT</th><th>MINDFUL MINUTES</th><th>LAST PLAYBACK DATE</th><th>LAST LOGIN DATE</th><th>RENEWABLE DATE</th><th>QUEST OBTAINED DATE</th><th>QUEST STREAK</th></tr ></thead ><tbody>'
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
    userList[1] +
    "</td>" +
    "<td>" +
    userList[0] +
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
    "<td>" +
    userList[10] +
    "</td>" +
    "<td>" +
    userList[11] +
    "</td>" +
    "</tr>";

  return dynamicDiv;
}
function heatnew(b) {
  console.log(b);
  var min, max, colorScale, temps, tempsArr;
  var colors = ["#AF7AC5", "#7FB3D5 ", "#7DCEA0", "#F4D03F", "#F5B041", "#EB984E", "#DC7633"];
  var months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var table, thead, tbody, rows, headCells, cells;
  var data = d3.json("/" + b, function (error, data) {

    temps = data.meanTemp;
    tempsArr = createTempArr(temps);
    initScale();
    initTable();
    addTopHeader();
    addRows();
    setColorTransition();

    addLegend();
  });

  function initTable() {
    table = d3.select('#heat-map').append('table');
    table.append("caption")
      .html("");
    thead = table.append('thead');
    tbody = table.append('tbody');
  }

  function initScale() {
    min = d3.min(d3.values(temps), function (d) {
      return d3.min(d);
    });
    max = d3.max(d3.values(temps), function (d) {
      return d3.max(d);
    });
    colorScale = d3.scaleQuantile()
      .domain([min, max])
      .range(colors);
  }

  function addTopHeader() {
    //make top heading
    thead.append('tr')
      .selectAll('th')
      .data(months)
      .enter()
      .append("th")
      .text(function (d) {
        return d;
      });
  }

  function addRows() {
    // create a row for each object in the data
    rows = tbody.selectAll('tr')
      .data(tempsArr).enter()
      .append('tr');

    // create vertical heading (first col of each row)
    headCells = rows.append('th')
      .text(function (d) {
        return d.year;
      });

    //create a data cell for each monthly tempature
    cells = rows.selectAll('td')
      .data(function (row, i) {
        return row.temps;
      })
      .enter()
      .append('td')
      .text(function (d) {
        return d + "%";
      })
      .style("background-color", colors[0]);
  }

  function createTempArr() {
    var tempsArr = [];
    for (var k in temps) {
      if (temps.hasOwnProperty(k)) {
        tempsArr.push({
          year: k,
          temps: temps[k]
        });
      }
    }
    return tempsArr;
  }

  function setColorTransition() {
    cells.transition()
      .duration(1000)
      .style("background-color", function (d) {
        return colorScale(d);
      });
  }

  function addLegend() {
    var rangeValues = [min];
    rangeValues = rangeValues.concat(colorScale.quantiles());

    var legend = d3.select('caption').append('div');
    legend.attr("class", "legend");

    var colorSq = legend.append("div");

    colorSq.selectAll("div")
      .data(rangeValues).enter()
      .append("div")
      .attr("class", "color-square")
      .style("background-color", function (d, i) {
        return colors[i];
      });
    //.text(function(d) { return "≥ " + Math.round(d); }); //add range

    var labels = legend.append("div");
    labels.append("div")
      .attr("class", "align-left")
      .text("");

    labels.append("div")
      .attr("class", "align-right")
      .text("");

  }
}


$("#heat").val(1);
$('#heat-map').empty()
var type = "heatmap_activation_streak"
heatnew(type);
$('#chartname').text("Weekly Quest Activation")

$('#heat').change(function () {
  if (this.value == '1') {
    $('#heat-map').empty()
    var type = "heatmap_activation_streak"
    heatnew(type);
    $('#chartname').text("Weekly Quest Activation")
  }
})


$(function () {
  $("#datepicker").datepicker(

      {
          changeMonth: true,
          changeYear: true,
          yearRange: "2015:2022",
          dateFormat: "yy-mm-dd",
          onSelect: function (dateText, inst) {
              $("#stardate").text(dateText);
          }
      });
  $("#datepicker").datepicker("setDate",
      new Date(2021, 07, 01))
});

$(function () {
  $("#datepicker2").datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: "2015:2022",
      dateFormat: "yy-mm-dd",
      maxDate: new Date(),
      onSelect: function (dateText, inst) {
          $("#finaldate").text(dateText);
      }
  });
  var d = new Date();
  var currMonth = d.getMonth();
  var currYear = d.getFullYear();
  var currDate = d.getDate();
  var startDate = new Date(currYear, currMonth, currDate);
  $("#datepicker2").datepicker("setDate", startDate);
});

