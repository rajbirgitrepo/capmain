$(document).ready(function(){
    var url = window.location.href;
    var dashboard_name = document.getElementById('Login_Analytics_dashboard').innerText;
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


$( document ).ready(function(){
    $("#passcodecount").empty();
    $("#totaltempcount").empty();
    $("#totalsuccesslogins").empty();
    $("#uniqueusertemp").empty();
    $("#container").empty();
    $("#container2").empty();
    $("#gifload").empty();
    $("#gifload").css("display", "block");
    $("#gifload").append('<div class="row gifloader-content"><div class="col-lg-4 mx-my-auto"><img src="/static/images/breath.gif" class="img-responsive" alt="loader"><p>Take a deep breath while we load your data</p></div></div>');
  });


// console.log('In login1')
var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/login_cards',
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    $("#gifload").hide();
    $('#passcodecount').text(dataa.new_passcode_email_count);
    $('#totaltempcount').text(dataa.total_temp_count);
    $('#totalsuccesslogins').text(dataa.totalsuccesslogins);
    $('#uniqueusertemp').text(dataa.unique_user_temp);

});


var settings = {
    async: true,
    crossDomain: true,
    url: "/daily_logins",
    method: "GET",
};
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    $("#gifload").hide();
    $(function() {
        $("#container2").highcharts({
            chart: {
                zoomType: "xy",
                type: "column"
            },
            title: {
                text: "Successful Login History",
            },
            colors: ['#6495ED', '#4F1FAF', '#462CEE', '#8AE02B', '#01A451', '#33FFD1'],
            xAxis: [{
                    categories: dataa.date,
                    labels: {
                        rotation: 90,
                    }
                },

            ],
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
                        text: "Login Count",
                        style: {
                            color: "#000",
                        },
                    },
                },
                {
                    //Secondary yAxis
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
                borderWidth: 2,
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
            series: [
                // {
                //     name: 'Google',
                //     "color": "#40B5AD",
                //     data: dataa.
                // },
                {
                    name: 'Canvas',
                    "color": "#d3373b",
                    data: dataa.canvas_success_login
                },
                {
                    name: 'Clever',
                    "color": "#4F1FAF",
                    data: dataa.clever_success_login
                },
                {
                    name: 'Schoology',
                    "color": "#462CEE",
                    data: dataa.schoology_success_login
                }, {
                    name: 'Homeapp',
                    "color": "#8ae02b",
                    fontSize: '8px',
                    data: dataa.homeapp_success_login

                }, {
                    name: 'Webapp',
                    "color": "#6495ED",
                    data: dataa.webapp_success_login
                },
                {
                    name: 'Classroom',
                    "color": "#FF9933",
                    data: dataa.classroom_success_login
                },
            ],
        });
    });
});

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "/tempasscode_streak",
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);

    $("#gifload").hide();
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false,
        },
        title: {
            text: 'Temporary Passcode by Users'

        },
        colors: ['#8ae02b'],
        xAxis: {
            categories: dataa.streak
        },
        yAxis: {
            lineWidth: 1,
            min: 0,
            title: {
                text: 'Streak Count'
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
                    events: {
                        click: function() {

                            $('#next').empty();
                            // console.log(a);
                            var modal2 = document.getElementById("myModal2");
                            modal2.style.display = "block";
                            $("#gif").append("<img style='width: 7%;margin-left: 45.2%;height:65px !important;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
                            var gif = document.getElementById("gif");
                            gif.style.display = "block";
                            $('#btnExport').show();

                            URL =
                                "tempasscode_table/" + this.category;

                            // console.log(URL);
                            createDynamic(URL);
                        },
                    },
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
                name: 'Number of temp passcode',
                data: dataa.streak_count
            }

        ]
    });
});


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

        $('#next').prepend('<table class="display" id = "dataTable" ><thead ><tr><th>USER_NAME</th><th>EMAIL_ID</th><th>SCHOOL_NAME</th><th>PLAYBACK IN CSY</th><th>LAST_PRACTICE_DATE</th><th>LAST_TEMP_DATE</th></thead ><tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();



        $('#next1').prepend('<table class="display" id = "dataTable1" style="display:none" ><thead ><tr><th>USER_NAME</th><th>EMAIL_ID</th><th>SCHOOL_NAME</th><th>PLAYBACK IN CSY</th><th>LAST_PRACTICE_DATE</th><th>LAST_TEMP_DATE</th></thead ><tbody>');
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
    // console.log(userList)




    dynamicDiv += '<tr >' +
        '<td>' + userList[0] + '</td>' +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td>' + userList[4] + '</td>' +
        '<td >' + userList[5] + '</td>' +


        '</tr>'


    return dynamicDiv;
}