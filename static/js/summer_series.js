$(document).ready(function(){
    var url = window.location.href;
    var dashboard_name = document.getElementById('summer_dashboard').innerText;
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
    async: true,
    crossDomain: true,
    url: "/summer_series",
    method: "GET",
};
$.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa);

    $("#total_dist_activity_count").text(dataa.total_districts_activity_count);
    $("#total_dist_playback_count").text(dataa.total_district_playback_count);
    $("#total_school_activity_count").text(dataa.total_school_activity_count);
    $("#total_school_playback_count").text(dataa.total_school_playback_count);
    $("#total_user_activity_count").text(dataa.total_user_activity_count);
    $("#total_user_playback_count").text(dataa.total_user_playback_count);
    $("#total_mindfulness").text(dataa.total_mindfulness);
    $("#total_playback").text(dataa.total_playback);
    $("#total_activity_count").text(dataa.total_activity_count);

    $(function () {
        const chart =
            Highcharts.chart('container1', {
                chart: {
                    // zoomType: "xy",
                    type: "column"
                },
                title: {
                    text: "Summer Series Activity Analytics",
                },
                credits: {
                    enabled: false,
                },
                colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
                xAxis: [{
                    categories: dataa.act_chart.ACTIVITY_NAME,  
                    labels: {
                        style: {
                            fontSize: "10px",
                            rotation: 90,
                        },
                    }
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
                        text: "Count",
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
                    series: {
                        stacking: 'normal',
                    }
                },
                series: [
                    {
                    name: 'Activity View Count',
                    color: '#01A451',
                    data: dataa.act_chart.Activity_View,
                    stack: 0
                },
                
                {
                    name: 'Activity User Count',
                    color: '#FF9933',
                    type: 'line',
                    data: dataa.act_chart.User_Count,
                    yAxis: 0,
                    //stack: 0
                }
                ],
            });

    });


    // District Wise charts data
    $(function() {
        $('#container2').highcharts('Chart', {
            title: {
                text: "District Wise Summer Series Analytics",
            },
            xAxis: [{
                categories: dataa.overall_district_chart.DISTRICT,  
                labels: {
                    style: {
                        fontSize: "10px",
                        rotation: 90,
                    },
                }
            },],
          yAxis: [{
            title: {
              text: 'PLAYBACK'
            },
            lineWidth: 2
          }, {
            title: {
              text: 'Activity'
            },
            opposite: true,
            lineWidth: 2
          }],
          series: [{
            type: 'column',
            name: 'Playback Count',
            color: '#01A451',
            data: dataa.overall_district_chart.Total_playback,
          }, 
          {
            type: 'column',
            name: 'Activity Count',
            color: '#8AE02B',
            data: dataa.overall_district_chart.Activity_Count,
            
          },
          {
            type: 'line',
            name: 'Playback User Count',
            color: '#FF9933',
            data:  dataa.overall_district_chart.playback_user_count,
            yAxis: 1,
            
          }, {
            type: 'line',
            name: 'Activity User Count',
            color: '#C35214',
            data: dataa.overall_district_chart.Activity_User_Count,
            yAxis: 1,
          }]
        });
    });

    // School Wise charts data
    $(function() {
        $('#container3').highcharts('Chart', {
            title: {
                text: "Top 30 School Wise Summer Series Analytics",
            },
            xAxis: [{
                categories: dataa.overall_school_chart.SCHOOL_NAME.slice(0,30),  
                labels: {
                    style: {
                        fontSize: "10px",
                        rotation: 90,
                    },
                }
            },],
          yAxis: [{
            title: {
              text: 'PLAYBACK'
            },
            lineWidth: 2
          }, {
            title: {
              text: 'Activity'
            },
            opposite: true,
            lineWidth: 2
          }],
          series: [{
            type: 'column',
            name: 'Playback Count',
            color: '#01A451',
            data: dataa.overall_school_chart.Total_playback.slice(0,30),
          }, 
          {
            type: 'column',
            name: 'Activity Count',
            color: '#8AE02B',
            data: dataa.overall_school_chart.Activity_Count.slice(0,30),
            
          },
          {
            type: 'line',
            name: 'Playback User Count',
            color: '#FF9933',
            data:  dataa.overall_school_chart.playback_user_count.slice(0,30),
            yAxis: 1,
            
          }, {
            type: 'line',
            name: 'Activity User Count',
            color: '#C35214',
            data: dataa.overall_school_chart.Activity_User_Count.slice(0,30),
            yAxis: 1,
          }]
        });
    });

    // User charts data
    $(function () {
        const chart =
            Highcharts.chart('container4', {
                chart: {
                    // zoomType: "xy",
                    type: "column"
                },
                title: {
                    text: "User Wise Summer Series Analytics",
                },
                credits: {
                    enabled: false,
                },
                colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
                xAxis: [{
                    categories: dataa.user_chart.USER_NAME_x,  
                    labels: {
                        style: {
                            fontSize: "10px",
                            rotation: 90,
                        },
                    }
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
                        text: "User Count",
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
                    series: {
                        stacking: 'normal',
                    }
                },
                series: [
                    {
                    name: 'Activity View Count',
                    color: '#FF9933',
                    type: 'line',
                    data: dataa.user_chart.Activity_Count,
                    stack: 0
                },
                
                {
                    name: 'Playback Count',
                    color: '#01A451',
                    type: 'column',
                    data: dataa.user_chart.Total_playback,
                    yAxis: 0,
                    //stack: 0
                }
                ],
            });

    });
   
});




function cards(URL) {
    // var Exportpage = URL + "?export";
    // console.log(Exportpage);
    // $("#exportLink").text(Exportpage);
    $('#next').empty();
    console.log(URL);
    // ok(); 
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;height:65px !important;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic(URL);
}

function createDynamic(url) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        success: function () {
            var gif = document.getElementById("gif");
            gif.style.display = "none";
        },  
    }
    $.ajax(settings).done(function (response) {
        // console.log(response);
        var data1 = JSON.parse(response);
        console.log(data1);

        $('#next').prepend('<div class="table-responsive"><table class="table table-striped custab table-fixed" id="dataTable"><thead><tr><tr><th>DISTRICT NAME</th><th>SCHOOL NAME</th><th>USER NAME</th><th>EMAIL ID</th><th>PRACTICE COUNT</th><th>MINDFUL MINUTES</th></tr></thead><tbody>');

        for (var i = 0; i < data1.playback_table.length; i++) {

            var datain = data1.playback_table[i];
            console.log(datain);
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);

        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table></div>');   
        dataTab();

        $('#next1').prepend('<div class="table-responsive"><table class="table table-striped custab table-fixed" id="dataTable1" style="display:none;"><thead><tr><tr><th>DISTRICT NAME</th><th>SCHOOL NAME</th><th>USER NAME</th><th>EMAIL ID</th><th>PRACTICE COUNT</th><th>MINDFUL MINUTES</th></tr></thead><tbody>');

            // '<table class="table table-striped custab table-fixed" style="display:none;" id="dataTable1" ><thead ><tr><tr><th>USER NAME</th><th>USER EMAIL</th><th>PHONE</th><th>SCHOOL AFFILIATION</th><th>CITY</th><th>STATE</th><th>REGISTERED ON</th><th>APP LOGIN DATE</th><th>LAST PRACTICE</th><th>PRACTICE COUNT</th></tr></thead ><tbody>');
        for (var i = 0; i < data1.playback_table.length; i++) {

            var datain = data1.playback_table[i];

            var resultDiv = createDynamicDiv(datain);
            $("#dataTable1").append(resultDiv);

        }
        $('#dataTable1').append('</tbody></table></div>');
    })
}


function dataTab() {

    $("#dataTable").DataTable({
        "pageLength": 20
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
        '<td>' + userList[5] + '</td>' +
        '</tr>'

    return dynamicDiv;

}


function cards2(URL) {
    // var Exportpage = URL + "?export";
    // console.log(Exportpage);
    // $("#exportLink").text(Exportpage);
    $('#next').empty();
    console.log(URL);
    // ok(); 
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;height:65px !important;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic2(URL);
}

function createDynamic2(url) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        success: function () {
            var gif = document.getElementById("gif");
            gif.style.display = "none";
        },  
    }
    $.ajax(settings).done(function (response) {
        // console.log(response);
        var data1 = JSON.parse(response);
        console.log(data1);

        $('#next').prepend('<div class="table-responsive"><table class="table table-striped custab table-fixed" id="dataTable"><thead><tr><tr><th>DISTRICT NAME</th><th>SCHOOL NAME</th><th>USER NAME</th><th>EMAIL ID</th><th>ACTIVITY NAME</th><th>ACTIVITY DATE</th></tr></thead><tbody>');

        for (var i = 0; i < data1.activity_table.length; i++) {

            var datain = data1.activity_table[i];
            console.log(datain);
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);

        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table></div>');
        dataTab();

        $('#next1').prepend('<div class="table-responsive"><table class="table table-striped custab table-fixed" id="dataTable1" style="display:none;"><thead><tr><tr><th>DISTRICT NAME</th><th>SCHOOL NAME</th><th>USER NAME</th><th>EMAIL ID</th><th>ACTIVITY NAME</th><th>ACTIVITY DATE</th></tr></thead><tbody>');

            // '<table class="table table-striped custab table-fixed" style="display:none;" id="dataTable1" ><thead ><tr><tr><th>USER NAME</th><th>USER EMAIL</th><th>PHONE</th><th>SCHOOL AFFILIATION</th><th>CITY</th><th>STATE</th><th>REGISTERED ON</th><th>APP LOGIN DATE</th><th>LAST PRACTICE</th><th>PRACTICE COUNT</th></tr></thead ><tbody>');
        for (var i = 0; i < data1.activity_table.length; i++) {

            var datain = data1.activity_table[i];

            var resultDiv = createDynamicDiv2(datain);
            $("#dataTable1").append(resultDiv);

        }
        $('#dataTable1').append('</tbody></table></div>');
    })
}


function dataTab() {

    $("#dataTable").DataTable({
        "pageLength": 20
    });

}


function createDynamicDiv2(userList) {
    var dynamicDiv = '';
    // console.log(userList)

    dynamicDiv += '<tr >' +
        '<td>' + userList[0] + '</td>' +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td>' + userList[4] + '</td>' +
        '<td>' + userList[5] + '</td>' +
        '</tr>'

    return dynamicDiv;

}



