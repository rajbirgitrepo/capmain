playbackTrendChart('Playback', 'Playback')
$("#practice_activeChart").val('Playback');
$(document).on('change', '#practice_activeChart', function() {
    $('#container33').empty();
    // console.log(this.value)
    if (this.value == 'practice') {
        document.getElementById('active_playback_practice_trend').title = 'Bar-graph displays the active user\u0027s practice count for the current school year of clever, schoology, Family, and User in comparison to the practice trend for the previous school year represented by an orange line graph, as well as the last to last year represented by a yellow line graph.';
        playbackTrendChart(this.value, 'Practice')
    } else {
        document.getElementById('active_playback_practice_trend').title = 'Bar-graph displays the active user\u0027s playback count for the current school year of clever, schoology, Family, and User in comparison to the playback trend for the previous school year represented by an orange line graph, as well as the last to last year represented by a yellow line graph.';
        playbackTrendChart(this.value, 'Playback')
    }
});

function playbackTrendChart(selectValue, t) {
    var settings = {
        async: true,
        crossDomain: true,
        url: "/activetrendnew/" + selectValue,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(dataa[0], "data")

        Highcharts.chart('container33', {
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false,
            },
            title: {
                text: t + " Active User Trend"

            },
           
            colors: ['#6495ED', '#4F1FAF', '#462CEE', '#8AE02B','#01A451'],
            xAxis: {
                categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
            },
            yAxis: {
                lineWidth: 1,
                min: 0,
                title: {
                    text: t + " User Count"
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
                    name: "Canvas",
                    data: dataa[4].barcan,
                    color: '#d3373b'
                },
                {
                    name: "Clever",
                    data: dataa[3].barc,
                    color: '#462CEE'
                },
                {
                    name: 'Schoology',
                    data: dataa[2].bars,
                    color: '#4F1FAF'
                }, {
                    name: 'Family ' + t + ' Count(CSY2021-2022)',
                    fontSize: '8px',
                    data: dataa[1].bar2,
                    color: '#8AE02B'

                }, {
                    name: t + ' User Count(CSY 2021-2022)',
                    data: dataa[0].bar,
                    color : '#01A451'
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
}


var settings = {
    async: true,
    crossDomain: true,
    url: "/averagetrend/",
    method: "GET",
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    // console.log(dataa[0].bar, "data")

    Highcharts.chart('container35', {
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
                text: "Playback Count"
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
                name: 'Playback User Count(CSY 2021-2022)',
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


var settings = {
    async: true,
    crossDomain: true,
    url: "/sentimentdonut_csy",
    method: "GET",
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    // console.log(dataa);
    Highcharts.chart('container37', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            credits: {
                enabled: false,
            },
        },
        title: {
            text: 'Sentiment Percentage CSY'
        },
        credits: {
            enabled: false,
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.y}'
                },
                colors: [
                    "#02A45A", "#ff9933", '#8AE02B'
                ]
            }
        },
        series: [{
            name: 'Sentiment CSY',
            colorByPoint: true,
            data: [{
                    name: 'Positive',
                    y: dataa.donut.pos,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Negative',
                    y: dataa.donut.neg,
                },
                {
                    name: 'Neutral',
                    y: dataa.donut.neu,
                },
            ]
        }]
    });
});



var settings = {
    async: true,
    crossDomain: true,
    url: "/topdistrictplayback",
    method: "GET",
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    // console.log(dataa.Playbacks, "data")

    Highcharts.chart('container36', {
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "Top District Playback"

        },
        colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
        xAxis: {
            categories: dataa.District,
            crosshair: false,
            labels: {
                style: {
                    fontSize: "10px",
                    rotation: 90,
                },
            }
        },
        yAxis: {
            lineWidth: 1,
            min: 0,
            title: {
                text: "Playback User Count"
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
            style: {
                color: 'Black',
                fontWeight: 'bold'
            },
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
                color: "#01A451",
                name: 'Playbacks',
                data: dataa.Playbacks
            }

        ]
    });
});



var settings = {
    async: true,
    crossDomain: true,
    url: "/feedbackrating_csy",
    method: "GET",
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);

    Highcharts.chart('container38', {
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "Feedback Rating CSY"

        },
        colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
        xAxis: {
            categories: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'],
            crosshair: false,
            labels: {
                style: {
                    fontSize: "10px",
                    rotation: 90,
                },
            }
        },
        yAxis: {
            lineWidth: 1,
            min: 0,
            title: {
                text: " Feedback Rating Count"
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
            style: {
                color: 'Black',
                fontWeight: 'bold'
            },
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
                color: "#01A451",
                name: 'Counts',
                data: dataa.count
            }


        ]
    });
});



playbackTrendChart3('playback', 'Playback')
$("#practice_historyChart").val('playback');
$(document).on('change', '#practice_historyChart', function() {
    $('#containerhistory2').empty();
    // console.log(this.value)
    if (this.value == 'practice') {
        document.getElementById('practice_history_CSY_playback').title = 'The graph compares the current school year\u0027s practice count by family, school, smart, and schoology users to the last school year\u0027s yellow line graph. The statistics are displayed for the chosen time period (1m:one month ,3m:three months, 6m:six months, YTD:year to date, All:trend for all months of csy).';
        playbackTrendChart3(this.value, 'Practice')
    } else {
        document.getElementById('practice_history_CSY_playback').title = 'The graph compares the current school year\u0027s playback count by family, school, smart, and schoology users to the last school year\u0027s yellow line graph. The statistics are displayed for the chosen time period (1m:one month ,3m:three months, 6m:six months, YTD:year to date, All:trend for all months of csy).';
        playbackTrendChart3(this.value, 'Playback')
    }
});

function playbackTrendChart3(selectValue3, tx) {
    var settings = {
        async: true,
        crossDomain: true,
        url: "/practicehistorychartlatest/" + selectValue3,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'containerhistory2',
                zoomType: 'x'
            },
            title: {
                text: tx + ' History CSY'
            },
            subtitle: {
                text: ''
            },
            credits: {
                enabled: false,
            },
            xAxis: [{
                type: 'datetime',
                events: {
                    afterSetExtremes() {
                        let bottomAxis = this,
                            topAxis = this.chart.xAxis[1],
                            diferenciaMin = Math.abs(bottomAxis.dataMin - bottomAxis.min),
                            diferenciaMax = Math.abs(bottomAxis.dataMax - bottomAxis.max);
                        topAxis.setExtremes(topAxis.dataMin + diferenciaMin, topAxis.dataMax - diferenciaMax, true)
                    }
                },
                labels: {
                    formatter: function() {
                        return Highcharts.dateFormat(' %e,%b', this.value);
                    }

                }
            }, {
                type: 'datetime',
                labels: {
                    formatter: function() {
                        return Highcharts.dateFormat(' %e,%b', this.value);
                    }

                },
                opposite: true,
                visible: false
            }],
            yAxis: {
                title: {
                    text: tx + ' Count'
                },
                visible: true,
                opposite: false,
                showLastLabel: true,
                labels: {
                    enabled: true,
                    format: "{value}",
                    align: "right"
                },
            },
            tooltip: {
                pointFormatter: function() {
                    return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: true,
                itemStyle: {
                    fontSize: '8px',
                    fontWeight: '200'
                }
            },
            navigator: {
                enabled: true
            },
            rangeSelector: {
                inputEnabled: false,
                enabled: true
            },
            scrollbar: {
                enabled: true
            },
            navigation: {
                buttonOptions: {
                    enabled: true
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal'

                },
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                    "name": "Last SY",
                    "type": "line",
                    "color": "#FF9933",
                    "xAxis": 0,
                    "data": dataa.data.lsy,
                    dataGrouping: {
                        enabled: false,
                    }
                },
                {
                    "name": "Family",
                    "type": "column",
                    "color": "#8AE02B",
                    "xAxis": 1,
                    "data": dataa.data.pcsy,
                    dataGrouping: {
                        enabled: false,
                    }
                }, {
                    "name": "School",
                    "type": "column",
                    "xAxis": 1,
                    "color": "#01A451",
                    "data": dataa.data.csy,
                    dataGrouping: {
                        enabled: false,
                    }
                },
                {
                    "name": "Clever",
                    "type": "column",
                    "xAxis": 1,
                    "color": "#4f1faf",
                    "data": dataa.data.clever,
                    dataGrouping: {
                        enabled: false,
                    }
                },
                {
                    "name": "Schoology",
                    "type": "column",
                    "xAxis": 1,
                    "color": "#462cee",
                    "data": dataa.data.schoology,
                    dataGrouping: {
                        enabled: false,
                    }
                },
                {
                    "name": "Canvas",
                    "type": "column",
                    "xAxis": 1,
                    "color": "#d3373b",
                    "data": dataa.data.canvas,
                     dataGrouping: {
                            enabled: false,
                        }
                }
            ]
        });
    });
}


// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "/practicehistorychart",
//     "method": "GET"
// }
// $.ajax(settings).done(function(response) {
//     var dataa = JSON.parse(response);
//     chart = new Highcharts.StockChart({
//         chart: {
//             renderTo: 'containerhistory',
//             zoomType: 'x'
//         },
//         title: {
//             text: 'Playback History (2021-2022)'
//         },
//         subtitle: {
//             text: ''
//         },
//         credits: {
//             enabled: false,
//         },
//         xAxis: [{
//             type: 'datetime',
//             events: {
//                 afterSetExtremes() {
//                     let bottomAxis = this,
//                         topAxis = this.chart.xAxis[1],
//                         diferenciaMin = Math.abs(bottomAxis.dataMin - bottomAxis.min),
//                         diferenciaMax = Math.abs(bottomAxis.dataMax - bottomAxis.max);
//                     topAxis.setExtremes(topAxis.dataMin + diferenciaMin, topAxis.dataMax - diferenciaMax, true)
//                 }
//             },
//             labels: {
//                 formatter: function() {
//                     return Highcharts.dateFormat(' %e,%b', this.value);
//                 }

//             }
//         }, {
//             type: 'datetime',
//             labels: {
//                 formatter: function() {
//                     return Highcharts.dateFormat(' %e,%b', this.value);
//                 }

//             },
//             opposite: true,
//             visible: false
//         }],
//         yAxis: {
//             visible: true,
//             opposite: false,
//             showLastLabel: true,
//             labels: {
//                 enabled: true,
//                 format: "{value}",
//                 align: "right"
//             },
//         },
//         tooltip: {
//             pointFormatter: function() {
//                 return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + Highcharts.numberFormat(this.y, 2);
//             }
//         },
//         legend: {
//             enabled: true,
//             itemStyle: {
//                 fontSize: '10px',
//                 fontWeight: '200'
//             }
//         },
//         navigator: {
//             enabled: true
//         },
//         rangeSelector: {
//             inputEnabled: false,
//             enabled: true
//         },
//         scrollbar: {
//             enabled: true
//         },
//         navigation: {
//             buttonOptions: {
//                 enabled: true
//             }
//         },
//         plotOptions: {
//             column: {
//                 stacking: 'normal'

//             },
//             series: {
//                 marker: {
//                     enabled: false
//                 }
//             }
//         },
//         series: [{
//             "name": "Last SY",
//             "type": "line",
//             "color": "#FF9933",
//             "xAxis": 0,
//             "data": dataa.data.lsy
//         }, {
//             "name": "Family",
//             "type": "column",
//             "color": "#8AE02B",
//             "xAxis": 1,
//             "data": dataa.data.pcsy
//         }, {
//             "name": "School",
//             "type": "column",
//             "xAxis": 1,
//             "color": "#01A451",
//             "data": dataa.data.csy
//         }]
//     });
// });