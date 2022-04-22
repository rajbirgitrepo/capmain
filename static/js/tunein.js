var settings = {
  async: true,
  crossDomain: true,
  url: "/tuneincsycard",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log("hello22");
  console.log(dataa.other);
  $("#0c").text(dataa.data[0][1]);
  $("#1c").text(dataa.data[1][1]);
  $("#2c").text(dataa.data[2][1]);
  $("#3c").text(dataa.data[3][1]);

  $("#0h").text("Tune In Sent");
  $("#1h").text("Tune In Opt In");
  $("#2h").text("Tune In Opt Out");
  $("#3h").text("Parents Practised");

});

var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/tuneingraph",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
   

Highcharts.chart('container', {
chart: {
  type: 'column'
},title:{text:"Tune-In CSY"},
colors: [
            '#00a651',
             '#8ae02b',

  '#0000FF',
  '#FF5F1F'
             
             
          ],
xAxis: {
  categories: dataa.CSY.monthname,
  crosshair: true
},
yAxis: {
  min: 0,
  title: {
    text: 'Count'
  }
},
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    '<td style="padding:0"><b>{point.y}</b></td></tr>',
  footerFormat: '</table>',
  shared: true,
  useHTML: true
},
plotOptions: {
  column: {
    stacking: 'normal',
  },series: {
             point: {
              events: {
                  click: function () {
                    // console.log("hellooooo",this.category);
             
                    URL = '/tuneintable/CSY/'+this.category+"/"+this.series.name;
                   
                    console.log(URL);
                    
                  }}}
          }
},
series: [{
  name: 'Tune-in Send',
  data:   dataa.CSY.Tune_In_Send, 
  stack: 0
}, {
  name: 'Opt In',
  data:   dataa.CSY.Opt_In,
  stack: 0
}, {
  name: 'Opt Out',
  data:  dataa.CSY.Opt_Out,
  stack: 0
}, {
  name: 'Playback',
  data:  dataa.CSY.practicing_parent,
  stack: 0,
  color: '#4F1FAF'
}]
});
});


var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/tuneingraph",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
   

Highcharts.chart('container2', {
chart: {
  type: 'column'
},title:{text:"Tune-In LSY"},
colors: [
            '#00a651',
             '#8ae02b',

  '#0000FF',
  '#FF5F1F'
             
             
          ],
xAxis: {
  categories: dataa.LSY.monthname,
  crosshair: true
},
yAxis: {
  min: 0,
  title: {
    text: 'Count'
  }
},
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    '<td style="padding:0"><b>{point.y}</b></td></tr>',
  footerFormat: '</table>',
  shared: true,
  useHTML: true
},
plotOptions: {
  column: {
    stacking: 'normal',
  },series: {
             point: {
              events: {
                  click: function () {
                    // console.log("hellooooo",this.category);
             
                    URL = '/tuneintable/CSY/'+this.category+"/"+this.series.name;
                   
                    console.log(URL);
                    
                  }}}
          }
},
series: [{
  name: 'Tune-in Send',
  data:   dataa.LSY.Tune_In_Send, 
  stack: 0
}, {
  name: 'Opt In',
  data:   dataa.LSY.Opt_In,
  stack: 0
}, {
  name: 'Opt Out',
  data:  dataa.LSY.Opt_Out,
  stack: 0
}, {
  name: 'Playback',
  data:  dataa.LSY.practicing_parent,
  stack: 0,
  color: '#4F1FAF'
}]
});
});

$("#firstName").val('5f2609807a1c0000950bb477');
spyderchart('5f2609807a1c0000950bb477')



$(document).on('change','#firstName',function(){
  console.log(this.value)
  spyderchart(this.value)
  });


function spyderchart(a){

var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/tuneinspider/"+a,
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 
    console.log(dataa)




var nodes= dataa.nodes;

var links= dataa.links;
var attributes =dataa.attributes;




var viz = d3plus.viz()
.container("#viz")
.type("rings")
.data(nodes)
.id("name")
.width(1100)
.height(400)
.size('Tune-in Count')
.legend(false)
.edges(links)
.edges({"arrows": true})
.focus(dataa.nodes[0].name)
.font({ "family": "Helvetica" })
.tooltip(["names","Tune-in Count"] )
.tooltip({'size':false})
.attrs(attributes)
.color("hex")
// .mouse({
// "click": function(d, viz) {

//   console.log(d.name);
//   URL = 'https://cap4ganalytics.innerexplorer.org/schoolsearch/' +d.name;
//   //         Table();           
//   // P3();


//    }
// })
//.focus({
//"tooltip" : false
//})
.shape('circle')

.format({"text": function(text,key){
return text.toUpperCase()}
})
.draw()    });

}



// charts to show Tune in data program wise
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/programwise_tuneingraph",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
   console.log(dataa);

Highcharts.chart('container3', {
    chart: {
      type: 'column'
    },title:{text:"Tune-In By Program"},
    colors: [
              '#00a651',
              '#8ae02b',
              '#0000FF',
              '#FF5F1F'   
              ],
    xAxis: {
      categories: dataa.CSY.Program,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Count'
      }
    },
tooltip: {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    '<td style="padding:0"><b>{point.y}</b></td></tr>',
  footerFormat: '</table>',
  shared: true,
  useHTML: true
},
plotOptions: {
  column: {
    stacking: 'normal',
  },series: {
             point: {
              events: {
                  click: function () {
                    // console.log("hellooooo",this.category);
             
                    URL = '/tuneintable/CSY/'+this.category+"/"+this.series.name;
                   
                    console.log(URL);
                    
                  }}}
          }
},
series: [{
  name: 'Tune-in Send',
  data:   dataa.CSY.Tune_In_Send, 
  stack: 0
}, {
  name: 'Opt In',
  data:   dataa.CSY.Opt_In,
  stack: 0
}, {
  name: 'Opt Out',
  data:  dataa.CSY.Opt_Out,
  stack: 0
}, {
  name: 'Playback',
  data:  dataa.CSY.practicing_parent,
  stack: 0,
  color: '#4F1FAF'
}]
});
});




// charts for showing district wise data
// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "/Top20district_tunein",
//   "method": "GET"
//  }
//   $.ajax(settings).done(function (response) {
//   var dataa = JSON.parse(response);
//    console.log(dataa);

// Highcharts.chart('container4', {
//     chart: {
//       type: 'column'
//     },title:{text:"Tune-In By District"},
//     colors: [
//               '#00a651',
//               '#8ae02b',
//               '#0000FF',
//               '#FF5F1F'   
//               ],
//     xAxis: {
//       categories: dataa.CSY.District_Name,
//       // crosshair: true,
//       labels: {
//         style: {
//             fontSize: "10px",
//             rotation: 180,
//         },
//       }
//     },
//     yAxis: {
//       min: 0,
//       title: {
//         text: 'Count'
//       }
//     },
// tooltip: {
//   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//   pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//     '<td style="padding:0"><b>{point.y}</b></td></tr>',
//   footerFormat: '</table>',
//   shared: true,
//   useHTML: true
// },
// plotOptions: {
//   column: {
//     stacking: 'normal',
//   },series: {
//              point: {
//               events: {
//                   click: function () {
//                     // console.log("hellooooo",this.category);
             
//                     URL = '/tuneintable/CSY/'+this.category+"/"+this.series.name;
                   
//                     console.log(URL);
                    
//                   }}}
//           }
// },
// series: [{
//   name: 'Tune-in Send',
//   data:   dataa.CSY.Tune_In_Send, 
//   stack: 0
// }, {
//   name: 'Opt In',
//   data:   dataa.CSY.Opt_In,
//   stack: 0
// }, {
//   name: 'Opt Out',
//   data:  dataa.CSY.Opt_Out,
//   stack: 0
// }, {
//   name: 'Playback',
//   data:  dataa.CSY.practicing_parent,
//   stack: 0
// }]
// });
// });

