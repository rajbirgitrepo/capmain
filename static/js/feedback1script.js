var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/feedbacktrend/",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
      console.log(dataa); 
$(function () {
    Highcharts.setOptions({
        chart: {
            style:{
                    fontFamily:'Arial, Helvetica, sans-serif', 
                    fontSize: '1em',
                    color:'#f00'
                }
        }
    });
        $('#container99').highcharts({
            chart: {
                type: 'column'
            },
            colors: [
               '#01a451',
               '#88C347' 
               
            ],
            title: {
                text: 'User Feedback Trend YOY',
                style: {
                  color: '#555'
                }
            },
            legend: {
                enabled: true,
                itemStyle: {
                  fontSize: '10px',
                  fontWeight: '200',
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                  borderWidth: 0,
                  backgroundColor: '#FFFFFF'
              }
              },
            xAxis: {
                categories:dataa.month
            },

            yAxis: {
        allowDecimals: false,
        title: {
            text: 'User Feedback Count'
          
        }
              
    },
            tooltip: {
                shared: false,
                
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.1
                },
            series: {
                groupPadding: .15
            }
            },
            series: [{
                name: '2019-2020 SY',
                data: dataa.curve
            }, {
                name: '2020-2021 SY',
                data: dataa.bar
            }]
        });
    });
       });