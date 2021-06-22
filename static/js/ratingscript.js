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
                text: ' Fedback Ratings ( Sessions )',
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
                    '5 STAR',
                  '4 STAR',
                  '3 STAR',
                  '2 STAR',
                  '1 STAR'
                    
                ]
            },
            yAxis: {
        allowDecimals: false,
        title: {
            text: ' Feedback Rating'
          
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
                name: '2018-2019 SY',
                data: [43964,13137,5747,1340,925]
            }, {
                name: '2020-2021 SY',
                data: [17333,4237,1786,458,322]
            }]
           
        });
    });
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
            $('#container3').highcharts({
                chart: {
                    type: 'column'
                },
                colors: [
                   '#01a451' 
                   
                ],
                title: {
                    text: ' Feedback Ratings ',
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
                        '5 STAR',
                      '4 STAR',
                      '3 STAR',
                      '2 STAR',
                      '1 STAR'
                        
                    ]
                },
                yAxis: {
            allowDecimals: false,
            title: {
                text: ' Feedback Rating'
              
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
                    groupPadding: .25
                }
                },
                series: [{
                    name: 'OVERALL',
                    data: [77681,26074,11499,2832,1690]
                }]
               
            });
        });
     
    
    //]]> 



