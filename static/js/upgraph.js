$(document).ready(function(){
  var url = window.location.href;
  var dashboard_name = document.getElementById('upcoming_renewals').innerText;
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


// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url":             "/d3_new_chart",
//   "method": "GET",
// error: function(){
// alert("error");
// }
//  }
//   $.ajax(settings).done(function (response) {
//   var dataa=JSON.parse(response);
// console.log(dataa)
// var a = dataa.Data_2020.Month_Name;
// var b = dataa.Data_2021.Month_Name;
// var c = a.concat(b);
// console.log(a);
// console.log(b);
// console.log(c);
// var options = {

// chart: {
//   renderTo: 'container2',
//   defaultSeriesType: 'column',
// zoomType:'y',



// },title: {
// text: "INDIVIDUAL SCHOOLS RENEWABLE"
// }, colors: [
//          '#00a651',
//          '#8ae02b',    
//       ],
// xAxis: {
//   categories: c
// },
// yAxis: [{ //Primary yAxis
// labels: {
//   format: '{value}',
//   style: {
//     color: '#000'
//   }
// },
// title: {
//   text: 'COUNT',
//   style: {
//     color: '#000'
//   }
// }
// }],    
// plotOptions: {
// series: {point: {
//           events: {
//               click: function () {
                
//                    // alert("/"+this.series.name.slice(5,8)+"/"+this.series.name.slice(0,4)+"/"+this.category);
                
//                URL = '/d3renewaltable/'+this.series.name.slice(5,8)+"/"+this.series.name.slice(0,4)+"/"+this.category;
//         $("#next").empty();
//         $("#btnExport").show();
//         console.log(URL);
//         createDynamic(URL);
//               }
//           }
//       }}
// },
// series: [{
// name: '2020 EXPIRING', data: dataa.Data_2020.Expiring_Schools},{
// name: '2020 ACTIVE',
// data: dataa.Data_2020.Active_Schools_csy,
// }]
// };
// var chart = new Highcharts.Chart(options);

// $("#list1").on('change', function(){
// //alert('f')
// var selVal = $("#list1").val();
// if(selVal == "2020" || selVal == '')
// {
//   options.series = [{name: '2020 EXPIRING', data:dataa.Data_2020.Expiring_Schools},{
// name: '2020 ACTIVE',
// data: dataa.Data_2020.Active_Schools_csy,
// }]
// }
// else if(selVal == "2021")
// {
//   options.series = [{name: '2021 EXPIRING', data: dataa.Data_2021.Expiring_Schools}, {
// name: '2021 ACTIVE',
// data: dataa.Data_2021.Active_Schools_csy
// }]
// }
// else if(selVal == "2022")
// {
//   options.series = [{name: '2022 EXPIRING',
// data: dataa.Data_2022.Expiring_Schools}, {
// name: '2022 ACTIVE',
// data: dataa.Data_2022.Active_Schools_csy,
// }]
// }
// else
// {
//   options.series = [{ name: '2023 EXPIRING',
// data: dataa.Data_2023.Expiring_Schools},{
// name: '2023 ACTIVE',
// data: dataa.Data_2023.Active_Schools_csy,
// }]
// } 
// var chart = new Highcharts.Chart(options);    
// });
// });


var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/d3_new_chart",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
    console.log(dataa);
    var a = dataa.Data_2020.Month_Name;
var b = dataa.Data_2021.Month_Name;
var c = a.concat(b);
console.log(a);
console.log(b);
console.log(c);

var d = dataa.Data_2020.Expiring_Schools;
var f = dataa.Data_2021.Expiring_Schools;
var e = d.concat(f);
console.log(d);
console.log(f);
console.log(e);

var g = dataa.Data_2020.Active_Schools_csy;
var h = dataa.Data_2021.Active_Schools_csy;
var i = g.concat(h);
console.log(g);
console.log(h);
console.log(i);

Highcharts.chart('container2', {
  chart: {
      type: 'column'
  },
colors: [
           
  '#4da555',' #83D475',
             
             
          ],
  title: {
      text: 'D3 Renewal Jul 2020 to Dec 2021'
  },
  xAxis: {
      categories: c,
      min: 0,
      crosshair: false
  },
  yAxis: {
    lineWidth: 1,
      min: 0,
      title: {
          text: ' User Count'
      }
  },
  tooltip: {
      headerFormat: '<span>{point.x}:2020</span><br>',
      pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}<b>{series.data2}'
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      },
      series: {
             point: {
              events: {
                  click: function () {
                    // console.log("hellooooo",this.category);
                    
                    URL = 'https://schooldashb.herokuapp.com/renewal20/'+this.category+"/"+this.series.name.slice(18,24);
                    
                    console.log(URL);
                     Table2()
                  }}}
          }},
 series: [{

              name: 'Expiring',
              data: e
          },
          {
              
            name: 'Practising (CSY)',
            data: i
        }
        ]
});

});


var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "/cloud_new_chart",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
    console.log(dataa);
    var a = dataa.Data_2020.Month_Name;
var b = dataa.Data_2021.Month_Name;
var c = a.concat(b);
console.log(a);
console.log(b);
console.log(c);

var d = dataa.Data_2020.Expiring_Schools;
var f = dataa.Data_2021.Expiring_Schools;
var e = d.concat(f);
console.log(d);
console.log(f);
console.log(e);

var g = dataa.Data_2020.Active_Schools_csy;
var h = dataa.Data_2021.Active_Schools_csy;
var i = g.concat(h);
console.log(g);
console.log(h);
console.log(i);

Highcharts.chart('container3', {
  chart: {
      type: 'column'
  },
colors: [
           
  '#4da555',' #83D475',
             
             
          ],
  title: {
      text: 'Cloud Renewal Jul 2020 to Dec 2021'
  },
  xAxis: {
      categories: c,
      min: 0,
      crosshair: false
  },
  yAxis: {
    lineWidth: 1,
      min: 0,
      title: {
          text: ' User Count'
      }
  },
  tooltip: {
      headerFormat: '<span>{point.x}:2020</span><br>',
      pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}<b>{series.data2}'
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      },
      series: {
             point: {
              events: {
                  click: function () {
                    // console.log("hellooooo",this.category);
                    
                    URL = 'https://schooldashb.herokuapp.com/renewal20/'+this.category+"/"+this.series.name.slice(18,24);
                    
                    console.log(URL);
                     Table2()
                  }}}
          }},
 series: [{

              name: 'Expiring',
              data: e
          },
          {
              
            name: 'Practising (CSY)',
            data: i
        }
        ]
});

});




var data=[5,
  2,
  428,
  75,
  38,
  5,
  4,
  1330,
  417,
  104,
  302,
  34,
  2,
  2,
  20,
  5,
  3,
  2,
  67,
  ]
  const chart = Highcharts.chart('container125', {
      chart: {
        zoomType: 'xy',
        type:'column'
      },
      title: {
        text: "RENEWABLE REVENUE PROJECTION"
      }
  ,colors: [
                 '#006400',
                  '#228B22',
                 '#8ae02b',
                  '#00BFFF',
                   '#f9a160'
  
                 
                 
              ],
      xAxis: [{
        categories: ['Oct 2020',
  'Nov 2020',
  'Dec 2020',
  'Jan 2021',
  'Feb 2021',
  'Mar 2021',
  'May 2021',
  'Jun 2021',
  'Jul 2021',
  'Aug 2021',
  'Sep 2021',
  'Oct 2021',
  'Nov 2021',
  'Dec 2021',
  'Jan 2022',
  'Feb 2022',
  'Mar 2022',
  'Apr 2022',
  'Jun 2022',
  ],labels: {
              rotation: 0
          }
      }],
      yAxis: [{ //Primary yAxis
        lineWidth:1,
        labels: {
          format: '{value}',
          style: {
            color: '#000'
          }
        },
        title: {
          text: 'School Count',
          style: {
            color: '#000'
          }
        }
      }, {//Secondary yAxis
        title: {
          text: 'Amount($)',
          style: {
            color: '#4572A7'
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: '#4572A7'
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true},
    series: [{
      name:"Count of school",
      type:"column",
      data: data
    }]
  
  });
  //////////////////RANGE SELECTOR////////////////
  let rangeInput = document.querySelector(".range-input input");
  let rangeValue = document.querySelector(".range-input .value div");
  
  // var month;
  // function output(){
  //   month = document.getElementById('month').value;
  //   alert(month);
  // }
  // console.log(month)
  
  
  let  start = parseFloat(rangeInput.min);
  let end = parseFloat(rangeInput.max);
  let step = parseFloat(rangeInput.step);
  
  for(let i=start;i<=end;i+=step){
    rangeValue.innerHTML += '<div>'+i+'</div>';
  }
  rangeInput.addEventListener("input",function(){
    let top = parseFloat(rangeInput.value)/step * -40;
    rangeValue.style.marginTop = top+"px";
    console.log(top);
  /////////CHART////////////////
   
    const chart = Highcharts.chart('container125', {
      chart: {
        zoomType: 'xy',
        type:'column'
      },
      title: {
        text: "RENEWABLE REVENUE PROJECTION"
      }
  ,colors: [
                 '#006400',
                  '#228B22',
                 '#8ae02b',
                  '#00BFFF',
                   '#f9a160'
  
                 
                 
              ],
      xAxis: [{
        categories: ['Oct 2020',
  'Nov 2020',
  'Dec 2020',
  'Jan 2021',
  'Feb 2021',
  'Mar 2021',
  'May 2021',
  'Jun 2021',
  'Jul 2021',
  'Aug 2021',
  'Sep 2021',
  'Oct 2021',
  'Nov 2021',
  'Dec 2021',
  'Jan 2022',
  'Feb 2022',
  'Mar 2022',
  'Apr 2022',
  'Jun 2022',
  ],labels: {
              rotation: 0
          }
      }],
      yAxis: [{ //Primary yAxis
        lineWidth:1,
        labels: {
          format: '{value}',
          style: {
            color: '#000'
          }
        },
        title: {
          text: 'School Count',
          style: {
            color: '#000'
          }
        }
      }, {//Secondary yAxis
        title: {
          text: 'Amount($)',
          style: {
            color: '#4572A7'
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: '#4572A7'
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true},
    series: [{
      name:"Count of school",
      type:"column",
      data: data
    }]
  
  });
  
  
    ///////////Expected_renewable///////
    var Expected_renewable = [];
    var i;
  for (i = 0; i < data.length; i++) {
    Expected_renewable.push((data[i]*rangeInput.value)/100);
  }
    ///////////Expected_revanue///////
    var Expected_revanue = [];
    var i;
  for (i = 0; i < Expected_renewable.length; i++) {
    Expected_revanue.push(Expected_renewable[i]*1000);
  }
  //////////////CUMULATIVE///////
   const accumulate = arr => arr.map((sum => value => sum += value)(0));
   var Cumulative=accumulate(Expected_revanue);
   // var expected_revanew=for i in data
    console.log(Expected_renewable)
    console.log(Expected_revanue)
    console.log(Cumulative)
    ///////////////add series to chart////////////
  // chart.series[0].addPoint(parseInt(rangeInput.value))
   chart.addSeries({  
      name:"Expected_renewable",
                  type:"column",
                  data:Expected_renewable
              });
     chart.addSeries({  
       yAxis:1, name:"Expected_revanue",
                  type:"line",
                  data:Expected_revanue
              });
    chart.addSeries({  
       yAxis:1,name:"Cumulative",
                  type:"line",
                  data:Cumulative
              });
  });


  