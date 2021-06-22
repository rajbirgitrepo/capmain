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
        $('#container2').highcharts({
            chart: {
                type: 'column'
            },
            colors: [
               '#01a451',
              '#ea3838'
              
               
               
            ],
            title: {
                text: 'Family Sentiment Analysis',
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
                data: [98,92,94,60,22,70]
            }, {
                name: 'NEGATIVE SENTIMENT',
                data: [2,8,6,40,78,30]
            }]
           
        });
    });
 

//]]> 
 

//]]> 