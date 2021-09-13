// $("#gifcards").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
// $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
// var gif = document.getElementById("gifcards");
// gif.style.display = "none";

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


console.log('/oms')
var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/oms',
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);

    $('#Total_Lead1').text("$" + dataa.cards.District);
    $('#Total_Lead2').text(dataa.cards.Invoice_sent);
    $('#Total_Lead3').text("$" + dataa.cards.School);
    $('#Total_Lead4').text(dataa.cards.Total_orders);
    $('#Total_Lead5').text("$" + dataa.cards.Total_revenue);


});



var settings = {
    "async": true,
    "crossDomain": true,
    "url": "/oms",
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);

    var chart = Highcharts.stockChart('container2', {
        chart: {
            type: 'column'
        },

        title: {
            text: 'Total Revenue(OMS)'
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
                text: 'Amount($)'
            }
        }, {
            lineWidth: 1,
            opposite: true,
            title: {
                text: 'Cumulative Amount($)'
            }
        }],
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function() {

                            var a = new Date(this.x).toLocaleString('sv-SE', { day: 'numeric', month: 'numeric', year: 'numeric', hour12: false });

                            URL = '/donationcsytable/' + a;
                            console.log(URL);
                            $("#next").empty();
                            $("#btnExport").show();
                            console.log(URL);
                            createDynamic(URL);

                        }
                    }
                }
            }
        },

        series: [{
                type: 'column',
                color: '#01a451',
                name: 'Amount',
                data: dataa.Timeseries.TOTAL_AMOUNT, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                },

            },
            {
                type: 'line',
                color: '#FF9933',
                name: 'Total Amount',
                data: dataa.Timeseries.Cumulative,
                yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
                dataGrouping: {
                    enabled: false,
                },

            }
        ]

    });
});


var settings = {
    async: true,
    crossDomain: true,
    url: "/oms",
    method: "GET",
};
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    $(function() {
        $("#container5").highcharts({
            chart: {
                zoomType: "xy",
                type: "column"
            },
            title: {
                text: "Revenue By Order Type(OMS)",
            },
            colors: ['#01A451'],
            xAxis: [{
                    categories: dataa.chart2.Order_type,
                    labels: {
                        rotation: 0,
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
                        text: "Amount($)",
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
            series: [{
                name: 'Total Amount',
                data: dataa.chart2.TOTAL_AMOUNT
            }],
        });
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

        $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>FOUNDATION</th><th>NAME</th><th>CREATED DATE</th><th>TOTAL AMOUNT</th><th>LICENSE TYPE</th><th>ORDER TYPE</th><th>EMAIL</th></tr ></thead ><tbody></tbody>');

        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();



        $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><th>FOUNDATION</th><th>NAME</th><th>CREATED DATE</th><th>TOTAL AMOUNT</th><th>LICENSE TYPE</th><th>ORDER TYPE</th><th>EMAIL</th></tr ></thead ><tbody></tbody>');
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