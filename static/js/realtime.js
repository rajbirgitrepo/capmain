var previous = null;
 var current = null;
     setInterval(function() {
  var settings = {
     "async": true,
     "crossDomain": true,
     "url":             "http://127.0.0.1:5000/rtusercount",
     "method": "GET"
    }
     $.ajax(settings).done(function (response) {
     var data=JSON.parse(response); 
      console.log(data.userpracticing); 
      $("#Total_amount").text(data.userpracticing);
      $("#totaldonor").text(data.parentrpracticing);
             if (previous && current && previous !== current) {
                 console.log('refresh');
                 location.reload();
             }
             previous = current;
         });                       
     }, 60000); 



var previous = null;
var current = null;
    setInterval(function() {
 var settings = {
    "async": true,
    "crossDomain": true,
    "url":             "http://127.0.0.1:5000/rtmapcount",
    "method": "GET"
   }
    $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response); 
       // console.log(dataa[0]);
 // var text1 = JSON.stringify(dataa);
 //      document.getElementById("myText").innerHTML = dataa[0];
        console.log(dataa); 
          // document.getElementById("myText").innerHTML = dataa;
            if (previous && current && previous !== current) {
                console.log('refresh');
                location.reload();
            }
            previous = current;
       

var dataa= dataa
  console.log(dataa,"hello"); 
  $.each(dataa, function() {
    this.code = this.code.toUpperCase();
    this.z = this.value;
   
    
  });


  // Instantiate the map
  Highcharts.mapChart('containerreal', {

    chart: {
      map: 'countries/us/us-all'
    },
    credits:{enabled:false},

    title: {
      text: ''
    },

    exporting: {
      sourceWidth: 600,
      sourceHeight: 500
    },

    legend: {enabled:false,
      layout: 'horizontal',
      borderWidth: 0,
      backgroundColor: 'rgba(255,255,255,0.85)',
      floating: true,
      verticalAlign: 'top',
      y: 25
    },

    mapNavigation: {
      enabled: true
    },

    series: [{
      showInLegend: false
    }, {
      animation: {
        duration: 1000
      },
      data: dataa,
      type: 'mapbubble',
      color:'#228B22',
      joinBy: ['postal-code', 'code'],
      dataLabels: {
        enabled: true,
        color: '#FFFFFF',
        format: '{point.code}'
      },
      name: 'Live Users',
      tooltip: {
        pointFormat: '{point.name}: {point.value}'
      }
    }]
  });

    });                       
 }, 60000);   

