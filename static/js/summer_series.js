var settings = {
    "async": true,
    "crossDomain": true,
    "url": "/summer_series",
    "method": "GET"
}
$.ajax(settings).done(function(response){
    var dataa = JSON.parse(response);
    console.log(dataa);
});






// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "/awschart",
//     "method": "GET"
// }
// $.ajax(settings).done(function(response) {
//     var dataa = JSON.parse(response);
//     // console.log(dataa);

//     chart = new Highcharts.StockChart({

//         chart: {
//             renderTo: 'container1',
//             zoomType: 'x'
//         },
//         title: {
//             text: 'Aws Cost Vs User Growth'
//         },
//         subtitle: {
//             text: ''
//         },
//         legend: {
//             enabled: true,
//             itemStyle: {
//                 fontSize: '10px',
//                 fontWeight: '200'
//             }
//         },
//         xAxis: [{
//             type: 'datetime',
//             events: {
//                 afterSetExtremes() {
//                     let bottomAxis = this,
//                         topAxis = this.chart.xAxis[1];
//                     topAxis.setExtremes(bottomAxis.min - 86400000, bottomAxis.max - 86400000, true)
//                 }
//             }
//         }, {
//             type: 'datetime',
//             opposite: true,
//             visible: false
//         }],

//         yAxis: [{
//             visible: true,
//             opposite: false,
//             showLastLabel: true,
//             title: {
//                 text: 'Playback Count'
//             },
//             labels: {
//                 enabled: true,
//                 format: "{value}",
//                 align: "right"
//             },
//         }, {
//             visible: true,
//             opposite: false,
//             showLastLabel: true,
//             opposite: true,
//             title: {
//                 text: 'Cost'
//             },
//             labels: {
//                 enabled: true,
//                 format: "{value}",
//                 align: "left"
//             },
//         }],

//         tooltip: {
//             pointFormatter: function() {
//                 return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + Highcharts.numberFormat(this.y, 2);
//             }
//         },

//         legend: {
//             enabled: true
//         },

//         navigator: {
//             enabled: true
//         },
//         rangeSelector: {
//             inputEnabled: false,
//             enabled: true
//         },

//         scrollbar: {
//             enabled: true
//         },

//         navigation: {
//             buttonOptions: {
//                 enabled: true
//             }
//         },
//         plotOptions: {
//             column: {
//                 stacking: 'normal'

//             },
//             series: {
//                 marker: {
//                     enabled: false
//                 }
//             }
//         },

//         series: [{
//             "name": "Cost",
//             "type": "line",
//             "color": "#FF9933",
//             "xAxis": 0,
//             "data": dataa.growth.Cost,
//             yAxis: 1
//         }, {
//             "name": "Family",
//             "type": "column",
//             "xAxis": 1,
//             "color": "#8AE02B",
//             "data": dataa.growth.Family_Users
//         },
//          {
//             "name": "Teacher",
//             "type": "column",
//             "xAxis": 1,
//             "color": "#01A451",
//             "data": dataa.growth.School_Users
//         },
//          {
//             "name": "Clever",
//             "type": "column",
//             "xAxis": 1,
//             "color": "#4bbf5b",
//             "data": dataa.growth.Clever_users
//         },
//          {
//             "name": "Schoology",
//             "type": "column",
//             "xAxis": 1,
//             "color": "#462cee",
//             "data": dataa.growth.Schoology_users
//         },
//          {
//             "name": "Canvas",
//             "type": "column",
//             "xAxis": 1,
//             "color": "#4f1faf",
//             "data": dataa.growth.Canvas_users
//         },
//     ]
//     });
// });