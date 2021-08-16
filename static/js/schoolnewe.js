var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/top_20",
  "method": "GET"
}
$.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response);
Highcharts.chart('container', {
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Top 20 School Engagement'
  },
  subtitle: {
    text: ''
  },
  xAxis: [{
    categories: dataa.school_name,
    crosshair: true
  }],
  yAxis: [{ // Primary yAxis
max:2000,
    labels: {
      format: '{value}',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    title: {
      text: 'Active User Count',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    }
  }, { // Secondary yAxis
    title: {
      text: 'School Playback Count',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    labels: {
      format: '{value} ',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    opposite: true
  }],
  tooltip: {
    shared: true
  },
  plotOptions: {
    series: {
        dataLabels: {
          style:{
            fontSize:9,
          },
            align: 'left',
            enabled: true
        }
    }
},
  legend: {
    layout: 'vertical',
    align: 'right',
    x: 0,
    verticalAlign: 'bottom',
    y: -50,
    floating: true,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || // theme
      'rgba(255,255,255,0.25)'
  },
  series: [{
    name: 'School Playback Count',
    type: 'bar',
    color:'#01a451',
    yAxis: 1,
    data: dataa.school_pract_count,
    tooltip: {
      valueSuffix: ''
    }
  }, {
    name: 'Active user count',
    type: 'bar',
    color:'#8ae02b',
    data: dataa.Active_user,
    tooltip: {
      valueSuffix: ''
    }
  }]
});
});

  createDynamic();
  function createDynamic() {
    console.log("run table")
    var settings = {
      async: true,
      crossDomain: true,
      url: "/schengtop20table",
      method: "GET",
    };
    $.ajax(settings).done(function (response) {
      var data1 = JSON.parse(response);
    
      $("#next").prepend(
        '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>STATE</th><th>CITY</th><th>ADMIN NAME</th><th style="width: 130px !important;">ADMIN EMAIL</th><th>SIGNUP DATE</th><th>LAST PLAYBACK DATE</th><th>RENEWAL DATE</th><th>PLAYBACK COUNT</th></tr ></thead ><tbody>'
      );
      for (var i = 0; i < data1.data.length; i++) {
        var datain = data1.data[i];
        var resultDiv = createDynamicDiv(datain);
    
        $("#dataTable").append(resultDiv);
      }
      //$('#dataTable1').append('</tbody></table>');
      $("#dataTable").append("</tbody></table>");
      dataTab();
    
      $("#next1").prepend(
        '<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><th>SCHOOL NAME</th><th>STATE</th><th>CITY</th><th>ADMIN NAME</th><th style="width: 130px !important;">ADMIN EMAIL</th><th>SIGNUP DATE</th><th>LAST PLAYBACK DATE</th><th>RENEWAL DATE</th><th>PLAYBACK COUNT</th></tr ></thead ><tbody>'
      );
      for (var i = 0; i < data1.data.length; i++) {
        var datain = data1.data[i];
    
        var resultDiv = createDynamicDiv(datain);
        $("#dataTable1").append(resultDiv);
      }
      $("#dataTable1").append("</tbody></table>");
    });
    }
    function dataTab() {
    $("#dataTable").DataTable({
      pageLength: 50,
    });
    }
    
    function createDynamicDiv(userList) {
    var dynamicDiv = "";
    console.log(userList);
    
    dynamicDiv +=
      "<tr >" +
      "<td>" +
      userList[0] +
      "</td>" +
      "<td>" +
      userList[1] +
      "</td>" +
      "<td>" +
      userList[2] +
      "</td>" +
      "<td>" +
      userList[3] +
      "</td>" +
      '<td class="tablelink" style="font-size:7px;"><a onclick="schoolsearch22(\''+userList[4]+'\')">' +
      userList[4] +
      "</td></a>" +   	
      "<td>" +
      userList[5] +
      "</td>" +
      "<td>" +
      userList[6] +
      "</td>" +
      "<td>" +
      userList[7] +
      "</td>" +
      "<td>" +
      userList[8] +
      "</td>" +
      "</tr>";
    
    return dynamicDiv;
    }