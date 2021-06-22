
var settings = {
  "async": true,
  "crossDomain": true,
  "url":             "http://127.0.0.1:5000/subscriptionexpirednewgraph",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 
   console.log(dataa,"hello frnd")


Highcharts.chart('container4', {
chart: {
  type: 'column'
},
legend: {
  enabled: true,
  itemStyle: {
      fontSize: '10px',
      fontWeight: '200',
  }
},
colors: [
         
'#2c9905','#00a651', '#8ae02b',
         
         
      ],
title: {
  text: 'SCHOOL EXPIRED IN CURRENT SY (2020-2021)'
},
xAxis: {
  categories: dataa.month,
  crosshair: false
},
yAxis: {
  min: 0,
  title: {
      text: 'School Count'
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
           // console.log("hellooooo",this.category);
           $('#next').empty();
           URL = 'http://127.0.0.1:5000/renewal19/'+this.category+"/"+this.series.name.slice(18,24)+this.series.name.slice(28,30);
           $('#btnExport').show();
           console.log(URL);
           createDynamic(URL)
         
            cardscroll();
              }}}
      }},
series: [{
          name: 'Expired',
          data: dataa.total
      }
     ]
});
});




function createDynamic(url){

  var settings = {
"async": true,
"crossDomain": true,
"url": url,
"method": "GET"
}
$.ajax(settings).done(function (response) {
var data1=JSON.parse(response);

$('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><<th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th><th>LAST PRACTICE DATE</th><th>SCHOOL PRACTICE COUNT</th><th>USER COUNT</th></tr ></thead ><tbody>');
for(var i=0;i<data1.data.length;i++){


var datain = data1.data[i];
var resultDiv = createDynamicDiv(datain);
  
$("#dataTable").append(resultDiv);




}
//$('#dataTable1').append('</tbody></table>');
$('#dataTable').append('</tbody></table>');
  dataTab();



  $('#next1').prepend('<table class="display" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>RENEWAL DATE</th><th>LAST PRACTICE DATE</th><th>SCHOOL PRACTICE COUNT</th><th>USER COUNT</th></tr ></thead ><tbody>');for(var i=0;i<data1.data.length;i++){


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
              
            "<td>" +
      userList[2] +
      "</td>" +
              
            '<td>'+userList[3]+'</td>'+
              '<td>'+userList[4]+'</td>'+
            '<td>'+userList[5]+'</td>'+
            '<td>'+userList[6]+'</td>'+
           
            '</tr>'
  
          
  return dynamicDiv;
}

