
$(function() {
  $( "#datepicker" ).datepicker({
changeMonth: true,
changeYear: true,
yearRange: "2018:2021",
dateFormat : "yy-mm-dd",
maxDate: new Date(),
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
$("#dat").text(f);
  $("#tod").text(f);

  function cards2(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='http://127.0.0.1:5000/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
  gif.style.display = "block";
    $('#btnExport').show();
    createDynamic2(URL)

  }  
console.log("this is jira");
var settings = {
    "async": true,
    "crossDomain": true,
    "url": 'http://127.0.0.1:5000/chartdesc',
    "method": "GET"
   }
   $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
    console.log("this is jira");
  $('#jira').text(dataa.Jirar);
   $('#jirar').text(dataa.Jirac);
  $('#jirae').text(dataa.jirae);
   });
 

   function charts(a){
// INCLUDE JQUERY & JQUERY UI 1.12.1

var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "http://127.0.0.1:5000/top_20_district_daily/"+a,
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
  legend: {
    enabled: false,
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
    "url":             "http://127.0.0.1:5000/programPRACTICE_dailycomparsion/"+a,
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
    
     
     '#a5b0a5',
     '#8AE02B',
     '#a0afb0',
     '#01A451',
             ],

             title: {
    text: 'Practice Comparison by Program(DAILY)'
    },
    xAxis: {
    categories:dataa.progname,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Practice Count'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
    footerFormat: '</table>',
    shared: false,
    useHTML: true
  },
  legend: {
  enabled: true,
  itemStyle: {
      fontSize: '10px',
      fontWeight: '200',
  }
},
  plotOptions: {
    column: {
      stacking: 'normal',
    }
  },
  series: [{
    name: 'HOME PRACTICE LAST WEEK 24HRS',
    data: dataa.parentspractice_lastweek24hrs,
    stack: 0
  },
          {
    name: 'HOME PRACTICE',
    data: dataa.parentspractice,
    stack: 1
  },
  {
    name: 'CLASSROOM PRACTICE LAST WEEK 24HRS',
    data: dataa.teacherspractice_lastweek24hrs,
    stack: 0
  }, {
    name: 'CLASSROOM PRACTICE',
    data: dataa.teacherspractice,
    stack: 1
  },]
});

    });


    var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/ratedaily/"+a,
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
     console.log(dataa,"hello frnd")

Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  colors: [
    '#a5b0a5',
    '#8AE02B',
    '#a0afb0',
    '#01A451',
             ],

             title: {
    text: 'Feedback Comparison (DAILY)'
    },
    xAxis: {
    categories:dataa.weekdata.rating,
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Practice Count'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
    footerFormat: '</table>',
    shared: false,
    useHTML: true
  },
  legend: {
  enabled: true,
  itemStyle: {
      fontSize: '10px',
      fontWeight: '200',
  }
},
  plotOptions: {
    column: {
      stacking: 'normal',
    }
  },
  series: [{
    name: 'PARENT FEEDBACK LAST WEEK 24HRS',
    data: dataa.weekdata.par_lastweek,
    stack: 0
  },
          {
    name: 'PARENT FEEDBACK YESTERDAY',
    data: dataa.weekdata.par_yes,
    stack: 1
  },{
    name: 'CLASSROOM FEEDBACK LAST WEEK 24HRS',
    data: dataa.weekdata.teach_lastweek,
    stack: 0
  }, {
    name: 'CLASSROOM FEEDBACK YESTERDAY',
    data: dataa.weekdata.teachers_yes,
    stack: 1
  }]
});

    });


    var settings = {
        "async": true,
        "crossDomain": true,
        "url":             "http://127.0.0.1:5000/AVG_audio_completion_daily_less_than50/"+a,
        "method": "GET"
       }
        $.ajax(settings).done(function (response) {
        var dataa=JSON.parse(response);
Highcharts.chart('container5', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Average Audio Completion Daily'
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
            "url":             "http://127.0.0.1:5000/AVG_audio_completion_daily_greater_than50/"+a,
            "method": "GET"
           }
            $.ajax(settings).done(function (response) {
            var dataa=JSON.parse(response);
    Highcharts.chart('container6', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Average Audio Completion Daily (Greater Than 50%)'
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


  
  
  dynamicDiv +=   '<tr >'+
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
  url: "http://127.0.0.1:5000/SIGNUPS_dailycomparsion/"+a,
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
  $("#updownsigntotal").text(parseFloat(dataa.Total_percentage_change[0]).toFixed(0) + "%");
  $("#updownsignp").text(parseFloat(dataa.parents_Percentage_Change[0]).toFixed(0) + "%");
  $("#updownsignt").text(parseFloat(dataa.Teacher_percentage_change[0]).toFixed(0) + "%");
  $("#usercount1").text(dataa.total_signup_yesterday[0]);
  $("#neverlogged1").text(dataa.parents_signup_yesterday[0]);
  $("#totalstudent1").text(dataa.teachers_signup_yesterday[0]);
});
var settings = {
  async: true,
  crossDomain: true,
  url: "http://127.0.0.1:5000/last_day_pr/"+a,
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
 

  var c = parseInt(dataa.TOTALCHANGE[0]);

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

  var t = parseInt(dataa.PARENTSCHANGE[0]);

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
var v = parseInt(dataa.TEACHERSCHANGE[0]);

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
  $("#updownpractotal").text(parseFloat(dataa.TOTAL_percentagechange[0]).toFixed(0) + "%");
  $("#updownpracp").text(parseFloat(dataa.PARENT_percentagechange[0]).toFixed(0) + "%");
  $("#updownpract").text(parseFloat(dataa.TEACHER_percentagechange[0]).toFixed(0) + "%");
  $("#usercount").text(dataa.total_playback_24hr[0]);
  $("#neverlogged").text(dataa.teachers_playback_24hr[0]);
  $("#totalstudent").text(dataa.parents_playback_24hr[0]);

});

var settings = {
  async: true,
  crossDomain: true,
  url: "http://127.0.0.1:5000/ratingcardsdaily_card/"+a,
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
});
}

function cards(URL) {
    $('#next').empty();
    console.log(URL);
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
    $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='http://127.0.0.1:5000/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
    var gif = document.getElementById("gif");
  gif.style.display = "block";
    $('#btnExport').show();
    createDynamic(URL)
  }