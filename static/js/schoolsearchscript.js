let str = window.location.href;
// console.log(str.substr(str.lastIndexOf("?") + 1));
var urlid = str.substr(str.lastIndexOf("?") + 1);
document.getElementById('searchinput').value = '';
if (urlid == "http://127.0.0.1:5000/School_Search" || urlid == "http://127.0.0.1:5000/School_Search#" || urlid == "https://testcapxp.innerexplorer.org/School_Search" || urlid == "https://testcapxp.innerexplorer.org/School_Search#" || urlid == "https://cap.innerexplorer.org/School_Search" || urlid == "https://cap.innerexplorer.org/School_Search#") {
    // console.log("noID")
} else if (urlid !== '') {

    URL = "/schoolsearchid/" + urlid
    var Exportpage = "/schoolsearchid/" + urlid + "?export"
    // console.log(Exportpage)
    $("#exportLink").text(Exportpage);
    $("#schoolname").empty();
    $("#practice").empty();
    $("#container43").empty();
    $("#state").empty();
    $("#usercountse").empty();
    $("#adress").empty();
    $("#email").empty();
    $("#country").empty();
    $("#city").empty();
    $("#admin").empty();
    $("#ucount").empty();
    $("#pcount").empty();
    $("#mindfulness_minutes").empty();
    $("#LifeTimePlayback").empty();
    $("#MindLifetime").empty();
    $("#ratings").empty();
    $("#school").empty();
    $("#city").empty();
    $("#state").empty();
    $("#country").empty();
    $("#signup").empty();
    $("#renewal").empty();
    $("#status").empty();
    $("#output").empty();
    // console.log(URL);
    P(URL);
    escore(urlid);
    inviteLink(urlid);
    schoolIDCharts(urlid)
    historychart(urlid)
    schoolWeeklyChart(urlid)
    $("#next").empty();
    $("#next1").empty();
    $("#btnExport").show();
    createDynamic(URL);
} else {
    // console.log("nohref");
}

function createDynamic(url) {
    var settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);
        // console.log(url)

        $("#next").prepend(
            '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>USER EMAIL</th><th>SIGNUP DATE</th><th>LAST PLAYBACK DATE</th> <th>RENEWAL DATE</th> <th>PLAYBACK COUNT</th><th>PLAYBACK COUNT(CSY)</th></tr ></thead ><tbody>'
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
            '<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><th>USER NAME</th><th>USER EMAIL</th><th>SIGNUP DATE</th><th>LAST PLAYBACK DATE</th> <th>RENEWAL DATE</th> <th>PLAYBACK COUNT</th><th>PLAYBACK COUNT(CSY)</th></tr ></thead ><tbody>'
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

function createDynamicDiv(userList) {
    var dynamicDiv = "";
    // console.log(userList);

    dynamicDiv +=
        "<tr >" +
        "<td>" +
        userList[0] +
        "</td>" +
        '<td><a style="color: #00a651;cursor:pointer;" onclick="clickableTable(\'' + userList[1] + '\')">' + userList[1] +
        "</td></a>" +
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
        "<td>" +
        userList[6] +
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
    };
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);
        // console.log(data1);
        $("#next").prepend(
            '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>SIGNUP DATE</th><th>LAST PLAYBACK DATE</th><th>RENEWAL DATE</th> <th>PLAYBACK COUNT</th></tr ></thead ><tbody>'
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
            '<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>SIGNUP DATE</th><th>LAST PLAYBACK DATE</th> <th>RENEWAL DATE</th> <th>PLAYBACK COUNT</th></tr ></thead ><tbody>'
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
    // console.log(userList);

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
        "<td>" +
        userList[6] +
        "</td>" +
        "</tr>";

    return dynamicDiv;
}



function schoolsearch() {
    var a = document.getElementById("searchinputdescription").innerText;
    // console.log(a);
    if (a !== '') {
        
        URL = "/schoolsearchid/" + a
        var Exportpage = "/schoolsearchid/" + a + "?export"
        // console.log(Exportpage)
        $("#exportLink").text(Exportpage);
        $("#schoolname").empty();
        $("#practice").empty();
        $("#state").empty();
        $("#schoolDistrict").empty();
        $("#usercountse").empty();
        $("#container43").empty();
        $("#adress").empty();
        $("#email").empty();
        $("#country").empty();
        $("#city").empty();
        $("#admin").empty();
        $("#ucount").empty();
        $("#pcount").empty();
        $("#LifeTimePlayback").empty();
        $("#MindLifetime").empty();
        $("#mindfulness_minutes").empty();
        $("#ratings").empty();
        $("#school").empty();
        $("#city").empty();
        $("#state").empty();
        $("#schoolDistrict").empty();
        $("#country").empty();
        $("#signup").empty();
        $("#renewal").empty();
        $("#status").empty();
         $("#output").empty();
         $("#gifload").empty();
         $("#gifload").css("display", "block");
         $("#gifload").append('<div class="row gifloader-content"><div class="col-lg-4 mx-my-auto"><img src="/static/images/breath.gif" class="img-responsive" alt="loader"><p>Take a deep breath while we load your data</p></div></div>');
        // console.log(URL);
        P(URL);
        schoolIDCharts(a)
        escore(a);
        inviteLink(a);
        historychart(a)
        schoolWeeklyChart(a)
        $("#next").empty();
        $("#next1").empty();
        $("#btnExport").show();
        createDynamic(URL);
        $("#USAGE_SCORE").empty();
        $("#ACTIVE_USER_SCORE").empty();
        $("#CWP_SCORE").empty();
        $("#E_SCORE").empty();
        $("#RE_SCORE").empty();
        $("#searchinputdescription").empty();
    } else {
        var a = document.getElementById("searchinput").value;
        URL = "/schoolsearchid/" + a
        $("#schoolname").empty();
        $("#practice").empty();
        $("#state").empty();
        $("#schoolDistrict").empty();
        $("#container43").empty();
        $("#usercountse").empty();
        $("#adress").empty();
        $("#email").empty();
        $("#country").empty();
        $("#city").empty();
        $("#admin").empty();
        $("#ucount").empty();
        $("#pcount").empty();
        $("#mindfulness_minutes").empty();
        $("#ratings").empty();
        $("#school").empty();
        $("#city").empty();
        $("#state").empty();
        $("#schoolDistrict").empty();
        $("#country").empty();
        $("#signup").empty();
        $("#renewal").empty();
        $("#status").empty();
        $("#output").empty();
        // console.log(URL);
        P(URL);
        escore(a);
        inviteLink(a);
        schoolIDCharts(a)
        historychart(a)
        schoolWeeklyChart(a)
        $("#next").empty();
        $("#next1").empty();
        $("#btnExport").show();
        createDynamic(URL);
    }


};


function escore(a) {
    var settings = {
        async: true,
        crossDomain: true,
        url: "/escores/" + a,
        method: "GET",
        success: function() {
            $("#error").empty()
        },
        error: function() {
            $("#gifload").hide();
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(URL)
        // $("#gifload").hide();

        $("#USAGE_SCORE").empty();
        $("#ACTIVE_USER_SCORE").empty();
        $("#CWP_SCORE").empty();
        $("#E_SCORE").empty();
        $("#RE_SCORE").empty();
        $("#USAGE_SCORE").text(dataa.USAGE_SCORE);
        $("#ACTIVE_USER_SCORE").text(dataa.ACTIVE_USER_SCORE);
        $("#CWP_SCORE").text(dataa.CWP_SCORE);
        $("#E_SCORE").text(dataa.E_SCORE);
        $("#RE_SCORE").text(dataa.RE_SCORE);



    });





}


function schoolsearch2() {
    var a = document.getElementById("searchinput").value;
    URL = "/journey/" + a;
    URL2 = "/usersearch/" + a;
    $("#schoolname").empty();
    $("#practice").empty();
    $("#state").empty();
    $("#container43").empty();
    $("#schoolDistrict").empty();
    $("#usercountse").empty();
    $("#adress").empty();
    $("#email").empty();
    $("#country").empty();
    $("#city").empty();
    $("#admin").empty();
    $("#ucount").empty();
    $("#pcount").empty();
    $("#LifeTimePlayback").empty();
    $("#MindLifetime").empty();
    $("#mindfulness_minutes").empty();
    $("#ratings").empty();
    $("#school").empty();
    $("#city").empty();
    $("#state").empty();
    $("#schoolDistrict").empty();
    $("#country").empty();
    $("#signup").empty();
    $("#renewal").empty();
    $("#status").empty();
    $("#USAGE_SCORE").empty();
    $("#ACTIVE_USER_SCORE").empty();
    $("#CWP_SCORE").empty();
    $("#E_SCORE").empty();
    $("#RE_SCORE").empty();
    // console.log(URL)
    $("#next").empty();
    $("#next1").empty();
    $("#btnExport").show();
    createDynamic2(URL2);
    jou2(URL);
    historychart(a)
    schoolWeeklyChart(a)
};

function P(URL) {
    // console.log(URL)
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        success: function() {
            $("#error").empty()
        },
        error: function() {
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(URL)
        $("#schoolname").empty();
        $("#practice").empty();
        $("#state").empty();
        $("#usercountse").empty();
        $("#adress").empty();
        $("#email").empty();
        $("#country").empty();
        $("#city").empty();
        $("#admin").empty();
        $("#ucount").empty();
        $("#pcount").empty();
        $("#mindfulness_minutes").empty();
        $("#ratings").empty();
        $("#school").empty();
        $("#city").empty();
        $("#schoolDistrict").empty();
        $("#country").empty();
        $("#signup").empty();
        $("#renewal").empty();
        $("#status").empty();
        $("#schoolname").text("SCHOOL NAME: " + dataa.school_name);
        $("#practice").text(dataa.school_practice_count);
        $("#state").text("STATE: " + dataa.state);
        $("#state").text("DISTRICT: " + dataa.DISTRICT);
        $("#usercountse").text(dataa.user_count);
        $("#adress").text("ADDRESS: " + dataa.address);
        $("#email").text("ADMIN EMAIL: " + dataa.admin_email);
        $("#country").text("COUNTRY: " + dataa.country);
        $("#city").text("CITY: " + dataa.city);
        $("#admin").text("ADMIN NAME: " + dataa.admin_name);
        $("#plan").text(dataa.plan);


        $("#ucount").text(dataa.user_count);
        $("#pcount").text(dataa.PRACTICE_COUNT_csy);
        $("#mindfulness_minutes").text(dataa.SCHOOL_MINDFUL_MINUTES_csy);
        $("#ratings").text(dataa.Star_5_Ratings_Recieved);
        $("#MindLifetime").text(dataa.SCHOOL_MINDFUL_MINUTES_overall);
        $("#LifeTimePlayback").text(dataa.school_practice_count);
        // $("#school").text(datain[0].school_name);
        // $("#city").text(datain[0].city);
        // $("#state").text(datain[0].state);
        // $("#country").text(datain[0].country);
        $("#signup").text(dataa.signup_date);
        $("#renewal").text(dataa.RENEWAL_DATE);
        $("#status").text(dataa.sub_status);
        var practice = dataa.practice_count;

        $("#practicecount").text(practice);
        $("#uniqueusercount").text(dataa.unique_user);
        $("#months").text(dataa.month);

        var url1 = "/journey/" + dataa.admin_email;
        // jou(url1);

    });
};

function dismiss() {
    $("#error").empty()
}

function raisequery() {
    var e = document.getElementById("usname").textContent;
    var schoolname = document.getElementById("searchinput").value;
    // console.log(e);

    var newName = 'name=' + e;
    var newSubject = '&subject=School search ISSUE';
    var newdescription = '&description=I cannot find this school in school search.Also please Check cap logs if school name is not mentioned here ~ sarthak SCHOOL NAME :  ' + schoolname;


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": 'https://xp.innerexplorer.org/compass/capQuery?' + newName + newSubject + newdescription,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {

    });
    $("#error").empty()
    $("#error").append('<div style="background-color: #fff;color: green;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Your Query has been sent to Data Science Team and will be resolved asap.</p></div>');
}



function jou(url1) {
    var settings = {
        async: true,
        crossDomain: true,
        url: url1,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var datain = JSON.parse(response);
        console.log(datain, url);

        $("#ucount").text(datain[0].user_count);
        $("#pcount").text(datain[0].school_practice_count);
        $("#mindfulness_minutes").text(datain[0].mindfulness_minutes);
        $("#ratings").text(datain[0].Star_5_Ratings_Recieved);
        // $("#school").text(datain[0].school_name);
        // $("#city").text(datain[0].city);
        // $("#state").text(datain[0].state);
        // $("#country").text(datain[0].country);
        $("#signup").text(datain[0].signup_date);
        $("#renewal").text(datain[0].renewal_date);
        $("#status").text(datain[0].sub_status);
        var practice = datain[0].practice_count;

        $("#practicecount").text(practice);
        $("#uniqueusercount").text(datain[0].unique_user);
        $("#months").text(datain[0].month);



        Highcharts.chart("graph1", {
            chart: {
                type: "line",
            },

            xAxis: {
                categories: (function() {
                    // generate an array of random data
                    var data = [];
                    for (i = 0; i <= datain[0].month.length; i++) {
                        data.push([datain[0].month[i]]);
                    }
                    return data;
                })(),
            },
            title: {
                text: "",
            },

            exporting: {
                enabled: false,
            },
            credits: { enabled: false },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                    },
                    enableMouseTracking: true,
                },
            },
            series: [{
                // name: "PLAYBACK TREND",
                data: (function() {
                    // generate an array of random data
                    var data = [];

                    for (i = 0; i <= datain[0].practice_count.length; i++) {
                        data.push([datain[0].practice_count[i]]);
                    }
                    return data;
                })(),
                color: "#01a451",
            }, ],
        });

        Highcharts.chart("graph2", {
            chart: {
                type: "column",
            },
            title: {
                text: "",
            },

            xAxis: {
                categories: (function() {
                    // generate an array of random data
                    var data1 = [];

                    for (i = 0; i <= datain[0].month.length; i++) {
                        data1.push([datain[0].month[i]]);
                    }
                    return data1;
                })(),
            },

            exporting: {
                enabled: false,
            },

            credits: { enabled: false },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: "normal",
                },
            },
            series: [{
                name: "Unique User",

                data: (function() {
                    // generate an array of random data
                    var data = [];

                    for (i = 0; i <= datain[0].month.length; i++) {
                        a = 20;

                        data.push([datain[0].unique_user[i]]);
                    }
                    return data;
                })(),
                color: "#01a451",
            }, ],
        });
    });

};


function schoolIDCharts(url1) {
    var t = "Playback";
    var settings = {
        async: true,
        crossDomain: true,
        url: "/schoolactivetrendnew/" + url1,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(dataa[0].bar, "data")
        // $("#gifload").hide();
        Highcharts.chart('graph2', {
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false,
            },
            title: {
                text: "Active User Trend"

            },
            colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
            xAxis: {
                categories: dataa[0].Month
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
            series: [
                {
                    name: "Google",
                    data: dataa[5].bargoogle,
                    color: '#40B5AD'
                },
                {
                    name: "Canvas",
                    data: dataa[4].barcan,
                    color: '#d3373b'
                },
                {
                    name: 'Clever',
                    data: dataa[3].barc
                },
                {
                    name: 'Schoology',
                    data: dataa[2].bars
                }, {
                    name: 'Family ' + t + ' Count(CSY2021-2022)',
                    fontSize: '8px',
                    data: dataa[1].bar2

                }, {
                    name: t + ' User Count(CSY 2021-2022)',
                    data: dataa[0].bar
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
        url: "/schoolpracticetrendnew/" + url1,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa, "data");
        // $("#gifload").hide();

        Highcharts.chart("graph1", {
            chart: {
                type: "column",
            },
            credits: {
                enabled: false,
            },
            title: {
                text: t + " Trend",
            },
            colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
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
            series: [
                {
                    name: "Google",
                    data: dataa[5].bargoogle,
                    color: '#40B5AD'
                },
                {
                    name: "Canvas",
                    data: dataa[4].barcan,
                    color: '#d3373b'
                },
                {
                    name: "Clever",
                    data: dataa[3].barc,
                },
                {
                    name: "Schoology",
                    data: dataa[2].bars,
                },
                {
                    name: "Family" + t + " Count(CSY2021-2022)",
                    data: dataa[1].bar2,
                },
                {
                    name: "User" + t + "Count(CSY2021-2022)",
                    data: dataa[0].bar,
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

};

function P2(URL) {
    // console.log(URL)
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        success: function() {
            $("#error").empty()
        },
        error: function() {
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(URL)
        $("#schoolname").text("SCHOOL NAME: " + dataa.school_name);
        $("#practice").text(dataa.school_practice_count);
        $("#state").text("STATE: " + dataa.state);
        $("#usercountse").text(dataa.user_count);
        $("#adress").text("ADDRESS: " + dataa.address);
        $("#email").text("ADMIN EMAIL: " + dataa.admin_email);
        $("#country").text("COUNTRY: " + dataa.country);
        $("#city").text("CITY: " + dataa.city);
        $("#admin").text("ADMIN NAME: " + dataa.admin_name);
    });
};


function jou2(url1) {
    var settings = {
        async: true,
        crossDomain: true,
        url: url1,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var datain = JSON.parse(response);
        // console.log(datain);

        $("#ucount").text(datain[0].user_count);
        $("#pcount").text(datain[0].school_practice_count);
        $("#mindfulness_minutes").text(datain[0].mindfulness_minutes);
        $("#ratings").text(datain[0].Star_5_Ratings_Recieved);
        $("#school").text(datain[0].school_name);
        // $("#city").text(datain[0].city);
        // $("#state").text(datain[0].state);
        // $("#country").text(datain[0].country);
        $("#signup").text(datain[0].signup_date);
        $("#renewal").text(datain[0].renewal_date);
        $("#status").text(datain[0].sub_status);
        var practice = datain[0].practice_count;

        $("#practicecount").text(practice);
        $("#uniqueusercount").text(datain[0].unique_user);
        $("#months").text(datain[0].month);
        var url2 = "/schoolsearchid/" + datain[0].schoolid;
        P2(url2);
        // console.log(datain[0].city);
        // console.log(datain[0].students_impacted);

        Highcharts.chart("graph1", {
            chart: {
                type: "line",
            },

            xAxis: {
                categories: (function() {
                    // generate an array of random data
                    var data = [];

                    for (i = 0; i <= datain[0].month.length; i++) {
                        data.push([datain[0].month[i]]);
                    }
                    return data;
                })(),
            },
            title: {
                text: "",
            },

            exporting: {
                enabled: false,
            },
            credits: { enabled: false },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                    },
                    enableMouseTracking: true,
                },
            },
            series: [{
                name: "PLAYBACK TREND",
                data: (function() {
                    // generate an array of random data
                    var data = [];

                    for (i = 0; i <= datain[0].practice_count.length; i++) {
                        data.push([datain[0].practice_count[i]]);
                    }
                    return data;
                })(),
                color: "#01a451",
            }, ],
        });

        Highcharts.chart("graph2", {
            chart: {
                type: "column",
            },
            title: {
                text: "",
            },

            xAxis: {
                categories: (function() {
                    // generate an array of random data
                    var data1 = [];

                    for (i = 0; i <= datain[0].month.length; i++) {
                        data1.push([datain[0].month[i]]);
                    }
                    return data1;
                })(),
            },

            exporting: {
                enabled: false,
            },

            credits: { enabled: false },
            legend: {
                reversed: true,
            },
            plotOptions: {
                series: {
                    stacking: "normal",
                },
            },
            series: [{
                name: "Unique User",

                data: (function() {
                    // generate an array of random data
                    var data = [];

                    for (i = 0; i <= datain[0].month.length; i++) {
                        a = 20;

                        data.push([datain[0].unique_user[i]]);
                    }
                    return data;
                })(),
                color: "#01a451",
            }, ],
        });
    });
};





function familysearch() {
    $("#giffamily").empty();
    $("#giffamily").css("display", "block");
    $("#giffamily").append('<div class="row gifloader-content"><div class="col-lg-4 mx-my-auto"><img src="/static/images/breath.gif" class="img-responsive" alt="loader"><p>Take a deep breath while we load your data</p></div></div>');
    // $("#giffamily").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var a = document.getElementById("fsearchinputdescription").innerText;
    // console.log(a);
    if (a !== '') {
        URL = "/family___journey_score/" + a
        $("#fschoolname").empty();
        $("#fpractice").empty();
        $("#fstate").empty();
        $("#fusercountse").empty();
        $("#fadress").empty();
        $("#femail").empty();
        $("#fcountry").empty();
        $("#fcity").empty();
        $("#graph1").empty();
        $("#fadmin").empty();
        $("#fadminname").empty();
        $("#fdistrict").empty();
        $("#fadminuser").empty();
        $("#fucount").empty();
        $("#fpcount").empty();
        $("#Uniquehome").empty();
        $("#completehome").empty();
        $("#ratingshome").empty();
        $("#fmindfulness_minutes").empty();
        $("#MindLifetime").empty();
        $("#LifeTimePlayback").empty();
        $("#fratings").empty();
        $("#fschool").empty();
        $("#fcity").empty();
        $("#fstate").empty();
        $("#fcountry").empty();
        $("#fsignup").empty();
        $("#frenewal").empty();
        $("#fstatus").empty();
        // console.log(URL);
        Pfam(URL);
        AudioUn(a);
        $("#fnext").empty();
        $("#fnext1").empty();
        $("#fbtnExport").show();
        createDynamic(URL);
        $("#fsearchinputdescription").empty();
    } else {
        var a = document.getElementById("familysearchinput").value;
        URL = "/family___journey_score/" + a
        $("#fschoolname").empty();
        $("#fpractice").empty();
        $("#fstate").empty();
        $("#fusercountse").empty();
        $("#fadress").empty();
        $("#femail").empty();
        $("#fcountry").empty();
        $("#fcity").empty();
        $("#fadmin").empty();
        $("#fucount").empty();
        $("#fpcount").empty();
        $("#fmindfulness_minutes").empty();
        $("#fratings").empty();
        $("#fschool").empty();
        $("#fcity").empty();
        $("#fstate").empty();
        $("#fcountry").empty();
        $("#fsignup").empty();
        $("#frenewal").empty();
        $("#fstatus").empty();
        // console.log(URL);
        Pfam(URL);
        AudioUn(a);

        $("#fnext").empty();
        $("#fnext1").empty();
        $("#fbtnExport").show();
        // createDynamic(URL);
    }
};

function inviteLink(urlid) {
    var settings = {
        async: true,
        crossDomain: true,
        url: "/schoolsearchid/" + urlid,
        method: "GET",
    };
    // console.log(urlid);
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        var settings = {
            async: true,
            crossDomain: true,
            url: "https://i6.innerexplorer.org/compass/getEncryptedLink/" + dataa.actual_admin,
            method: "GET",
        };
        $.ajax(settings).done(function(response) {
            // console.log("https://i6.innerexplorer.org/compass/getEncryptedLink/" + dataa.actual_admin)
            var dataa1 = JSON.stringify(response);
            // console.log(dataa1);
            $('#inviteLinkRe').on("click", function() {
                this.href = response;
            });
                //  console.log(response + "scan QR");
                 var qrcode = new QRCode("output");
                 qrcode.makeCode(response);        
        });

    });
}




function modal2() {
    var modal = document.getElementById("myModal2");
    modal.style.display = "block";
}


function AudioUn(a) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/family_audio_completion/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(dataa);
        $("#giffamily").hide();
        Highcharts.chart('container81', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Average Audio Completion(CSY)'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: dataa.temp1.percentage_of_audio_completed[0],
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
                data: dataa.temp1.cumulative_audio_completion
            }, {
                name: 'Audio Completion',
                color: '#00a651',
                yAxis: 0,

                data: dataa.temp1.number_of_audios_compelted
            }]
        });
    });
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/family_audio_completion/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(dataa);
        // console.log("/family_audio_completion/" + a, );
        
        $("#giffamily").hide();
        Highcharts.chart('container82', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Unique Audio Completion(CSY)'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: dataa.temp2.percentage_of_uniuqe_audio_completed[0],
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
                data: dataa.temp2.cumulative_unique_audio_played
            }, {
                name: 'Audio Completion',
                color: '#00a651',
                yAxis: 0,

                data: dataa.temp2.number_of_audios_compelted
            }]
        });
    });

}

function Pfam(URL) {
    // console.log(URL)
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        success: function() {
            $("#error").empty()
            $("#giffamily").hide();
        },
        error: function() {
            $("#giffamily").hide();
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(URL)
        $("#giffamily").hide();
        $("#fschoolname").text("SCHOOL NAME: " + dataa.Info[0].SCHOOL_NAME);
        $("#fname").text("USER NAME: " + dataa.Info[0].USER_NAME);
        $("#fpractice").text("USER EMAIL: " + dataa.Info[0].USER_EMAIL);
        $("#fstate").text("SIGNUP DATE: " + dataa.Info[0].SIGN_UP_DATE);
        $("#fadress").text("ADDRESS: " + dataa.Info[0].ADDRESS);
        $("#femail").text("COUNTRY: " + dataa.Info[0].COUNTRY);
        $("#fcity").text("CITY: " + dataa.Info[0].CITY);
        $("#fadmin").text("STATE: " + dataa.Info[0].STATE);
        $("#fadminname").text("ADMIN EMAIL: " + dataa.Info[0].ADMIN_EMAIL);
        $("#fadminuser").text("USER EMAIL: " + dataa.Info[0].USER_EMAIL);
        $("#fdistrict").text("DISTRICT NAME: " + dataa.Info[0].DISTRICT);
        $("#fucount").text(dataa.Info[0].LAST_PRACTICE_DATE);
        $("#Uniquehome").text(dataa.Info[0].Unique_audio_play);
        $("#completehome").text(dataa.Info[0].Completed_audio);
        $("#ratingshome").text(dataa.Info[0].Star_5_Ratings_Recieved);
        $("#fpcount").text(dataa.Info[0].SCHOOL_PRACTICE_COUNT);
        $("#fmindfulness_minutes").text(dataa.Info[0].SCHOOL_MINDFUL_MINUTES);
        // var url1 = "/journey/" + dataa.admin_email;
        // joufam(url1);
        // historychartfam(dataa.admin_email)

        var chart = Highcharts.stockChart('famcontainerprac', {
            chart: {
                type: 'column'
            },

            title: {
                text: 'FAMILY USERS PLAYBACK HISTORY'
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
                    text: 'Playback Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Playback Count'
                }
            }],

            series: [{
                    color: '#01a451',
                    type: 'column',
                    name: "CSY",
                    data: dataa.chart.data.csy

                    , //Fri, 14 Jul 2017 00:00:00 GMT
                    dataGrouping: {
                        enabled: false,
                    }
                },
                {
                    color: '#ff9933',
                    type: 'spline',
                    name: 'LSY',
                    data: dataa.chart.data.lsy, //Fri, 14 Jul 2017 00:00:00 GMT
                    dataGrouping: {
                        enabled: false,
                    }
                }
            ]

        });

    });



};


function joufam(url1) {
    var settings = {
        async: true,
        crossDomain: true,
        url: url1,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var datain = JSON.parse(response);
        // console.log(datain);
        // $("#giffamily").hide();

        $("#fucount").text(datain[0].user_count);
        $("#fpcount").text(datain[0].school_practice_count);
        $("#fmindfulness_minutes").text(datain[0].mindfulness_minutes);
        // $("#fratings").text(datain[0].Star_5_Ratings_Recieved);
        $("#Uniquehome").text(dataa.Info[0].Unique_audio_play);
        $("#completehome").text(dataa.Info[0].Completed_audio);
        $("#ratingshome").text(dataa.Info[0].Star_5_Ratings_Recieved);
        // $("#fschool").text(datain[0].school_name);
        // $("#fcity").text(datain[0].city);
        // $("#fstate").text(datain[0].state);
        // $("#fcountry").text(datain[0].country);
        $("#fsignup").text(datain[0].signup_date);
        $("#frenewal").text(datain[0].renewal_date);
        $("#fstatus").text(datain[0].sub_status);
        var practice = datain[0].practice_count;

        $("#fpracticecount").text(practice);
        $("#funiqueusercount").text(datain[0].unique_user);
        $("#fmonths").text(datain[0].month);

        var chart = Highcharts.stockChart('container5', {
            chart: {
                type: 'column'
            },

            title: {
                text: 'User Playback History'
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
                    text: 'Playback Count'
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
                "name": "LSY",
                "type": "line",
                "color": "#FF9933",
                "xAxis": 0,
                "data": dataa.chart.data.lsy
            }, {
                "name": "CSY",
                "type": "column",
                "xAxis": 1,
                "color": "#01A451",
                "data": dataa.chart.data.csy
            }]

        });


    });

};


function usersearch() {                                                                               
    $("#gif3").empty();
    $("#gif3").css("display", "block");
    $("#gif3").append('<div class="row gifloader-content"><div class="col-lg-4 mx-my-auto"><img src="/static/images/breath.gif" class="img-responsive" alt="loader"><p>Take a deep breath while we load your data</p></div></div>');
    // $("#gif3").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    // var gif = document.getElementById("gif3");
    // gif.style.display = "block";
    $("#schoolname").empty();
    $("#upractice").empty();
    $("#ustate").empty();
    $("#uusercountse").empty();
    $("#uadress").empty();
    $("#uemail").empty();
    $("#ucity").empty();
    $("#uadmin").empty();
    $("#usignup").empty();
    $("#uucount").empty();
    $("#upcount").empty();
    $("#ratingsRecieved").empty();
    $("#completeAudio").empty();
    $("#uniqueAudio").empty();
    $("#umindfulness_minutes").empty();
    $("#uschoolname1").empty();
    $("#uschoolname").empty();
    $("#adminEmail").empty();
    $("#u2practice1").empty();
    $("#u2state1").empty();
    $("#u2usercountse1").empty();
    $("#u2adress1").empty();
    $("#u2email1").empty();
    $("#u2city1").empty();
    $("#u2admin1").empty();
    $("#u2signup1").empty();
    $("#u2ucount1").empty();
    $("#u2pcount1").empty();
    $("#u2mindfulness_minutes1").empty();
    $("#container").empty();
    $("#container1").empty();
    var a = document.getElementById("searchinputuser").value;
    // var b = document.getElementById("searchinputuser2").value;
    var URL = "/user_journey_score/" + a;
    // console.log(URL);
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        success: function() {
            $("#error").empty()
            // var gif = document.getElementById("gif3");
            // gif.style.display = "none";
        },
        error: function() {
            $("#gif3").hide()
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        $("#uschoolname").text("SCHOOL NAME: " + dataa.Info[0].SCHOOL_NAME);
        $("#adminEmail").text("ADMIN EMAIL: " + dataa.Info[0].ADMIN_EMAIL);
        $("#uname").text("USER NAME: " + dataa.Info[0].USER_NAME);
        $("#upractice").text("USER EMAIL: " + dataa.Info[0].USER_EMAIL);
        $("#ustate").text("SIGNUP DATE: " + dataa.Info[0].SIGN_UP_DATE);
        $("#uadress").text("ADDRESS: " + dataa.Info[0].ADDRESS);
        $("#uemail").text("COUNTRY: " + dataa.Info[0].COUNTRY);
        $("#ucity").text("CITY: " + dataa.Info[0].CITY);
        $("#uadmin").text("STATE: " + dataa.Info[0].STATE);
        $("#usignup").text("DISTRICT NAME: " + dataa.Info[0].DISTRICT);
        $("#uucount").text(dataa.Info[0].LAST_PRACTICE_DATE);
        $("#upcount").text(dataa.Info[0].SCHOOL_PRACTICE_COUNT);
        $("#ratingsRecieved").text(dataa.Info[0].Star_5_Ratings_Recieved);
        $("#completeAudio").text(dataa.Info[0].Completed_audio);
        $("#uniqueAudio").text(dataa.Info[0].Unique_audio_play);
        $("#umindfulness_minutes").text(dataa.Info[0].SCHOOL_MINDFUL_MINUTES);


        // $("#u2schoolname").text("SCHOOL NAME: " + dataa.Info2[0].SCHOOL_NAME);
        // $("#uname2").text("USER NAME: " + dataa.Info2[0].USER_NAME);
        // $("#u2practice").text("USER EMAIL: " + dataa.Info2[0].USER_EMAIL);
        // $("#u2state").text("SIGNUP DATE: " + dataa.Info2[0].SIGN_UP_DATE);
        // $("#u2adress").text("ADDRESS: " + dataa.Info2[0].ADDRESS);
        // $("#u2email").text("COUNTRY: " + dataa.Info2[0].COUNTRY);
        // $("#u2city").text("CITY: " + dataa.Info2[0].CITY);
        // $("#u2admin").text("STATE: " + dataa.Info2[0].STATE);
        // $("#u2signup").text("DISTRICT NAME: " + dataa.Info2[0].DISTRICT_NAME);
        // $("#u2ucount").text(dataa.Info2[0].LAST_PRACTICE_DATE);
        // $("#u2pcount").text(dataa.Info2[0].USER_PRACTICE_COUNT);
        // $("#u2mindfulness_minutes").text(dataa.Info2[0].USER_MINDFUL_MINUTES);


        var chart = Highcharts.stockChart('container5', {
            chart: {
                type: 'column'
            },

            title: {
                text: 'User Playback History'
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
                    text: 'Playback Count'
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
                "name": "LSY",
                "type": "line",
                "color": "#FF9933",
                "xAxis": 0,
                "data": dataa.chart.data.lsy
            }, {
                "name": "CSY",
                "type": "column",
                "xAxis": 1,
                "color": "#01A451",
                "data": dataa.chart.data.csy
            }]

        });


        var chart = Highcharts.stockChart('container6', {
            chart: {
                type: 'spline'
            },

            title: {
                text: 'USERS PLAYBACK CUMULATIVE'
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
                    text: 'Playback Count'
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: 'Playback Count'
                }
            }],

            series: [{
                color: '#01a451',
                type: 'spline',
                name: dataa.Info[0].USER_NAME,
                data: dataa.chart.data.shpcum, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });


    });

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/user_audio_completion/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(dataa);
        // $("#gif3").hide();

        Highcharts.chart('container17', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Average Audio Completion(CSY)'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: dataa.temp1.percentage_of_audio_completed[0],
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
                data: dataa.temp1.cumulative_audio_completion
            }, {
                name: 'Audio Completion',
                color: '#00a651',
                yAxis: 0,

                data: dataa.temp1.number_of_audios_compelted
            }]
        });
    });


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/user_audio_completion/" + a,
        "method": "GET"
    }
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        // console.log(dataa);
        $("#gif3").hide();

        Highcharts.chart('container18', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Unique Audio Completion(CSY)'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: dataa.temp2.percentage_of_uniuqe_audio_completed[0],
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
                data: dataa.temp2.cumulative_unique_audio_played
            }, {
                name: 'Audio Completion',
                color: '#00a651',
                yAxis: 0,

                data: dataa.temp2.number_of_audios_compelted
            }]
        });
    });
}

function activaTab(tab) {
    $('.nav-pills a[href="#' + tab + '"]').tab('show');
};

function clickableTable(userEmail) {
    document.getElementById("searchinputuser").value = userEmail;
    usersearch();
    activaTab('messages')
    window.scrollTo(0, 0);
}




// Export functionality
$("#btnExport").click('load', function () {
    var p = document.getElementById("exportLink").innerText;
    // console.log(p);
    exportNew(p)
});

function exportNew(p) {
    window.location.assign(p);
    // console.log(p);
}
