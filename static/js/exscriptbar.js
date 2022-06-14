playbackTrendChart2('playback', 'Playback')
$("#practice_trendChart").val('playback');
$(document).on('change', '#practice_trendChart', function() {
    $('#container1').empty();
    // console.log(this.value)
    if (this.value == 'practice') {
        document.getElementById('Practice_trend_playback_trend').title = 'The bar graph compares the current school year\u0027s practice count of Clever, Schoology, Family, and User to the previous school year\u0027s practice trend, represented by an orange line graph, as well as last to last year\u0027s practice trend, represented by a yellow line graph.';
        playbackTrendChart2(this.value, 'Practice')
    } else {
        document.getElementById('Practice_trend_playback_trend').title = 'The bar graph compares the current school year\u0027s playback count of Clever, Schoology, Family, and User to the previous school year\u0027s playback trend, represented by an orange line graph, as well as last to last year\u0027s playback trend, represented by a yellow line graph.';
        playbackTrendChart2(this.value, 'Playback')
    }
});

function playbackTrendChart2(selectValue2, t) {

    var settings = {
        async: true,
        crossDomain: true,
        url: "/practicetrendnew/" + selectValue2,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(dataa[0].bar, "data");
        $("#gifload").hide();

        Highcharts.chart("container1", {
            chart: {
                type: "column",
            },
            credits: {
                enabled: false,
            },
            title: {
                text: t + " Trend",
            },
            colors: [ '#6495ED', '#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
            xAxis: {
                categories: [
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                ],
            },
            yAxis: {
                lineWidth: 1,
                min: 0,
                title: {
                    text: t + " Count",
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: "bold",
                        color:
                        // theme
                            (Highcharts.defaultOptions.title.style &&
                                Highcharts.defaultOptions.title.style.color) ||
                            "gray",
                    },
                },
            },
            tooltip: {
                headerFormat: "<b>{point.x}</b><br/>",
                pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
            },
            legend: {
                enabled: true,
                itemStyle: {
                    fontSize: '10px',
                    fontWeight: '200'
                }
            },
            plotOptions: {
                series: { point: {} },
                column: {
                    stacking: "normal",
                    dataLabels: {
                        enabled: false,
                    },
                },
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
                    name: "Schoology",
                    data: dataa[2].bars,
                    color: '#4F1FAF'
                },
                {
                    name: "Family " + t + " Count(CSY2021-2022)",
                    data: dataa[1].bar2,
                    color: '#8AE02B'
                },
                {
                    name: "User " + t + " Count(CSY2021-2022)",
                    data: dataa[0].bar,
                    color : '#01A451'
                },

                {
                    type: "spline",
                    color: "#FFFF00",
                    name: t + " Count(LSY 2019-2020)",
                    data: dataa[0].curve_LYTOLY,
                },
                {
                    type: "spline",
                    color: "#FF8300",
                    name: t + " Count(LSY 2020-2021)",
                    data: dataa[0].curve,
                },
            ],
        });
    });
}

// $(function() {
//     var settings = {
//         async: true,
//         crossDomain: true,
//         url: "/progprac",
//         method: "GET",
//     };
//     $.ajax(settings).done(function(response) {
//         var dataa = JSON.parse(response);
//         console.log(dataa, "hello");

//         Highcharts.chart("container77", {
//             chart: {
//                 type: "column",
//             },
//             colors: ["#00A651", "#2C9905", "#8AE02B", "#B9FF4F", "#FF8300"],
//             title: {
//                 text: "PROGRAM WISE PLAYBACK TREND",
//             },
//             xAxis: {
//                 categories: [
//                     "AUG",
//                     "SEP",
//                     "OCT",
//                     "NOV",
//                     "DEC",
//                     "JAN",
//                     "FEB",
//                     "MAR",
//                     "APR",
//                     "MAY",
//                     "JUN",
//                     "JUL",
//                 ],
//                 crosshair: false,
//             },
//             yAxis: {
//                 min: 0,
//                 title: {
//                     text: "Playback Count",
//                 },
//             },
//             tooltip: {
//                 headerFormat: "<span>{point.x}</span><br>",
//                 pointFormat: "<span>{series.name}</span><span{point.name}></span>: <b>{point.y}<b>{series.data2}",
//             },
//             plotOptions: {
//                 column: {
//                     pointPadding: 0.2,
//                     borderWidth: 0,
//                 },
//             },
//             series: [{
//                     name: "PRE-K",
//                     data: dataa[0].prek,
//                 },

//                 {
//                     name: "ELEMENTARY",
//                     data: dataa[0].elem,
//                 },

//                 {
//                     name: "MIDDLE",
//                     data: dataa[0].mid,
//                 },
//                 {
//                     name: "HIGH",
//                     data: dataa[0].high,
//                 },
//                 {
//                     name: "SOUND PLAYBACK /TRANSITION/ ALL",
//                     data: dataa[0].all,
//                 },
//             ],
//         });
//     });
// });