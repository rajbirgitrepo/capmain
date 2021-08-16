// create the chart

var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "/presentios",
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
text: 'Downloads'
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
      fontWeight: '200',
  }
},
},yAxis: [ {
    lineWidth: 1,
    opposite: false,
    title: {
        text: ' COUNT'
    }
},
{
  lineWidth: 1,
  opposite: true,
  title: {
      text: 'Cumcumulative Count'
  }
}],

series: [{
type:'column',
  color: '#01a451',
name: 'User Count',
data: dataa.App_Units, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},

},
      {
type:'line',
  color: '#FF9933',
name: 'Total ',
data: dataa.cumappunit, yAxis: 0, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},

}]

});

});
