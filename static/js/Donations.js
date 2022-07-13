$(document).ready(function(){
  var url = window.location.href;
  var dashboard_name = document.getElementById('donation_dashboard').innerText;
  var user_email_id = document.getElementById('UserEmailId').innerText;
  console.log(url, dashboard_name, user_email_id);
  
  var settings = {
      url: "/cap_profile_tracking",
      method: "POST",
      timeout: 0,
      headers: {
          "Content-Type": "application/json"
      },
      data: JSON.stringify({
          "dashboard_name": dashboard_name,
          "user_name": user_email_id,
          "url": url
      }),
      success: function() {
          console.log("Success")
      },
      error: function() {
          console.log("Error")
      }
  };
  $.ajax(settings).done(function(response) {
      console.log(response);
  });
});


var modal = document.getElementById("myModal");
function searchmain(a) {
  URL = "/donationjourney/" + a
  console.log(URL)
  $("#schoolname").empty();;
  $("#email").empty();
  $("#lastd").empty();
  $("#ucount").empty();
  $("#pcount").empty();
  $("#state").empty();
  Pc(URL);
  mainchart(URL);
  modal.style.display = "block";
};
function Pc(URL) {
  console.log(URL)
  var settings = {
    async: true,
    crossDomain: true,
    url: URL,
    method: "GET",
    success: function () {
      $("#error").empty()
    },
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(URL)
    $("#schoolname").text("DonerL Name: " + dataa.info.donor_name);
    $("#email").text("DonerL Email: " + dataa.info.donor_email);
    $("#state").text("Doner State: " + dataa.info.donor_state);
    $("#lastd").text("Last donation Date: " + dataa.info.donor_last_date);
    $("#ucount").text(dataa.cards.donor_Total_amount);
    $("#pcount").text(dataa.cards.donor_donation_count);

    $(function () {
      $("#modalhistory").highcharts({
        chart: {
          zoomType: 'xy',
          type: 'bar'
        },
        title: {
          text: "DONATION TYPE"
        },
        xAxis: [{
          categories: dataa.typechart.name, labels: {
            rotation: 0
          }
        }],
        yAxis: [{ //Primary yAxis
          lineWidth: 1,
          labels: {
            format: '{value}',
            style: {
              color: '#000'
            }
          },
          title: {
            text: 'Amount',
            style: {
              color: '#000'
            }
          }
        }, {//Secondary yAxis
          title: {
            text: '',
            style: {
              color: '#4572A7'
            }
          },
          labels: {
            format: '{value}',
            style: {
              color: '#4572A7'
            }
          },
          opposite: false
        }],
        tooltip: {
          shared: true
        }, plotOptions: {
          borderWidth: 2,
          series: {
            point: {
              events: {
                click: function () {

                  alert(this.x);

                  URL = '/donationhistorytable/' + this.x;
                  console.log(URL);
                  Table()
                }
              }
            }
          }
        },
        series: [{
          name: 'Amount',
          color: '#01a451',
          type: 'column',
          yAxis: 0,
          data: dataa.typechart.count,
          tooltip: {

          }
        }]
      });
    });

  });
};

function cose() {
  modal.style.display = "none";
}
function mainchart(URL) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": URL,
    "method": "GET"
  }
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);

    var chart = Highcharts.stockChart('mainhis', {
      chart: {
        type: 'column'
      },

      title: {
        text: 'Donations'
      }, credits: false,
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
          text: 'Amount($)'
        }
      }, {
        lineWidth: 1,
        opposite: true,
        title: {
          text: 'Cumulative Amount($)'
        }
      }], plotOptions: {
        series: {
          point: {
            events: {
              click: function () {

                var a = new Date(this.x).toLocaleString('sv-SE', { day: 'numeric', month: 'numeric', year: 'numeric', hour12: false });

                URL = '/donationhistorytable/' + a;
                console.log(URL);
                $("#next").empty();
                $("#btnExport").show();
                console.log(URL);
                createDynamic(URL);

              }
            }
          }
        }
      },

      series: [{
        type: 'column',
        color: '#01a451',
        name: 'Amount',
        data: dataa.historychart.DonationHistory, //Fri, 14 Jul 2017 00:00:00 GMT
        dataGrouping: {
          enabled: false,
        },

      },
      {
        type: 'line',
        color: '#FF9933',
        name: 'Total Amount',
        data: dataa.historychart.CumDonationHistory, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
        dataGrouping: {
          enabled: false,
        },

      }]

    });
  });

}

var settings = {
  async: true,
  crossDomain: true,
  url: "/donationcards",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  $("#Total_amount").text(dataa.lsydonor.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#t1").text("CFY Donations");
  $("#t2").text("LFY Donations");

  $("#PAYLATER").text(
    "$ " + parseFloat(dataa.csydonation).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#PROMOCODE").text(
    "$ " + parseFloat(dataa.lsydonation).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  );
  $("#totaldonor").text(parseFloat(dataa.totaldonor).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  );
});

var settings = {
  async: true,
  crossDomain: true,
  url: "/newdonor",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  $("#newdonor").text(parseFloat(dataa.count).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#newdonoramount").text(
    "$ " + parseFloat(dataa.amount).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
});

var settings = {
  async: true,
  crossDomain: true,
  url: "/boardmemberdonation/",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  $("#boarddonor").text(parseFloat(dataa.count).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#boarddonoramount").text(
    "$ " + parseFloat(dataa.amount).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
});
// var settings = {
//   async: true,
//   crossDomain: true,
//   url: "/donationmapcard",
//   method: "GET",
// };
// $.ajax(settings).done(function (response) {
//   var dataa = JSON.parse(response);
//   console.log("hello22");
//   console.log(dataa.other);
//   $("#0c").text("$" + dataa.data[0][1]);
//   $("#1c").text(dataa.data[1][1]);
//   $("#2c").text("$" + dataa.data[2][1]);
//   $("#3c").text("$" + dataa.data[3][1]);
//   $("#4c").text("$" + dataa.data[4][1]);
//   $("#0h").text(dataa.data[0][0]);
//   $("#1h").text(dataa.data[1][0]);
//   $("#2h").text(dataa.data[2][0]);
//   $("#3h").text(dataa.data[3][0]);
//   $("#4h").text(dataa.data[4][0]);
// });
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/donationcsy",
  "method": "GET"
}
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);

  var chart = Highcharts.stockChart('container', {
    chart: {
      type: 'column'
    },

    title: {
      text: 'Donations CSY'
    }, credits: false,
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
        text: 'Amount($)'
      }
    }, {
      lineWidth: 1,
      opposite: true,
      title: {
        text: 'Cumulative Amount($)'
      }
    }], plotOptions: {
      series: {
        point: {
          events: {
            click: function () {

              var a = new Date(this.x).toLocaleString('sv-SE', { day: 'numeric', month: 'numeric', year: 'numeric', hour12: false });

              URL = '/donationcsytable/' + a;
              console.log(URL);
              $("#next").empty();
              $("#btnExport").show();
              console.log(URL);
              createDynamic(URL);

            }
          }
        }
      }
    },

    series: [{
      type: 'column',
      color: '#01a451',
      name: 'Amount',
      data: dataa.DonationHistory, //Fri, 14 Jul 2017 00:00:00 GMT
      dataGrouping: {
        enabled: false,
      },

    },
    {
      type: 'line',
      color: '#FF9933',
      name: 'Total Amount',
      data: dataa.CumDonationHistory, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
      dataGrouping: {
        enabled: false,
      },

    }]

  });
});

function charts(a, b) {

  var settings = {
    async: true,
    crossDomain: true,
    url: "/donationcalandercard/" + a + "/" + b,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log("hello22");
    // console.log(dataa.other);
    $("#0c").text("$" + dataa.csydonation.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#1c").text(dataa.totaldonor.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  });


  console.log("/donationhistor/" + a + "/" + b);
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "/donationhistory/" + a + "/" + b,
    "method": "GET"
  }
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);

    var chart = Highcharts.stockChart('container2', {
      chart: {
        type: 'column'
      },

      title: {
        text: 'Donations'
      }, credits: false,
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
          text: 'Amount($)'
        }
      }, {
        lineWidth: 1,
        opposite: true,
        title: {
          text: 'Cumulative Amount($)'
        }
      }], plotOptions: {
        series: {
          point: {
            events: {
              click: function () {

                var a = new Date(this.x).toLocaleString('sv-SE', { day: 'numeric', month: 'numeric', year: 'numeric', hour12: false });

                URL = '/donationhistorytable/' + a;
                console.log(URL);
                $("#next").empty();
                $("#btnExport").show();
                console.log(URL);
                createDynamic(URL);

              }
            }
          }
        }
      },

      series: [{
        type: 'column',
        color: '#01a451',
        name: 'Amount',
        data: dataa.DonationHistory, //Fri, 14 Jul 2017 00:00:00 GMT
        dataGrouping: {
          enabled: false,
        },

      },
      {
        type: 'line',
        color: '#FF9933',
        name: 'Total Amount',
        data: dataa.CumDonationHistory, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
        dataGrouping: {
          enabled: false,
        },

      }]

    });
  });

  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "/donationmap",
  //   "method": "GET"
  // }
  // $.ajax(settings).done(function (response) {
  //   var dataa = JSON.parse(response);

  //   // Initiate the chart
  //   $('#container3').highcharts('Map', {

  //     title: {
  //       text: 'U.S.A Donation Map'
  //     },


  //     mapNavigation: {
  //       enabled: true,
  //       buttonOptions: {
  //         verticalAlign: 'bottom'
  //       }
  //     },

  //     colorAxis: {
  //       min: 0,
  //       stops: [
  //         [0, '#b6edab'],
  //         [1, Highcharts.getOptions().colors[1]]

  //       ]
  //     },

  //     series: [{
  //       data: dataa.data,
  //       mapData: Highcharts.maps['countries/us/custom/us-all-territories'],
  //       joinBy: ['postal-code', 'code'],
  //       name: 'Random data',
  //       tooltip: {
  //         headerFormat: '<span style="font-weight:bold;">{point.name}</span><br>',
  //         pointFormat: '<span style="font-weight:bold">{point.name}</span><br>Last Donation:$<span style="font-size:12px">{point.value}<br>Total Donation:$<span style="font-size:12px">{point.value1}<br>'
  //       },
  //       events: {
  //         click: function (e) {
  //           {

  //             URL = '/donationmaptable/' + e.point.name;
  //             console.log(URL);

  //             Table()
  //             // Table.destroy();
  //           }
  //         }
  //       },
  //       states: {
  //         hover: {
  //           color: '#2CB527'
  //         }
  //       },
  //       dataLabels: {
  //         enabled: true,
  //         format: '{point.name}'
  //       }
  //     }]
  //   });
  // });


  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "/weeklydonation/" + a + "/" + b,
    "method": "GET"
  }
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);


    $(function () {
      $("#container4").highcharts({
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: "Weekly Donation CSY"
        },
        xAxis: [{
          categories: dataa.month, labels: {
            rotation: 0
          }
        }],
        yAxis: [{ //Primary yAxis
          lineWidth: 1,
          labels: {
            format: '{value}',
            style: {
              color: '#000'
            }
          },
          title: {
            text: 'Donation Amount ($)',
            style: {
              color: '#000'
            }
          }
        }, {//Secondary yAxis
          title: {
            text: '',
            style: {
              color: '#4572A7'
            }
          },
          legend: {
            enabled: false,
          },
          labels: {
            format: '{value}',
            style: {
              color: '#4572A7'
            }
          },
          opposite: false
        }],
        tooltip: {
          shared: true
        }, plotOptions: {
          borderWidth: 2,
          series: {
            point: {
              events: {
                click: function () {



                  URL = '/donationhistorytable/' + this.x;
                  console.log(URL);
                  Table()
                }
              }
            }
          }
        },
        series: [{
          name: 'Amount',
          color: '#01a451',
          type: 'column',
          yAxis: 0,
          data: dataa.amount,
          tooltip: {

          }
        }]
      });
    });
  });

}
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/donationCrowdfundingcsy",
  "method": "GET"
}
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);

  var chart = Highcharts.stockChart('container5', {
    chart: {
      type: 'column'
    },

    title: {
      text: 'Crowdfunding Campaign Donations (CFY)'
    }, credits: false,
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
        text: 'Amount ($)'
      }
    }, {
      lineWidth: 1,
      opposite: true,
      title: {
        text: 'Cumulative Amount ($)'
      }
    }], plotOptions: {
      series: {
        point: {
          events: {
            click: function () {

              var a = new Date(this.x).toLocaleString('sv-SE', { day: 'numeric', month: 'numeric', year: 'numeric', hour12: false });

              URL = '/donationCrowdfundingcsytable/' + a;
              console.log(URL);
              $("#next").empty();
              $("#btnExport").show();
              console.log(URL);
              createDynamic2(URL);

            }
          }
        }
      }
    },

    series: [{
      type: 'column',
      color: '#01a451',
      name: 'Amount',
      data: dataa.DonationHistory, //Fri, 14 Jul 2017 00:00:00 GMT
      dataGrouping: {
        enabled: false,
      },

    },
    {
      type: 'line',
      color: '#FF9933',
      name: 'Total Amount',
      data: dataa.CumDonationHistory, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
      dataGrouping: {
        enabled: false,
      },

    }]

  });
});

function cards(URL) {
  $('#next').empty();
  console.log(URL);
  var modal2 = document.getElementById("myModal2");
  modal2.style.display = "block";
  $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
  var gif = document.getElementById("gif");
  gif.style.display = "block";
  $('#btnExport').show();
  var a = document.getElementById("stardate").innerText;
  var b = document.getElementById("finaldate").innerText;
  createDynamic(URL)
}

function cards3(URL) {
  $('#next').empty();
  console.log(URL);
  var modal2 = document.getElementById("myModal2");
  modal2.style.display = "block";
  $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
  var gif = document.getElementById("gif");
  gif.style.display = "block";
  $('#btnExport').show();
  var a = document.getElementById("stardate").innerText;
  var b = document.getElementById("finaldate").innerText;
  createDynamic(URL + '/' + a + '/' + b )
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
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>EMAIL ID</th><th>STATE</th><th>MODE OF PAYMENT</th><th>DEVICE USED</th><th>TYPE OF PAYMENT</th><th>PAYMENT DATE</th><th>LAST PAYMENT AMOUNT</th><th>LIFETIME AMOUNT</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>USER NAME</th><th>EMAIL ID</th><th>STATE</th><th>MODE OF PAYMENT</th><th>DEVICE USED</th><th>TYPE OF PAYMENT</th><th>PAYMENT DATE</th><th>LAST PAYMENT AMOUNT</th><th>LIFETIME AMOUNT</th></tr ></thead ><tbody>'
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
    '<td class="tablelink"><a onclick="searchmain(\'' + userList[1] + '\')">' +
    userList[1] +
    "</td></a>" +
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
    "</tr>";

  return dynamicDiv;
}


function createDynamic2(url) {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var data1 = JSON.parse(response);

    $("#next").prepend(
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>TYPE OF PAYMENT</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>PAYMENT AMOUNT</th></tr ></thead ><tbody>'
    );
    for (var i = 0; i < data1.data.length; i++) {
      var datain = data1.data[i];
      var resultDiv = createDynamicDiv2(datain);

      $("#dataTable").append(resultDiv);
    }
    //$('#dataTable1').append('</tbody></table>');
    $("#dataTable").append("</tbody></table>");
    dataTab();

    $("#next1").prepend(
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>TYPE OF PAYMENT</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>PAYMENT AMOUNT</th></tr ></thead ><tbody>'
    );
    for (var i = 0; i < data1.data.length; i++) {
      var datain = data1.data[i];

      var resultDiv = createDynamicDiv2(datain);
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
function createDynamicDiv2(userList) {
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

function cards2(URL) {
  $('#next').empty();
  console.log(URL);
  var modal2 = document.getElementById("myModal2");
  modal2.style.display = "block";
  $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
  var gif = document.getElementById("gif");
  gif.style.display = "block";
  $('#btnExport').show();
  createDynamic(URL)
}




$(function () {
  $("#datepicker").datepicker(

    {
      changeMonth: true,
      changeYear: true,
      yearRange: "2018:2021",
      dateFormat: "yy-mm-dd",
      onSelect: function (dateText, inst) {
        $("#stardate").text(dateText);
      }
    });
  $("#datepicker").datepicker("setDate",
    new Date(2021, 06, 01))
});

$(function () {
  $("#datepicker2").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: "2018:2021",
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

var d = new Date();
var currMonth = d.getMonth() + 1;
var currYear = d.getFullYear();
var currDate = d.getDate();

var startDate = new Date(currYear, currMonth, currDate);
console.log(startDate);
var e = "2021-07-01";
var f = currYear + "-" + currMonth + "-" + currDate;
charts(e, f);
// cardscount(e,f);
$("#stardate").text(e);
$("#fromd").text(e);
$("#tod").text(f);
$("#finaldate").text(f);

function sub() {
  var a = document.getElementById("stardate").innerText;
  var b = document.getElementById("finaldate").innerText;
  charts(a, b);
  // cardscount(a,b);
  $("#fromd").text(a);
  $("#tod").text(a);
}