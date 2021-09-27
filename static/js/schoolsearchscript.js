let str = window.location.href;
console.log(str.substr(str.lastIndexOf("?") + 1));
var urlid = str.substr(str.lastIndexOf("?") + 1);
 if (urlid == "http://127.0.0.1:5000/School_Search" || urlid == "http://127.0.0.1:5000/School_Search#") {
    console.log("noID")
}
else if (urlid !== '') {
    URL = "/schoolsearchid/" + urlid
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
    $("#state").empty();
    $("#country").empty();
    $("#signup").empty();
    $("#renewal").empty();
    $("#status").empty();
    console.log(URL);
    P(URL);
    $("#next").empty();
    $("#next1").empty();
    $("#btnExport").show();
    createDynamic(URL);
}  else {
    console.log("nohref");
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
    console.log(userList);

    dynamicDiv +=
        "<tr >" +
        "<td>" +
        userList[0] +
        "</td>" +
        '<td><a onclick="search2(' + userList[1] + ')">' + userList[1] +
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
        "<td>" +
        userList[6] +
        "</td>" +
        "</tr>";

    return dynamicDiv;
}

function schoolsearch() {
    var a = document.getElementById("searchinputdescription").innerText;
    console.log(a);
    if (a !== '') {
        URL = "/schoolsearchid/" + a
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
        $("#state").empty();
        $("#country").empty();
        $("#signup").empty();
        $("#renewal").empty();
        $("#status").empty();
        console.log(URL);
        P(URL);
        escore(a);
        $("#next").empty();
        $("#next1").empty();
        $("#btnExport").show();
        createDynamic(URL);
        $("#searchinputdescription").empty();
    } else {
        var a = document.getElementById("searchinput").value;
        URL = "/schoolsearchid/" + a
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
        $("#state").empty();
        $("#country").empty();
        $("#signup").empty();
        $("#renewal").empty();
        $("#status").empty();
        console.log(URL);
        P(URL);
        escore(a);
        $("#next").empty();
        $("#next1").empty();
        $("#btnExport").show();
        createDynamic(URL);
    }
};


function escore(a){
    var settings = {
        async: true,
        crossDomain: true,
        url:"/escores/"+a,
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
        console.log(URL)
        $("#schoolname").empty();
        $("#practice").empty();
        $("#state").empty();
        $("#usercountse").empty();
        $("#adress").empty();
        $("#email").empty();
        $("#country").empty();
        $("#adress").text("ADDRESS: " + dataa.address);
        $("#email").text("ADMIN EMAIL: " + dataa.admin_email);
        $("#country").text("COUNTRY: " + dataa.country);
        $("#city").text("CITY: " + dataa.city);
        $("#admin").text("ADMIN NAME: " + dataa.admin_name);
        $("#plan").text(dataa.plan);

    });
}


function schoolsearch2() {
    var a = document.getElementById("searchinput").value;
    URL = "/journey/" + a;
    URL2 = "/usersearch/" + a;
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
    $("#state").empty();
    $("#country").empty();
    $("#signup").empty();
    $("#renewal").empty();
    $("#status").empty();
    console.log(URL)
    $("#next").empty();
    $("#next1").empty();
    $("#btnExport").show();
    createDynamic2(URL2);
    jou2(URL);
    historychart(a)
};

function P(URL) {
    console.log(URL)
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
        console.log(URL)
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
        $("#state").empty();
        $("#country").empty();
        $("#signup").empty();
        $("#renewal").empty();
        $("#status").empty();
        $("#schoolname").text("SCHOOL NAME: " + dataa.school_name);
        $("#practice").text(dataa.school_practice_count);
        $("#state").text("STATE: " + dataa.state);
        $("#usercountse").text(dataa.user_count);
        $("#adress").text("ADDRESS: " + dataa.address);
        $("#email").text("ADMIN EMAIL: " + dataa.admin_email);
        $("#country").text("COUNTRY: " + dataa.country);
        $("#city").text("CITY: " + dataa.city);
        $("#admin").text("ADMIN NAME: " + dataa.admin_name);
        $("#plan").text(dataa.plan);
        var url1 = "/journey/" + dataa.admin_email;
        jou(url1);
        historychart(dataa.admin_email)
    });
};

function dismiss() {
    $("#error").empty()
}

function raisequery() {
    var e = document.getElementById("usname").textContent;
    var schoolname = document.getElementById("searchinput").value;
    console.log(e);

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

// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "/escores/" + a,
//     "method": "GET"
// }
// $.ajax(settings).done(function(response) {
//     var dataa = JSON.parse(response);
//     console.log(a);
//     $('#ACTIVE_USER_SCORE').text(dataa.ACTIVE_USER_SCORE);
//     $('#CWP_SCORE').text(dataa.CWP_SCORE);
//     $('#E_SCORE').text(dataa.E_SCORE);
//     $('#RE_SCORE').text(dataa.RE_SCORE);
//     $('#RE_SUSAGE_SCORECORE').text(dataa.USAGE_SCORE);

// });

function jou(url1) {
    var settings = {
        async: true,
        crossDomain: true,
        url: url1,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var datain = JSON.parse(response);
        console.log(datain);

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

function P2(URL) {
    console.log(URL)
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
        console.log(URL)
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
        console.log(datain);

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
        console.log(datain[0].city);
        console.log(datain[0].students_impacted);

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
    var a = document.getElementById("fsearchinputdescription").innerText;
    console.log(a);
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
        console.log(URL);
        Pfam(URL);
        $("#fnext").empty();
        $("#fnext1").empty();
        $("#fbtnExport").show();
        createDynamic(URL);
        $("#fsearchinputdescription").empty();
    } else {
        var a = document.getElementById("familysearchinput").value;
        URL = "/familysearchid/" + a
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
        console.log(URL);
        Pfam(URL);
        $("#fnext").empty();
        $("#fnext1").empty();
        $("#fbtnExport").show();
        createDynamic(URL);
    }
};


function Pfam(URL) {
    console.log(URL)
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
        console.log(URL)
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
        $("#state").empty();
        $("#country").empty();
        $("#signup").empty();
        $("#renewal").empty();
        $("#status").empty();
        $("#schoolname").text("SCHOOL NAME: " + dataa.school_name);
        $("#practice").text(dataa.school_practice_count);
        $("#state").text("STATE: " + dataa.state);
        $("#usercountse").text(dataa.user_count);
        $("#adress").text("ADDRESS: " + dataa.address);
        $("#email").text("ADMIN EMAIL: " + dataa.admin_email);
        $("#country").text("COUNTRY: " + dataa.country);
        $("#city").text("CITY: " + dataa.city);
        $("#admin").text("ADMIN NAME: " + dataa.admin_name);
        $("#plan").text(dataa.plan);
        var url1 = "/journey/" + dataa.admin_email;
        joufam(url1);
        historychartfam(dataa.admin_email)
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
        console.log(datain);

        $("#fucount").text(datain[0].user_count);
        $("#fpcount").text(datain[0].school_practice_count);
        $("#fmindfulness_minutes").text(datain[0].mindfulness_minutes);
        $("#fratings").text(datain[0].Star_5_Ratings_Recieved);
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



        Highcharts.chart("famgraph1", {
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

        Highcharts.chart("famgraph2", {
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









function usersearch() {
    $("#gif3").empty();
    $("#gif3").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif3");
    gif.style.display = "block";
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
    $("#umindfulness_minutes").empty();
    $("#uschoolname1").empty();
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
    console.log(URL);
    var settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        success: function() {
            $("#error").empty()
            var gif = document.getElementById("gif3");
            gif.style.display = "none";
        },
        error: function() {
            $("#error").empty()
            $("#error").append('<div style="background-color: #fff;color: #ff0033;width: 50%;margin-left: 19px;margin-top: 20px;padding: 10px;border-radius: 10px;"><button onclick="raisequery()" style="padding: 6px;background-color: #ff0033;color: #fff;float: right;border: 0;border-radius: 10px;font-size: 11px;">Raise Ticket</button><button onclick="dismiss()" style="padding: 6px;background-color: #fff;color: #ff0033;float: right;border: 0;border-radius: 10px;font-size: 11px;">Dismiss</button><p style="margin-top:4px;">Connection to this school data failed.</p></div>');
        }
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        $("#uschoolname").text("SCHOOL NAME: " + dataa.Info[0].SCHOOL_NAME);
        $("#uname").text("USER NAME: " + dataa.Info[0].USER_NAME);
        $("#upractice").text("USER EMAIL: " + dataa.Info[0].USER_EMAIL);
        $("#ustate").text("SIGNUP DATE: " + dataa.Info[0].SIGN_UP_DATE);
        $("#uadress").text("ADDRESS: " + dataa.Info[0].ADDRESS);
        $("#uemail").text("COUNTRY: " + dataa.Info[0].COUNTRY);
        $("#ucity").text("CITY: " + dataa.Info[0].CITY);
        $("#uadmin").text("STATE: " + dataa.Info[0].STATE);
        $("#usignup").text("DISTRICT NAME: " + dataa.Info[0].DISTRICT_NAME);
        $("#uucount").text(dataa.Info[0].LAST_PRACTICE_DATE);
        $("#upcount").text(dataa.Info[0].USER_PRACTICE_COUNT);
        $("#umindfulness_minutes").text(dataa.Info[0].USER_MINDFUL_MINUTES);


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
                text: 'USERS PLAYBACK COMPARISON'
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
                data: dataa.Chart.data.shp

                , //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
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
                data: dataa.Chart.data.shpcum, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                }
            }]

        });


    });
}