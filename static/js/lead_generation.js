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


console.log('/Lead_Generation')
var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/Lead_Generation',
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);

    $('#Total_Lead1').text(dataa.Total_lead_count);
    $('#Total_Lead3').text(dataa.Total_conversion_remaining_count);
    $('#Total_Lead2').text(dataa.Total_conversion_count);

});



var settings = {
    async: true,
    crossDomain: true,
    url: "/Lead_Generation",
    method: "GET",
};
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    console.log(dataa);
    $(function() {
        $("#container2").highcharts({
            chart: {
                zoomType: "xy",
                type: "column"
            },
            title: {
                text: "Lead Generation Chart",
            },
            colors: ['#01A451'],
            xAxis: [{
                    categories: dataa.Lead_Type_name,
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
                    name: 'Lead Type',
                    data: dataa.Lead_Type_count
                }
                // {
                //     name: 'Lead Name',
                //     data: dataa.Lead_Type_name
                // }
            ],
        });
    });
});


var settings = {
    async: true,
    crossDomain: true,
    url: "/Lead_Generation",
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
                text: "Lead Generation By Date(CSY)",
            },
            colors: ['#01A451'],
            xAxis: [{
                    categories: dataa.payment_date_date,
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
                //     name: 'Date',
                //     data: dataa.payment_date_date
                // },
                {
                    name: 'Count',
                    data: dataa.payment_date_count
                }
            ],
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

        $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>Sub Title</th><th>Description</th><th>Date</th><th>Lead Type</th><th>Conversion</th><th>Renewal Date</th><th>Last Payment Amount</th></tr ></thead ><tbody></tbody>');

        for (var i = 0; i < data1.data.length; i++) {


            var datain = data1.data[i];
            var resultDiv = createDynamicDiv(datain);

            $("#dataTable").append(resultDiv);




        }
        //$('#dataTable1').append('</tbody></table>');
        $('#dataTable').append('</tbody></table>');
        dataTab();



        $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><th>Sub Title</th><th>Description</th><th>Date</th><th>Lead Type</th><th>Conversion</th><th>Renewal Date</th><th>Last Payment Amount</th></tr ></thead ><tbody></tbody>');
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