$(function() {
    $("#datepicker2").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "2018:2021",
        dateFormat: "yy-mm-dd",
        maxDate: new Date(),
        onSelect: function(dateText, inst) {
            $("#stardate1").text(dateText);
        }
    });
    var d = new Date();
    var currMonth = d.getMonth();
    var currYear = d.getFullYear();
    var currDate = d.getDate();
    var startDate = new Date(currYear, currMonth, currDate);
    $("#datepicker2").datepicker("setDate", startDate);
});

var d = new Date();
var currMonth = d.getMonth() + 1;
var currYear = d.getFullYear();
var currDate = d.getDate();

var startDate = new Date(currYear, currMonth, currDate);
console.log(startDate);
var e = "2021-10-01";
var f = currYear + "-" + currMonth + "-" + currDate;
//   charts(e,f);
// cardscount(e,f);
$("#stardate1").text(f);
//$("#finaldate").text(f);
$("#fromd").text(e);
$("#tod").text(f);


$('#program').change(function() {
    console.log("hello");
    var value = $(this).val();
    console.log(value);
    $("#p1").text(value);
});

$('#rating').change(function() {
    console.log("hellwwo");
    var value = $(this).val();
    console.log(value);
    $("#r1").text(value);
});

$("#r1").text("5");

sub1();

function sub1() {
    var a = document.getElementById("stardate1").innerText;
    var d = document.getElementById("r1").innerText;
    console.log(a, d);
    charts(a, d);
    // cardscount(a,b);
    $("#fromd").text(a);
    $("#tod").text(d);
}
var a = document.getElementById("stardate1").innerText;
var d = "05";
charts(a, d);

function charts(a, d) {
    var a = document.getElementById("stardate1").innerText;
    var d = document.getElementById("r1").innerText;
    console.log('/weekly_sentiment/' + a + "/" + d)
    URL = '/weekly_sentiment/' + a + "/" + d;

    createDynamic1(URL);


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": '/weekly_sentiment/' + a + "/" + d,
        "method": "GET",
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);

        $("#avgrate").text(dataa.avg_rating);


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

        var horizontalBarChart = new Chart(horizontalBarChartCanvas, {
            type: 'horizontalBar',
            data: {
                labels: dataa.label,
                datasets: [{
                    data: dataa.count,
                    backgroundColor: ["#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555"],
                }]
            },
            options: {
                tooltips: {
                    enabled: true
                },
                responsive: true,
                legend: {
                    display: false,
                    position: 'bottom',
                    fullWidth: true,
                    labels: {
                        boxWidth: 10,
                        padding: 50
                    }
                },
                scales: {
                    yAxes: [{
                        barPercentage: 0.75,
                        gridLines: {
                            display: true,
                            drawTicks: true,
                            drawOnChartArea: false
                        },
                        ticks: {
                            fontColor: '#555759',
                            fontFamily: 'Lato',
                            fontSize: 11
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                            drawTicks: false,
                            tickMarkLength: 5,
                            drawBorder: false
                        },
                        ticks: {
                            padding: 5,
                            beginAtZero: true,
                            fontColor: '#ffffff',
                            fontFamily: 'Lato',
                            fontSize: 11,
                            callback: function(label, index, labels) {
                                return label / 1000;
                            }

                        },
                        scaleLabel: {
                            display: true,
                            padding: 10,
                            fontFamily: 'Lato',
                            fontColor: '#555759',
                            fontSize: 16,
                            fontStyle: 700,
                            labelString: ''
                        },

                    }]
                }
            }
        });


        var chart = Highcharts.stockChart('containersent', {
            chart: {
                type: 'column'
            },

            title: {
                text: 'SENTIMENTS LINE CHART'
            },
            credits: false,
            xAxis: {
                minRange: 1
            },
            plotOptions: {
                series: {
                    point: {

                    }
                }
            },

            navigator: {
                series: {
                    color: '#00FF00',
                    animation: {
                        duration: 0,
                    }
                },
                xAxis: {
                    minRange: 1
                },


            },
            yAxis: [{
                lineWidth: 1,
                opposite: false,
                title: {
                    text: 'COMMENTS'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'COMMENTS'
                }
            }],

            series: [{
                color: '#01a451',
                type: "line",
                name: 'POSITIVE',
                data: dataa.positive, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }, {
                color: '#FF9933',
                name: 'NEGATIVE',
                type: 'line',
                yAxis: 1,
                data: dataa.negative, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });

        Highcharts.chart('containerpie', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                height: 400,
                width: 300,
                type: 'pie'
            },
            title: {
                text: 'SENTIMENTS PERCENTAGE',
            },
            tooltip: {
                pointFormat: '{series.name}: <br>{point.y}</>'
            },
            accessibility: {
                point: {
                    valueSuffix: ''
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
                        "#02A45A", "#03B761", "#05D36C", "#04C065", "#35D461",
                    ]
                }
            },
            credits: false,
            series: [{
                name: 'Sentiment',
                colorByPoint: true,
                data: [{ name: 'Positive', y: dataa.donut.pos, color: '#01a451' },
                    { name: 'Negative', y: dataa.donut.neg, color: '#FF9933' }
                ]
            }]
        });



    });


}









function createDynamic1(url) {
    var settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);

        $("#next4").prepend(
            '<p>Positive</p><table class="table table-striped custab table-fixed" id = "dataTable3" ><thead ><tr><th>SCHOOL NAME</th><th>STATE</th><th>CITY</th><th>USER NAME</th><th>EMAIL ID</th><th>COMMENT</th><th>AUDIO NAME</th><th>NARRATOR NAME</th><th>PROGRAM NAME</th><th>COMMENT DATE</th><th>LAST PLAYBACK DATE</th><th>PLAYBACK COUNT</th></tr ></thead ><tbody>'
        );
        for (var i = 0; i < data1.positivetable.length; i++) {
            var datain = data1.positivetable[i];
            var resultDiv = createDynamicDiv1(datain);

            $("#dataTable3").append(resultDiv);
        }
        //$('#dataTable2').append('</tbody></table>');
        $("#dataTable3").append("</tbody></table>");
        dataTab();

        $("#next1").prepend(
            '<table class="table table-striped custab table-fixed" id = "dataTable2"  ><thead ><tr><th>SCHOOL NAME</th><th>STATE</th><th>CITY</th><th>USER NAME</th><th>EMAIL ID</th><th>COMMENT</th><th>AUDIO NAME</th><th>NARRATOR NAME</th><th>PROGRAM NAME</th><th>COMMENT DATE</th><th>LAST PLAYBACK DATE</th><th>PLAYBACK COUNT</th></tr ></thead ><tbody>'
        );

        $("#next2").prepend(
            '<table class="table table-striped custab table-fixed" id = "dataTable2"  ><thead ><tr><th>SCHOOL NAME</th><th>STATE</th><th>CITY</th><th>USER NAME</th><th>EMAIL ID</th><th>COMMENT</th><th>AUDIO NAME</th><th>NARRATOR NAME</th><th>PROGRAM NAME</th><th>COMMENT DATE</th><th>LAST PLAYBACK DATE</th><th>PLAYBACK COUNT</th></tr ></thead ><tbody>'
        );
        for (var i = 0; i < data1.negtable.length; i++) {
            var datain1 = data1.negtable[i];

            var resultDiv = createDynamicDiv1(datain1);
            $("#dataTable2").append(resultDiv);
        }
        $("#dataTable2").append("</tbody></table>");
        for (var i = 0; i < data1.overalltable.length; i++) {
            var datain2 = data1.overalltable[i];

            var resultDiv = createDynamicDiv1(datain2);
            $("#dataTable2").append(resultDiv);
        }
        $("#dataTable2").append("</tbody></table>");

    });
}

function dataTab() {
    $("#dataTable3").DataTable({
        pageLength: 10,
    });
    $("#dataTable2").DataTable({
        pageLength: 10,
    });
    $("#dataTable2").DataTable({
        pageLength: 10,
    });
}

function createDynamicDiv1(userList) {
    var dynamicDiv = "";
    console.log(userList);

    dynamicDiv +=
        "<tr >" +
        "<td>" +
        userList[0] +
        "</td>" +
        "<td>" +
        userList[1] +
        "</td>" +
        "<td>" +
        userList[2] +
        "</td>" +
        "<td>" +
        userList[3] +
        "</td>" +
        "<td style='padding: 1px !important;'>" +
        userList[4] +
        "</td>" +
        "<td>" +
        userList[5] +
        "</td>" +
        "<td style='padding: 5px !important;'>" +
        userList[6] +
        "</td>" +
        "<td>" +
        userList[7] +
        "</td>" +
        "<td>" +
        userList[8] +
        "</td>" +
        "<td>" +
        userList[9] +
        "</td>" +
        "<td>" +
        userList[10] +
        "</td>" +
        "<td>" +
        userList[11] +
        "</td>" +
        "</tr>";

    return dynamicDiv;
}



function showTabTable(){
    document.getElementById('admin').style.display = "none";
    document.getElementById('exTab1').style.display = "block";
    // document.getElementById('tabtablemain').style.display = "block";
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    console.log('extab');
}