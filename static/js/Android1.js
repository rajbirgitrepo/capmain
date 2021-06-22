// create the chart

P();
function P() {
  var settings = {
"async": true,
"crossDomain": true,
"url": 'http://127.0.0.1:5000/appandroid',
"method": "GET"
}
$.ajax(settings).done(function (response) {
var dataa=JSON.parse(response);
console.log(dataa.activecard[0])
$('#totalparents').text(dataa.activecard);
$('#appunit').text(dataa.Downloads);
$('#uninstallcard').text(dataa.uninstallcard);


});
};


var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/appandroid",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
    console.log(dataa,"hello frnd");




var chart = Highcharts.stockChart('container', {
chart: {
type: 'column'
},

title: {
text: 'SESSIONS'
},
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
legend: {
  enabled: true,
  itemStyle: {
    fontSize: '10px',
    fontWeight: '200'
}
},

},yAxis: [ {
    lineWidth: 1,
    opposite: false,
    title: {
        text: 'ACTIVE USER COUNT'
    }
},
{
  lineWidth: 1,
  opposite: true,
  title: {
      text: 'Cumulative Count'
  }
}],

series: [{
type:'column',
  color: '#01a451',
name: 'Session Count',
data: dataa.Active, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},

},
      {
type:'line',
  color: '#FF9933',
name: 'Total Sessions',
data: dataa.cumactivegraph, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},

}]

});

});


var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "http://127.0.0.1:5000/appandroid",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 
  console.log(dataa,"hello frnd");




var chart = Highcharts.stockChart('container2', {
chart: {
type: 'column'
},

title: {
text: 'App Installs'
},
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
legend: {
  enabled: true,
  itemStyle: {
    fontSize: '10px',
    fontWeight: '200'
}
},

},yAxis: [ {
  lineWidth: 1,
  opposite: false,
  title: {
      text: 'INSTALLS COUNT'
  }
},
{
lineWidth: 1,
opposite: true,
title: {
    text: 'Cumulative Count'
}
}],

series: [{
type:'column',
color: '#01a451',
name: 'User Count',
data: dataa.install, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
enabled: false,
},

},
    {
type:'line',
color: '#FF9933',
name: 'Total Users',
data: dataa.cuminstall, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
enabled: false,
},

}]

});

});


// create the chart
var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "http://127.0.0.1:5000/appandroid",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 
  console.log(dataa,"hello frnd")
    
    
var chart = Highcharts.stockChart('container3', {
chart: {
type: 'column'
},

title: {
text: 'Uninstalls'
},

legend: {
  itemStyle: {
    fontSize: '10px',
    fontWeight: '200'
}
},
yAxis: [
          {min:0, allowDecimals: false, title:{text:"COUNT"},opposite: false,lineWidth:1
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



series: [{
color: '#01a451',
name: 'Users',
data: dataa.Uninstall, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
enabled: false,
}
}]

});});



