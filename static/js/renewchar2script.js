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
               '#00a651',
               '#88C347' 
               
            ],
            title: {
                text: 'Users Up For Renewal Next 6 Months',
                style: {
                  color: '#555'
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0,
                backgroundColor: '#FFFFFF'
            },
            xAxis: {
                categories: [
                    'JAN',
                  'FEB',
                  'MAR',
                  'APR',
                  'MAY',
                  'JUN'
                    
                ]
            },
            yAxis: {
        allowDecimals: false,
        title: {
            text: 'User Count'
          
        }
              
    },
            tooltip: {
                shared: false,
                valueSuffix: ''
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
                name: 'Expiring Soon',
                data: [122,484,141,232,86,5337]
            }, {
                name: 'Expiring Soon But Active',
                data: [65,212,70,79,29,2040]
            }]
           
        });
    });
 
//]]> 