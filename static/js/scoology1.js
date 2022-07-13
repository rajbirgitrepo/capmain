$(document).ready(function(){
    var url = window.location.href;
    var dashboard_name = document.getElementById('schoology_dashboard').innerText;
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


var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "/signuphistortyschoology",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
   




var chart = Highcharts.stockChart('container', {
chart: {
type: 'column'
},

title: {
text: 'Signup History'
},credits:{enabled:false},
xAxis: {
    minRange: 1
},
plotOptions: {
    series: {point: {
              events: {
                  click: function () {
                    
                   URL = '/signuptableschoology/'+this.x ;
        
                   $('#next').empty();
                   console.log(URL);
                   var modal2 = document.getElementById("myModal2");
                   modal2.style.display = "block";
                   $("#gif").append("<img style='width: 7%;margin-left: 45.2%;' src='/static/images/loading.gif'><div><p style=' text-align: center;margin-top:5px;'>Please wait while we fetch your data.</p></div>");
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
        text: 'SIGNUP COUNT'
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
name: 'Signup Count',
data: dataa.data.signupdata, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},
legend: {
    enabled: true,
    itemStyle: {
        fontSize: '10px',
        fontWeight: '200',
    }
  },
},
      {
type:'line',
  color: '#FF9933',
name: 'Total Signup Count',
data: dataa.data.signdatacum, yAxis: 1, //Fri, 14 Jul 2017 00:00:00 GMT
dataGrouping: {
  enabled: false,
},

}]

});

});
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
    
    $('#next').prepend('<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>EMAIL</th><th>SCHOOL NAME</th><th>PLAYBACK SESSIONS</th><th>COMPLETED SESSIONS</th><th>RENEWAL DATE</th><th>LAST PLAYBACK DATE</th><th>MINDFUL MINUTES</th></tr></thead ><tbody>');
                          
    for(var i=0;i<data1.data.length;i++){
    
    
    var datain = data1.data[i];
    var resultDiv = createDynamic2Div(datain);
    
    $("#dataTable").append(resultDiv);
    
    
    
    
    }
    //$('#dataTable1').append('</tbody></table>');
    $('#dataTable').append('</tbody></table>');
    dataTab();
    
    
    
     $('#next1').prepend('<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable" ><thead ><tr><th>USER NAME</th><th>EMAIL</th><th>SCHOOL NAME</th><th>PLAYBACK SESSIONS</th><th>COMPLETED SESSIONS</th><th>RENEWAL DATE</th><th>LAST PLAYBACK DATE</th><th>MINDFUL MINUTES</th></tr></thead ><tbody>');
    for(var i=0;i<data1.data.length;i++){
    
    
    var datain = data1.data[i];
    
    var resultDiv = createDynamic2Div(datain);
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
    function createDynamic2Div(userList){
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
         
                            '</tr>'
        
                      
        return dynamicDiv;
        
    }