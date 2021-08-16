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
        "url":             "/psignupu",
        "method": "GET"
       }
        $.ajax(settings).done(function (response) {
        var dataa=JSON.parse(response); 
        console.log(dataa,"hello frnd")
  $('#container2').highcharts({
    chart: {
      type: 'column',
      backgroundColor: '#FFFFF'
    },
    title: {
      text: 'Family Signup Trend By District',
      style: {  
       color: '#000000'
      }
    },
    
    xAxis: {
      tickWidth: 0,
      labels: {
       style: {
         color: '#000000',
         },
         rotation:270
       },
      categories: dataa.user_type
    },
    yAxis: {
      title: {
        text: 'SIGNUP COUNT',
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
      itemStyle: {
        fontSize: '10px',
        fontWeight: '200'
    }
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
                        
                      
                     URL = '/userparents/'+this.category ;
          console.log(URL);               
          createDynamic(URL)
                    }
                }
            }}
    },
    series: [{
        color: '#01a451',
      name: 'SIGN UP COUNT',
      data: dataa.parents_count
    }]
  });
        });
  console.clear()
