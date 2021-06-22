// create the chart
var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/presentios",
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
text: 'Page Views'
},
yAxis: [
            {min:0, allowDecimals: false, title:{text:"COUNT"},opposite: false,lineWidth:1
    }]
    ,
xAxis: {
    minRange: 1
},
legend: {
    enabled: true,
    itemStyle: {
        fontSize: '10px',
        fontWeight: '200',
    }
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
data: dataa.Page_Views, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
}
}]

});});


