var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/awschart",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
    console.log(dataa);
   
var chart = Highcharts.stockChart('container9', {
chart: {
  type: 'column'
},

title: {
  text: 'Feature Release'
},
legend: {
  enabled: true,
  itemStyle: {
    fontSize: '10px',
    fontWeight: '200'
}
},
yAxis: [
      {min:0, allowDecimals: false, title:{text:"Count"},opposite: false
      }]
  ,
  xAxis: {
    minRange: 1
  },

navigator: {
  series:{color:'#00FF00',
                  animation: {
                      duration: 0,
                  }    
  },
  xAxis: {
    minRange: 1
  }
},
plotOptions: {
    series: {point: {
              events: {
                  click: function () {
                    
                   $('#next').empty();
                   $('#btnExport').show();
                    
                   URL = '/AWSTABLE/'+new Date(this.x ).toLocaleString('sv-SE', { day:'numeric',month:'numeric', year:'numeric', hour12:false } );
        
                   
       

        
         console.log(URL);
            createDynamic(URL)
              
   }
              }
          }}
  },

series: [{
  // color: '#01a451',
  // name: 'Releases',
  data: 
    dataa.releases.AWS_FEATURES
  , //Fri, 14 Jul 2017 00:00:00 GMT
  dataGrouping: {
    enabled: false,
  }
}]

});
      });
      function createDynamic(url){

        var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET"
        }
        $.ajax(settings).done(function (response) {
        var data1=JSON.parse(response);
        
        $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>Date</th><th>Releases</th><th>Version</th></tr></thead ><tbody>');
                              
        for(var i=0;i<data1.data.length;i++){
        
        
        var datain = data1.data[i];
        var resultDiv = createDynamicDiv(datain);
        
        $("#dataTable").append(resultDiv);
        
        
        
        
        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();
        
        
        
         $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable" ><thead ><tr><th>Date</th><th>Releases</th><th>Version</th></tr></thead ><tbody>');
        for(var i=0;i<data1.data.length;i++){
        
        
        var datain = data1.data[i];
        
        var resultDiv = createDynamicDiv(datain);
        $("#dataTable1").append(resultDiv);
        
        }
        $('#dataTable1').append('</tbody></table>');
        })
        }
        function dataTab()
        {
        
        $("#dataTable").DataTable( {
            "pageLength": 50
        } );
        
        }
        function createDynamicDiv(userList){
            var dynamicDiv = '';
            console.log(userList)
            
            
            
                
                
                dynamicDiv +=   '<tr >'+
                                '<td>'+userList[0]+'</td>'+
                                '<td>'+userList[1]+'</td>'+		    	
                                '<td>'+userList[2]+'</td>'+
                           
                                '</tr>'
            
                          
            return dynamicDiv;
            
        }

        var settings = {
          "async": true,
          "crossDomain": true,
          "url":             "/awschart",
          "method": "GET"
         }
          $.ajax(settings).done(function (response) {
          var dataa=JSON.parse(response);
            console.log(dataa);
        
        chart = new Highcharts.StockChart({
        
        chart: {
          renderTo: 'container99',
          zoomType: 'x'
        },
        title: {
          text: 'Aws Cost Vs User Growth'
        },
        legend: {
          enabled: true,
          itemStyle: {
            fontSize: '10px',
            fontWeight: '200'
        }
        },
        subtitle: {
          text: ''
        },
        
        xAxis: [{
          type: 'datetime',
          events: {
            afterSetExtremes() {
              let bottomAxis = this,
                topAxis = this.chart.xAxis[1];
              topAxis.setExtremes(bottomAxis.min - 86400000, bottomAxis.max - 86400000, true)
            }
          }
        }, {
          type: 'datetime',
          opposite: true,
          visible:false
        }],
        
        yAxis:[ {
          visible: true,
          opposite: false,
          showLastLabel: true,
           title: {
                  text: 'User Count'
              },
          labels: {
            enabled: true,
            format: "{value}",
            align: "right"
          },
        } ,{
          visible: true,
          opposite: false,
          showLastLabel: true,
          opposite:true, title: {
                  text: 'Cost'
              },
          labels: {
            enabled: true,
            format: "{value}",
            align: "left"
          },
        }],
        
        tooltip: {
          pointFormatter: function() {
            return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + Highcharts.numberFormat(this.y, 2);
          }
        },
        
        legend: {
          enabled: true
        },
        
        navigator: {
          enabled: true
        },
        rangeSelector: {inputEnabled:false,
          enabled: true
        },
        
        scrollbar: {
          enabled: true
        },
        
        navigation: {
          buttonOptions: {
            enabled: true
          }
        },plotOptions: { column: {
            stacking: 'normal'
            
          },
          series: {
            marker: {
              enabled: false
            }
          }
        },
        
        series: [ {
          "name": "Cost",
          "type": "line",
          "color":"#FF9933",
          "xAxis": 0,
          "data": dataa.growth.Cost,yAxis: 1
        }, {
          "name": "Family",
          "type": "column",
          "xAxis": 1,
          "color":"#8AE02B",
          "data": dataa.growth.Family_Users
        }, {
          "name": "School",
          "type": "column",
          "xAxis": 1,
          "color":"#01A451",
          "data": dataa.growth.School_Users
        }]
        });
        });
        
        var settings = {
          "async": true,
          "crossDomain": true,
          "url":             "/awschart",
          "method": "GET"
         }
          $.ajax(settings).done(function (response) {
          var dataa=JSON.parse(response);
            console.log(dataa);
        
        chart = new Highcharts.StockChart({
        
        chart: {
          renderTo: 'container4',
          zoomType: 'x'
        },
        title: {
          text: 'Aws vs Playback'
        },
        subtitle: {
          text: ''
        },
        legend: {
          enabled: true,
          itemStyle: {
            fontSize: '10px',
            fontWeight: '200'
        }
        },
        xAxis: [{
          type: 'datetime',
          events: {
            afterSetExtremes() {
              let bottomAxis = this,
                topAxis = this.chart.xAxis[1];
              topAxis.setExtremes(bottomAxis.min - 86400000, bottomAxis.max - 86400000, true)
            }
          }
        }, {
          type: 'datetime',
          opposite: true,
          visible:false
        }],
        
        yAxis:[ {
          visible: true,
          opposite: false,
          showLastLabel: true,
           title: {
                  text: 'Playback Count'
              },
          labels: {
            enabled: true,
            format: "{value}",
            align: "right"
          },
        } ,{
          visible: true,
          opposite: false,
          showLastLabel: true,
          opposite:true, title: {
                  text: 'Cost'
              },
          labels: {
            enabled: true,
            format: "{value}",
            align: "left"
          },
        }],
        
        tooltip: {
          pointFormatter: function() {
            return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + Highcharts.numberFormat(this.y, 2);
          }
        },
        
        legend: {
          enabled: true
        },
        
        navigator: {
          enabled: true
        },
        rangeSelector: {inputEnabled:false,
          enabled: true
        },
        
        scrollbar: {
          enabled: true
        },
        
        navigation: {
          buttonOptions: {
            enabled: true
          }
        },plotOptions: { column: {
            stacking: 'normal'
            
          },
          series: {
            marker: {
              enabled: false
            }
          }
        },
        
        series: [ {
          "name": "Cost",
          "type": "line",
          "color":"#FF9933",
          "xAxis": 0,
          "data": dataa.playback.cost_per_playback,yAxis: 1
        }, {
          "name": "Family",
          "type": "column",
          "xAxis": 1,
          "color":"#8AE02B",
          "data": dataa.playback.Family_Playback
        }, {
          "name": "Users",
          "type": "column",
          "xAxis": 1,
          "color":"#01A451",
          "data": dataa.playback.Users_Playback
        }]
        });
        });
        



        
var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/awscostoptimisation",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container1").highcharts({
chart: {
zoomType: 'xy',
type:'column'
},
title: {
text: "AWS Cost Optimization"
},
xAxis: [{
categories: dataa.data.Month_Name,labels: {
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
  text: 'AMOUNT',
  style: {
    color: '#000'
  }
}
}, {//Secondary yAxis
title: {
  text: 'Count',
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
opposite: true
}],
tooltip: {
shared: true
},plotOptions: {borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [{
name: 'PLAYBACK SESSION',
color: '#005E86',
type: 'column',
yAxis: 1,
data: dataa.data.PLAYBACK_Sessions,
tooltip: {
 
}
},{
name: 'USER GROWTH',
color: '#FF8A0F',
type: 'column',
yAxis: 1,
data: dataa.data.User_Growth,
tooltip: {
 
}
},
      {
name: 'COST',
color: '#01a451',
type: 'line',
yAxis: 0,
data: dataa.data.TotaL_Cost,
  zoneAxis: 'x',
  zones: [{
      value: 6,
    color: '#93E23B'
  }
],
tooltip: {
 
}
}]
});
});
});          


var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/enduser",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container2").highcharts({
chart: {
zoomType: 'xy',
type:'column'
},
title: {
text: "Load Time Performance"
},
xAxis: [{
categories: dataa.data.End_User.Month_Name,labels: {
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
  text: 'TIME(seconds)',
  style: {
    color: '#000'
  }
}
}, {//Secondary yAxis
title: {
  text: 'Count(Thousands)',
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
opposite: true
}],
tooltip: {
shared: true
},plotOptions: {borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [
  {
    name: 'PAGE VIEW ( k )',
    color: '#01a451',
    type: 'column',
    yAxis: 1,
    data: dataa.data.End_User.page_views_in_thousands,
    tooltip: {
     
    }
    },
  {
    name: 'END USER LOAD TIME ( Seconds )',
    color: '#FF8A0F',
    type: 'line',
    yAxis: 0,
    data: dataa.data.End_User.end_user_load_time,
    tooltip: {
     
    }
    },
  
      ]
});
});
});          


var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/enduser",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container3").highcharts({
chart: {
zoomType: 'xy',
type:'column'
},
title: {
text: "User Experience"
},
xAxis: [{
categories: dataa.data.End_User_Stat.Month_Name,labels: {
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
  text: 'Time(sec)',
  style: {
    color: '#000'
  }
}
}, {//Secondary yAxis
title: {
  text: 'Count(Thousands)',
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
opposite: true
}],
tooltip: {
shared: true
},plotOptions: { column: {
stacking: 'normal',
dataLabels: {
  enabled: true
}
},borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [
  {
name: 'Frustrating Rate',
color: '#FF5F1F',
type: 'column',
yAxis: 1,
data: dataa.data.End_User_Stat.frustrating_rate,

tooltip: {

}
},
      {
name: 'Tolerating Rate',
color: '#FF8A0F',
type: 'column',
yAxis: 1,
data: dataa.data.End_User_Stat.tolerating_rate,
tooltip: {
 
}
},
{
  name: 'Satisfying Rate',
  color: '#01a451',
  type: 'column',
  yAxis: 1,
  data: dataa.data.End_User_Stat.satisfying_rate,
  tooltip: {
   
  }
  },
]
});
});
});          



var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/appserverslareport",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container5").highcharts({
chart: {
zoomType: 'xy',
type:'column'
},
title: {
text: "App Server Performance"
},
xAxis: [{
categories: dataa.data.App_Server.Month_Name,labels: {
      rotation: 0
  }
}],
yAxis: [
  { //Primary yAxis
lineWidth:1,
labels: {
  format: '{value}',
  style: {
    color: '#000'
  }
},
title: {
  text: 'TIME (Seconds)',
  style: {
    color: '#000'
  }
}
}, {//Secondary yAxis
title: {
  text: 'Count (Thousands)',
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
opposite: true
}
],
tooltip: {
shared: true
},plotOptions: {borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [{
name: 'App Server User Visit',
color: '#01a451',
type: 'column',
yAxis: 1,
data: dataa.data.App_Server.app_server_in_millions,
tooltip: {
 
}
},
      {
name: 'App Server Response Time',
color: '#FF8A0F',
type: 'line',
yAxis: 0,
data:dataa.data.App_Server.app_server_response_time,
tooltip: {
 
}
}]
});
});
});          

var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/appserverslareport",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container6").highcharts({
chart: {
zoomType: 'xy',
type:'column'
},
title: {
text: "App Server User Experience"
},
xAxis: [{
categories: dataa.data.App_Server_Stat.Month_Name,labels: {
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
  text: 'Percentage ( % )',
  style: {
    color: '#000'
  }
}
},
{//Secondary yAxis
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
}
],
tooltip: {
shared: true
},plotOptions: { column: {
stacking: 'normal',
dataLabels: {
  enabled: true
}
},borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [
  {
    name: 'FRUSTRATING RATE (%)',
    color: '#FF5F1F',
    type: 'column',
    yAxis: 0,
    data: dataa.data.App_Server_Stat.frustrating_rate,
    
    tooltip: {
     
    }
    },
      {
name: 'TOLERATING RATE (%)',
color: '#FF8A0F',
type: 'column',
yAxis: 0,
data: dataa.data.App_Server_Stat.tolerating_rate,
tooltip: {
 
}
},
          
{
  name: 'SATISIFYING RATE (%)',
  color: '#01a451',
  type: 'column',
  yAxis: 0,
  data: dataa.data.App_Server_Stat.satisfying_rate,
  tooltip: {
   
  }
  },]
});
});
});          



var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/mongomosttimeconquery",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container7").highcharts({
chart: {
zoomType: 'xy',
type:'bar'
},
title: {
text: "MongoDB Time Consuming Tables"
},
xAxis: [{
categories: dataa.data.Collection_Name,labels: {
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
  text: 'AMOUNT',
  style: {
    color: '#000'
  }
}
}, {//Secondary yAxis
title: {
  text: 'Count',
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
opposite: true
}],
tooltip: {
shared: true
},plotOptions: {borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [{
name: 'OPERATION TIME',
color: '#FF8A0F',
type: 'column',
yAxis: 1,
data: dataa.data.Operation_Time,
tooltip: {
 
}
},
      {
name: 'AVERAGE TIME',
color: '#01a451',
type: 'line',
yAxis: 0,
data: dataa.data.Average_Time,
tooltip: {
 
}
}]
});
});
});          


var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/mysqlmosttimeconquery",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container8").highcharts({
chart: {
zoomType: 'xy',
type:'bar'
},
title: {
text: "MySQL Time Consuming Table"
},
xAxis: [{
categories: dataa.data.Collection_Name,labels: {
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
  text: 'AMOUNT',
  style: {
    color: '#000'
  }
}
}, {//Secondary yAxis
title: {
  text: 'Count',
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
opposite: true
}],
tooltip: {
shared: true
},plotOptions: {borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [{
name: 'Operation Time',
color: '#FF8A0F',
type: 'column',
yAxis: 1,
data: dataa.data.Operation_Time,
tooltip: {
 
}
},
      {
name: 'Average Time',
color: '#01a451',
type: 'line',
yAxis: 0,
data: dataa.data.Average_Time,
tooltip: {
 
}
}]
});
});
});          



var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/relicweeklyresponse",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container10").highcharts({
chart: {
zoomType: 'xy',
type:'column'
},
title: {
text: "Relic Analysis"
},
xAxis: [{
categories: dataa.data.Days,labels: {
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
  text: 'TIME(seconds)',
  style: {
    color: '#000'
  }
}
}, {//Secondary yAxis
title: {
  text: 'Count',
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
opposite: true
}],
tooltip: {
shared: true
},plotOptions: {borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [{
name: 'Playback Sessions',
color: '#01a451',
type: 'column',
yAxis: 1,
data: dataa.data.average_practice_sessions,
tooltip: {
 
}
},
      {
name: 'Average Response Time',
color: '#FF8A0F',
type: 'line',
yAxis: 0,
data: dataa.data.average_response_time,
tooltip: {
 
}
}]
});
});
});          




var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/mongovssqlquery",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);


$(function() {
$("#container11").highcharts({
chart: {
zoomType: 'xy',
type:'column'
},
title: {
text: "MongoDB Project Outcomes"
},
xAxis: [{
categories: dataa.data.table_name,labels: {
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
  text: 'Time Taken (Seconds)',
  style: {
    color: '#000'
  }
}
}, {//Secondary yAxis
title: {
  text: 'Time Taken (Seconds)',
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
opposite: true
}],
tooltip: {
shared: true
},plotOptions: {borderWidth: 2,
series: {point: {
          events: {
              click: function () {
                
                   alert(this.x);
                
               URL = '/donationhistorytable/'+this.x ;
    console.log(URL);               
Table()
              }
          }
      }}
},
series: [
  {
    name: 'MYSQL(SELECT)',
    color: '#FF8A0F',
    type: 'column',
    yAxis: 0,
    data: dataa.data.mysql,
    tooltip: {
     
    }
    },
  {
name: 'MONGODB(FIND)',
color: '#01a451',
type: 'column',
yAxis: 0,
data: dataa.data.mongodb,
tooltip: {
 
}
},
      ]
});
});
});     