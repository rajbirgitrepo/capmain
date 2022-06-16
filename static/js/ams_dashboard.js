var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/AMS_Cards',
    "method": "GET"
}
$.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);

    $('#total_email_sent').text(dataa.TOTAL_EMAILS_SENT);
    $('#total_users').text(dataa.UNIQUE_USERS);
    $('#active_users').text(dataa.ACTIVE_USERS);
    $('#playback_count').text(dataa.PLAYBACK_COUNT);
    $('#mindful_minute').text(dataa.MINDFUL_MINUTES);
});


var settings = {
    async: true,
    crossDomain: true,
    url: "/AMS_EmailCount_PerDay",
    method: "GET",
};
$.ajax(settings).done(function(response) {
    // console.log(response); 
    var dataa = JSON.parse(response);
    // console.log(dataa); 
    // $("#gifload").hide();
    chart = new Highcharts.StockChart({
        chart: {
            renderTo: 'container1',
            zoomType: 'x'
        },
        title: {
            text: 'Purpose Wise Daily Email Count'
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
                text: ''
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
            },
            style: {
                color: 'black',
                fontSize: '9px'
            },
            shared: true
        },
        legend: {
            enabled: true,
            itemStyle: {
                fontSize: '10px',
                fontWeight: '500'
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
        series: [
            {
                "name": "Enhance Mental Health With Inner Explorer",
                "type": "column",
                "color": "#B87333",
                "xAxis": 0,
                "data": dataa.data.Enhance_Mental_Health_With_Inner_Explorer,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Improve Academic Success",
                "type": "column",
                "color": "#8AE02B",
                "xAxis": 1,
                "data": dataa.data.Improve_Academic_Success,
                dataGrouping: {
                    enabled: false,
                }
            }, 
            {
                "name": "Mindful Michigan Initiative",
                "type": "column",
                "xAxis": 1,
                "color": "#01A451",
                "data": dataa.data.Mindful_Michigan_Initiative,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Mindful Self Care For Students",
                "type": "column",
                "xAxis": 1,
                "color": "#4f1faf",
                "data": dataa.data.Mindful_Self_Care_For_Students,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Mindfulness Fosters Empathy And Compassion",
                "type": "column",
                "xAxis": 1,
                "color": "#462cee",
                "data": dataa.data.Mindfulness_Fosters_Empathy_And_Compassion,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Respond Instead Of React With Daily Mindfulness",
                "type": "column",
                "xAxis": 1,
                "color": "#d3373b",
                "data": dataa.data.Respond_Instead_Of_React_With_Daily_Mindfulness,
                 dataGrouping: {
                        enabled: false,
                    }
            },
            {
                "name": "Retrain Your Brain",
                "type": "column",
                "xAxis": 1,
                "color": "#7BCCB5",
                "data": dataa.data.Retrain_Your_Brain,
                 dataGrouping: {
                        enabled: false,
                    }
            },
            {
                "name": "Slow Down A Busy Schedule With Inner Explorer",
                "type": "column",
                "xAxis": 1,
                "color": "#045F5F",
                "data": dataa.data.Slow_Down_A_Busy_Schedule_With_Inner_Explorer,
                 dataGrouping: {
                        enabled: false,
                    }
            },
            {
                "name": "Start Today’s Practice With Inner Explorer Now!",
                "type": "column",
                "xAxis": 1,
                "color": "#FED8B1",
                "data": dataa.data.Start_Todays_Practice_With_Inner_Explorer_Now,
                 dataGrouping: {
                        enabled: false,
                    }
            },
            {
                "name": "Start Your Daily Mindfulness Practice With Inner Explorer",
                "type": "column",
                "xAxis": 1,
                "color": "#556B2F",
                "data": dataa.data.Start_Your_Daily_Mindfulness_Practice_With_Inner_Explorer,
                 dataGrouping: {
                        enabled: false,
                    }
            },
            {
                "name": "Your Inner Explorer Mindfulness Journey Is Ready Now!",
                "type": "column",
                "xAxis": 1,
                "color": "#EE9A4D",
                "data": dataa.data.Your_Inner_Explorer_Mindfulness_Journey_Is_Ready_Now_,
                 dataGrouping: {
                        enabled: false,
                    }
            },
        ]
    });
});


var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/AMS_pracphasesecond',
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    console.log(dataa, 'Playback Trend'); 
    // $("#gifload").hide();
    chart = new Highcharts.StockChart({
        chart: {
            renderTo: 'container2',
            zoomType: 'x'
        },
        title: {
            text: 'Playback Trend'
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
                text: ''
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
                fontSize: '10px',
                fontWeight: '500'
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
        series: [
            {
                "name": "Practice Count",
                "type": "column",
                "color": "#01A451",
                "xAxis": 0,
                "data": dataa.data.ams2prac,
                dataGrouping: {
                    enabled: false,
                }
            },
        ]
    });
});


var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/AMS_PurposeWise_EmailCount',
    "method": "GET"
}
$.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa, 'Purpose Wise Email Count');
    $(function () {
        const chart =
        Highcharts.chart('container3', {
            chart: {
                // zoomType: "xy",
                type: "column"
            },
            title: {
                text: "Purpose Wise Email Count",
            },
            credits: {
                enabled: false,
            },
            colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
            xAxis: [{
                categories: dataa.PURPOSE,
                labels: {
                    style: {
                        fontSize: "10px",
                        rotation: 90,
                    },
                },
            },],
            yAxis: [{
                //Primary yAxis
                lineWidth: 1,
                labels: {
                    format: "{value}",
                    style: {
                        color: "#000",
                    },
                },
                title: {
                    text: "Email Count",
                    style: {
                        color: "#000",
                        fontSize: "10px",
                    },
                },
            },
            {
                title: {
                    text: "",
                    style: {
                        color: "#4572A7",
                    },
                },
                labels: {
                    format: "{value}",
                    style: {
                        color: "#4572A7",
                    },
                },
                opposite: false,
            },
            ],
            tooltip: {
                shared: true,
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                }
            },
            series: [{
                color: "#01A451",
                name: 'Email Count',
                data: dataa.TOTAL_EMAILS_SENT
            },
            ],
        });
    });
});


// function cards(URL) {
//     $('#next').empty();
//     console.log(URL);
//     cardscroll();
//     $('#btnExport').show();
//     createDynamic(URL)
// }


// function createDynamic(url) {

//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": url,
//         "method": "GET"
//     }
//     $.ajax(settings).done(function(response) {
//         var data1 = JSON.parse(response);

//         $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><tr><th>USER NAME</th><th>USER EMAIL</th><th>PHONE</th><th>SCHOOL AFFILIATION</th><th>CITY</th><th>STATE</th><th>REGISTERED ON</th><th>LAST PLAYBACK</th><th>PLAYBACK COUNT</th></tr></thead ><tbody>');

//         for (var i = 0; i < data1.data.length; i++) {


//             var datain = data1.data[i];
//             var resultDiv = createDynamicDiv(datain);

//             $("#dataTable").append(resultDiv);




//         }
//         //$('#dataTable1').append('</tbody></table>');
//         $('#dataTable').append('</tbody></table>');
//         dataTab();



//         $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><tr><th>USER NAME</th><th>USER EMAIL</th><th>PHONE</th><th>SCHOOL AFFILIATION</th><th>CITY</th><th>STATE</th><th>REGISTERED ON</th><th>LAST PLAYBACK</th><th>PLAYBACK COUNT</th></tr></thead ><tbody>');
//         for (var i = 0; i < data1.data.length; i++) {


//             var datain = data1.data[i];

//             var resultDiv = createDynamicDiv(datain);
//             $("#dataTable1").append(resultDiv);

//         }
//         $('#dataTable1').append('</tbody></table>');
//     })
// }


// function dataTab() {

//     $("#dataTable").DataTable({
//         "pageLength": 50
//     });

// }


// function createDynamicDiv(userList) {
//     var dynamicDiv = '';
//     console.log(userList)

//     dynamicDiv += '<tr >' +
//         '<td>' + userList[0] + '</td>' +
//         '<td>' + userList[1] + '</td>' +
//         '<td>' + userList[2] + '</td>' +
//         '<td>' + userList[3] + '</td>' +
//         '<td>' + userList[4] + '</td>' +
//         '<td>' + userList[5] + '</td>' +
//         '<td>' + userList[6] + '</td>' +
//         '<td>' + userList[7] + '</td>' +
//         '<td>' + userList[8] + '</td>' +

//         '</tr>'

//     return dynamicDiv;

// }



   // function P() {

            //     var settings = {
            //         "async": true,
            //         "crossDomain": true,
            //         "url": '/parcount',
            //         "method": "GET"
            //     }
            //     $.ajax(settings).done(function(response) {
            //         var dataa = JSON.parse(response);

            //         $('#totalparents').text(dataa.totalparents[0]);

            //         $('#minute').text(dataa.android[0] + ' (40%)');
            //         $('#playback').text(dataa.ios[0] + ' (60%)');
            //         $('#Approx').text('(Approx)');
            //         $('#Approx2').text('(Approx)');
            //         $('#totalparentsregis').text(+dataa.download[0] + ' (' + dataa.downloadper[0] + '%)');


            //     });
            // };