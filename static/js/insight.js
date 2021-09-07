
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": '/chartdesc2',
          "method": "GET"
         }
         $.ajax(settings).done(function (response) {
          var dataa=JSON.parse(response);
        
        
      
       
         });
         document.getElementById("school_count").title = "total schools including community cloud and explorer school count"