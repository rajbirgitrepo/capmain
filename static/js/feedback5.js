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
        $('#container9').highcharts({
            chart: {
                type: 'column'
            },
            colors: [
               '#01a451',
              '#ea3838'
              
               
               
            ],
            title: {
                text: 'Sentiment Analysis',
                style: {
                  color: '#555'
                }
            },
            legend: {
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
                categories: [
                    '5 STAR',
                  '4 STAR',
                  '3 STAR',
                  '2 STAR',
                  '1 STAR',
                  '0 STAR'
                    
                ]
            },
            yAxis: {
        allowDecimals: false,
        title: {
            text: ' SENTIMENT %'
          
        }
              
    },
            tooltip: {
                shared: false,
                valueSuffix: '%'
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
                name: 'POSITIVE SENTIMENT',
                data: [95,85,65,52,35,94]
            }, {
                name: 'NEGATIVE SENTIMENT',
                data: [5,15,35,48,65,6]
            }]
           
        });
    });
 

//]]> 
 

//]]> 