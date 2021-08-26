
 console.log('In login1')
    var settings = {
"async": true,
"crossDomain": true,
"url": '/login_cards',
"method": "GET"
}
$.ajax(settings).done(function (response) {
var dataa=JSON.parse(response);

$('#passcodecount').text(dataa.new_passcode_email_count);
$('#totaltempcount').text(dataa.total_temp_count);
$('#totalsuccesslogins').text(dataa.totalsuccesslogins);
$('#uniqueusertemp').text(dataa.unique_user_temp);

 
 
});


var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "/tempasscode_streak"  ,
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
      
     
  
  
  
  
  Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    credits: {
      enabled: false,
    },
    title: {
        text: 'Temporary Passcode by Users'
      
    },colors: ['#8ae02b'],
    xAxis: {
        categories: dataa.streak
    },
    yAxis: {lineWidth:1,
        min: 0,
        title: {
            text: 'streak_count'
        },
        stackLabels: {
            enabled: false,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {series: {point: {
             
            }},
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false
            }
        }
    },
    legend: {
      enabled: true,
      itemStyle: {
        fontSize: '10px',
        fontWeight: '200'
    }
    },
    series: [ {
        name: 'Number of temp passcode',
        data: dataa.streak_count
    }
    
     ]
  });});
  
