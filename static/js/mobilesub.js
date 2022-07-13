$(document).ready(function(){
  var url = window.location.href;
  var dashboard_name = document.getElementById('mobile_subscription').innerText;
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
    async: true,
    crossDomain: true,
    url: "/MOBILE_APP_SUBSCRIPTION_CARDSSSS",
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    $("#ms1").text(dataa.data.total_mobile_app_schools[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#ms2").text(dataa.data.Total_classroom_app_schools[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#ms3").text(dataa.data.Total_home_app_schools[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#ms4").text(dataa.data.TOTAL_PAID_SCHOOLS[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#ms5").text(dataa.data.TOTAL_CLASSROOM_PAID_SCHOOLS[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#ms6").text(dataa.data.TOTAL_HOME_PAID_SCHOOLS[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#ms7").text(dataa.data.TOTAL_Practicing_mobile_app_schools[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#ms8").text(dataa.data.TOTAL_CLASSROOM_PRACTICING_SCHOOLS[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    $("#ms9").text(dataa.data.TOTAL_HOME_PRACTICING_SCHOOLS[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  });
  

var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "/mobile_app_USERR",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
      

var options = {

chart: {
    renderTo: 'container',
    defaultSeriesType: 'column',
 zoomType:'y',
  
  
  
},title: {
  text: "Mobile Users Renewable"
}, colors: [
           '#00a651',
           '#8ae02b',    
        ],
xAxis: {
    categories: dataa.Data_2020.Month_Name
},
 yAxis: [{ //Primary yAxis
  labels: {
    format: '{value}',
    style: {
      color: '#000'
    }
  },
  title: {
    text: 'User Count',
    style: {
      color: '#000'
    }
  }
}],    
plotOptions: {
  series: {point: {
            events: {
                click: function () {
                  
                     // alert("/"+this.series.name.slice(5,8)+"/"+this.series.name.slice(0,4)+"/"+this.category);
                  
                 URL = '/d3renewaltable/'+this.series.name.slice(5,8)+"/"+this.series.name.slice(0,4)+"/"+this.category;
      console.log(URL);
                  Table();
                }
            }
        }}
},
series: [{
name: '2020 EXPIRING', data: dataa.Data_2020.Expiring_users},{
name: '2020 ACTIVE',
data: dataa.Data_2020.Active_users_csy,
}]
};
var chart = new Highcharts.Chart(options);

$("#list1").on('change', function(){
//alert('f')
var selVal = $("#list1").val();
if(selVal == "2020" || selVal == '')
{
    options.series = [{name: '2020 EXPIRING', data:dataa.Data_2020.Expiring_users},{
name: '2020 ACTIVE',
data: dataa.Data_2020.Active_users_csy,
}]
}
else if(selVal == "2021")
{
    options.series = [{name: '2021 EXPIRING', data: dataa.Data_2021.Expiring_users}, {
name: '2021 ACTIVE',
data: dataa.Data_2021.Active_users_csy
}]
}
else if(selVal == "2022")
{
    options.series = [{name: '2022 EXPIRING',
data: dataa.Data_2022.Expiring_users}, {
name: '2022 ACTIVE',
data: dataa.Data_2022.Active_users_csy,
}]
}
else
{
    options.series = [{ name: '2026 EXPIRING',
data: dataa.Data_2026.Expiring_users},{
name: '2026 ACTIVE',
data: dataa.Data_2026.Active_users_csy,
}]
} 
var chart = new Highcharts.Chart(options);    
});
});




var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "/mobile_app_SCH",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);


var options = {

chart: {
    renderTo: 'container1',
    defaultSeriesType: 'column',
 zoomType:'y',
  
  
  
},title: {
  text: "Mobile Schools Renewable"
}, colors: [
           '#00a651',
           '#8ae02b',    
        ],
xAxis: {
    categories: dataa.Data_2020.Month_Name
},
 yAxis: [{ //Primary yAxis
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
}],    
plotOptions: {
  series: {point: {
            events: {
                click: function () {
                  
                     // alert("/"+this.series.name.slice(5,8)+"/"+this.series.name.slice(0,4)+"/"+this.category);
                  
                 URL = '/d3renewaltable/'+this.series.name.slice(5,8)+"/"+this.series.name.slice(0,4)+"/"+this.category;
      console.log(URL);
                  Table();
                }
            }
        }}
},
series: [{
name: '2020 EXPIRING', data: dataa.Data_2020.Expiring_Schools},{
name: '2020 ACTIVE',
data: dataa.Data_2020.Active_Schools_csy,
}]
};
var chart = new Highcharts.Chart(options);

$("#list2").on('change', function(){
//alert('f')
var selVal = $("#list2").val();
if(selVal == "2020" || selVal == '')
{
    options.series = [{name: '2020 EXPIRING', data:dataa.Data_2020.Expiring_Schools},{
name: '2020 ACTIVE',
data: dataa.Data_2020.Active_Schools_csy,
}]
}
else if(selVal == "2021")
{
    options.series = [{name: '2021 EXPIRING', data: dataa.Data_2021.Expiring_Schools}, {
name: '2021 ACTIVE',
data: dataa.Data_2021.Active_Schools_csy
}]
}
else if(selVal == "2022")
{
    options.series = [{name: '2022 EXPIRING',
data: dataa.Data_2022.Expiring_Schools}, {
name: '2022 ACTIVE',
data: dataa.Data_2022.Active_Schools_csy,
}]
}
else
{
    options.series = [{ name: '2026 EXPIRING',
data: dataa.Data_2026.Expiring_Schools},{
name: '2026 ACTIVE',
data: dataa.Data_2026.Active_Schools_csy,
}]
} 
var chart = new Highcharts.Chart(options);    
});
});
