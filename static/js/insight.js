
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
         document.getElementById("total_students").title = "total students lifetime classroom and homeapp students"
         document.getElementById("total_usercount").title = "total usercount including total taechers and total parents total mindful minutes and total practice count"
         document.getElementById("total_revenue_CSY").title = "total revenue for CSY from foundation district school and donation"
         document.getElementById("Practice_trend_playback").title = "showing comparison of LSY total practice count with CSY practice count including family clever and schoolgy users per month"
         document.getElementById("active_user_trend_playback").title = "showing comparison LSY total user count with CSY user count including family clever and schoolgy users per month"
         document.getElementById("practice_history_CSY_playback").title = "last SY practice count compared with CSY practice count"
         document.getElementById("realtime_playback_sessions_USA").title = "showing realtime playback session in USA"