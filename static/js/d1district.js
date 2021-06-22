
var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/d1_chart",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);


$(function() {
$("#container").highcharts({
chart: {
  zoomType: 'xy',
  type:'bar'
},
title: {
  text: "D1 DISTRICTS"
},
xAxis: [{
  categories: dataa.no_micro,labels: {
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
    text: 'Count',
    style: {
      color: '#000'
    }
  }
}, {//Secondary yAxis
  title: {
    text: 'Count',
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
  shared: true
},plotOptions: {borderWidth: 2,
  series: {point: {
            events: {
                click: function () {
                  
                  
                 URL = 'http://127.0.0.1:5000/d1_admin/'+this.category ;           
      console.log(URL);               
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
            }
        }}
},
series: [{
  name: 'SCHOOL COUNT',
  color: '#01a451',
  type: 'column',
  yAxis: 1,
  data: dataa.no_micro_count,
  tooltip: {
   
  }
}]
});
});



$(function() {
    $("#container1").highcharts({
    chart: {
      zoomType: 'xy',
      type:'bar'
    },
    title: {
      text: "D1 MICRO DISTRICTS"
    },
    xAxis: [{
      categories: dataa.micro_name,labels: {
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
        text: 'Count',
        style: {
          color: '#000'
        }
      }
    }, {//Secondary yAxis
      title: {
        text: 'Count',
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
      shared: true
    },plotOptions: {borderWidth: 2,
      series: {point: {
                events: {
                    click: function () {
            
        URL = 'http://127.0.0.1:5000/d1_admin/'+this.category ;
          console.log(URL);               
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
                }
            }}
    },
    series: [{
      name: 'SCHOOL COUNT',
      color: '#01a451',
      type: 'column',
      yAxis: 1,
      data: dataa.micro_count,
      tooltip: {
       
      }
    }]
    });
    });

    $("#schoolcount").text(dataa.total_d1_school);
    $("#trial").text(dataa.total_teacher_count);
    $("#lsy").text(dataa.total_parents_count);
    $("#next6").text(dataa.total_d1_practice);

    $("#schoolcount1").text(dataa.micro_school_count);
    $("#trial1").text(dataa.micro_teacher_count);
    $("#lsy1").text(dataa.micro_parents_count);
    $("#next61").text(dataa.micro_school_practice);

    $("#schoolcount2").text(dataa.non_micro_school_count);
    $("#trial2").text(dataa.non_micro_teacher_count);
    $("#lsy2").text(dataa.non_micro_parents_count);
    $("#next62").text(dataa.non_micro_school_practice);




});          


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
    
    $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th><th>PRACTICE COUNT</th><th>LAST PRACTICE DATE</th><th>USER COUNT</th></tr></thead ><tbody>');
                          
    for(var i=0;i<data1.data.length;i++){
    
    
    var datain = data1.data[i];
    var resultDiv = createDynamicDiv(datain);
    
    $("#dataTable").append(resultDiv);
    
    
    
    
    }
    //$('#dataTable1').append('</tbody></table>');
    $('#dataTable').append('</tbody></table>');
    dataTab();
    
    
    
    $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th><th>PRACTICE COUNT</th><th>LAST PRACTICE DATE</th><th>USER COUNT</th></tr></thead ><tbody>');
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
                '<td class="tablelink"><a onclick="schoolsearch22(\''+userList[2]+'\')">' +
                userList[2] +
                "</td></a>" +   	
              '<td>'+userList[3]+'</td>'+
              '<td>'+userList[4]+'</td>'+
              '<td>'+userList[5]+'</td>'+
              '<td>'+userList[6]+'</td>'+
     
              
              '</tr>'        
        return dynamicDiv;
        
    }

    // function createDynamicDiv2(userList){
    //   var dynamicDiv = '';
    //       console.log(userList)
    //     dynamicDiv +=   '<tr >'+
    //     '<td>'+userList[0]+'</td>'+
    //     '<td>'+userList[1]+'</td>'+
    //     '<td>'+userList[2]+'</td>'+
    //             '<td>'+userList[3]+'</td>'+
    //             '<td>'+userList[4]+'</td>'+
    //             '<td>'+userList[5]+'</td>'+
    //             '<td>'+userList[6]+'</td>'+
       
                
    //             '</tr>'        
    //       return dynamicDiv;
          
    //   }