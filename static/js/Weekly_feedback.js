
$(function() {
  $( "#datepicker" ).datepicker({
changeMonth: true,
changeYear: true,
yearRange: "2018:2021",
dateFormat : "yy-mm-dd",
onSelect: function(dateText, inst) {
  $( "#stardate" ).text(dateText);
     }
  });
            var d = new Date();
           var currMonth = d.getMonth();
           var currYear = d.getFullYear();
           var currDate = d.getDate();
           var startDate = new Date(currYear, currMonth, currDate);
           $("#datepicker").datepicker("setDate", startDate);
});

function sub (){
  var a = document.getElementById("stardate").innerText;
  charts(a);
  cardscount(a);
}

var d = new Date();
var currMonth = d.getMonth()+1;
           var currYear = d.getFullYear();
           var currDate = d.getDate();

           var startDate = new Date(currYear, currMonth, currDate);
           console.log(startDate);
var f = currYear +"-"+currMonth +"-"+currDate;
charts(f);
cardscount(f);
// $("#fromd").text(e);
  $("#stardate").text(f);
  $('#firstnametable').change(function(){
    var a = document.getElementById("stardate").innerText;
    var b = $(this).val();
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://127.0.0.1:5000/districtddtcard/"+a+"/"+b,
      "method": "GET"
     }
      $.ajax(settings).done(function (response) {
      var dataa=JSON.parse(response); 
       console.log(dataa,"hello frnd")
    Highcharts.chart('container4', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Feedback Comparison (WEEKLY)'
      },
      colors: [
        '#a0afb0','#8AE02B','#a5b0a5',
        '#01A451'   
                   ],
                   xAxis: {
                    categories:['5 star' , '4star', '3 star','2star'],
                    crosshair: true
                  },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Feedbacks'
      }
    },
    legend: {
      enabled: true,
      itemStyle: {
          fontSize: '10px',
          fontWeight: '200',
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: { series: {point: {
                  events: {
                      click: function () {
                        //console.log("hellooooo",this);
                          // alert(' value: ' + this.series.name[0]);
                        URL = 'http://127.0.0.1:5000/coomentperfeedbacktable/'+this.name;
            console.log(URL);
                      }
                  }}},
        stacking: 'normal',
      }
    },
    series: [{
      name: 'PARENT RATING 5 LAST WEEK',
      data: dataa.rating_data.Parents_rating_last_week,
      stack: 1
    }, {
      name: 'PARENT RATING 5 LAST TO LAST WEEK',
      data:dataa.rating_data.Parents_rating_before_lastweek,
      stack: 0
    },{
      name: 'CLASSROOM RATING 5 LAST WEEK',
      data: dataa.rating_data.Teachers_rating_last_week,
      stack: 1
    }, {
      name: 'CLASSROOM RATING 5 LAST TO LAST WEEK',
      data: dataa.rating_data.teachers_rating_before_lastweek,
      stack: 0
    }]
    });
    });

}); 



function charts(a){

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": 'http://127.0.0.1:5000/word_cloud_feedback_weekly/'+a,
    "method": "GET",
   }
   $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
  
    // $( "#avgrate" ).text(dataa.avg_rating);
  
  
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  
  var chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
  var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
  
  series.accuracy = 4;
  series.step = 15;
  series.rotationThreshold = 0.7;
  series.maxCount = 200;
  series.minWordLength = 2;
  series.labels.template.tooltipText = "{word}: {value}";
  series.fontFamily = "Courier New";
  series.maxFontSize = am4core.percent(30);
  
  series.text =dataa.word_cloud; 
     
  
  
    Chart.defaults.global.defaultFontFamily = "Lato";
    
    // var horizontalBarChart = new Chart(horizontalBarChartCanvas, {
    //    type: 'horizontalBar',
    //    data: {
    //       labels: dataa.label,
    //       datasets: [{
    //          data: dataa.count,
    //          backgroundColor: ["#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555", "#4da555","#4da555", "#4da555", "#4da555"], 
    //       }]
    //    },
    //    options: {
    //       tooltips: {
    //         enabled: true
    //       },
    //       responsive: true,
    //       legend: {
    //          display: false,
    //          position: 'bottom',
    //          fullWidth: true,
    //          labels: {
    //            boxWidth: 10,
    //            padding: 50
    //          }
    //       },
    //       scales: {
    //          yAxes: [{
    //            barPercentage: 0.75,
    //            gridLines: {
    //              display: true,
    //              drawTicks: true,
    //              drawOnChartArea: false
    //            },
    //            ticks: {
    //              fontColor: '#555759',
    //              fontFamily: 'Lato',
    //              fontSize: 11
    //            }
                
    //          }],
    //          xAxes: [{
    //              gridLines: {
    //                display: true,
    //                drawTicks: false,
    //                tickMarkLength: 5,
    //                drawBorder: false
    //              },
    //            ticks: {
    //              padding: 5,
    //              beginAtZero: true,
    //              fontColor: '#ffffff',
    //              fontFamily: 'Lato',
    //              fontSize: 11,
    //              callback: function(label, index, labels) {
    //               return label/1000;
    //              }
                   
    //            },
    //             scaleLabel: {
    //               display: true,
    //               padding: 10,
    //               fontFamily: 'Lato',
    //               fontColor: '#555759',
    //               fontSize: 16,
    //               fontStyle: 700,
    //               labelString: ''
    //             },
               
    //          }]
    //       }
    //    }
    // });

  });



var b = '5f2609807a1c0000950bb45a'
var feedurl = "http://127.0.0.1:5000/districtddtcard/"+a+"/"+b;
console.log(feedurl);
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": feedurl,
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
     console.log(dataa,"hello frnd")
  Highcharts.chart('container4', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Feedback Comparison (WEEKLY)'
    },
    colors: [
      '#a0afb0','#8AE02B','#a5b0a5',
      '#01A451'   
                 ],
                 xAxis: {
                  categories:['5 star' , '4star', '3 star','2star'],
                  crosshair: true
                },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of Feedbacks'
    }
  },
  legend: {
    enabled: true,
    itemStyle: {
        fontSize: '10px',
        fontWeight: '200',
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: { series: {point: {
                events: {
                    click: function () {
                      //console.log("hellooooo",this);
                        // alert(' value: ' + this.series.name[0]);
                      URL = 'http://127.0.0.1:5000/coomentperfeedbacktable/'+this.name;
          console.log(URL);
                    }
                }}},
      stacking: 'normal',
    }
  },
  series: [{
    name: 'PARENT RATING 5 LAST WEEK',
    data: dataa.rating_data.Parents_rating_last_week,
    stack: 1
  }, {
    name: 'PARENT RATING 5 LAST TO LAST WEEK',
    data:dataa.rating_data.Parents_rating_before_lastweek,
    stack: 0
  },{
    name: 'CLASSROOM RATING 5 LAST WEEK',
    data: dataa.rating_data.Teachers_rating_last_week,
    stack: 1
  }, {
    name: 'CLASSROOM RATING 5 LAST TO LAST WEEK',
    data: dataa.rating_data.teachers_rating_before_lastweek,
    stack: 0
  }]
  });
  });


  var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/top_20_district_weekly/"+a,
    "method": "GET"
    }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
     console.log(dataa,"hello frnd")
    var a = parseInt();
    
    Highcharts.chart('container10', {
    chart: {
    type: 'column'
    },
    colors: [
           
  '#00a651', '#8ae02b',
           
           
        ],
    title: {
    text: 'Top 20 District Practices'
    },
    xAxis: {
    categories: dataa.district,
    crosshair: false
    },
    yAxis: {
    min: 0,
    title: {
        text: 'Practice Count'
    }
    },
    tooltip: {
    headerFormat: '<span>{point.x}</span><br>',
    pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}'
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
              
                 $('#next').empty();
                 $('#next1').empty();
                        
                 URL = 'http://127.0.0.1:5000/teachers_practice_tablee_weekly/'+this.category;
                 $('#btnExport').show();
                 console.log(URL);
                 createDynamic(URL)
               
              
                }}}
        }},
    series: [{
            name: 'Practice Count',
            data: dataa.practice
        }
      ]
    });
    }
    
    
    );


var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "http://127.0.0.1:5000/comparison1/"+a,
  "method": "GET"
  }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 
   console.log(dataa,"hello frnd")
  var a = parseInt();
  
  Highcharts.chart('container', {
  chart: {
  type: 'column'
  },
  colors: [
         
  '#CACACA','#00a651', '#8ae02b',
         
         
      ],
  title: {
  text: 'Practice Count Weekly Comparison (CLASSROOM)'
  },
  xAxis: {
  categories: dataa.weekdata.day,
  crosshair: false
  },
  yAxis: {
  min: 0,
  title: {
      text: 'Practice Count'
  }
  },
  tooltip: {
  headerFormat: '<span>{point.x}</span><br>',
  pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}'
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
            
               $('#next').empty();
               $('#next1').empty();
                      
               URL = 'http://127.0.0.1:5000/teachers_practice_tablee_weekly/'+this.category;
               $('#btnExport').show();
               console.log(URL);
               createDynamic(URL)
             
            
              }}}
      }},
  series: [{
          name: 'Practice Count Last to Last week',
          data: dataa.weekdata.count_last_to_last_week_teachers
      }, {
          name: 'Practice Count Last Week',
          data: dataa.weekdata.count_last_week_teachers
      }
    ]
  });
  }
  
  
  );
  
  var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "http://127.0.0.1:5000/comparison1/"+a,
  "method": "GET"
  }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 
   console.log(dataa,"hello frnd")
  
  
  Highcharts.chart('container2', {
  chart: {
  type: 'column'
  },
  colors: [
         
  '#CACACA','#00a651', '#8ae02b',
         
         
      ],
  title: {
  text: 'Practice Count Weekly Comparison  (Home)'
  },
  xAxis: {
  categories: dataa.weekdata.day,
  crosshair: false
  },
  yAxis: {
  min: 0,
  title: {
      text: 'Prcatice Count'
  }
  },
  tooltip: {
  headerFormat: '<span>{point.x}</span><br>',
  pointFormat: '<span>{series.name}</span><span{point.name}></span>: <b>{point.y}'
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
            
               $('#next').empty();
               $('#next1').empty();
                      
               URL = 'http://127.0.0.1:5000/parents_practice_tablee_weekly/'+this.category;
               $('#btnExport').show();
               console.log(URL);
               createDynamic(URL)
             
            
              }}}
      }},
  series: [{
          name: 'Count Last to Last Week homes',
          data: dataa.weekdata.count_last_to_lastweek_parents
      }, {
          name: 'Count Last Week homes',
          data: dataa.weekdata.count_last_week_parents
      }
    ]
  });
  }
  
  
  );

  
var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "http://127.0.0.1:5000/AVG_audio_completion_weekly_less_50/"+a,
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
Highcharts.chart('container5', {
chart: {
type: 'column'
},
title: {
text: 'Average Audio Completion Weekly'
},
subtitle: {
text: ''
},
xAxis: {
categories: dataa.temp.percentage_of_audio_completed[0],
tickmarkPlacement: 'on',
title: {
enabled: false
}
}
,yAxis: [ {
  lineWidth: 1,
  opposite: false,
  title: {
      text: 'Count'
  }
},{
  lineWidth: 1,
  opposite: true,
  title: {
      text: 'Cumulative Count'
  }
}],
tooltip: {
split: true,
valueSuffix: ''
},
plotOptions: {
area: {
stacking: 'normal',
lineColor: '#666666',
lineWidth: 1,
marker: {
  lineWidth: 1,
  lineColor: '#666666',
  enabled : false
}
}
},
series: [{
name: 'Cumulative Audio Completion',
color:'#DCDCDC',
type:"area",
data: dataa.temp.cumulative_audio_completion
}, {
name: 'Audio Completion',
color:'#00a651',
yAxis:0,

data: dataa.temp.number_of_audios_compelted
}]
});
    });


    var settings = {
      "async": true,
      "crossDomain": true,
      "url":             "http://127.0.0.1:5000/AVG_audio_completion_weekly_more_50/"+a,
      "method": "GET"
     }
      $.ajax(settings).done(function (response) {
      var dataa=JSON.parse(response);
Highcharts.chart('container6', {
chart: {
  type: 'column'
},
title: {
  text: 'Average Audio Completion Weekly (Greater Than 50%)'
},
subtitle: {
  text: ''
},
xAxis: {
  categories: dataa.temp.percentage_of_audio_completed[0],
  tickmarkPlacement: 'on',
  title: {
    enabled: false
  }
}
,yAxis: [ {
      lineWidth: 1,
      opposite: false,
      title: {
          text: 'Count'
      }
  },{
      lineWidth: 1,
      opposite: true,
      title: {
          text: 'Cumulative Count'
      }
  }],
tooltip: {
  split: true,
  valueSuffix: ''
},
plotOptions: {
  area: {
    stacking: 'normal',
    lineColor: '#666666',
    lineWidth: 1,
    marker: {
      lineWidth: 1,
      lineColor: '#666666',
      enabled : false
    }
  }
},
series: [{
  name: 'Cumulative Audio Completion',
  color:'#DCDCDC',
  type:"area",
  data: dataa.temp.cumulative_audio_completion
}, {
  name: 'Audio Completion',
  color:'#00a651',
  yAxis:0,
 
  data: dataa.temp.number_of_audios_compelted
}]
});
        });


        var settings = {
          "async": true,
          "crossDomain": true,
          "url":             "http://127.0.0.1:5000/Weekly_power_users_having_streaks/"+a,
          "method": "GET"
         }
          $.ajax(settings).done(function (response) {
          var dataa=JSON.parse(response); 
            console.log(dataa[0].bar,"data")
           
        
        
        
        
        Highcharts.chart('container7', {
          chart: {
              type: 'column'
          },
          credits: {
            enabled: false,
          },
          title: {
              text: 'Streaks by Weekly User'
            
          },colors: ['#8ae02b','#00a651'],
          xAxis: {
              categories: dataa[0].STREAK
          },
          yAxis: {lineWidth:1,
              min: 0,
              title: {
                  text: 'User Count'
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
          plotOptions: {series: {point: {
                   
                  }},
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
          series: [ {
              name: 'Number of Streaks Home',
              data: dataa[0].number_of_streaks_Home
          },
          
            {
           
              name: 'Number of Streaks Classroom',
              data: dataa[0].number_of_streaks_classroom
          }]
        });});
        
      }


      function cards2(URL) {  var dated = document.getElementById("stardate").innerText;
      var mainURL = URL + '/' + dated;
        $('#next').empty();
        console.log(mainURL);
        var modal2 = document.getElementById("myModal2");
        modal2.style.display = "block";
        $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='http://127.0.0.1:5000/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
        var gif = document.getElementById("gif");
      gif.style.display = "block";
        $('#btnExport').show();
        createDynamic2(mainURL)
    
      }  

var settings = {
  "async": true,
  "crossDomain": true,
  "url": 'http://127.0.0.1:5000/chartdesc',
  "method": "GET"
 }
 $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
  console.log("this is jira");
$('#jira').text(dataa.bounce);
 $('#jirac').text(dataa.avgtime);
$('#jirae').text(dataa.New);
$('#App_Uninstall').text(dataa.App_Uninstall);
$('#Crashes').text(dataa.Crashes);
$('#App_exception').text(dataa.App_exception);
$('#users_impacted').text(dataa.users_impacted);
$('#payment_decrease').text(dataa.payment_decrease);

 });
// INCLUDE JQUERY & JQUERY UI 1.12.1
$( function() {
$( "#datepicker" ).datepicker({
  dateFormat: "yy-mm-dd"
  ,	duration: "fast"
});
} );
function giveDate(){
var a = document.getElementById("datepicker").value;;
alert(a);
}






function createDynamic(url){

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
$.ajax(settings).done(function (response) {
var data1=JSON.parse(response);

$('#next').prepend('<table class="display" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PROGRAM NAME</th><th>RATING</th><th>COMMENT</th><th>AUDIO DAY</th></thead ><tbody>');
for(var i=0;i<data1.data.length;i++){


var datain = data1.data[i];
var resultDiv = createDynamicDiv(datain);
$("#dataTable").append(resultDiv);
}
//$('#dataTable1').append('</tbody></table>');
$('#dataTable').append('</tbody></table>');
dataTab();



$('#next1').prepend('<table class="display" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PROGRAM NAME</th><th>RATING</th><th>COMMENT</th><th>AUDIO DAY</th></thead ><tbody>');
for(var i=0;i<data1.data.length;i++){


var datain = data1.data[i];

var resultDiv = createDynamicDiv(datain);
$("#dataTable1").append(resultDiv);
}


$('#dataTable1').append('</tbody></table>');
})
}

function dataTab()
{

$("#dataTable").DataTable( {
  "pageLength": 50
} );

}


function createDynamicDiv(userList){
var dynamicDiv = '';
console.log(userList)




dynamicDiv +=   '<tr >'+
          '<td>'+userList[0]+'</td>'+
        '<td>'+userList[1]+'</td>'+
        '<td>'+userList[2]+'</td>'+
        '<td>'+userList[3]+'</td>'+
          '<td>'+userList[4]+'</td>'+
        '<td style="font-size: 12px;font-weight: 900;">'+userList[5]+'</td>'+
        '<td>'+userList[6]+'</td>'+
       
        '</tr>'

      
return dynamicDiv;
}

function createDynamic2(url){

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
$.ajax(settings).done(function (response) {
var data1=JSON.parse(response);

$('#next').prepend('<table class="display" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>COUNTRY</th><th>STATE</th><th>CITY</th><th>PROGRAM NAME</th></tr ></thead ><tbody>');
for(var i=0;i<data1.data.length;i++){


var datain = data1.data[i];
var resultDiv = createDynamicDiv2(datain);

$("#dataTable").append(resultDiv);




}
//$('#dataTable1').append('</tbody></table>');
$('#dataTable').append('</tbody></table>');
dataTab();



$('#next1').prepend('<table class="display" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>USER NAME</th><th>USER EMAIL</th><th>PRACTICE COUNT</th><th>CREATED DATE</th><th>LAST PRACTICE DATE</th><th>COUNTRY</th><th>STATE</th><th>CITY</th><th>PROGRAM NAME</th></tr ></thead ><tbody>');
for(var i=0;i<data1.data.length;i++){


var datain = data1.data[i];

var resultDiv = createDynamicDiv2(datain);
$("#dataTable1").append(resultDiv);
}


$('#dataTable1').append('</tbody></table>');
})
}

function dataTab()
{

$("#dataTable").DataTable( {
  "pageLength": 50
} );

}


function createDynamicDiv2(userList){
var dynamicDiv = '';
console.log(userList)




dynamicDiv += '<tr >'+
          '<td>'+userList[0]+'</td>'+
        '<td>'+userList[1]+'</td>'+
        '<td>'+userList[2]+'</td>'+
        '<td>'+userList[3]+'</td>'+
          '<td>'+userList[4]+'</td>'+
        '<td>'+userList[5]+'</td>'+
        '<td>'+userList[6]+'</td>'+
        '<td>'+userList[7]+'</td>'+
        '<td>'+userList[8]+'</td>'+
        '<td>'+userList[9]+'</td>'+     
        '</tr>'

      
return dynamicDiv;
}

function cardscount(a){
var settings = {
async: true,
crossDomain: true,
url: "http://127.0.0.1:5000/playback_cards_week/"+a,
method: "GET",
};
$.ajax(settings).done(function (response) {
var dataa = JSON.parse(response);

var c = parseInt(dataa.totalchange[0]);

if(c===1){
  console.log("hello2")
  document.getElementById("updownpractotal").style.color = "green";
}
else if(c===-1) {
  console.log("h2i")
  document.getElementById("updownpractotal").style.color = "#ff0000";
}
else {
    document.getElementById("updownpractotal").style.color = "grey";
  }

  var t = parseInt(dataa.parentschange[0]);

if(t===1){
  console.log("hello2")
  document.getElementById("updownpracp").style.color = "green";
}
else if(t===-1) {
  console.log("h2i")
  document.getElementById("updownpracp").style.color = "#ff0000";
}
else {
    document.getElementById("updownpracp").style.color = "grey";
  }
  var v = parseInt(dataa.teacherschange[0]);

if(v===1){
console.log("hello2")
document.getElementById("updownpract").style.color = "green";
}
else if(v===-1) {
console.log("h2i")
document.getElementById("updownpract").style.color = "#ff0000";
}
else {
    document.getElementById("updownpract").style.color = "grey";
  }
  $("#updownpractotal").text(parseFloat(dataa.total_percentage_change[0]).toFixed(0) + "%");
  $("#updownpracp").text(parseFloat(dataa.parents_percentage_change[0]).toFixed(0) + "%");
  $("#updownpract").text(parseFloat(dataa.teachers_percentage_change[0]).toFixed(0) + "%");
$("#usercount").text(dataa.total_playback_last_week[0]);
$("#neverlogged").text(dataa.teachers_playback_last_week[0]);
$("#totalstudent").text(dataa.parents_playback_last_week[0]);

});
var settings = {
async: true,
crossDomain: true,
url: "http://127.0.0.1:5000/SIGNUPS_WEEK/"+a,
method: "GET",
};
$.ajax(settings).done(function (response) {
var dataa = JSON.parse(response);
var c = parseInt(dataa.totalchanged[0]);

if(c===1){
  console.log("hello2")
  document.getElementById("updownsigntotal").style.color = "green";
}
else if(c===-1) {
  console.log("h2i")
  document.getElementById("updownsigntotal").style.color = "#ff0000";
}
else {
  document.getElementById("updownsigntotal").style.color = "grey";
  }
var t = parseInt(dataa.parentschanged[0]);


if(t===1){
  console.log("hello2")
  document.getElementById("updownsignp").style.color = "green";
}
else if(t===-1) {
  console.log("h2i")
  document.getElementById("updownsignp").style.color = "#ff0000";
}
else {
  document.getElementById("updownsignp").style.color = "grey";
}
var v = parseInt(dataa.teacherschanged[0]);

if(v===1){
console.log("hello2")
document.getElementById("updownsignt").style.color = "green";
}
else if(v===-1) {
console.log("h2i")
document.getElementById("updownsignt").style.color = "#ff0000";
}
else {
  document.getElementById("updownsignt").style.color = "grey";
}
$("#updownsigntotal").text(parseFloat(dataa.total_percentage_change[0]).toFixed(0) + "%");
$("#updownsignt").text(parseFloat(dataa.parents_percentage_change[0]).toFixed(0) + "%");
$("#updownsignp").text(parseFloat(dataa.teachers_percentage_change[0]).toFixed(0) + "%");
$("#usercount1").text(dataa.total_signup_last_week[0]);
$("#neverlogged1").text(dataa.parents_signup_last_week[0]);
$("#totalstudent1").text(dataa.teachers_signup_last_week[0]);
});
var settings = {
async: true,
crossDomain: true,
url: "http://127.0.0.1:5000/weeklyfeedcard/"+a,
method: "GET",
};
$.ajax(settings).done(function (response) {
var dataa = JSON.parse(response);

var c = parseInt(dataa.Average_FEEDBACK_Rating_change[0]);

if(c===1){
  console.log("hello2")
  document.getElementById("updownfbtotal").style.color = "green";
}
else if(c===-1) {
  console.log("h2i")
  document.getElementById("updownfbtotal").style.color = "#ff0000";
}
else {
    document.getElementById("updownfbtotal").style.color = "grey";
  }

  
  var t = parseInt(dataa.PARENT_Comment_per_feedbackchange[0]);

  if(t===1){
    console.log("hello2")
    document.getElementById("updownfbcomment").style.color = "green";
}
  else if(t===-1) {
    console.log("h2i")
    document.getElementById("updownfbcomment").style.color = "#ff0000";
}
  else {
    document.getElementById("updownfbcomment").style.color = "grey";
  }
  var v = parseInt(dataa.TEACHER_Comment_per_feedbackchange[0]);

if(v===1){
  console.log("hello2")
  document.getElementById("updownfbper").style.color = "green";
}
else if(v===-1) {
  console.log("h2i")
  document.getElementById("updownfbper").style.color = "#ff0000";
}
else {
    document.getElementById("updownfbper").style.color = "grey";
  }


  $("#updownfbtotal").text(parseFloat(dataa.Average_feedback_PERCENTAGE[0]).toFixed(0) + "%");
  $("#updownfbcomment").text(parseFloat(dataa.parent_PERCENTAGE_change[0]).toFixed(0) + "%");
  $("#updownfbper").text(parseFloat(dataa.teacher_PERCENTAGE_change[0]).toFixed(0) + "%");
$("#avgfb").text(parseFloat(dataa.Average_Rating_lastweek[0]).toFixed(1));
$("#comments").text(parseFloat(dataa.PARENT_FEEDBACK_RATING_LAST_WEEK[0]).toFixed(1));
$("#comments2").text(parseFloat(dataa.TEACHER_FEEDBACK_RATING_LAST_WEEK[0]).toFixed(1));
// $("#fbp").text(parseFloat(dataa.Low_star_rating_lastweek[0]).toFixed(1));
// $("#fbp2").text(parseFloat(dataa.avg_ratings_week_beforelastweek[0]).toFixed(1));
});
}
function cards(URL) {
  var dated = document.getElementById("stardate").innerText;
  var mainURL = URL + '/' + dated;
  $('#next').empty();
  console.log(mainURL);
  var modal2 = document.getElementById("myModal2");
  modal2.style.display = "block";
  $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='http://127.0.0.1:5000/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
  var gif = document.getElementById("gif");
gif.style.display = "block";
  $('#btnExport').show();
  createDynamic(mainURL)
}