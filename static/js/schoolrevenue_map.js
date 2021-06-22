
var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "http://127.0.0.1:5000/schoolpaymentmap",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 

  // Initiate the chart
  $('#container3').highcharts('Map', {

      title : {
          text : 'Individual School Renewals (MAP VIEW)'
      },


      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },

      colorAxis: {
  min: 0,
      stops: [
        [0, '#b6edab'],
        [1, Highcharts.getOptions().colors[1]]
        
] },

      series : [{
          data : dataa.data,
          mapData: Highcharts.maps['countries/us/custom/us-all-territories'],
          joinBy: ['postal-code', 'code'],
          name: 'Random data',
        tooltip: {
        headerFormat: '<span style="font-weight:bold;">{point.name}</span><br>',
        pointFormat: '<span style="font-weight:bold">{point.name}</span><br>Total Amount:$<span style="font-size:12px">{point.value}<br>'
    },
        events: {
                  click: function (e) {
                      {
// alert(e.point.name); //changes here
URL = 'http://127.0.0.1:5000/schoolpaymentmaptable/'+e.point.name;
                        console.log(URL);
                       
                        $("#next").empty();
                        $("#btnExport").show();
                        console.log(URL);
                        createDynamic(URL);
                        cardscroll();
}
                  }
              },
          states: {
              hover: {
                  color: '#2CB527'
              }
          },
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }]
  });
});






