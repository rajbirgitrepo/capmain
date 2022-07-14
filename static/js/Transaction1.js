$(document).ready(function(){
    var url = window.location.href;
    var dashboard_name = document.getElementById('revenue_dashboard').innerText;
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


$("#gifcards").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
//$("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
var gif = document.getElementById("gifcards");
gif.style.display = "block";

function cards(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
    gif.style.display = "block";
    $('#btnExport').show();
    createDynamic(URL);
}
function cards2(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("admin2");
    modal2.style.display = "block";
   // $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
   // var gif = document.getElementById("gif");
   // gif.style.display = "block";
    $('#btnExport').show();
    createDynamic2(URL);
}
cards2('/revenauetable/revenaue');
$(function() {
    $("#datepicker").datepicker(

        {
            changeMonth: true,
            changeYear: true,
            yearRange: "2018:2022",
            dateFormat: "yy-mm-dd",
            onSelect: function(dateText, inst) {
                $("#stardate").text(dateText);
            }
        });
    $("#datepicker").datepicker("setDate",
        new Date(2021, 06, 01), )
});

$(function() {
    $("#datepicker2").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "2018:2022",
        dateFormat: "yy-mm-dd",
        maxDate: new Date(),
        onSelect: function(dateText, inst) {
            $("#finaldate").text(dateText);
        }
    });
    var d = new Date();
    var currMonth = d.getMonth();
    var currYear = d.getFullYear();
    var currDate = d.getDate();
    var startDate = new Date(currYear, currMonth, currDate);
    $("#datepicker2").datepicker("setDate", startDate);
});


function sub() {
    var a = document.getElementById("stardate").innerText;
    var b = document.getElementById("finaldate").innerText;
    console.log(a, b);
    $("#PAYLATER").empty();
    $("#PROMOCODE").empty();
    $("#SQUARE_PAYMENT").empty();
    $("#PAYPAL").empty();
    $("#GRANT").empty();
    $("#container").empty();
    $("#container2").empty();
    $("#container4").empty();
    // $("#container5").empty();
    $("#Total_amount").empty();
    var gif = document.getElementById("gifcards");
    gif.style.display = "block";
    charts(a, b);
    cardscount(a, b);
    $("#fromd").text(a);
    $("#tod").text(a);
}

var d = new Date();
var currMonth = d.getMonth() + 1;
var currYear = d.getFullYear();
var currDate = d.getDate();

var startDate = new Date(currYear, currMonth, currDate);
console.log(startDate);
var e = "2021-07-01";
var f = currYear + "-" + currMonth + "-" + currDate;
var gif = document.getElementById("gifcards");
gif.style.display = "block";
charts(e, f);
cardscount(e, f);
$("#stardate").text(e);
$("#finaldate").text(f);
$("#fromd").text(e);
$("#tod").text(f);


function cardscount(a, b) {
    console.log("/modetype/" + a + "/" + b)
    var settings = {
        async: true,
        crossDomain: true,
        url: "/modetype/" + a + "/" + b,
        method: "GET",
        success: function() {
            var gif = document.getElementById("gifcards");
            gif.style.display = "none";
        },
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log("this is total");
        console.log("/modetype/" + a + "/" + b);
        const total =
            dataa.amount.Payment_Mode_Amount[0] +
            dataa.amount.Payment_Mode_Amount[1] +
            dataa.amount.Payment_Mode_Amount[2] +
            dataa.amount.Payment_Mode_Amount[3] +
            dataa.amount.Payment_Mode_Amount[4];


        console.log(total + "this is total");
        $("#Total_amount").text("$ " + parseFloat(total).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

        console.log(dataa.amount.Payment_Mode[1] + "this is mode");
        console.log(dataa.amount.Payment_Mode_Amount[0] + "this is amojnt");
        $("#t1").text(dataa.amount.Payment_Mode[0]);
        $("#t2").text(dataa.amount.Payment_Mode[1]);
        $("#t3").text(dataa.amount.Payment_Mode[2]);
        $("#t4").text(dataa.amount.Payment_Mode[3]);
        $("#t5").text(dataa.amount.Payment_Mode[4]);
        $("#t6").text(dataa.amount.Payment_Mode[5]);
        $("#t7").text(dataa.amount.Payment_Mode[6]);
        $("#t8").text(dataa.amount.Payment_Mode[7]);
        $("#PAYLATER").text(
            "$ " + parseFloat(dataa.amount.Payment_Mode_Amount[0]).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        );
        $("#PROMOCODE").text(
            "$ " + parseFloat(dataa.amount.Payment_Mode_Amount[1]).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        );
        $("#SQUARE_PAYMENT").text(
            "$ " + parseFloat(dataa.amount.Payment_Mode_Amount[2]).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        );
        $("#PAYPAL").text(
            "$ " + parseFloat(dataa.amount.Payment_Mode_Amount[3]).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        );
        $("#GRANT").text(
            "$ " + parseFloat(dataa.amount.Payment_Mode_Amount[4]).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        );
        $("#").text(
            "$ " + parseFloat(dataa.amount.Payment_Mode_Amount[5]).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        );
    });
}


function charts(a, b) {
    var settings = {
        async: true,
        crossDomain: true,
        url: "/hpayment/" + a + "/" + b,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);

        var chart = Highcharts.stockChart("container", {
            chart: {
                type: "column",
            },

            title: {
                text: "Total Revenue",
            },
            credits: false,
            xAxis: {
                minRange: 1,
            },
            plotOptions: {
                series: { point: {} },
            },

            navigator: {
                series: {
                    color: "#00FF00",
                    animation: {
                        duration: 0,
                    },
                },
                legend: {
                    enabled: true,
                    itemStyle: {
                        fontSize: '10px',
                        fontWeight: '200',
                    }
                },
                xAxis: {
                    minRange: 1,
                },
            },
            yAxis: [{
                    lineWidth: 1,
                    opposite: false,
                    title: {
                        text: "Amount(USD)",
                    },
                },
                {
                    lineWidth: 1,
                    opposite: true,
                    title: {
                        text: "Cumulative Amount(USD)",
                    },
                },
            ],
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: function() {

                                URL =
                                    "/web/history/" +
                                    new Date(this.x).toLocaleString("sv-SE", {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                        hour12: false,
                                    });
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
            },

            series: [{
                    type: "column",
                    color: "#01a451",
                    name: "Amount",
                    data: dataa.WebHistory, //Fri, 14 Jul 2017 00:00:00 GMT
                    dataGrouping: {
                        enabled: false,
                    },
                },
                {
                    type: "line",
                    color: "#FF9933",
                    name: "Total Amount",
                    data: dataa.CumWebHistory,
                    yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
                    dataGrouping: {
                        enabled: false,
                    },
                },
            ],
        });
    });
    var settings = {
        async: true,
        crossDomain: true,
        url: "/hpayment/" + a + "/" + b,
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);

        var chart = Highcharts.stockChart("container2", {
            chart: {
                type: "column",
            },

            title: {
                text: "Mobile App Payment History",
            },
            credits: false,
            xAxis: {
                minRange: 1,
            },
            plotOptions: {
                series: { point: {} },
            },

            navigator: {
                series: {
                    color: "#00FF00",
                    animation: {
                        duration: 0,
                    },
                },
                legend: {
                    enabled: true,
                    itemStyle: {
                        fontSize: '10px',
                        fontWeight: '200',
                    }
                },
                xAxis: {
                    minRange: 1,
                },
            },
            yAxis: [{
                    lineWidth: 1,
                    opposite: false,
                    title: {
                        text: "Amount(USD)",
                    },
                },
                {
                    lineWidth: 1,
                    opposite: true,
                    title: {
                        text: "Cumulative Amount(USD)",
                    },
                },
            ],
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: function() {
                                URL =
                                    "/mobile/history/" +
                                    new Date(this.x).toLocaleString("sv-SE", {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                        hour12: false,


                                    });
                                $('#next').empty();
                                console.log(URL);
                                var modal2 = document.getElementById("myModal2");
                                modal2.style.display = "block";
                                $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
                                var gif = document.getElementById("gif");
                                gif.style.display = "block";
                                $('#btnExport').show();
                                createDynamic(URL);
                            },
                        },
                    },
                },
            },

            series: [{
                    type: "column",
                    color: "#01a451",
                    name: "Amount",
                    data: dataa.mobHistory, //Fri, 14 Jul 2017 00:00:00 GMT
                    dataGrouping: {
                        enabled: false,
                    },
                },
                {
                    type: "line",
                    color: "#FF9933",
                    name: "Total Amount",
                    data: dataa.CummobHistory,
                    yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
                    dataGrouping: {
                        enabled: false,
                    },
                },
            ],
        });
    });


    var settings = {
        async: true,
        crossDomain: true,
        url: "/revenaueyearly",
        method: "GET",
    };
    $.ajax(settings).done(function(response) {
        var dataa = JSON.parse(response);
        console.log(dataa);
        $(function() {
            $("#container4").highcharts({
                chart: {
                    // zoomType: "xy",
                     type: "column"
                 },
                 title: {
                     text: "Revenue by Year",
                 },
                 credits: {
                     enabled: false,
                 },
                 colors: ['#4F1FAF', '#462CEE', '#8AE02B', '#01A451'],
                 xAxis: [{
                     categories: dataa.data.year,
                     labels: {
                         style: {
                             fontSize: "8px",
                             rotation: 90,
                         },
                     }
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
                             text: "Revenue",
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
                    name: "District",
                    showInLegend: false,
                    color: "#01a451",
                   // type: "bar",
                    data: dataa.data.district,
                }, 
                    {
                    name: "Donation",
                    showInLegend: false,
                    color: "#8AE02B",
                   // type: "bar",
                    data: dataa.data.donation,
                }, 
                    {
                    name: "Foundation",
                    showInLegend: false,
                    color: "#462CEE",
                   // type: "bar",
                    data: dataa.data.foundation,
                }, 
                    {
                    name: "Mobile",
                    showInLegend: false,
                    color: "#05D36C",
                   // type: "bar",
                    data: dataa.data.mobile,
                }, 
                    {
                    name: "School",
                    showInLegend: false,
                    color: "#FFFF00",
                   // type: "bar",
                    data: dataa.data.school,
                }, 
            
            ],
            });
        });
    });
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
        console.log(response);
        var data1 = JSON.parse(response);

        $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>TYPE OF PAYMENT</th><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>AMOUNT</th></tr ></thead ><tbody></tbody>');

        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();



        $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><th>TYPE OF PAYMENT</th><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>AMOUNT</th></tr ></thead ><tbody></tbody>');
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
        '<td class="">' +
        userList[0] +
        "</td>" +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td class="">' +
        userList[4] +
        "</td>" +
        '<td>' + userList[5] + '</td>' +
        '<td>' + userList[6] + '</td>' +

        '</tr>'
    return dynamicDiv;

}


function createDynamic2(url) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        // success: function() {
        //     var gif = document.getElementById("gif");
        //     gif.style.display = "none";
        // },
    }
    $.ajax(settings).done(function(response) {
        var data1 = JSON.parse(response);

        $('#nextD').prepend('<table class="table table-striped custab table-fixed" id = "dataTableDefault" ><thead ><tr><th>TYPE OF PAYMENT</th><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>AMOUNT</th></tr ></thead ><tbody></tbody>');

        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv2(datain);

            $("#dataTableDefault").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTableDefault').append('</tbody></table>');
        dataTab2();



        $('#nextD1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTableDefault1" ><thead ><tr><th>TYPE OF PAYMENT</th><th>USER NAME</th><th>EMAIL ID</th><th>DEVICE USED</th><th>MODE OF PAYMENT</th><th>PAYMENT DATE</th><th>AMOUNT</th></tr ></thead ><tbody></tbody>');
        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];

            var resultDiv = createDynamicDiv2(datain);
            $("#dataTable").append(resultDiv);

        }
        $('#dataTable').append('</tbody></table>');
    })
}

function dataTab2() {

    $("#dataTableDefault").DataTable({
        "pageLength": 50
    });

}

function createDynamicDiv2(userList) {
    var dynamicDiv = '';
    console.log(userList)





    dynamicDiv += '<tr >' +
        '<td class="">' + userList[0] + "</td>" +
        '<td>' + userList[1] + '</td>' +
        '<td>' + userList[2] + '</td>' +
        '<td>' + userList[3] + '</td>' +
        '<td class="">' + userList[4] +
        "</td>" +
        '<td>' + userList[5] + '</td>' +
        '<td>' + userList[6] + '</td>' +
        '</tr>'
    return dynamicDiv;

}