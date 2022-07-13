$(document).ready(function(){
  var url = window.location.href;
  var dashboard_name = document.getElementById('school_revenue_dashboard').innerText;
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


var settings = {
  async: true,
  crossDomain: true,
  url: "/schoolpaymentcard",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  $("#Total_amount").text("$ " +dataa.amount.toFixed(0));
  $("#t1").text("CFY SCHOOLS");
  $("#t2").text("LFY SCHOOLS");

  $("#PAYLATER").text(
    "$ " + parseFloat(dataa.csydonation).toFixed(0));
  $("#PROMOCODE").text(
    "$ " + parseFloat(dataa.lsydonation).toFixed(0)
  );
  $("#totaldonor").text(parseFloat(dataa.count).toFixed(0)
  );
});

var settings = {
  async: true,
  crossDomain: true,
  url: "/schoolmapcard",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log("hello22");
  console.log(dataa.other);
  $("#0c").text("$" + dataa.data[0][1]);
  $("#1c").text("$" +dataa.data[1][1]);
  $("#2c").text("$" +dataa.data[2][1]);
  $("#3c").text("$" +dataa.data[3][1]);
  $("#4c").text("$" +dataa.data[4][1]);
  $("#0h").text(dataa.data[0][0]);
  $("#1h").text(dataa.data[1][0]);
  $("#2h").text(dataa.data[2][0]);
  $("#3h").text(dataa.data[3][0]);
  $("#4h").text(dataa.data[4][0]);
});
var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/schoolpaymentcsy",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 

var chart = Highcharts.stockChart('container', {
chart: {
  type: 'column'
},

title: {
  text: 'Individual School Renewals (CFY)'
},credits:false,
  xAxis: {
    minRange: 1
  },
plotOptions: {
    series: {point: {
              
          }}
  },

navigator: {
  series:{color:'#00FF00',
                  animation: {
                      duration: 0,
                  }    
  },
  xAxis: {
    minRange: 1
  },
  

},yAxis: [ {
      lineWidth: 1,
      opposite: false,
      title: {
          text: 'Amount (USD)'
      }
  },{
      lineWidth: 1,
      opposite: true,
      title: {
          text: 'Cumulative Amount(USD)'
      }
  }], plotOptions: {
    series: {point: {
              events: {
                  click: function () {
                    
                       var a = new Date(this.x ).toLocaleString('sv-SE', { day:'numeric',month:'numeric', year:'numeric', hour12:false } );
                    
                   URL = '/schoolpaymentcsytable/'+a ;
        console.log(URL);               
        $("#next").empty();
        $("#btnExport").show();
        console.log(URL);
        createDynamic(URL);
        cardscroll();
                  }
              }
          }}
  },

series: [{
  type:'column',
  color: '#01a451',
  name: 'Amount',
  data: dataa.WebHistory, //Fri, 14 Jul 2017 00:00:00 GMT
  dataGrouping: {
    enabled: false,
  },
  
},
        {
  type:'line',
  color: '#FF9933',
  name: 'Total Amount ',
  data: dataa.CumWebHistory , yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
  dataGrouping: {
    enabled: false,
  },
  
}]

});
});
var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/schoolpaymentweekly",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container4").highcharts({
chart: {
zoomType: 'xy'
},
title: {
text: "Individual School Renewals (DAY WISE)"
},
xAxis: [{
categories: dataa.month,labels: {
      rotation: 0
  }
}],
yAxis: [{ //Primary yAxis
lineWidth:1,
labels: {
  format: '{value}',
  style: {
    color: '#000'
  }
},
title: {
  text: 'School Amount (USD)',
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
},plotOptions: {borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                

                

              }
          }
      }}
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
        '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>TYPE OF PAYMENT</th><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>PAYMENT AMOUNT</th></tr ></thead ><tbody>'
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
        '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>TYPE OF PAYMENT</th><th>PAYMENT DATE</th><th>PAYMENT AMOUNT</th></tr ></thead ><tbody>'
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


  function cards(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic(URL);
  }