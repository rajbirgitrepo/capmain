Highcharts.chart('container6', {
    chart: {
      type: 'packedbubble',
      height: '60%'
    },
    title: {
      text: 'Top 10 Transactions 2021-2022'
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b>$ {point.value}'
    },
    credits:false,
    plotOptions: { series: {point: {
                  events: {
                      click: function () {
                        //console.log("hellooooo",this);
                          // alert(' value: ' + this.series.name[0]);
                        
                        URL = '/toptrans/'+this.name;
                        $("#next").empty();
                        $("#btnExport").show();
                        console.log(URL);
                        createDynamic(URL);   
                      }
                  }}},
      packedbubble: {
        minSize: '20%',
        maxSize: '100%',
        zMin: 0,
        zMax: 25000,
        layoutAlgorithm: {
          gravitationalConstant: 0.11,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: false,
          parentNodeLimit: true
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: 250
          },
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal'
          }
        }
      }
    },
    series: [{
      name: 'SCHOOL',
      color:"#335736",
      data: [{'name': 'SUPER ADMIN', 'value': 1400.0},
   {'name': 'Tracy Schenk', 'value': 1000.0},
   {'name': 'MARLENE RAMIREZ', 'value': 1000.0},
   {'name': 'Tiffany Randall', 'value': 1000.0},
   {'name': 'Jen McDonald', 'value': 1000.0},
   {'name': 'Ricardo Tamayo', 'value': 990.0},
   {'name': 'Jill DeVane', 'value': 1400.0},
   {'name': 'Misti Warner', 'value': 2100.0},
   {'name': 'Gwen Neering', 'value': 59.9900016784668},
   {'name': 'Judy', 'value': 1000.0}]
    }, {
      name: 'DISTRICT',
      color:"#4DA555",
      data: [{'name': 'Youngstown City School District', 'value': 12500.0},
   {'name': 'Racine School District', 'value': 28000.0},
   {'name': 'Belleville Schools', 'value': 7000.0},
   {'name': 'Wichita Falls Independent School District', 'value': 4200.0},
   {'name': 'Fairfield-Suisun USD', 'value': 25000.0},
   {'name': 'Upland Unified School District', 'value': 1000.0},
   {'name': 'Ogden School District', 'value': 5600.0},
   {'name': 'Salt Lake City School District', 'value': 18000.0},
   {'name': 'Wayne Metro-Detroit', 'value': 11200.0},
   {'name': 'Broward County Public Schools', 'value': 150000.0},]
    }, {
      name: 'FOUNDATION',
      color:"#1A7D22",
      data: [ {'name': 'ANNETTE J. HAGENS MEMORIAL FOUNDATION', 'value': 3500.0},
   {'name': 'CVS HEALTH FOUNDATION', 'value': 500.0},
   {'name': 'TRUST FOR THE MEDITATION PROCESS', 'value': 6000.0},
   {'name': 'COMMUNITY FOUNDATION OF TAMPA BAY', 'value': 27000.0},
   {'name': 'THE SKILLMAN FOUNDATION', 'value': 80000.0},
   {'name': 'COMMUNITY FOUNDATION OF SARASOTA COUNTY, INC', 'value': 500.0},
   {'name': 'ANNETTE J. HAGENS MEMORIAL FOUNDATION', 'value': 3500.0},
   {'name': 'LG ELECTRONICS USA INC.', 'value': 120000.0},
   {'name': 'PNC FOUNDATION', 'value': 8500.0},
   {'name': 'EISNER FOUNDATION', 'value': 2500.0}]
    }, {
      name: 'DONATION',
      color:"#154519",
      data: [{'name': 'LAURA BAKOSH', 'value': 25.0},
   {'name': 'CARLA L GREGORY', 'value': 50.0},
   {'name': 'JILL EDWARDS', 'value': 50.0},
   {'name': 'KENDRA HOLMAN', 'value': 10.0},
   {'name': 'PAULA GREEN', 'value': 5.0},
   {'name': 'LISSET HANEWICZ', 'value': 50.0},
   {'name': 'HISTORIC UPTOWN', 'value': 100.0},
   {'name': 'JENNIFER LIN', 'value': 3030.0},
   {'name': 'KATHI KEMPER', 'value': 150.0},
   {'name': 'DEBRA D. ESTON', 'value': 3500.0}]
    }]
  });
  
