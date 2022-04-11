$(function() {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "2018:2021",
        dateFormat: "yy-mm-dd",
        onSelect: function(dateText, inst) {
            $("#stardate").text(dateText);
        }
    });
    var d = new Date();
    var currMonth = d.getMonth();
    var currYear = d.getFullYear();
    var currDate = d.getDate();
    var startDate = new Date(currYear, currMonth, currDate);
    $("#datepicker").datepicker("setDate", startDate);
});

function sub() {
    var a = document.getElementById("stardate").innerText;
    charts(a);
    cardscount(a);
}

var d = new Date();
var currMonth = d.getMonth() + 1;
var currYear = d.getFullYear();
var currDate = d.getDate();

var startDate = new Date(currYear, currMonth, currDate);
console.log(startDate);
var f = currYear + "-" + currMonth + "-" + currDate;
charts(f);
cardscount(f);
// $("#fromd").text(e);
$("#stardate").text(f);
$('#firstnametable').change(function() {
    var a = document.getElementById("stardate").innerText;
    var b = $(this).val();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/districtddtcard/" + a + "/" + b,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa, "hello frnd")
        Highcharts.chart('container4', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Feedback Comparison (WEEKLY)'
            },
            colors: [
                '#a0afb0', '#8AE02B', '#a5b0a5',
                '#01A451'
            ],
            xAxis: {
                categories: ['5 star', '4star', '3 star', '2star'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Feedbacks'
                }
            },
            legend: {
                enabled: true,
                itemStyle: {
                    fontSize: '10px',
                    fontWeight: '200',
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    series: {
                        point: {
                            events: {
                                click: function() {
                                    //console.log("hellooooo",this);
                                    // alert(' value: ' + this.series.name[0]);
                                    URL = '/coomentperfeedbacktable/' + this.name;
                                    console.log(URL);
                                }
                            }
                        }
                    },
                    stacking: 'normal',
                }
            },
            series: [{
                name: 'PARENT RATING 5 LAST WEEK',
                data: dataa.rating_data.Parents_rating_last_week,
                stack: 1
            }, {
                name: 'PARENT RATING 5 LAST TO LAST WEEK',
                data: dataa.rating_data.Parents_rating_before_lastweek,
                stack: 0
            }, {
                name: 'CLASSROOM RATING 5 LAST WEEK',
                data: dataa.rating_data.Teachers_rating_last_week,
                stack: 1
            }, {
                name: 'CLASSROOM RATING 5 LAST TO LAST WEEK',
                data: dataa.rating_data.teachers_rating_before_lastweek,
                stack: 0
            }]
        });
    });

});



function charts(a) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": '/word_cloud_feedback_weekly/' + a,
        "method": "GET",
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);

        // $( "#avgrate" ).text(dataa.avg_rating);


        am4core.useTheme(am4themes_animated);
        // Themes end


        var chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
        var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

        series.accuracy = 4;
        series.step = 15;
        series.rotationThreshold = 0.7;
        series.maxCount = 200;
        series.minWordLength = 2;
        series.labels.template.tooltipText = "{word}: {value}";
        series.fontFamily = "Courier New";
        series.maxFontSize = am4core.percent(30);

        series.text = dataa.word_cloud;



        Chart.defaults.global.defaultFontFamily = "Lato";

        // var horizontalBarChart = new Chart(horizontalBarChartCanvas, {
        //    type: 'horizontalBar',
        //    data: {
        //       labels: dataa.label,
        //       datasets: [{
        //          data: dataa.count,
        //          backgroundColor: ["#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555","#4da555", "#4da555", "#4da555"], 
        //       }]
        //    },
        //    options: {
        //       tooltips: {
        //         enabled: true
        //       },
        //       responsive: true,
        //       legend: {
        //          display: false,
        //          position: 'bottom',
        //          fullWidth: true,
        //          labels: {
        //            boxWidth: 10,
        //            padding: 50
        //          }
        //       },
        //       scales: {
        //          yAxes: [{
        //            barPercentage: 0.75,
        //            gridLines: {
        //              display: true,
        //              drawTicks: true,
        //              drawOnChartArea: false
        //            },
        //            ticks: {
        //              fontColor: '#555759',
        //              fontFamily: 'Lato',
        //              fontSize: 11
        //            }

        //          }],
        //          xAxes: [{
        //              gridLines: {
        //                display: true,
        //                drawTicks: false,
        //                tickMarkLength: 5,
        //                drawBorder: false
        //              },
        //            ticks: {
        //              padding: 5,
        //              beginAtZero: true,
        //              fontColor: '#ffffff',
        //              fontFamily: 'Lato',
        //              fontSize: 11,
        //              callback: function(label, index, labels) {
        //               return label/1000;
        //              }

        //            },
        //             scaleLabel: {
        //               display: true,
        //               padding: 10,
        //               fontFamily: 'Lato',
        //               fontColor: '#555759',
        //               fontSize: 16,
        //               fontStyle: 700,
        //               labelString: ''
        //             },

        //          }]
        //       }
        //    }
        // });

    });



    var b = '5f2609807a1c0000950bb45a'
    var feedurl = "/districtddtcard/" + a + "/" + b;
    console.log(feedurl);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": feedurl,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa, "hello frnd")
        Highcharts.chart('container4', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Feedback Comparison (WEEKLY)'
            },
            colors: [
                '#a0afb0', '#8AE02B', '#a5b0a5',
                '#01A451'
            ],
            xAxis: {
                categories: ['5 star', '4star', '3 star', '2star'],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Feedbacks'
                }
            },
            legend: {
                enabled: true,
                itemStyle: {
                    fontSize: '10px',
                    fontWeight: '200',
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    series: {
                        point: {
                            events: {
                                click: function() {
                                    //console.log("hellooooo",this);
                                    // alert(' value: ' + this.series.name[0]);
                                    URL = '/coomentperfeedbacktable/' + this.name;
                                    console.log(URL);
                                }
                            }
                        }
                    },
                    stacking: 'normal',
                }
            },
            series: [{
                name: 'PARENT RATING 5 LAST WEEK',
                data: dataa.rating_data.Parents_rating_last_week,
                stack: 1
            }, {
                name: 'PARENT RATING 5 LAST TO LAST WEEK',
                data: dataa.rating_data.Parents_rating_before_lastweek,
                stack: 0
            }, {
                name: 'CLASSROOM RATING 5 LAST WEEK',
                data: dataa.rating_data.Teachers_rating_last_week,
                stack: 1
            }, {
                name: 'CLASSROOM RATING 5 LAST TO LAST WEEK',
                data: dataa.rating_data.teachers_rating_before_lastweek,
                stack: 0
            }]
        });
    });

    playbackTrendChart('playback', 'Playback')
    $("#practice_weeklyTopChart").val('playback');
    $(document).on('change', '#practice_weeklyTopChart', function() {
        $('#container10').empty();
        console.log(this.value)
        if (this.value == 'practice') {
            document.getElementById('top_20_district_practices_playback').title = 'The bar graph compares the practice count of the top twenty districts for the present week.';
            playbackTrendChart(this.value, 'Practice')
        } else {
            document.getElementById('top_20_district_practices_playback').title = 'The bar graph compares the playback count of the top twenty districts for the present week.';
            playbackTrendChart(this.value, 'Playback')
        }
    });

    function playbackTrendChart(selectValue, tx) {
        var settings = {
            async: true,
            crossDomain: true,
            url: "/top_20_district_weekly/" + a + "/" + selectValue,
            method: "GET",
        };
        $.ajax(settings).done(function(response) {
                var dataa = JSON.parse(response);
                console.log(dataa, "hello frnd")
                var a = parseInt();

                Highcharts.chart('container10', {
                    chart: {
                        type: 'bar'
                    },
                    colors: [

                        '#00a651', '#8ae02b',


                    ],
                    title: {
                        text: 'Top 20 District ' + tx
                    },
                    xAxis: {
                        categories: dataa.district,
                        crosshair: false,
                        labels: {
                            style: {
                                fontSize: "10px",
                                rotation: 90,
                            },
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: tx + ' Count'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span>{point.x}</span><br>',
                        pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}'
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        },
                        series: {
                            point: {
                                events: {
                                    click: function() {

                                        $('#next4').empty();
                                        $('#next41').empty();

                                        URL = '/teachers_practice_tablee_weekly/' + this.category;
                                        $('#btnExport').show();
                                        console.log(URL);
                                        createDynamic(URL)


                                    }
                                }
                            }
                        }
                    },
                    series: [{
                        name: tx + ' Count',
                        data: dataa.practice
                    }]
                });
            }


        );
    }





    playbackTrendChart2('playback', 'Playback')
    $("#practice_weeklyChart").val('playback');
    $(document).on('change', '#practice_weeklyChart', function() {
        $('#container').empty();
        console.log(this.value)
        if (this.value == 'practice') {
            document.getElementById('practice_playback_count_weekly_comparison').title = 'Represents the contrast between the practice count of last-to-last week and last week by Teacher, Clever, Schoology and Parent.';
            playbackTrendChart2(this.value, 'Practice')
        } else {
            document.getElementById('practice_playback_count_weekly_comparison').title = 'Represents the contrast between the playback count of last-to-last week and last week by Teacher, Clever, Schoology and Parent.';
            playbackTrendChart2(this.value, 'Playback')
        }
    });

    function playbackTrendChart2(selectValue2, t) {

        var settings = {
            async: true,
            crossDomain: true,
            url: "/comparison1/" + a + "/" + selectValue2,
            method: "GET",
        };
        $.ajax(settings).done(function(response) {
                var dataa = JSON.parse(response);
                console.log(dataa, "hello frnd")
                var a = parseInt();

                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    colors: ['#a6acaf', '#909497', '#797d7f', '#cacfd2', '#01A451', '#4F1FAF', '#8AE02B', '#462CEE', '#6495ed'


                    ],
                    title: {
                        text: t + ' Count Weekly Comparison'
                    },
                    xAxis: {
                        categories: dataa.weekdata.day,
                        crosshair: false
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: t + ' Count'
                        }

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

                    tooltip: {
                        formatter: function() {
                            return '<b>' + this.x + '</b><br/>' +
                                this.series.name + ': ' + this.y + '<br/>' +
                                'Total: ' + this.point.stackTotal;
                        }
                    },

                    plotOptions: {
                        column: {
                            stacking: 'normal'
                        }
                    },




                    // tooltip: {
                    //     headerFormat: "<b>{point.x}</b><br/>",
                    //     pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
                    //   },


                    // legend: {
                    //   enabled: true,
                    //   itemStyle: {
                    //     fontSize: '10px',
                    //     fontWeight: '200'
                    // }
                    // },
                    // plotOptions: {
                    //   column: {
                    //       stacking: 'normal'
                    //   }
                    // },
                    // series: {
                    //        point: {
                    //         events: {
                    //             click: function () {

                    //              $('#next4').empty();
                    //              $('#next41').empty();

                    //              URL = '/teachers_practice_tablee_weekly/'+this.category;
                    //              $('#btnExport').show();
                    //              console.log(URL);
                    //              createDynamic(URL)


                    //             }}}
                    //     }},
                    series: [{
                            name: 'Teacher ' + t + ' Count Last to Last week',
                            data: dataa.weekdata.count_last_to_last_week_teachers,
                            stack: 'Last to Last week',
                            color: '#909497'
                        },


                        {
                            name: 'Teacher ' + t + ' Count Last Week',
                            data: dataa.weekdata.count_last_week_teachers,
                            stack: 'Last week',
                            color: '#cacfd2'
                        },
                        {
                            name: 'Clever ' + t + ' Count Last to Last week',
                            data: dataa.weekdata.count_last_to_last_week_clever,
                            stack: 'Last to Last week',
                            color: '#4f1faf'
                        },
 
                        {
                            name: 'Clever ' + t + ' Count Last Week',
                            data: dataa.weekdata.ount_last_week_clever,
                            stack: 'Last week',
                            color: 'rgb(88 56 151);'
                        },
                        {
                            name: 'Schoology ' + t + ' Count Last to Last week',
                            data: dataa.weekdata.count_last_to_last_week_schoology,
                            stack: 'Last to Last week',
                            color: '#462cee'
                        },
                        {
                            name: 'Schoology ' + t + ' Count Last Week',
                            data: dataa.weekdata.count_last_week_schoology,
                            stack: 'Last week',
                            color: '#6252c9'
                        },

                        {
                            name: 'Parents ' + t + ' Count Last to Last week',
                            data: dataa.weekdata.count_last_to_lastweek_parents,
                            stack: 'Last to Last week',
                            color : '#01a451'
                        },

                        {
                            name: 'Parent ' + t + ' Count Last Week',
                            data: dataa.weekdata.count_last_week_parents,
                            stack: 'Last week',
                            color : '#8ae02b'
                        },
                       
                        {
                            name: 'Canvas ' + t + ' Count Last Week',
                            data: dataa.weekdata.count_last_week_canvas,
                            stack: 'Last week',
                            color: '#6495ed'
                        },
                        {
                            name: 'Canvas ' + t + ' Count Last to Last Week',
                            data: dataa.weekdata.count_last_to_last_week_canvas,
                            stack: 'Last week',
                            color: '#40a9f4'
                        },
                    ]
                });
            }


        );
    }
    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "/comparison1/" + a,
    //     "method": "GET"
    // }
    // $.ajax(settings).done(function(response) {
    //         var dataa = JSON.parse(response);
    //         console.log(dataa, "hello frnd")


    //         Highcharts.chart('container2', {
    //             chart: {
    //                 type: 'column'
    //             },
    //             colors: [

    //                 '#CACACA', '#00a651', '#8ae02b',


    //             ],
    //             title: {
    //                 text: 'Playback Count Weekly Comparison  (Home)'
    //             },
    //             xAxis: {
    //                 categories: dataa.weekdata.day,
    //                 crosshair: false
    //             },
    //             yAxis: {
    //                 min: 0,
    //                 title: {
    //                     text: 'Prcatice Count'
    //                 }
    //             },
    //             tooltip: {
    //                 headerFormat: '<span>{point.x}</span><br>',
    //                 pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}'
    //             },
    //             plotOptions: {
    //                 column: {
    //                     pointPadding: 0.2,
    //                     borderWidth: 0
    //                 },
    //                 series: {
    //                     point: {
    //                         events: {
    //                             click: function() {

    //                                 $('#next4').empty();
    //                                 $('#next41').empty();

    //                                 URL = '/parents_practice_tablee_weekly/' + this.category;
    //                                 $('#btnExport').show();
    //                                 console.log(URL);
    //                                 createDynamic(URL)


    //                             }
    //                         }
    //                     }
    //                 }
    //             },
    //             series: [{
    //                 name: 'Count Last to Last Week homes',
    //                 data: dataa.weekdata.count_last_to_lastweek_parents
    //             }, 
    //             {
    //                 name: 'Count Last Week homes',
    //                 data: dataa.weekdata.count_last_week_parents
    //             }
                
    //         ]
    //         });
    //     }


    // );


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/AVG_audio_completion_weekly_less_50/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        Highcharts.chart('container5', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Average Audio Completion Weekly'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: dataa.temp.percentage_of_audio_completed[0],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Cumulative Count'
                }
            }],
            tooltip: {
                split: true,
                valueSuffix: ''
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666',
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'Cumulative Audio Completion',
                color: '#DCDCDC',
                type: "area",
                data: dataa.temp.cumulative_audio_completion
            }, {
                name: 'Audio Completion',
                color: '#00a651',
                yAxis: 0,

                data: dataa.temp.number_of_audios_compelted
            }]
        });
    });


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/AVG_audio_completion_weekly_more_50/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        Highcharts.chart('container6', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Average Audio Completion Weekly (Greater Than 50%)'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: dataa.temp.percentage_of_audio_completed[0],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Cumulative Count'
                }
            }],
            tooltip: {
                split: true,
                valueSuffix: ''
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666',
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'Cumulative Audio Completion',
                color: '#DCDCDC',
                type: "area",
                data: dataa.temp.cumulative_audio_completion
            }, {
                name: 'Audio Completion',
                color: '#00a651',
                yAxis: 0,

                data: dataa.temp.number_of_audios_compelted
            }]
        });
    });


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/Weekly_power_users_having_streaks/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa[0].bar, "data")





        Highcharts.chart('container7', {
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false,
            },
            title: {
                text: 'Streaks by Weekly User'

            },
            colors: ['#8ae02b', '#00a651'],
            xAxis: {
                categories: dataa[0].STREAK
            },
            yAxis: {
                lineWidth: 1,
                min: 0,
                title: {
                    text: 'User Count'
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
                    name: 'Number of Streaks Home',
                    data: dataa[0].number_of_streaks_Home
                },

                {

                    name: 'Number of Streaks Classroom',
                    data: dataa[0].number_of_streaks_classroom
                }
            ]
        });
    });

}


function cards2(URL) {
    var dated = document.getElementById("stardate").innerText;
    var mainURL = URL + '/' + dated;
    $('#next4').empty();
    console.log(mainURL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic2(mainURL)

}

var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/chartdesc',
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    console.log("this is jira");
    $('#jira').text(dataa.bounce);
    $('#jirac').text(dataa.avgtime);
    $('#jirae').text(dataa.New);
    $('#App_Uninstall').text(dataa.App_Uninstall);
    $('#Crashes').text(dataa.Crashes);
    $('#App_exception').text(dataa.App_exception);
    $('#users_impacted').text(dataa.users_impacted);
    $('#payment_decrease').text(dataa.payment_decrease);

});
// INCLUDE JQUERY & JQUERY UI 1.12.1
$(function() {
    $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        duration: "fast"
    });
});

function giveDate() {
    var a = document.getElementById("datepicker").value;;
    alert(a);
}






function createDynamic3(url) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        success: function() {
            var gif = document.getElementById("gif");
            gif.style.display = "none";
        },
    }
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);

        $('#next4').prepend('<table class="display" id = "dataTable4" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE DATE</th><th>PROGRAM NAME</th><th>AUDIO DAY</th><th>MINDFUL MINUTES</th><th>AUDIO COMPLETION PERCENTAGE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv3(datain);

            $("#dataTable4").append(resultDiv);




        }
        //$('#dataTable41').append('</tbody></table>');
        $('#dataTable4').append('</tbody></table>');
        dataTab2();



        $('#next41').prepend('<table class="display" id = "dataTable41" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE DATE</th><th>PROGRAM NAME</th><th>AUDIO DAY</th><th>MINDFUL MINUTES</th><th>AUDIO COMPLETION PERCENTAGE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];

            var resultDiv = createDynamicDiv3(datain);
            $("#dataTable41").append(resultDiv);
        }


        $('#dataTable41').append('</tbody></table>');
    })
}




function createDynamicDiv3(userList) {
    var dynamicDiv = '';
    console.log(userList)




    dynamicDiv += '<tr >' +
        '<td>' + userList[0] + '</td>' +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td style="font-size: 12px;font-weight: 900;">' + userList[4] + '</td>' +
        '<td >' + userList[5] + '</td>' +
        '<td>' + userList[6] + '</td>' +
        '<td>' + userList[7] + '</td>' +

        '</tr>'


    return dynamicDiv;
}

function createDynamic(url) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        success: function() {
            var gif = document.getElementById("gif");
            gif.style.display = "none";
        },
    }
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);

        $('#next4').prepend('<table class="display" id = "dataTable4" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PROGRAM NAME</th><th>COMMENT</th><th>CREATED DATE</th><th>RATING</th><th>LANGUAGE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable4").append(resultDiv);




        }
        //$('#dataTable41').append('</tbody></table>');
        $('#dataTable4').append('</tbody></table>');
        dataTab2();



        $('#next41').prepend('<table class="display" id = "dataTable41" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PROGRAM NAME</th><th>COMMENT</th><th>CREATED DATE</th><th>RATING</th><th>LANGUAGE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];

            var resultDiv = createDynamicDiv(datain);
            $("#dataTable41").append(resultDiv);
        }


        $('#dataTable41').append('</tbody></table>');
    })
}



function createDynamicDiv(userList) {
    var dynamicDiv = '';
    console.log(userList)




    dynamicDiv += '<tr >' +
        '<td>' + userList[0] + '</td>' +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td style="font-size: 12px;font-weight: 900;">' + userList[4] + '</td>' +
        '<td >' + userList[5] + '</td>' +
        '<td>' + userList[6] + '</td>' +
        '<td>' + userList[7] + '</td>' +

        '</tr>'


    return dynamicDiv;
}

function createDynamic2(url) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        success: function() {
            var gif = document.getElementById("gif");
            gif.style.display = "none";
        },

    }
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);

        $('#next4').prepend('<table class="display" id = "dataTable4" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>COUNTRY</th><th>STATE</th><th>CITY</th><th>PROGRAM NAME</th></tr ></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv2(datain);

            $("#dataTable4").append(resultDiv);




        }
        //$('#dataTable41').append('</tbody></table>');
        $('#dataTable4').append('</tbody></table>');
        dataTab2();



        $('#next41').prepend('<table class="display" id = "dataTable41" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>COUNTRY</th><th>STATE</th><th>CITY</th><th>PROGRAM NAME</th></tr ></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];

            var resultDiv = createDynamicDiv2(datain);
            $("#dataTable41").append(resultDiv);
        }


        $('#dataTable41').append('</tbody></table>');
    })
}

function dataTab2() {

    $("#dataTable4").DataTable({
        "pageLength": 50
    });

}


function createDynamicDiv2(userList) {
    var dynamicDiv = '';
    console.log(userList)




    dynamicDiv += '<tr >' +
        '<td>' + userList[0] + '</td>' +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td>' + userList[4] + '</td>' +
        '<td>' + userList[5] + '</td>' +
        '<td>' + userList[6] + '</td>' +
        '<td>' + userList[7] + '</td>' +
        '<td>' + userList[8] + '</td>' +
        '<td>' + userList[9] + '</td>' +

        '</tr>'


    return dynamicDiv;
}

function cardscount(a) {
    var settings = {
        async: true,
        crossDomain: true,
        url: "/playback_cards_week/" + a,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);

        var c = parseInt(dataa.totalchange[0]);

        if (c === 1) {
            console.log("hello2")
            document.getElementById("updownpractotal").style.color = "green";
        } else if (c === -1) {
            console.log("h2i")
            document.getElementById("updownpractotal").style.color = "#ff0000";
        } else {
            document.getElementById("updownpractotal").style.color = "grey";
        }

        var t = parseInt(dataa.parentschange[0]);

        if (t === 1) {
            console.log("hello2")
            document.getElementById("updownpracp").style.color = "green";
        } else if (t === -1) {
            console.log("h2i")
            document.getElementById("updownpracp").style.color = "#ff0000";
        } else {
            document.getElementById("updownpracp").style.color = "grey";
        }
        var v = parseInt(dataa.teacherschange[0]);

        if (v === 1) {
            console.log("hello2")
            document.getElementById("updownpract").style.color = "green";
        } else if (v === -1) {
            console.log("h2i")
            document.getElementById("updownpract").style.color = "#ff0000";
        } else {
            document.getElementById("updownpract").style.color = "grey";
        }
        $("#updownpractotal").text(parseFloat(dataa.total_percentage_change[0]).toFixed(0) + "%");
        $("#updownpracp").text(parseFloat(dataa.parents_percentage_change[0]).toFixed(0) + "%");
        $("#updownpract").text(parseFloat(dataa.teachers_percentage_change[0]).toFixed(0) + "%");
        $("#usercount").text(dataa.total_playback_last_week[0]);
        $("#neverlogged").text(dataa.teachers_playback_last_week[0]);
        $("#totalstudent").text(dataa.parents_playback_last_week[0]);

    });
    var settings = {
        async: true,
        crossDomain: true,
        url: "/SIGNUPS_WEEK/" + a,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        var c = parseInt(dataa.totalchanged[0]);

        if (c === 1) {
            console.log("hello2")
            document.getElementById("updownsigntotal").style.color = "green";
        } else if (c === -1) {
            console.log("h2i")
            document.getElementById("updownsigntotal").style.color = "#ff0000";
        } else {
            document.getElementById("updownsigntotal").style.color = "grey";
        }


        var t = parseInt(dataa.teacherschanged[0]);


        if (t === 1) {
            console.log("hello2")
            document.getElementById("updownsignp").style.color = "green";
        } else if (t === -1) {
            console.log("h2i")
            document.getElementById("updownsignp").style.color = "#ff0000";
        } else {
            document.getElementById("updownsignp").style.color = "grey";
        }
        var v = parseInt(dataa.parentschanged[0]);

        if (v === 1) {
            console.log("hello2 sarthka")
            document.getElementById("updownsignteacher").style.color = "green";
        } else if (v === -1) {
            console.log("h2icm dc")
            document.getElementById("updownsignteacher").style.color = "#ff0000";
        } else {
            document.getElementById("updownsignteacher").style.color = "grey";
        }
        $("#updownsigntotal").text(parseFloat(dataa.total_percentage_change[0]).toFixed(0) + "%");
        $("#updownsignteacher").text(parseFloat(dataa.parents_percentage_change[0]).toFixed(0) + "%");
        $("#updownsignp").text(parseFloat(dataa.teachers_percentage_change[0]).toFixed(0) + "%");
        $("#usercount1").text(dataa.total_signup_last_week[0]);
        $("#neverlogged1").text(dataa.parents_signup_last_week[0]);
        $("#totalstudent1").text(dataa.teachers_signup_last_week[0]);
    });
    var settings = {
        async: true,
        crossDomain: true,
        url: "/weeklyfeedcard/" + a,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);

        var c = parseInt(dataa.Average_FEEDBACK_Rating_change[0]);

        if (c === 1) {
            console.log("hello2")
            document.getElementById("updownfbtotal").style.color = "green";
        } else if (c === -1) {
            console.log("h2i")
            document.getElementById("updownfbtotal").style.color = "#ff0000";
        } else {
            document.getElementById("updownfbtotal").style.color = "grey";
        }


        var t = parseInt(dataa.PARENT_Comment_per_feedbackchange[0]);

        if (t === 1) {
            console.log("hello2")
            document.getElementById("updownfbcomment").style.color = "green";
        } else if (t === -1) {
            console.log("h2i")
            document.getElementById("updownfbcomment").style.color = "#ff0000";
        } else {
            document.getElementById("updownfbcomment").style.color = "grey";
        }
        var v = parseInt(dataa.TEACHER_Comment_per_feedbackchange[0]);

        if (v === 1) {
            console.log("hello2")
            document.getElementById("updownfbper").style.color = "green";
        } else if (v === -1) {
            console.log("h2i")
            document.getElementById("updownfbper").style.color = "#ff0000";
        } else {
            document.getElementById("updownfbper").style.color = "grey";
        }


        $("#updownfbtotal").text(parseFloat(dataa.Average_feedback_PERCENTAGE[0]).toFixed(0) + "%");
        $("#updownfbcomment").text(parseFloat(dataa.parent_PERCENTAGE_change[0]).toFixed(0) + "%");
        $("#updownfbper").text(parseFloat(dataa.teacher_PERCENTAGE_change[0]).toFixed(0) + "%");
        $("#avgfb").text(dataa.Average_Rating_lastweek[0]);
        $("#comments").text(dataa.PARENT_FEEDBACK_RATING_LAST_WEEK[0]);
        $("#comments2").text(dataa.TEACHER_FEEDBACK_RATING_LAST_WEEK[0]);
        // $("#fbp").text(parseFloat(dataa.Low_star_rating_lastweek[0]).toFixed(1));
        // $("#fbp2").text(parseFloat(dataa.avg_ratings_week_befforelastweek[0]).toFixed(1));
    });
}

function cards(URL) {
    var dated = document.getElementById("stardate").innerText;
    var mainURL = URL + '/' + dated;
    $('#next4').empty();
    console.log(mainURL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic(mainURL)
    showTabTablecards()
}

function cards2(URL) {
    var dated = document.getElementById("stardate").innerText;
    var mainURL = URL + '/' + dated;
    $('#next4').empty();
    console.log(mainURL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic2(mainURL)
    showTabTablecards()
}

function cards3(URL) {
    var dated = document.getElementById("stardate").innerText;
    var mainURL = URL + '/' + dated;
    $('#next4').empty();
    console.log(mainURL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic3(mainURL)
    showTabTablecards()
}

function showTabTablecards() {
    document.getElementById('admin').style.display = "block";
    document.getElementById('exTab1').style.display = "none";

    console.log('cardstable');
}
