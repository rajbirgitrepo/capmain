$(document).ready(function(){
    var url = window.location.href;
    var dashboard_name = document.getElementById('AMS_dashboard').innerText;
    var user_email_id = document.getElementById('UserEmailId').innerText;
    console.log(url, dashboard_name, user_email_id);
    
    var settings = {
        url: "/cap_profile_tracking",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "dashboard_name": dashboard_name,
            "user_name": user_email_id,
            "url": url
        }),
        success: function() {
            console.log("Success")
        },
        error: function() {
            console.log("Error")
        }
    };
    $.ajax(settings).done(function(response) {
        console.log(response);
    });
});



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
                "color": "#40B5AD",
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
                "color": "#2E8B57",
                "data": dataa.data.Mindful_Michigan_Initiative,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Mindful Self Care For Students",
                "type": "column",
                "xAxis": 1,
                "color": "#93C572",
                "data": dataa.data.Mindful_Self_Care_For_Students,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Mindfulness Fosters Empathy And Compassion",
                "type": "column",
                "xAxis": 1,
                "color": "#4F7942",
                "data": dataa.data.Mindfulness_Fosters_Empathy_And_Compassion,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Respond Instead Of React With Daily Mindfulness",
                "type": "column",
                "xAxis": 1,
                "color": "#0FFF50",
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
                "color": "#90EE90",
                "data": dataa.data.Slow_Down_A_Busy_Schedule_With_Inner_Explorer,
                 dataGrouping: {
                        enabled: false,
                    }
            },
            {
                "name": "Start Today’s Practice With Inner Explorer Now!",
                "type": "column",
                "xAxis": 1,
                "color": "#228B22",
                "data": dataa.data.Start_Todays_Practice_With_Inner_Explorer_Now,
                 dataGrouping: {
                        enabled: false,
                    }
            },
            {
                "name": "Start Your Daily Mindfulness Practice With Inner Explorer",
                "type": "column",
                "xAxis": 1,
                "color": "#00A36C",
                "data": dataa.data.Start_Your_Daily_Mindfulness_Practice_With_Inner_Explorer,
                 dataGrouping: {
                        enabled: false,
                    }
            },
            {
                "name": "Your Inner Explorer Mindfulness Journey Is Ready Now!",
                "type": "column",
                "xAxis": 1,
                "color": "#50C878",
                "data": dataa.data.Your_Inner_Explorer_Mindfulness_Journey_Is_Ready_Now_,
                 dataGrouping: {
                        enabled: false,
                    }
            },
        ]
    });
});


playbackHistoryChart('Playback', 'Playback')
$("#playback_historyChart").val('Playback');
$(document).on('change', '#playback_historyChart', function() {
    $('#container2').empty();
    // console.log(this.value)
    if (this.value == 'Practice') {
        playbackHistoryChart(this.value, 'Practice');
    } else {
        playbackHistoryChart(this.value, 'Playback');
    }
});
function playbackHistoryChart(selectValue, t) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/AMS_Playback_HistoryAPI/" + selectValue,
        "method": "GET",
        success: function() {
            // console.log("Success");
        },
        error: function(){
            // console.log("Errors");
        }
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(dataa, 'Playback History'); 
        // $("#gifload").hide();
        chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'container2',
                zoomType: 'x'
            },
            title: {
                text: t + " History",
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
                    "data": dataa.Practice_Count,
                    dataGrouping: {
                        enabled: false,
                    }
                },
                {
                    "name": "Cumulative Practice Count",
                    "type": "line",
                    "color": "#FF9933",
                    "xAxis": 0,
                    "data": dataa.Practice_Count_Cumsum,
                    dataGrouping: {
                        enabled: false,
                    }
                },
            ]
        });
    });

}


var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/AMS_PurposeWise_EmailCount',
    "method": "GET"
}
$.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    // console.log(dataa, 'Purpose Wise Email Count');
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
            series: [
            {
                color: "#01A451",
                name: 'Email Count',
                data: dataa.TOTAL_EMAILS_SENT
            },
            {
                color: "#8AE02B",
                name: 'User Count',
                data: dataa.USER_COUNT
            },
            ],
        });
    });
});


var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/AMS_Login_HistoryAPI',
    "method": "GET"
}
$.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    chart = new Highcharts.StockChart({
        chart: {
            renderTo: 'container4',
            zoomType: 'x'
        },
        title: {
            text: 'Login History'
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
            pointFormatter: function(){
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
                "name": "Login User Count",
                "type": "column",
                "color": "#01A451",
                "xAxis": 0,
                "data": dataa.login_user_count,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Login Count",
                "type": "column",
                "color": "#8AE02B",
                "xAxis": 0,
                "data": dataa.login_count,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Cumulative Login User Count",
                "type": "line",
                "color": "#FF8300",
                "xAxis": 0,
                "data": dataa.usercount_cum_sum,
                dataGrouping: {
                    enabled: false,
                }
            },
            {
                "name": "Cumulative Login Count",
                "type": "line",
                "color": "#C35214",
                "xAxis": 0,
                "data": dataa.login_cum_sum,
                dataGrouping: {
                    enabled: false,
                }
            },
        ]
    });

});



// shows tables data when click on cards
function cards(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='https://cap.innerexplorer.org/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic(URL)
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

        $('#next').prepend('<table class="table table-striped custab table-fixed" id="dataTable"><thead><tr><th>PURPOSE</th><th>RECEIVER EMAIL</th><th>SENDER EMAIL</th><th>SIGNUP DATE</th></tr></thead><tbody>');

        for (var i = 0; i < data1.data.length; i++) {

            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);

        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();

        $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id="dataTable1"><thead><thead><tr><th>PURPOSE</th><th>RECEIVER EMAIL</th><th>SENDER EMAIL</th><th>SIGNUP DATE</th></tr></thead>><tbody>');
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
    // console.log(userList);

    dynamicDiv += '<tr >' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td>' + userList[4] + '</td>' +
        '<td>' + userList[6] + '</td>' +
        '</tr>'
    return dynamicDiv;
}


function card2(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='https://cap.innerexplorer.org/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic2(URL)
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

        $('#next').prepend('<table class="table table-striped custab table-fixed" id="dataTable"><thead><tr><th>USER NAME</th><th>EMAIL ID</th><th>SIGN UP DATE</th><th>SCHOOL_NAME</th><th>CITY</th><th>STATE</th><th>LAST PRACTICE DATE</th><th>PRACTICE COUNT</th><th>MINDFUL MINUTES</th></tr></thead><tbody>');

        for (var i = 0; i < data1.data.length; i++) {

            var datain = data1.data[i];
            var resultDiv = createDynamicDiv2(datain);

            $("#dataTable").append(resultDiv);

        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();

        $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id="dataTable1"><thead><tr><th>USER NAME</th><th>EMAIL ID</th><th>SIGN UP DATE</th><th>SCHOOL_NAME</th><th>CITY</th><th>STATE</th><th>LAST PRACTICE DATE</th><th>PRACTICE COUNT</th><th>MINDFUL MINUTES</th></tr></thead><tbody>');
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
    // console.log(userList);

    dynamicDiv += '<tr >' +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td>' + userList[4] + '</td>' +
        '<td>' + userList[5] + '</td>' +
        '<td>' + userList[6] + '</td>' +
        '<td>' + userList[8] + '</td>' +
        '<td>' + userList[9] + '</td>' +
        '<td>' + userList[10] + '</td>' +
        '</tr>'
    return dynamicDiv;
}


function card3(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='https://cap.innerexplorer.org/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic3(URL)
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

        $('#next').prepend('<table class="table table-striped custab table-fixed" id="dataTable"><thead><tr><th>USER NAME</th><th>EMAIL ID</th><th>SIGN UP DATE</th><th>SCHOOL_NAME</th><th>CITY</th><th>STATE</th><th>LAST PRACTICE DATE</th><th>PRACTICE COUNT</th><th>MINDFUL MINUTES</th></tr></thead><tbody>');

        for (var i = 0; i < data1.data.length; i++) {

            var datain = data1.data[i];
            var resultDiv = createDynamicDiv3(datain);

            $("#dataTable").append(resultDiv);

        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();

        $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id="dataTable1"><thead><tr><th>USER NAME</th><th>EMAIL ID</th><th>SIGN UP DATE</th><th>SCHOOL_NAME</th><th>CITY</th><th>STATE</th><th>LAST PRACTICE DATE</th><th>PRACTICE COUNT</th><th>MINDFUL MINUTES</th></tr></thead><tbody>');
        for (var i = 0; i < data1.data.length; i++) {

            var datain = data1.data[i];

            var resultDiv = createDynamicDiv3(datain);
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

function createDynamicDiv3(userList) {
    var dynamicDiv = '';
    // console.log(userList);

    dynamicDiv += '<tr >' +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td>' + userList[4] + '</td>' +
        '<td>' + userList[5] + '</td>' +
        '<td>' + userList[6] + '</td>' +
        '<td>' + userList[8] + '</td>' +
        '<td>' + userList[9] + '</td>' +
        '<td>' + userList[10] + '</td>' +
        '</tr>'
    return dynamicDiv;
}


