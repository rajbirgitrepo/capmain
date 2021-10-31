function myFunction() {
    var input, filter, cards, cardContainer, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myProducts2");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}


createboxes();

function createboxes() {
    var settings = {
        async: true,
        crossDomain: true,
        url: '/districtlogoupdates',
        method: "GET"
    };
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);
        console.log("datain");
        for (var i = 0; i < data1.data.length; i++) {
            var datain = data1.data[i];
            console.log(datain);
            var resultDiv = createDynamicDivcards(datain);
            $("#myProducts2").append(resultDiv);
        }
    })
}

function createDynamicDivcards(userList) {
    var dynamicDiv = '';
    console.log(userList)




    dynamicDiv += '<div class="col-md-2 card" style="border: none !important;"><div class=" portalBox" ><div class=" d-sm-flex justify-content-sm-between align-items-sm-center"><div class=" card-title text-s"><div onclick="distselect(\'' + userList[0] + '\'),imgd(\'' + userList[3] + '\')" class="box-outer-nw" style="color: #797979;border-radius: 20px;" onclick="mind()"><img src="' + userList[3] + '" class="img-responsive card_img"  alt="School"><p class="text-s" style="border-radius: 20px;background-color: #fafafa;">' + userList[1] + '</p></div></div></div></div></div>'


    return dynamicDiv;
}
//imgd('5');

function imgd(a) {
    console.log("iamge", a);
    $("#imgdis").empty();
    $("#imgdis").append('<img src=' + a + '  class="img-responsive" alt="School" style="color: #797979; width: 100%;">');
}

function charts(a) {
    $("#container21").empty();
    $("#container22").empty();
    $("#container1").empty();
    $("#container2").empty();
    $("#container3").empty();
    $("#container4").empty();
    // anychart.onDocumentReady(function() {
    //     // The data used in this sample can be obtained from the CDN
    //     // https://cdn.anychart.com/samples/heat-map-charts/heat-map-with-scroll/data.json
    //     anychart.data.loadJsonFile('/districtescore/' + a,
    //         function(data) {
    //             // Creates Heat Map
    //             var chart = anychart.heatMap(data.chart1);
    //             // var labels = chart.xAxis().labels();
    //             // labels.enabled(false);
    //             chart.xAxis().labels().width(80);
    //             chart.xAxis().labels().height(90);
    //             chart.tooltip().format("{%y}: {%heat}");
    //             var colorScale = anychart.scales.ordinalColor();
    //             colorScale.colors(['#FF8C00', '#d6ff6e', '#8ae02b', '#00a651']);
    //             colorScale.ranges([
    //                 { from: 0, to: 25 },
    //                 { from: 25, to: 50 },
    //                 { from: 50, to: 75 },
    //                 { from: 75, to: 100 }
    //             ]);

    //             chart.colorScale(colorScale);
    //             // Sets colorScale


    //             // Sets chart title
    //             chart
    //                 .title()
    //                 .enabled(true)
    //                 .text('E-SCORE')
    //                 .padding([0, 0, 20, 0]);

    //             // Sets chart labels
    //             chart.labels().enabled(true).format('{%Heat}');

    //             // Sets Scrolls for Axes
    //             chart.xScroller(true);
    //             chart.yScroller(true);


    //             // Sets starting zoom for Axes
    //             chart.xZoom().setToPointsCount(8);
    //             chart.yZoom().setToPointsCount(15);

    //             // Sets chart and hover chart settings
    //             chart.stroke('#fff');
    //             chart
    //                 .hovered()
    //                 .stroke('2 #fff')
    //                 .fill('#545f69')
    //                 .labels({ fontColor: '#fff' });

    //             // Sets legend
    //             chart
    //                 .legend()
    //                 .enabled(true)
    //                 .align('center')
    //                 .position('center-bottom')
    //                 .itemsLayout('horizontal')
    //                 .padding([10, 0, 0, 0]);

    //             // set container id for the chart
    //             chart.container('container');
    //             // initiate chart drawing
    //             chart.draw();
    //         }
    //     );
    // });

    var settings = {
        async: true,
        crossDomain: true,
        url: "/escores/" + a,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa);
        $(function() {
            $("#container21").highcharts({
                chart: {
                    //   zoomType: "xy",
                    type: "column"
                },
                title: {
                    text: "E-Score",
                },
                colors: ['#02A45A'],
                xAxis: [{
                    categories: dataa.columchart.axis,
                    labels: {
                        rotation: 0,
                    },
                    title: {
                        text: "E-SCORE RANGE",
                        style: {
                            color: "#000",
                        },
                    },
                }, ],
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
                        text: "SCHOOL COUNT",
                        style: {
                            color: "#000",
                        },
                    },
                }, ],
                tooltip: {
                    shared: true,
                },
                plotOptions: {
                    borderWidth: 2,
                    series: {
                        point: {
                            events: {
                                click: function() {
                                    URL = "/escores/" + a + "/" + this.category;
                                    $('#next').empty();
                                    console.log(URL);
                                    var modal2 = document.getElementById("myModal2");
                                    modal2.style.display = "block";
                                    var gif = document.getElementById("gif");
                                    gif.style.display = "block";
                                    $('#btnExport').show();
                                    createDynamic(URL);
                                },
                            },
                        },
                    },
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                series: [{
                    name: 'School Count',
                    maxPointWidth: 40,
                    data: dataa.columchart.schoolcount
                }, ],
            });
        });
    });
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/escoresnew/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        var c = dataa.mothwise_col_chart.monthvalues_escore.map(Number);
        var p = dataa.mothwise_col_chart.monthvalues_active_user_score.map(Number);
        var e = dataa.mothwise_col_chart.monthvalues_cwp_score.map(Number);
        var g = dataa.mothwise_col_chart.monthvalues_active_school_score.map(Number);
        var h = dataa.mothwise_col_chart.monthvalues_re_score.map(Number);



        $(function() {
            $("#container22").highcharts({
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: "E-score Trend"
                },
                credits: {
                    enabled: false,
                },
                xAxis: [{
                    categories: dataa.mothwise_col_chart.months,
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
                        text: 'Count',
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
                        name: "E-score",
                        color: '#02A45A',
                        type: 'column',
                        yAxis: 0,
                        maxPointWidth: 60,
                        data: c,

                    },
                    {
                        name: "Active User",
                        color: '#FF9933',
                        type: 'line',
                        yAxis: 0,
                        maxPointWidth: 60,
                        data: p,

                    },
                    {
                        name: "CWP Score",
                        color: '#8AE02B',
                        type: 'line',
                        yAxis: 0,
                        maxPointWidth: 60,
                        data: e,

                    },
                    {
                        name: "Active School",
                        color: '#8AE02B',
                        type: 'line',
                        yAxis: 0,
                        maxPointWidth: 60,
                        data: g,

                    },
                    {
                        name: "Re-score",
                        color: '#FFFF00',
                        type: 'line',
                        yAxis: 0,
                        maxPointWidth: 60,
                        data: h,

                    },
                ]
            });
        });

    });

    anychart.onDocumentReady(function() {
        // The data used in this sample can be obtained from the CDN
        // https://cdn.anychart.com/samples/heat-map-charts/heat-map-with-scroll/data.json
        anychart.data.loadJsonFile('/districtescore/' + a,
            function(data) {
                // Creates Heat Map
                var chart = anychart.heatMap(data.chart2);
                // var labels = chart.xAxis().labels();
                // labels.enabled(false);
                chart.xAxis().labels().width(80);
                chart.xAxis().labels().height(90);
                chart.tooltip().format("{%y}: {%heat}");
                var colorScale = anychart.scales.ordinalColor();
                colorScale.colors(['#FF8C00', '#d6ff6e', '#8ae02b', '#00a651']);
                colorScale.ranges([
                    { from: 0, to: 25 },
                    { from: 25, to: 50 },
                    { from: 50, to: 75 },
                    { from: 75, to: 100 }
                ]);

                chart.colorScale(colorScale);
                // Sets colorScale


                // Sets chart title
                chart
                    .title()
                    .enabled(true)
                    .text('E-SCORE')
                    .padding([0, 0, 20, 0]);

                // Sets chart labels
                chart.labels().enabled(true).format('{%Heat}');

                // Sets Scrolls for Axes
                chart.xScroller(true);
                chart.yScroller(true);


                // Sets starting zoom for Axes
                chart.xZoom().setToPointsCount(8);
                chart.yZoom().setToPointsCount(6);

                // Sets chart and hover chart settings
                chart.stroke('#fff');
                chart
                    .hovered()
                    .stroke('2 #fff')
                    .fill('#545f69')
                    .labels({ fontColor: '#fff' });

                // Sets legend
                chart
                    .legend()
                    .enabled(true)
                    .align('center')
                    .position('center-bottom')
                    .itemsLayout('horizontal')
                    .padding([20, 0, 0, 0]);

                // set container id for the chart
                chart.container('container1');
                // initiate chart drawing
                chart.draw();
            }
        );
    });




    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/escoreinsites/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var data = JSON.parse(response);
        var chart = anychart.heatMap(data);
        // var labels = chart.xAxis().labels();
        // labels.enabled(false);
        chart.xAxis().labels().width(80);
        chart.xAxis().labels().height(90);
        chart.tooltip().format("{%y}: {%heat}");
        var colorScale = anychart.scales.ordinalColor();
        colorScale.colors(['#FF8C00', '#d6ff6e', '#8ae02b', '#00a651']);
        colorScale.ranges([
            { from: 0, to: 25 },
            { from: 25, to: 50 },
            { from: 50, to: 75 },
            { from: 75, to: 100 }
        ]);

        chart.colorScale(colorScale);
        // Sets colorScale


        // Sets chart title
        chart
            .title()
            .enabled(true)
            .text('E-SCORE LAUSD')
            .padding([0, 0, 20, 0]);

        // Sets chart labels
        chart.labels().enabled(true).format('{%Heat}');

        // Sets Scrolls for Axes
        chart.xScroller(true);
        chart.yScroller(true);


        // Sets starting zoom for Axes
        chart.xZoom().setToPointsCount(8);
        chart.yZoom().setToPointsCount(6);

        // Sets chart and hover chart settings
        chart.stroke('#fff');
        chart
            .hovered()
            .stroke('2 #fff')
            .fill('#545f69')
            .labels({ fontColor: '#fff' });

        // Sets legend
        chart
            .legend()
            .enabled(true)
            .align('center')
            .position('center-bottom')
            .itemsLayout('horizontal')
            .padding([20, 0, 0, 0]);

        // set container id for the chart
        chart.container('container2');
        // initiate chart drawing
        chart.draw();

    });



    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/escorepolar/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var data = JSON.parse(response);
        anychart.onDocumentReady(function() {
            palette = ['#FF8C00', '#d6ff6e', '#8ae02b', '#00a651']
                // create polar chart
            var chart = anychart.polar();

            // create data set on our data
            var chartData = {
                title: '',
                header: ['#', 'Active Users', 'Active Usage', 'Recent Engagement', 'Consistent Weekly Practice'],
                rows: data.data
            };
            chart.palette(palette);
            // sort data by X
            chart
                .sortPointsByX(true)
                // set series type
                .defaultSeriesType('column')
                // disable y-axis
                .yAxis(false)
                // set x-scale
                .xScale('ordinal');

            // set chart data
            chart.data(chartData);

            // set legend settings
            chart.legend().enabled(true).position('center-bottom');
            // set title margin
            chart.title().margin().bottom(20);

            // set stack mod
            chart.yScale().stackMode('value');

            // set tooltip settings
            chart.tooltip().valuePostfix('%');

            // set chart container id
            chart.container('container3');
            // initiate chart drawing
            chart.draw();
        });
    });




    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/escorestack/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var data = JSON.parse(response);

        Highcharts.chart('container4', {
            chart: {
                type: 'column'
            },
            title: { text: "Escore Monthly" },
            colors: ['#FF8C00', '#d6ff6e', '#8ae02b', '#00a651', '#006400'],
            credits: { enabled: false },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: [{
                lineWidth: 1,
                title: {
                    text: 'Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'District Engagement Score'
                }
            }],
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                }
            },
            series: [{
                name: 'Active Users',
                data: data.active_user,
                stack: 0
            }, {
                name: 'Active Usages',
                data: data.Active_Usage,
                stack: 0
            }, {
                name: 'Recent Engagement',
                data: data.Recent_Engagement,
                stack: 0
            }, {
                name: 'Consistent Weekly Practice',
                data: data.Consistent_Weekly_Practice,
                stack: 0
            }, {
                type: "line",
                name: 'District Engagement Score',
                data: data.District_Engagement_Score,
                stack: 0,
                yAxis: 1
            }]
        });
    });




}

var modal = document.getElementById("myModal");

function cose() {
    modal.style.display = "none";
}

function createDynamic(url) {
    var settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: "GET",
        success: function() {
            var gif = document.getElementById("gif");
            gif.style.display = "none";
        },
    };
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);

        $("#next").prepend(
            '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>ACTIVE USER SCORE</th><th>USAGE SCORE</th><th>CWP SCORE</th><th>RE-SCORE</th><th>E-SCORE</th></tr ></thead ><tbody>'
        );
        for (var i = 0; i < data1.data.length; i++) {
            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);
        }
        //$('#dataTable1').append('</tbody></table>');
        $("#dataTable").append("</tbody></table>");
        dataTab();

        $("#next1").prepend(
            '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>ACTIVE USER SCORE</th><th>USAGE SCORE</th><th>CWP SCORE</th><th>RE-SCORE</th><th>E-SCORE</th></tr ></thead ><tbody>'
        );
        for (var i = 0; i < data1.data.length; i++) {
            var datain = data1.data[i];

            var resultDiv = createDynamicDiv(datain);
            $("#dataTable1").append(resultDiv);
        }
        $("#dataTable1").append("</tbody></table>");
    });
}

function dataTab() {
    $("#dataTable").DataTable({
        pageLength: 50,
    });
}

function modal2() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function createDynamicDiv(userList) {
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
        "<td>" +
        userList[4] +
        "</td>" +
        "<td>" +
        userList[5] +
        "</td>" +
        "</tr>";

    return dynamicDiv;
}


function createDynamic2(url) {
    var settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: "GET",
        success: function() {
            var gif = document.getElementById("gif");
            gif.style.display = "none";
        },
    };
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);

        $("#next").prepend(
            '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>ACTIVE USER SCORE</th><th>USAGE SCORE</th><th>CWP SCORE</th><th>RE-SCORE</th><th>E-SCORE</th></tr ></thead ><tbody>'
        );
        for (var i = 0; i < data1.data.length; i++) {
            var datain = data1.data[i];
            var resultDiv = createDynamicDiv2(datain);

            $("#dataTable").append(resultDiv);
        }
        //$('#dataTable1').append('</tbody></table>');
        $("#dataTable").append("</tbody></table>");
        dataTab();

        $("#next1").prepend(
            '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>ACTIVE USER SCORE</th><th>USAGE SCORE</th><th>CWP SCORE</th><th>RE-SCORE</th><th>E-SCORE</th></tr ></thead ><tbody>'
        );
        for (var i = 0; i < data1.data.length; i++) {
            var datain = data1.data[i];

            var resultDiv = createDynamicDiv2(datain);
            $("#dataTable1").append(resultDiv);
        }
        $("#dataTable1").append("</tbody></table>");
    });
}

function dataTab() {
    $("#dataTable").DataTable({
        pageLength: 50,
    });
}

function createDynamicDiv2(userList) {
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
        "<td>" +
        userList[4] +
        "</td>" +
        "<td>" +
        userList[5] +
        "</td>" +
        "</tr>";

    return dynamicDiv;
}







function cards(URL) {
    let textContent = document.getElementById('disdetails').innerText;
    var c = document.getElementById("stardate").innerText;
    var b = document.getElementById("finaldate").innerText;
    var a = URL + textContent + "/" + c + "/" + b;
    $('#next').empty();
    console.log(a);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;height:65px !important;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic(a);
}

function cards2(URL) {
    let textContent = document.getElementById('disdetails').innerText;
    var c = document.getElementById("stardate").innerText;
    var b = document.getElementById("finaldate").innerText;
    var a = URL + textContent + "/" + c + "/" + b;
    $('#next').empty();
    console.log(a);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;height:65px !important;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic2(a);
}
distselect('5f2609807a1c0000950bb471');

function distselect(distid) {
    $("#districtid1").empty();
    $("#school").empty();
    $("#teacher").empty();
    $("#login").empty();
    $("#practice").empty();
    $("#family").empty();
    $("#myDiv").empty();
    $("#myDiv2").empty();
    $("#Districtid").empty();
    $("#disdetails").text(distid);
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    console.log(distid)
    cardcount(distid);
    charts(distid);
    // bubble(distid);
    // bubble2(distid);
    // idtype(distid,a,b);
}

function cardcount(id, a, b) {
    URL = "/escoresnew/" + id;
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log("counts are fnctioning");
        $("#school").empty()
        $("#teacher").empty()
        $("#login").empty()
        $("#practice").empty()
        $("#school").text(dataa.ACTIVE_USER_SCORE);
        $("#teacher").text(dataa.USAGE_SCORE);
        $("#practice").text(dataa.RE_SCORE);
        $("#family").text(dataa.CWP_SCORE);
        $("#districtid1").text(dataa.DISTRICT_NAME);
        $("#Districtid").text(dataa.E_SCORE);

    });
}