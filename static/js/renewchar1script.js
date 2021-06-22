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
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            colors: [
               '#00a651',
               '#88C347' 
               
            ],
            title: {
                text: 'Users Up For Renewal Last 6 Months',
                style: {
                  color: '#555'
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0,
                backgroundColor: '#FFFFFF',
                itemStyle: {
                    fontSize: '10px',
                    fontWeight: '200',
                }
            },

            xAxis: {
                categories: [
                    'JULY',
                  'AUG',
                  'SEP',
                  'OCT',
                  'NOV',
                  'DEC'
                    
                ]
            },
            yAxis: {
        allowDecimals: false,
        title: {
            text: 'Users Count'
          
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
                name: 'Recently Expired',
                data: [204,683,1394,488,584,1238]
            }, {
                name: 'Recently Expired But Active',
                data: [97,337,680,311,216,485]
            }]
           
        });
    });
 
//]]> 
