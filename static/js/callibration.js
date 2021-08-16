$(function () {


    var pivot = new WebDataRocks({
        container: "#wdr-component",
       // height: 500,
        toolbar: true,
        report: {
            "dataSource": {
                "dataSourceType": "json",
                "data": getSalesData()
            },
            slice: {
                rows: [{
                    uniqueName: "DISTRICT NAME"                
                }],
                columns: [ {
                    uniqueName: "Measures"
                }],
                measures: [{
                    uniqueName: "PLAYBACK COUNT"
                },{
                    uniqueName: "SCHOOL COUNT"
                },{
                    uniqueName: "USER COUNT"
                }]
            }
        },
        reportcomplete: function() {
            pivot.off("reportcomplete");
            createChart();
        }
    });
    Highcharts.theme= {
        colors:[
            '#6BCBFD',
            '#0078FA',
            '#004EA0'
          ],
        chart: {
           height: 600,
          width: 1265,
         zoomType: 'x',
            backgroundColor: null,
            style: {
                fontFamily: 'Open Sans', fontWeight: 'bold'
            }
        }
        ,
        title: {
            style: {
                color: 'black', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Open Sans'
            }
        }
        ,
        subtitle: {
            style: {
                color: 'black', fontSize: '18px', fontWeight: 'bold', fontFamily: 'Open Sans'
            }
        }
        ,
       tooltip: {
            useHTML: true,
            headerFormat: '<span class="tooltipHeader">{point.key}y</span>',
            pointFormat: '<br/> <div class="tooltipPointWrapper">'
            +
            '<span class="tooltipValueSuffix"></span></div>'
            +
            '<span class="tooltipLine"></span> <br/>'
            +
            '<span style="color:{point.color}">\u25CF</span> {series.name}:{point.y}',
            style: {
              color: '#fff'
            },
            valueDecimals: 0,
            backgroundColor: '#000',
            borderColor: '#000',
            borderRadius: 10,
            borderWidth: 3,
          }
        ,
        legend: {
            itemStyle: {
                fontWeight: 'bold', fontSize: '13px'
            }
        }
        ,
        xAxis: {
            labels: {
                style: {
                    color: '#6e6e70'
                }
            }
        }
        ,
        yAxis: {
            labels: {
                style: {
                    color: '#6e6e70'
                }
            }
        }
        ,
        plotOptions: {
            series: {
                shadow: true
            }
            ,
            candlestick: {
                lineColor: '#404048'
            }
            ,
            map: {
                shadow: false
            }
        }
        , // Highstock specific
        navigator: {
            xAxis: {
                gridLineColor: '#D0D0D8'
            }
        }
        ,
        rangeSelector: {
            buttonTheme: {
                fill: 'white',
                stroke: '#C0C0C8',
                'stroke-width': 1,
                states: {
                    select: {
                        fill: '#D0D0D8'
                    }
                }
            }
        }
        ,
        scrollbar: {
            trackBorderColor: '#C0C0C8'
        }
        , // General
        background2: '#E0E0E8'
    };
     
        
    // apply the theme
    Highcharts.setOptions(Highcharts.theme);
    
    function createChart() {
        pivot.highcharts.getData({
            type: "column"
        }, function(data) {
          data.yAxis[0].title.text = "PLAYBACK COUNT";
          data.yAxis[1].title.text = "School Count";
          data.yAxis[2].title.text = "User Count";
          // data.series[1].type = "column";
          
            Highcharts.setOptions({
                subtitle: {
                    text: 'DISTRICT CHART'
                },
              credits:{enabled: false},
                tooltip: {
            useHTML: true,
            headerFormat: '<span class="tooltipHeader">{point.key}y</span>',
            pointFormat: '<br/> <div class="tooltipPointWrapper">'
            +
            '<span class="tooltipValueSuffix"></span></div>'
            +
            '<span class="tooltipLine"></span> <br/>'
            +
            '<span style="color:{point.color}">\u25CF</span> {series.name}:{point.y}',
            style: {
              color: '#fff'
            },
            valueDecimals: 0,
            backgroundColor: '#000',
            borderColor: '#000',
            borderRadius: 10,
            borderWidth: 3,
          },
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                }
            });
          
     Highcharts.chart("highchartsContainer", data);
        }, function(data) {
    //////////////////////////////
          if (data.yAxis[0].title.text =="Sum of PLAYBACK COUNT") {
      data.yAxis[0].title.text = "PLAYBACK COUNT";
    }else {
      data.yAxis[0].title.text = " Count"
    }
    ////////////////////////////////
    if (typeof data.yAxis[1] === 'undefined' || data.yAxis[1] === null) {
     data.yAxis[0].title.text = " Count";
    }else if (data.yAxis[1].title.text =="Sum of SCHOOL COUNT"){data.yAxis[1].title.text = "School Count"
    }else{data.yAxis[1].title.text = " Count";}
    /////////////////////////////////////
    if (typeof data.yAxis[2] === 'undefined' || data.yAxis[2] === null) {
     data.yAxis[0].title.text = " Count";
    }else if (data.yAxis[2].title.text =="Sum of USER COUNT"){data.yAxis[2].title.text = "User Count"
    }else{data.yAxis[2].title.text = " Count";}
          // data.yAxis[0].title.text = "PLAYBACK COUNT";
          // data.yAxis[1].title.text = "School Count";
          // data.yAxis[2].title.text = "User Count";
          //  data.series[0].type = "column";
          // data.series[1].type = "column";
            Highcharts.setOptions({
                subtitle: {
                    text: 'DISTRICT CHART'
                },
               credits:{enabled: false},
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.y}'
                },
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                }
            });
    Highcharts.chart("highchartsContainer", data);
        });
    }
    
    function getSalesData() {
        return [{'DISTRICT NAME': 'Adams 12 Five Star Schools',
      'STATE': 'Colorado',
      'SCHOOL COUNT': 4,
      'USER COUNT': 5,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Adams County School District 14',
      'STATE': 'Colorado',
      'SCHOOL COUNT': 3,
      'USER COUNT': 213,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Ann Arbor Public Schools',
      'STATE': 'Michigan',
      'SCHOOL COUNT': 10,
      'USER COUNT': 254,
      'PLAYBACK COUNT': 85.0},
     {'DISTRICT NAME': 'Apple Valley Unified School District',
      'STATE': 'California',
      'SCHOOL COUNT': 6,
      'USER COUNT': 83,
      'PLAYBACK COUNT': 52.0},
     {'DISTRICT NAME': 'Aurora Public Schools',
      'STATE': 0,
      'SCHOOL COUNT': 3,
      'USER COUNT': 6,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Austin Independent School District',
      'STATE': 'Texas',
      'SCHOOL COUNT': 53,
      'USER COUNT': 614,
      'PLAYBACK COUNT': 1192.0},
     {'DISTRICT NAME': 'Berkeley Public Schools',
      'STATE': 'California',
      'SCHOOL COUNT': 4,
      'USER COUNT': 6,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Bishop Unified School District',
      'STATE': 0,
      'SCHOOL COUNT': 2,
      'USER COUNT': 4,
      'PLAYBACK COUNT': 54.0},
     {'DISTRICT NAME': 'Bismarck Public Schools',
      'STATE': 'North Dakota',
      'SCHOOL COUNT': 3,
      'USER COUNT': 47,
      'PLAYBACK COUNT': 72.0},
     {'DISTRICT NAME': 'Boston Public Schools',
      'STATE': 'Massachusetts',
      'SCHOOL COUNT': 7,
      'USER COUNT': 59,
      'PLAYBACK COUNT': 41.0},
     {'DISTRICT NAME': 'Boulder Valley School District',
      'STATE': 'Colorado',
      'SCHOOL COUNT': 13,
      'USER COUNT': 113,
      'PLAYBACK COUNT': 9.0},
     {'DISTRICT NAME': 'Boulder Valley School District',
      'STATE': 'Minnesota',
      'SCHOOL COUNT': 13,
      'USER COUNT': 113,
      'PLAYBACK COUNT': 9.0},
     {'DISTRICT NAME': 'Canyons School District',
      'STATE': 'Utah',
      'SCHOOL COUNT': 6,
      'USER COUNT': 333,
      'PLAYBACK COUNT': 2542.0},
     {'DISTRICT NAME': 'Chicago Public Schools',
      'STATE': 'Illinois',
      'SCHOOL COUNT': 2,
      'USER COUNT': 27,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Colton Joint Unified School District',
      'STATE': 'California',
      'SCHOOL COUNT': 3,
      'USER COUNT': 32,
      'PLAYBACK COUNT': 176.0},
     {'DISTRICT NAME': 'Dennis-Yarmouth Regional School District',
      'STATE': 'Massachusetts',
      'SCHOOL COUNT': 3,
      'USER COUNT': 31,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Denver Public Schools',
      'STATE': 'Colorado',
      'SCHOOL COUNT': 6,
      'USER COUNT': 11,
      'PLAYBACK COUNT': 1.0},
     {'DISTRICT NAME': 'Durham Public Schools',
      'STATE': 'North Carolina',
      'SCHOOL COUNT': 10,
      'USER COUNT': 102,
      'PLAYBACK COUNT': 123.0},
     {'DISTRICT NAME': 'FITCHBURG PUBLIC SCHOOLS',
      'STATE': 'Alabama',
      'SCHOOL COUNT': 3,
      'USER COUNT': 36,
      'PLAYBACK COUNT': 177.0},
     {'DISTRICT NAME': 'FITCHBURG PUBLIC SCHOOLS',
      'STATE': 'Massachusetts',
      'SCHOOL COUNT': 3,
      'USER COUNT': 36,
      'PLAYBACK COUNT': 177.0},
     {'DISTRICT NAME': 'Fairfax County Public Schools',
      'STATE': 'Virginia',
      'SCHOOL COUNT': 6,
      'USER COUNT': 121,
      'PLAYBACK COUNT': 4.0},
     {'DISTRICT NAME': 'Falmouth Public Schools',
      'STATE': 'Massachusetts',
      'SCHOOL COUNT': 5,
      'USER COUNT': 81,
      'PLAYBACK COUNT': 1.0},
     {'DISTRICT NAME': 'Fulton County School System',
      'STATE': 'Georgia',
      'SCHOOL COUNT': 18,
      'USER COUNT': 987,
      'PLAYBACK COUNT': 208.0},
     {'DISTRICT NAME': 'Fulton County School System',
      'STATE': 'South Carolina',
      'SCHOOL COUNT': 18,
      'USER COUNT': 987,
      'PLAYBACK COUNT': 208.0},
     {'DISTRICT NAME': 'Glenbard District 87',
      'STATE': 'Illinois',
      'SCHOOL COUNT': 4,
      'USER COUNT': 187,
      'PLAYBACK COUNT': 5.0},
     {'DISTRICT NAME': 'Granite School District',
      'STATE': 'Utah',
      'SCHOOL COUNT': 5,
      'USER COUNT': 376,
      'PLAYBACK COUNT': 739.0},
     {'DISTRICT NAME': 'Greenburgh North Castle Union Free School District',
      'STATE': 'New York',
      'SCHOOL COUNT': 5,
      'USER COUNT': 68,
      'PLAYBACK COUNT': 136.0},
     {'DISTRICT NAME': 'Griffin-Spalding County School System',
      'STATE': 'Georgia',
      'SCHOOL COUNT': 16,
      'USER COUNT': 511,
      'PLAYBACK COUNT': 199.0},
     {'DISTRICT NAME': 'Hartford Public Schools',
      'STATE': 'Connecticut',
      'SCHOOL COUNT': 15,
      'USER COUNT': 62,
      'PLAYBACK COUNT': 29.0},
     {'DISTRICT NAME': 'Helena Public Schools',
      'STATE': 'Montana',
      'SCHOOL COUNT': 5,
      'USER COUNT': 14,
      'PLAYBACK COUNT': 56.0},
     {'DISTRICT NAME': 'HidalgoIndependent School district',
      'STATE': 'Texas',
      'SCHOOL COUNT': 3,
      'USER COUNT': 3,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Hopedale Public Schools',
      'STATE': 0,
      'SCHOOL COUNT': 3,
      'USER COUNT': 3,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Houston Independent School District',
      'STATE': 'Texas',
      'SCHOOL COUNT': 6,
      'USER COUNT': 109,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'KIPP Public Schools',
      'STATE': 'California',
      'SCHOOL COUNT': 4,
      'USER COUNT': 40,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Kearsarge Regional School District',
      'STATE': 0,
      'SCHOOL COUNT': 3,
      'USER COUNT': 3,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Lamar Consolidated Independent School District',
      'STATE': 'Texas',
      'SCHOOL COUNT': 5,
      'USER COUNT': 177,
      'PLAYBACK COUNT': 2997.0},
     {'DISTRICT NAME': 'Lincolnshire Schools',
      'STATE': 'Illinois',
      'SCHOOL COUNT': 3,
      'USER COUNT': 548,
      'PLAYBACK COUNT': 47.0},
     {'DISTRICT NAME': 'Littleton Public Schools',
      'STATE': 'Colorado',
      'SCHOOL COUNT': 3,
      'USER COUNT': 164,
      'PLAYBACK COUNT': 514.0},
     {'DISTRICT NAME': 'Manatee County School District',
      'STATE': 'Florida',
      'SCHOOL COUNT': 10,
      'USER COUNT': 56,
      'PLAYBACK COUNT': 5.0},
     {'DISTRICT NAME': 'Manatee County School District',
      'STATE': 'North Dakota',
      'SCHOOL COUNT': 10,
      'USER COUNT': 56,
      'PLAYBACK COUNT': 5.0},
     {'DISTRICT NAME': 'Miami-Dade County Public Schools',
      'STATE': 0,
      'SCHOOL COUNT': 3,
      'USER COUNT': 3,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Middleton-Cross Plains Area School District',
      'STATE': 'Wisconsin',
      'SCHOOL COUNT': 8,
      'USER COUNT': 156,
      'PLAYBACK COUNT': 198.0},
     {'DISTRICT NAME': 'Mill Valley School District',
      'STATE': 'California',
      'SCHOOL COUNT': 4,
      'USER COUNT': 70,
      'PLAYBACK COUNT': 12.0},
     {'DISTRICT NAME': 'Millard School District',
      'STATE': 'Utah',
      'SCHOOL COUNT': 4,
      'USER COUNT': 102,
      'PLAYBACK COUNT': 1212.0},
     {'DISTRICT NAME': 'Muscatine Community School District',
      'STATE': 'California',
      'SCHOOL COUNT': 4,
      'USER COUNT': 7,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Muscatine Community School District',
      'STATE': 'Iowa',
      'SCHOOL COUNT': 4,
      'USER COUNT': 7,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Northside Independent School District',
      'STATE': 'Texas',
      'SCHOOL COUNT': 5,
      'USER COUNT': 13,
      'PLAYBACK COUNT': 4.0},
     {'DISTRICT NAME': 'Paterson School District',
      'STATE': 'New Jersey',
      'SCHOOL COUNT': 3,
      'USER COUNT': 73,
      'PLAYBACK COUNT': 803.0},
     {'DISTRICT NAME': 'Rich School District',
      'STATE': 'Utah',
      'SCHOOL COUNT': 4,
      'USER COUNT': 182,
      'PLAYBACK COUNT': 201.0},
     {'DISTRICT NAME': 'San Francisco Unified School District',
      'STATE': 'California',
      'SCHOOL COUNT': 3,
      'USER COUNT': 15,
      'PLAYBACK COUNT': 7.0},
     {'DISTRICT NAME': 'San Jose Unified School District',
      'STATE': 'California',
      'SCHOOL COUNT': 40,
      'USER COUNT': 41,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'San Marcos Unified School District',
      'STATE': 0,
      'SCHOOL COUNT': 3,
      'USER COUNT': 4,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'San Marino Unified School District',
      'STATE': 'California',
      'SCHOOL COUNT': 3,
      'USER COUNT': 116,
      'PLAYBACK COUNT': 150.0},
     {'DISTRICT NAME': 'School District of Palm Beach County',
      'STATE': 'Florida',
      'SCHOOL COUNT': 15,
      'USER COUNT': 55,
      'PLAYBACK COUNT': 343.0},
     {'DISTRICT NAME': 'School District of the Chathams',
      'STATE': 0,
      'SCHOOL COUNT': 3,
      'USER COUNT': 4,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'Sevier School District',
      'STATE': 'Utah',
      'SCHOOL COUNT': 3,
      'USER COUNT': 80,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'South Summit School District',
      'STATE': 'Utah',
      'SCHOOL COUNT': 3,
      'USER COUNT': 56,
      'PLAYBACK COUNT': 208.0},
     {'DISTRICT NAME': 'Sudbury Public Schools',
      'STATE': 'Massachusetts',
      'SCHOOL COUNT': 3,
      'USER COUNT': 136,
      'PLAYBACK COUNT': 165.0},
     {'DISTRICT NAME': 'Tooele County School District',
      'STATE': 'Utah',
      'SCHOOL COUNT': 2,
      'USER COUNT': 45,
      'PLAYBACK COUNT': 1.0},
     {'DISTRICT NAME': 'Tooele County School District',
      'STATE': 'Washington',
      'SCHOOL COUNT': 2,
      'USER COUNT': 45,
      'PLAYBACK COUNT': 1.0},
     {'DISTRICT NAME': 'Upland Unified School District',
      'STATE': 0,
      'SCHOOL COUNT': 4,
      'USER COUNT': 111,
      'PLAYBACK COUNT': 715.0},
     {'DISTRICT NAME': 'Wasatch County School District',
      'STATE': 'Utah',
      'SCHOOL COUNT': 5,
      'USER COUNT': 179,
      'PLAYBACK COUNT': 84.0},
     {'DISTRICT NAME': 'Washoe County School District',
      'STATE': 0,
      'SCHOOL COUNT': 3,
      'USER COUNT': 6,
      'PLAYBACK COUNT': 0.0},
     {'DISTRICT NAME': 'West Contra Costa Unified School District',
      'STATE': 'California',
      'SCHOOL COUNT': 4,
      'USER COUNT': 6,
      'PLAYBACK COUNT': 3.0},
     {'DISTRICT NAME': 'Westford Public Schools',
      'STATE': 'Massachusetts',
      'SCHOOL COUNT': 3,
      'USER COUNT': 115,
      'PLAYBACK COUNT': 2.0},
     {'DISTRICT NAME': 'White River School District',
      'STATE': 'South Dakota',
      'SCHOOL COUNT': 4,
      'USER COUNT': 13,
      'PLAYBACK COUNT': 0.0}]
    }
    
    
    });