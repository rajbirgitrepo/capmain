var settings = {
  async: true,
  crossDomain: true,
  url: "/STREAKS",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
 

  Highcharts.chart("container7", {
    chart: {
      type: "column",
    },
    title: {
      text: "Home Streaks",
    },
    credits: {
      enabled: false,
  },
    colors: ['#3158D7','#0677BA','#8AE02B','#01A451',],
    xAxis: {
      categories: dataa.streak,
    },
    yAxis: {
      lineWidth: 1,
      min: 0,
      title: {
        text: "Cumulative frequency of Users",
      },
      stackLabels: {
        enabled: false,
        style: {
          fontWeight: "bold",
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray",
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    legend: {
      enabled: true,
      itemStyle: {
        fontSize: '10px',
        fontWeight: '200'
    }
    },
    plotOptions: {
      series: { point: {} },
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: "spline",
        color: "#8AE02B",
        name: "Maximum streaks",
        data: dataa.line_chart
      },
    ],
  });
});
var settings = {
  async: true,
  crossDomain: true,
  url: "/teachers_STREAKS",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);


  Highcharts.chart("container8", {
    chart: {
      type: "column",
    },
    title: {
      text: "Classroom Streaks",
    },
    credits: {
      enabled: false,
  },
    colors: ['#3158D7','#0677BA','#8AE02B','#01A451',],
    xAxis: {
      categories: dataa.streak,
    },
    yAxis: {
      lineWidth: 1,
      min: 0,
      title: {
        text: "Cumulative frequency of Users",
      },
      stackLabels: {
        enabled: false,
        style: {
          fontWeight: "bold",
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray",
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    legend: {
      enabled: true,
      itemStyle: {
        fontSize: '10px',
        fontWeight: '200'
    }
    },
    plotOptions: {
      series: { point: {} },
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: "spline",
        color: "#8AE02B",
        name: "Maximum streaks",
        data: dataa.line_chart
      },
    ],
  });
});

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "/power_users_having_streaks",
  "method": "GET"
 }
  $.ajax(settings).done(function (response) {
  var dataa=JSON.parse(response); 
    console.log(dataa[0].bar,"data")
Highcharts.chart('container9', {
  chart: {
      type: 'column'
  },
  credits: {
    enabled: false,
  },
  title: {
      text: 'Power USer Streaks'
    
  },colors: ['#01A451'],
  xAxis: {
    title: {
      text: 'Maximum streaks'
  },
      categories: dataa[0]['STREAK']
  },
  yAxis: {lineWidth:1,
      min: 0,
      title: {
          text: 'Frequency of users'
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
  series: [
 {
      name: ' Classroom frequency',
      data: dataa[0]['bar']
  },
  
    {type:'spline',
     color:'#8AE02B',
      name: 'Present frequency',
      data: dataa[0]['line']
  }]
});});




Highcharts.setOptions({
  colors: ['#67BCE6'],
  chart: {
     zoomType: 'x',
    style: {
      fontFamily: 'sans-serif',
      color: '#fff'
    }
  }
}); 
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": "/Business_days_streaks_classroom",
      "method": "GET"
     }
      $.ajax(settings).done(function (response) {
      var dataa=JSON.parse(response); 
      console.log(dataa,"hello frnd")
  $('#container10').highcharts({
  chart: {
    type: 'column',
    backgroundColor: '#FFFFF'
  },
  title: {
    text: 'Business Days Streak (Classroom)',
    style: {  
     color: '#000000'
    }
  },
  xAxis: {
    title: {
      text: 'Number of Streaks',
      style: {
       color: '#000000'
       }
    },
    tickWidth: 0,
    labels: {
     style: {
       color: '#000000',
       }
     },
    categories: dataa.Number_of_streaks_x
  },
  yAxis: {
    title: {
      text: 'Playbacks',
      style: {
       color: '#000000'
       }
    },
    labels: {
      formatter: function() {
        return Highcharts.numberFormat(this.value, 0, '', ',');
      },
      style: {
        color: '#000000',
      }
    }
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false
  },
  tooltip: {
    valuePrefix: ''
  },
  plotOptions: {
    series: {point: {
              events: {
                  click: function () {
                      $('#next').empty();
                      console.log(URL);
                      $('#btnExport').show();
                      
                    
                   URL = '/schoolsummaryprog/'+this.category ;
        console.log(URL);               
        createDynamic(URL)
        cardscroll();
                  }
              }
          }}
  },
  series: [{
      color: '#01a451',
    name: 'Playbacks',
    data: dataa.Practices_y
  }]
});

});




      Highcharts.setOptions({
        colors: ['#67BCE6'],
        chart: {
           zoomType: 'x',
          style: {
            fontFamily: 'sans-serif',
            color: '#fff'
          }
        }
      }); 
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/Business_days_streaks_Family",
            "method": "GET"
           }
          $.ajax(settings).done(function (response) {
            var dataa=JSON.parse(response); 
            console.log(dataa,"hello frnd")
            $('#container11').highcharts({
              chart: {
                type: 'column',
                backgroundColor: '#FFFFF'
              },
              title: {
                text: 'Business Days Streak (Home)',
                style: {  
                color: '#000000'
                }
              },
              xAxis: {
                title: {
                  text: 'Number of Streaks',
                  style: {
                  color: '#000000'
                  }
                },
                tickWidth: 0,
                labels: {
                style: {
                  color: '#000000',
                  }
                },
                categories: dataa.Number_of_streaks
              },
              yAxis: {
                title: {
                  text: 'Playbacks',
                  style: {
                  color: '#000000'
                  }
                },
                labels: {
                  formatter: function() {
                    return Highcharts.numberFormat(this.value, 0, '', ',');
                  },
                  style: {
                    color: '#000000',
                  }
                }
              },
              legend: {
                enabled: false,
              },
              credits: {
                enabled: false
              },
              tooltip: {
                valuePrefix: ''
              },
              plotOptions: {
                series: {point: {
                          events: {
                              click: function () {
                                  $('#next').empty();
                                  console.log(URL);
                                  $('#btnExport').show();
                                  
                                
                              URL = '/schoolsummaryprog/'+this.category ;
                    console.log(URL);               
                    createDynamic(URL)
                    cardscroll();
                              }
                          }
                      }}
              },
              series: [{
                  color: '#01a451',
                name: 'Playbacks',
                data: dataa.Practices
              }]
            });
          });