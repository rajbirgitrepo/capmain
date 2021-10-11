$(function() {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "2018:2021",
        dateFormat: "yy-mm-dd",
        maxDate: new Date(),
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
$("#dat").text(f);
$("#tod").text(f);
$("#stardate").text(f);

function cards2(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    var d = document.getElementById("stardate").innerText;
    createDynamic2(URL + '/' + d)

}


console.log("this is active");
var settings = {
    async: true,
    crossDomain: true,
    url: "/active_user_dild",
    method: "GET",
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    console.log(dataa);

    $("#active_users").text(dataa.data.active_users);
    $("#web_users").text(dataa.data.web_users);
    $("#home_users").text(dataa.data.home_users);
    $("#lms_users").text(dataa.data.lms_users);

});


function charts(a) {
    // INCLUDE JQUERY & JQUERY UI 1.12.1

    playbackTrendChart2('playback', 'Playback')
    $("#practice_topChart").val('playback');
    $(document).on('change', '#practice_topChart', function() {
        // $('#container10').empty();
        console.log(this.value)
        if (this.value == 'practice') {
            //document.getElementById('topdistrict').title = 'your new title';
            playbackTrendChart2(this.value, 'Practice')
        } else {
            playbackTrendChart2(this.value, 'Playback')
        }
    });

    function playbackTrendChart2(selectValue2, t) {

        var settings = {
            async: true,
            crossDomain: true,
            url: "/top_20_district_daily/" + a + "/" + selectValue2,
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
                        text: 'Top  Districts ' + t
                    },
                    xAxis: {
                        categories: dataa.district,
                        crosshair: false
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: t + ' Count'
                        }
                    },
                    legend: {
                        enabled: false,
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

                                        $('#next').empty();
                                        $('#next1').empty();

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
                        name: t + ' Count',
                        data: dataa.practice
                    }]
                });
            }


        );

    }

    var settings = {
        async: true,
        crossDomain: true,
        url: "/practicehistorychartlatest/",
        method: "GET",
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'container2',
                zoomType: 'x'
            },
            title: {
                text: ' Playbacks Per Minute'
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
                    // text: ' Count'
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
                    "name": "Last SY (2019 - 2020)",
                    "type": "line",
                    "color": "#FFFF00",
                    "xAxis": 0,
                    "data": dataa.data.lsy_to_lsy

                },
                {
                    "name": "Last SY",
                    "type": "line",
                    "color": "#FF9933",
                    "xAxis": 1,
                    "data": dataa.data.lsy
                },
                {
                    "name": "Family",
                    "type": "column",
                    "color": "#8AE02B",
                    "xAxis": 1,
                    "data": dataa.data.pcsy
                }, {
                    "name": "School",
                    "type": "column",
                    "xAxis": 1,
                    "color": "#01A451",
                    "data": dataa.data.csy
                },
                {
                    "name": "Clever",
                    "type": "column",
                    "xAxis": 1,
                    "color": "#4f1faf",
                    "data": dataa.data.clever
                },
                {
                    "name": "Scoology",
                    "type": "column",
                    "xAxis": 1,
                    "color": "#462cee",
                    "data": dataa.data.schoology
                }
            ]
        });
    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/Playback_Chart_daild",
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        var c = dataa.Playbacks.map(Number);
        //var d = dataa.yes.map(Number);


        $(function() {
            $("#container4").highcharts({
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: "Playback Chart"
                },
                xAxis: [{
                    categories: ['1hr', '2hr', '3hr', '4hr', '5hr', '6hr', '7hr', '8hr', '9hr', '10hr', '11hr', '12hr', '13hr', '14hr', '15hr', '16hr', '17hr', '18hr', '19hr', '20hr', '21hr', '22hr', '23hr', '24hr']
                }],
                yAxis: [{ //Primary yAxis
                    lineWidth: 1,
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#000'
                        }
                    },
                    legend: {
                        enabled: true,
                        itemStyle: {
                            fontSize: '10px',
                            fontWeight: '200',
                        }
                    },
                    title: {
                        text: 'Playback Count',
                        style: {
                            color: '#000'
                        }
                    }
                }, { //Secondary yAxis
                    title: {
                        text: '',
                        style: {
                            color: '#4572A7'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#4572A7'
                        }
                    },
                    opposite: false
                }],
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    borderWidth: 2,
                    series: {
                        point: {

                        }
                    }
                },
                series: [{
                    name: "Count",
                    color: '#FF9933',
                    type: 'line',
                    yAxis: 0,
                    data: c,
                    tooltip: {

                    }
                }, ]
            });
        });

        $("#SessionsU").append(dataa.totaly);
        $("#Downloads2").append(dataa.totalt);

    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/Feedback_Chart_daild",
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        var p = dataa.Rating.map(Number);
        //var d = dataa.yes.map(Number);


        $(function() {
            $("#container7").highcharts({
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: "Feedback Chart"
                },
                xAxis: [{
                    categories: ['1hr', '2hr', '3hr', '4hr', '5hr', '6hr', '7hr', '8hr', '9hr', '10hr', '11hr', '12hr', '13hr', '14hr', '15hr', '16hr', '17hr', '18hr', '19hr', '20hr', '21hr', '22hr', '23hr', '24hr']
                }],
                yAxis: [{ //Primary yAxis
                    lineWidth: 1,
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#000'
                        }
                    },
                    legend: {
                        enabled: true,
                        itemStyle: {
                            fontSize: '10px',
                            fontWeight: '200',
                        }
                    },
                    title: {
                        text: 'Playback Count',
                        style: {
                            color: '#000'
                        }
                    }
                }, { //Secondary yAxis
                    title: {
                        text: '',
                        style: {
                            color: '#4572A7'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#4572A7'
                        }
                    },
                    opposite: false
                }],
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    borderWidth: 2,
                    series: {
                        point: {

                        }
                    }
                },
                series: [{
                    name: 'Count',
                    color: '#FF9933',
                    type: 'line',
                    yAxis: 0,
                    data: p,
                    tooltip: {

                    }
                }, ]
            });
        });

        $("#SessionsU").append(dataa.totaly);
        $("#Downloads2").append(dataa.totalt);

    });

    var settings = {
        async: true,
        crossDomain: true,
        url: "/Sentiment_donut_dild",
        method: "GET",
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);

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
                text: 'Sentiment Percebtage CSY'
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
                        "#02A45A", "#ff9933"
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
                }, ]
            }]
        });
    });









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

        $('#next').prepend('<table class="display" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE DATE</th><th>PROGRAM NAME</th><th>AUDIO DAY</th><th>MINDFUL MINUTES</th><th>AUDIO COMPLETION PERCENTAGE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();



        $('#next1').prepend('<table class="display" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE DATE</th><th>PROGRAM NAME</th><th>AUDIO DAY</th><th>MINDFUL MINUTES</th><th>AUDIO COMPLETION PERCENTAGE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];

            var resultDiv = createDynamicDiv(datain);
            $("#dataTable1").append(resultDiv);
        }


        $('#dataTable1').append('</tbody></table>');
    })
}

function dataTab() {

    $("#dataTable").DataTable({
        "pageLength": 50
    });

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

        $('#next').prepend('<table class="display" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PROGRAM NAME</th><th>COMMENT</th><th>CREATED DATE</th><th>RATING</th><th>LANGUAGE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();



        $('#next1').prepend('<table class="display" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PROGRAM NAME</th><th>COMMENT</th><th>CREATED DATE</th><th>RATING</th><th>LANGUAGE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];

            var resultDiv = createDynamicDiv(datain);
            $("#dataTable1").append(resultDiv);
        }


        $('#dataTable1').append('</tbody></table>');
    })
}

function dataTab() {

    $("#dataTable").DataTable({
        "pageLength": 50
    });

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

        $('#next').prepend('<table class="display" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>COUNTRY</th><th>STATE</th><th>CITY</th><th>PROGRAM NAME</th></tr ></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv2(datain);

            $("#dataTable").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();



        $('#next1').prepend('<table class="display" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>COUNTRY</th><th>STATE</th><th>CITY</th><th>PROGRAM NAME</th></tr ></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];

            var resultDiv = createDynamicDiv2(datain);
            $("#dataTable1").append(resultDiv);
        }


        $('#dataTable1').append('</tbody></table>');
    })
}

function dataTab() {

    $("#dataTable").DataTable({
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

function createDynamic4(url) {

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

        $('#next').prepend('<table class="display" id = "dataTable1"><thead ><tr><th>Date</th><th>Login</th><th>Subscription Extend</th><th>Align Admin/Teacher</th><th>Forget Email</th><th>Others</th><th>Waiting For Customer</th><th>IE Team Raised</th></tr ></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv4(datain);

            $("#dataTable").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();



        $('#next1').prepend('<table class="display" id = "dataTable1" style="display:none" ><thead ><tr><th>Date</th><th>Login</th><th>Subscription Extend</th><th>Align Admin/Teacher</th><th>Forget Email</th><th>Others</th><th>Waiting For Customer</th><th>IE Team Raised</th></tr ></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];

            var resultDiv = createDynamicDiv4(datain);
            $("#dataTable1").append(resultDiv);
        }


        $('#dataTable1').append('</tbody></table>');
    })
}

function dataTab() {

    $("#dataTable").DataTable({
        "pageLength": 50
    });

}


function createDynamicDiv4(userList) {
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


        '</tr>'


    return dynamicDiv;
}

function cardscount(a) {

    // var settings = {
    //     async: true,
    //     crossDomain: true,
    //     url: "/active_user_dild",
    //     method: "GET",
    // };
    // $.ajax(settings).done(function(response) {
    //     var dataa = JSON.parse(response);
    //     console.log(dataa + "active web")
    //  var c = parseInt(dataa.totalchanged);

    // if (c === 1) {
    //     console.log("hello2")
    //     document.getElementById("updownsigntotal").style.color = "green";
    // } else if (c === -1) {
    //     console.log("h2i")
    //     document.getElementById("updownsigntotal").style.color = "#ff0000";
    // } else {
    //     document.getElementById("updownsigntotal").style.color = "grey";
    // }
    // var t = parseInt(dataa.teacherschanged[0]);

    // if (t === 1) {
    //     console.log("hello2")
    //     document.getElementById("updownsignp").style.color = "green";
    // } else if (t === -1) {
    //     console.log("h2i")
    //     document.getElementById("updownsignp").style.color = "#ff0000";
    // } else {
    //     document.getElementById("updownsignp").style.color = "grey";
    // }
    // var v = parseInt(dataa.parentschanged[0]);

    // if (v === 1) {
    //     console.log("hello2")
    //     document.getElementById("updownsignt").style.color = "green";
    // } else if (v === -1) {
    //     console.log("h2i")
    //     document.getElementById("updownsignt").style.color = "#ff0000";
    // } else {
    //     document.getElementById("updownsignt").style.color = "grey";
    // }
    // $("#updownsigntotal").text(parseFloat(dataa.Total_percentage_change[0]).toFixed(0) + "%");
    // $("#updownsignp").text(parseFloat(dataa.Teacher_percentage_change[0]).toFixed(0) + "%");
    // $("#updownsignt").text(parseFloat(dataa.parents_Percentage_Change[0]).toFixed(0) + "%");
    // $("#usercount1").text(dataa.data.active_users);
    // $("#usercount12").text(dataa.data.web_users);
    // $("#neverlogged1").text(dataa.data.home_users);
    // $("#totalstudent1").text(dataa.data.lms_users);
    // });

    var settings = {
        async: true,
        crossDomain: true,
        url: "/Signup_card_dild",
        method: "GET",
    };
    console.log(a);
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);


        var c = parseInt(dataa.TOTALCHANGE);

        if (c === 1) {
            console.log("hello2")
            document.getElementById("updownpractotal").style.color = "green";
        } else if (c === -1) {
            console.log("h2i")
            document.getElementById("updownpractotal").style.color = "#ff0000";
        } else {
            document.getElementById("updownpractotal").style.color = "grey";
        }

        var t = parseInt(dataa.PARENTSCHANGE);

        if (t === 1) {
            console.log("hello2")
            document.getElementById("updownpracp").style.color = "green";
        } else if (t === -1) {
            console.log("h2i")
            document.getElementById("updownpracp").style.color = "#ff0000";
        } else {
            document.getElementById("updownpracp").style.color = "grey";
        }
        var v = parseInt(dataa.TEACHERSCHANGE);

        if (v === 1) {
            console.log("hello2")
            document.getElementById("updownpract").style.color = "green";
        } else if (v === -1) {
            console.log("h2i")
            document.getElementById("updownpract").style.color = "#ff0000";
        } else {
            document.getElementById("updownpract").style.color = "grey";
        }
        $("#updownpractotal").text(parseFloat(dataa.Total_percentage_change[0]).toFixed(0) + "%");
        $("#updownpracp").text(parseFloat(dataa.Teacher_percentage_change[0]).toFixed(0) + "%");
        $("#updownpract").text(parseFloat(dataa.parents_Percentage_Change[0]).toFixed(0) + "%");
        $("#usercount").text(dataa.total_signup_yesterday);
        $("#neverlogged").text(dataa.parents_signup_yesterday);
        $("#totalstudent").text(dataa.teachers_signup_yesterday);

    });

    var settings = {
        async: true,
        crossDomain: true,
        url: "/jiratickets/",
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa);



        $("#jtickets").text(dataa.total_tickets);
        $("#jresolved").text(dataa.done);
        $("#jescalated").text(dataa.escalated);

    });

    var settings = {
        async: true,
        crossDomain: true,
        url: "/Playback_card_dild",
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);

        var c = parseInt(dataa.TOTAL_percentagechange[0]);

        if (c === 1) {
            console.log("hello2")
            document.getElementById("updownfbtotal").style.color = "green";
        } else if (c === -1) {
            console.log("h2i")
            document.getElementById("updownfbtotal").style.color = "#ff0000";
        } else {
            document.getElementById("updownfbtotal").style.color = "grey";
        }


        var t = parseInt(dataa.PARENT_percentagechange[0]);

        if (t === 1) {
            console.log("hello2")
            document.getElementById("updownfbcomment").style.color = "green";
        } else if (t === -1) {
            console.log("h2i")
            document.getElementById("updownfbcomment").style.color = "#ff0000";
        } else {
            document.getElementById("updownfbcomment").style.color = "grey";
        }
        var v = parseInt(dataa.TEACHER_percentagechange[0]);

        if (v === 1) {
            console.log("hello2")
            document.getElementById("updownfbper").style.color = "green";
        } else if (v === -1) {
            console.log("h2i")
            document.getElementById("updownfbper").style.color = "#ff0000";
        } else {
            document.getElementById("updownfbper").style.color = "grey";
        }


        $("#updownfbtotal").text(parseFloat(dataa.TOTALCHANGE[0]).toFixed(0) + "%");
        $("#updownfbcomment").text(parseFloat(dataa.PARENTSCHANGE[0]).toFixed(0) + "%");
        $("#updownfbper").text(parseFloat(dataa.TEACHERSCHANGE[0]).toFixed(0) + "%");
        $("#avgfb").text(dataa.total_playback_24hr);
        $("#comments").text(dataa.parents_playback_24hr);
        $("#comments2").text(dataa.teachers_playback_24hr);
    });


    console.log("this is average");
    var settings = {
        async: true,
        crossDomain: true,
        url: "/Feedback_card_dild",
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa);

        var c = parseInt(dataa.Average_feedback_PERCENTAGE[0]);

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


        $("#avg_feed").text(parseFloat(dataa.Average_feedback_PERCENTAGE[0]).toFixed(0) + "%");
        $("#avg_parents").text(parseFloat(dataa.parent_PERCENTAGE_change[0]).toFixed(0) + "%");
        $("#avg_teacher").text(parseFloat(dataa.teacher_PERCENTAGE_change[0]).toFixed(0) + "%");
        $('#average_rating').text(dataa.Average_Rating_lastweek); 
        $('#Parent_feedback').text(dataa.PARENT_FEEDBACK_RATING_BEFORE_LAST_WEEK);
        $('#Teacher_feedback').text(dataa.TEACHER_FEEDBACK_RATING_BEFORE_LAST_WEEK);

    });
}

function cards(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    var d = document.getElementById("stardate").innerText;
    createDynamic(URL + '/' + d)
}

function cards3(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    var d = document.getElementById("stardate").innerText;
    createDynamic3(URL + '/' + d)
}

function cards4(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    var d = document.getElementById("stardate").innerText;
    createDynamic4(URL + '/' + d)
}