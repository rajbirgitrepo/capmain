$(function() {
    var settings = {
        async: true,
        crossDomain: true,
        url: "/averagetrend/",
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa[0].bar, "data")

        Highcharts.chart('container5', {
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false,
            },
            title: {
                text: " Average Playback Trend"

            },
            colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
            xAxis: {
                categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
            },
            yAxis: {
                lineWidth: 1,
                min: 0,
                title: {
                    text: "Average User Count"
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
            plotOptions: {
                series: {
                    point: {

                    }
                },
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
            series: [{
                    name: 'Playback User Count(CSY)',
                    color: '#02A45A',
                    data: dataa[0].bar
                },

                {
                    type: 'spline',
                    color: '#FFFF00',
                    name: '(LSY 2019-2020)',
                    data: dataa[0].curve_LYTOLY
                },
                {
                    type: 'spline',
                    color: '#FF8300',
                    name: '(LSY 2020-2021)',
                    data: dataa[0].curve
                }
            ]
        });
    });

});