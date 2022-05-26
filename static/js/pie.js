var d = new Date();
var currMonth = d.getMonth() + 1;
var currYear = d.getFullYear();
var currDate = d.getDate();

var startDate = new Date(currYear, currMonth, currDate);
// console.log(startDate);
var e = "2021-07-01";
var f = currYear + "-" + currMonth + "-" + currDate;

var settings = {
    async: true,
    crossDomain: true,
    url: "/modetype" + "/" + e + "/" + f,
    method: "GET",
};
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    const total =
        dataa.amount.Payment_Mode_Amount[0] +
        dataa.amount.Payment_Mode_Amount[1] +
        dataa.amount.Payment_Mode_Amount[2] +
        dataa.amount.Payment_Mode_Amount[3] +
        dataa.amount.Payment_Mode_Amount[4];

    $("#Total_amount2").text("$ " + parseFloat(total).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


    Highcharts.chart('containerpie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height: 230,
            width: 200,
            type: 'pie'
        },
        title: {
            text: '',
        },
        tooltip: {
            pointFormat: '{series.name}: <br>{point.y}</>'
        },
        accessibility: {
            point: {
                valueSuffix: ''
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
                    "#02A45A", "#03B761", "#05D36C", "#04C065", "#35D461",
                ]
            }
        },
        credits: false,
        series: [{
            name: 'Amount',
            colorByPoint: true,
            data: [{
                name: dataa.amount.Payment_Mode[0],
                y: dataa.amount.Payment_Mode_Amount[0]
            }, {
                name: dataa.amount.Payment_Mode[1],
                y: dataa.amount.Payment_Mode_Amount[1]
            }, {
                name: dataa.amount.Payment_Mode[2],
                y: dataa.amount.Payment_Mode_Amount[2]
            }, {
                name: dataa.amount.Payment_Mode[3],
                y: dataa.amount.Payment_Mode_Amount[3]
            }, {
                name: dataa.amount.Payment_Mode[4],
                y: dataa.amount.Payment_Mode_Amount[4]
            }, {
                name: dataa.amount.Payment_Mode[5],
                y: dataa.amount.Payment_Mode_Amount[5]
            }]
        }]
    });


});