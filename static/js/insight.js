
        var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/chartdesc2',
    "method": "GET"
   }
   $.ajax(settings).done(function (response) {
    var dataa=JSON.parse(response);
  
    
  $('#AWS_Analytics').text(dataa.AWS_Analytics);
   $('#AWS_Analytics').text(dataa.AWS_Analytics);
  $('#AWS_Cost_Vs_Playback').text(dataa.AWS_Cost_Vs_Playback);
   $('#AWS_Cost_Vs_Usergrowth').text(dataa.AWS_Cost_Vs_Usergrowth);
  $('#AWS_Releases').text(dataa.AWS_Releases);
  $('#Active_User_Trend').text(dataa.Active_User_Trend);
  $('#Android_Analytics').text(dataa.Android_Analytics);
  $('#App_Installs').text(dataa.App_Installs);
  $('#App_Practice_Analytics').text(dataa.App_Practice_Analytics);
  $('#Average_Practice_trend').text(dataa.Average_Practice_Trend);
  $('#Bill_Me_Later').text(dataa.Bill_Me_Later); 
  $('#Cloud_users').text(dataa.Cloud_Users);
  $('#Daily_Survey_Progress').text(dataa.Daily_Survey_Progress);
  $('#Day_Wise_Active_Users_Count').text(dataa.Day_Wise_Active_Users_Count);
  $('#Day_Wise_Family_Practice').text(dataa.Day_Wise_Family_Practice);
  $('#Day_Wise_Family_Signups').text(dataa.Day_Wise_Family_Signups);
  $('#Data_Wise_Practice_Count').text(dataa.Day_Wise_Practice_Count);
  $('#Day_Wise_Unique_Family_Practice').text(dataa.Day_Wise_Unique_Family_Practice);
  $('#District_Level_View').text(dataa.District_Level_View);
  $('#Exectuive_Dashboard').text(dataa.Exectuive_Dashboard);
  $('#Family_App_Analytics').text(dataa.Family_App_Analytics);
  $('#Family_App_District').text(dataa.Family_App_District);
  $('#Family_App_Geo').text(dataa.Family_App_Geo);
  $('#Family_App_Practice').text(dataa.Family_App_Practice);
  $('#Family_App_School').text(dataa.Family_App_School);
  $('#Family_App_Signups').text(dataa.Family_App_Signups);
  $('#Family_App_Signups_By_School').text(dataa.Family_App_Signups_By_School);
  $('#Family_Feedback_Analytics').text(dataa.Family_Feedback_Analytics);
  $('#Family_Hourly_Practice').text(dataa.Family_Hourly_Practice);
  $('#Family_Hourly_Practice_Comparison').text(dataa.Family_Hourly_Practice_Comparison);
  $('#Family_Hourly_Signups').text(dataa.Family_Hourly_Signups);
  $('#Family_Hourly_Signups_comparison').text(dataa.Family_Hourly_Signups_comparison);
  $('#Family_School_Search').text(dataa.Family_School_Search);
  $('#Family_Signup_Trend_By_District').text(dataa.Family_Signup_Trend_By_District);
  $('#Family_Survey_Analytics').text(dataa.Family_Survey_Analytics);
  $('#Feature_Release').text(dataa.Feature_Release);
  $('#Feedback_Analytics').text(dataa.Feedback_Analytics);
  $('#Feedback_Rating').text(dataa.Feedback_Rating);
  $('#Feedback_Rating_2').text(dataa.Feedback_Rating_2);
  $('#Feedback_Trend').text(dataa.Feedback_Trend);
  $('#IOS_Analytics').text(dataa.IOS_Analytics);
  $('#Mobile_App_Payment_History').text(dataa.Mobile_App_Payment_History);
  $('#Payment_Mode_User').text(dataa.Payment_Mode_User);
  $('#Payment_Modes_Amount').text(dataa.Payment_Modes_Amount);
  $('#Practice_Analytics').text(dataa.Practice_Analytics);
  $('#Practice_History').text(dataa.Practice_History);
  $('#Practice_Trend').text(dataa.Practice_Trend);
  $('#Program_Wise_Active_Family_Practice_Trend').text(dataa.Program_Wise_Active_Family_Practice_Trend);
  $('#Program_Wise_Active_Family_Trend').text(dataa.Program_Wise_Active_Family_Trend);
  $('#Program_Wise_Active_Users_Trend').text(dataa.Program_Wise_Active_Users_Trend);
  $('#Program_Wise_Analytics').text(dataa.Program_Wise_Analytics);
  $('#Program_Wise_Family_Practice_Trend').text(dataa.Program_Wise_Family_Practice_Trend);
  $('#Program_Wise_Practice_Trend').text(dataa.Program_Wise_Practice_Trend);
  $('#Program_Wise_Unique_User_Practice').text(dataa.Program_Wise_Unique_User_Practice);
  $('#Questions_Attempted').text(dataa.Questions_Attempted);
  $('#SMS_Success_Report').text(dataa.SMS_Success_Report);
  $('#SM_Delivery_Analytics').text(dataa.SM_Delivery_Analytics);
  $('#School_Analytics').text(dataa.School_Analytics);
  $('#School_Search').text(dataa.School_Search);
  $('#School_Up_For_Renewal_Next_6_Months').text(dataa.School_Up_For_Renewal_Next_6_Months);
  $('#Schoology_Analytics').text(dataa.Schoology_Analytics);
  $('#Schools_Expired_in_Current_SY').text(dataa.Schools_Expired_in_Current_SY);
  $('#Sentiment_Analysis').text(dataa.Sentiment_Analysis);
  $('#Sessions').text(dataa.Sessions);
  $('#Signup_History').text(dataa.Signup_History);
  $('#Subscription_Expired').text(dataa.Subscription_Expired);
  $('#Survey_Hours').text(dataa.Survey_Hours);
  $('#Survey_Response_mid_to_high').text(dataa.Survey_Response_mid_to_high);
  $('#Survey_Response_pre_Elementary').text(dataa.Survey_Response_pre_Elementary);
  $('#Survey_Response_Analysis').text(dataa.Survey_Response_Analysis);
  $('#Transaction_Report').text(dataa.Transaction_Report);
  $('#Upcoming_Renewal').text(dataa.Upcoming_Renewal);
  $('#User_Feedback_Trend_YOY').text(dataa.User_Feedback_Trend_YOY);
  $('#Web_App_Payment_History').text(dataa.Web_App_Payment_History);
  $('#Whats_new').text(dataa.Whats_new);
 $('#Family_Feedback_Rating').text(dataa.Family_Feedback_Rating);
 $('#Family_Sentiment_Analysis').text(dataa.Family_Sentiment_Analysis);
 $('#Word_Cloud').text(dataa. Word_Cloud);
 $('#School_Count_Family_App_Geo').text(dataa.School_Count_Family_App_Geo);
 $('#Impressions').text(dataa.Impressions);
 $('#Page_Views').text(dataa.Page_Views);
 $('#Downloads').text(dataa.Downloads);
 $('#Trial_Users').text(dataa.Trial_Users);
 $('#Search_Table').text(dataa.Search_Table);
 $('#Email_Table').text(dataa.Email_Table);
 $('#Email_Search').text(dataa.Email_Search);
 $('#District_Level_View_spider').text(dataa.District_Level_View_spider);
 $('#searchtable').text(dataa.searchtable);
 $('#Release_notes_date').text(dataa.Release_notes_date);
 $('#Whats_new2').text(dataa.Whats_new2);
 $('#Whats_new3').text(dataa.Whats_new3);
 $('#Whats_new4').text(dataa.Whats_new4);
 $('#Whats_new5').text(dataa.Whats_new5);
 $('#Whats_new6').text(dataa.Whats_new6);
 $('#Whats_new7').text(dataa.Whats_new7);
 $('#Whats_new1').text(dataa.Whats_new1);
 $('#bounce').text(dataa.bounce_rate);
 $('#newuser').text(dataa.New_Visitor);
 $('#returning').text(dataa.Returning_Visitor);

 
   });
 