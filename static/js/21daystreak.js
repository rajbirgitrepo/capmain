

var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/questtimeseries",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
   


    $("#c1").text(dataa.total
        );

var chart = Highcharts.stockChart('container', {
chart: {
type: 'column'
},

title: {
text: '21 DAY QUEST OPT-IN HISTORY'
},credits:{enabled:false},
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
        text: 'SIGNUP COUNT'
    }
},{
    lineWidth: 1,
    opposite: true,
    title: {
        text: ' CUMULATIVE COUNT'
    }
}],

series: [{
type:'column',
  color: '#01a451',
name: 'Signup Count',
data: dataa.user, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},

},
      {
type:'line',
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
    "url":             "http://127.0.0.1:5000/queststreak",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 

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
        type:'category',min: 1,max:21,
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
                      
                      URL = 'http://127.0.0.1:5000/queststreaktable/'+this.category;
                      
                      console.log(URL);
                       Table2()
                    }}}
            }},
   series: [{
                name: 'USER STREAK',
                data: dataa.STREAK
            }]
});
      });


      var settings = {
        "async": true,
        "crossDomain": true,
        "url":             "http://127.0.0.1:5000/questactivestreak",
        "method": "GET"
       }
        $.ajax(settings).done(function (response) {
        var dataa=JSON.parse(response); 

        $("#c3").text(dataa.astreak_count);
    Highcharts.chart('container2', {
        chart: {
            type: 'column'
        },
      colors: [
                   '#00774d',
                   '#FF4500'
                ],
        title: {
            text: '21 DAY QUEST ACTIVE STREAK'
        },
        xAxis: {
            type:'category',min: 1,
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
                          
                          URL = 'http://127.0.0.1:5000/questactivestreaktable/'+this.category;
                          
                          console.log(URL);
                           Table2()
                        }}}
                }},
       series: [{
                    name: 'USER STREAK',
                    data: dataa.astreak
                }]
    });
          });
    
    
    

          var settings = {
            "async": true,
            "crossDomain": true,
            "url":             "http://127.0.0.1:5000/questusercounts",
            "method": "GET"
           }
            $.ajax(settings).done(function (response) {
            var dataa=JSON.parse(response); 
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
                categories:dataa.name,
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
                              
                              URL = 'http://127.0.0.1:5000/queststreaktable/'+this.category;
                              
                              console.log(URL);
                               Table2()
                            }}}
                    }},
           series: [{
                        name: 'USER STREAK',
                        data: dataa.count
                    }]
        });
              });
        
              $('#firstnametable').val('5f2609807a1c0000950bb477');
              $("#gif").empty();
              $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='http://127.0.0.1:5000/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
              createDynamic('http://127.0.0.1:5000/dis_streak_report/5f2609807a1c0000950bb477')
              $('#firstnametable').change(function(){
                giftable();
                $('#next').empty();
                $('#next1').empty();
                var value = $(this).val();
                var url = 'http://127.0.0.1:5000/dis_streak_report/' + value;
                createDynamic(url)
            });


            function giftable(){
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
                  success: function() {
                    var gif = document.getElementById("gif");
                    gif.style.display = "none";
                    },
                };
                $.ajax(settings).done(function (response) {
                  var data1 = JSON.parse(response);
              
                  $("#next").prepend(
                    '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr> <th>USER NAME</th><th>EMAIL ID</th><th>SIGNUP DATE</th><th>SCHOOL NAME</th><th>STATE</th><th>PRACTICE COUNT</th><th>MINDFUL MINUTES</th><th>LAST PRACTICE DATE</th><th>LAST LOGIN DATE</th><th>RENEWABLE DATE</th><th>QUEST OBTAINED DATE</th><th>QUEST STREAK</th></tr ></thead ><tbody>'
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
                    '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr> <th>USER NAME</th><th>EMAIL ID</th><th>SIGNUP DATE</th><th>SCHOOL NAME</th><th>STATE</th><th>PRACTICE COUNT</th><th>MINDFUL MINUTES</th><th>LAST PRACTICE DATE</th><th>LAST LOGIN DATE</th><th>RENEWABLE DATE</th><th>QUEST OBTAINED DATE</th><th>QUEST STREAK</th></tr ></thead ><tbody>'
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
