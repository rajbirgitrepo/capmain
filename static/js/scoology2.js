var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/practicehistoryschoology",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
   




var chart = Highcharts.stockChart('container2', {
chart: {
type: 'column'
},

title: {
text: 'Practice History'
},credits:{enabled:false},
legend: {
    enabled: true,
    itemStyle: {
        fontSize: '10px',
        fontWeight: '200',
    }
  },
xAxis: {
    minRange: 1
},
plotOptions: {
    series: {point: {
              events: {
                  click: function () {

                   URL = 'https://cap4gtest.herokuapp.com/practicetable/'+this.x ;
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
navigator: {
series:{color:'#00FF00',
                animation: {
                    duration: 0,
                }    
},
xAxis: {
    minRange: 1
},


},yAxis: [ {
    lineWidth: 1,
    opposite: false,
    title: {
        text: 'PRACTICE COUNT'
    }
},{
    lineWidth: 1,
    opposite: true,
    title: {
        text: ' CUMULATIVE COUNT'
    }
}],

series: [{
type:'column',
  color: '#01a451',
name: 'Practice Count',
data: dataa.data.pracdata, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},

},
      {
type:'line',
  color: '#FF9933',
name: 'Total Practice Count',
data: dataa.data.pracdatacum, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},

}]

});

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
    
    $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>EMAIL</th><th>SCHOOL NAME</th><th>SIGNUP DATE</th><th>PRACTICE SESSIONS</th><th>COMPLETED SESSIONS</th><th>MINDFUL MINUTES</th></tr></thead ><tbody>');
                          
    for(var i=0;i<data1.data.length;i++){
    
    
    var datain = data1.data[i];
    var resultDiv = createDynamicDiv(datain);
    
    $("#dataTable").append(resultDiv);
    
    
    
    
    }
    //$('#dataTable1').append('</tbody></table>');
    $('#dataTable').append('</tbody></table>');
    dataTab();
    
    
    
     $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>EMAIL</th><th>SCHOOL NAME</th><th>SIGNUP DATE</th><th>PRACTICE SESSIONS</th><th>COMPLETED SESSIONS</th><th>MINDFUL MINUTES</th></tr></thead ><tbody>');
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
                            '<td>'+userList[5]+'</td>'+
              '<td>'+userList[6]+'</td>'+
                            '</tr>'
        
                      
        return dynamicDiv;
        
    }