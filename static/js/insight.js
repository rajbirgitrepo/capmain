var url = window.location.href;
console.log(url);
var params = url.split('/')[3];
console.log(params);
var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/Dashboard_Insights/Executive_Summary',
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    if (params == "Executive_Dashboard") {
        document.getElementById("school_count").title = dataa.Executive_Summary.CAP_SUMMARY[0].School_Count;
        document.getElementById("total_students").title = dataa.Executive_Summary.CAP_SUMMARY[0].Total_Students;
        document.getElementById("total_usercount").title = dataa.Executive_Summary.CAP_SUMMARY[0].Tota_Usercount;
        document.getElementById("total_revenue_CSY").title = dataa.Executive_Summary.CAP_SUMMARY[0].Total_Revenue_CSY;
        document.getElementById("Practice_trend_playback").title = dataa.Executive_Summary.CAP_SUMMARY[0].Active_Practice_Trend;
        document.getElementById("active_user_trend_playback").title = dataa.Executive_Summary.CAP_SUMMARY[0].Active_Playback_Trend;
        document.getElementById("practice_history_CSY_playback").title = dataa.Executive_Summary.CAP_SUMMARY[0].Practice_History_CSY;
        document.getElementById("realtime_playback_sessions_USA").title = dataa.Executive_Summary.CAP_SUMMARY[0].realtime_playback_sessions_USA;
        document.getElementById("container35").title = dataa.Executive_Summary.CAP_SUMMARY[0].Average_Playback_Trend;
        document.getElementById("container36").title = dataa.Executive_Summary.CAP_SUMMARY[0].Top_District_Playback;
        document.getElementById("container37").title = dataa.Executive_Summary.CAP_SUMMARY[0].Sentiment_Percentage_CSY;
        document.getElementById("container38").title = dataa.Executive_Summary.CAP_SUMMARY[0].Feedback_Rating_CSY;
        
    } else if (params == "Daily_Analytics") {
        document.getElementById("new_signups_daily").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].New_Signups;
        document.getElementById("total_practice_daily").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].Total_Playback;
        document.getElementById("average_feedback_daily").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].Avg._Feedback;
        document.getElementById("Total_JIRA_Tickets").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].Total_Jira_Tickets;
        document.getElementById("practice_comparison_by_program_playback").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].Playback_Comparison_by_Program_DAILY;
        document.getElementById("practice_comparison_by_program_practice").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].Feedback_Comparison_DAILY;
        document.getElementById("topdistrict").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].Top_District_Playback;
        // document.getElementById("topdistrict").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].topdistrict;
        document.getElementById("feedback_comparison_DAILY").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].Feedback_Comparison_DAILY;
        document.getElementById("average_audio_completion_daily").title = dataa.Executive_Summary.DAILY_ANALYTICS[0].Average_Audio_Completion_Daily;

    } else if (params == "Weekly_Analytics") {
        document.getElementById("new_signups_weekly").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].New_Signups;
        document.getElementById("total_practice_weekly").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].Total_Playback;
        document.getElementById("average_feedback_weekly").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].Avg._Feedback;
        document.getElementById("practice_playback_count_weekly_comparison").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].Playback_Count_Weekly_Comparison;
        document.getElementById("top_20_district_practices_playback").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].Top_20_District_Playback;
        // document.getElementById("top_20_district_practices_practice").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].Top_20_District_Practice;
        document.getElementById("average_audio_completion_weekly").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].Average_Audio_Completion_Weekly;
        document.getElementById("streaks_by_wekkly_user").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].Streaks_by_Weely_User;
        document.getElementById("word_cloud").title = dataa.Executive_Summary.WEEKLY_ANALYTICS[0].word_cloud;
    } else if (params == "aws_releases") {
        document.getElementById("feature_releases").title = dataa.Executive_Summary.COMPASS_RELEASES[0].Feature_Release;
    } else if (params == "schoolsummary") {
        document.getElementById("school_count_by_school_type").title = dataa.Executive_Summary.SCHOOL_SUMMARY[0].School_Count_by_School_Type_Mutually_Exclusive;
        document.getElementById("user_count_by_school_type").title = dataa.Executive_Summary.SCHOOL_SUMMARY[0].User_Count_by_School_Type;
        document.getElementById("school_count_by_USA_state").title = dataa.Executive_Summary.SCHOOL_SUMMARY[0].School_Count_by_USA_States;
        document.getElementById("school_count_by_school_type_LG").title = dataa.Executive_Summary.SCHOOL_SUMMARY[0].School_Count_by_School_Type_LG;
        // document.getElementById("school_count_by_school_type_CSY_comparison").title = dataa.Executive_Summary.SCHOOL_SUMMARY[0].school_count_by_school_type_CSY_comparison;
    } else if (params == "awsmain") {
        document.getElementById("aws_vs_playback").title = dataa.Executive_Summary.AWS_ANALYTICS[0].Aws_Vs_Playback;
        document.getElementById("aws_cost_vs_user_growth").title = dataa.Executive_Summary.AWS_ANALYTICS[0].Aws_Cost_Vs_User_Growth;
    } else if (params == "aws") {
        document.getElementById("mongodb_project_outcomes").title = dataa.Executive_Summary.DB_PERFORMANCE_ANALYTICS[0].mongodb_project_outcomes;
        document.getElementById("load_time_performance").title = dataa.Executive_Summary.DB_PERFORMANCE_ANALYTICS[0].load_time_performance;
        document.getElementById("app_server_performance").title = dataa.Executive_Summary.DB_PERFORMANCE_ANALYTICS[0].app_server_performance;
        document.getElementById("app_server_user_experience").title = dataa.Executive_Summary.DB_PERFORMANCE_ANALYTICS[0].app_server_user_experience;
        document.getElementById("relic_analysis").title = dataa.Executive_Summary.DB_PERFORMANCE_ANALYTICS[0].relic_analysis;
        document.getElementById("aws_cost_optimization").title = dataa.Executive_Summary.DB_PERFORMANCE_ANALYTICS[0].aws_cost_optimization;
    } 
     if (params == "Day_In_Life") {
        document.getElementById("Dayinlife_Active_User_Right_Now").title = dataa.Executive_Summary.DAY_IN_LIFE[0].Active_User_Right_Now;
        document.getElementById("Dayinlife_Daily_Active_Users").title = dataa.Executive_Summary.DAY_IN_LIFE[0].Daily_Active_Users;
        document.getElementById("Dayinlife_Total_Playback").title = dataa.Executive_Summary.DAY_IN_LIFE[0].Total_Playback;
        document.getElementById("Dayinlife_Avg_Feedback").title = dataa.Executive_Summary.DAY_IN_LIFE[0].Avg._Feedback;
        document.getElementById("Dayinlife_Playback_Per_Min").title = dataa.Executive_Summary.DAY_IN_LIFE[0].Playback_Per_Min;
        document.getElementById("Dayinlife_Playback_Per_Min_By_Program").title = dataa.Executive_Summary.DAY_IN_LIFE[0].Playback_Per_Min_By_Program;

     }
    else {}
});



var settings = {
    "async": true,
    "crossDomain": true,
    "url": '/Dashboard_Insights/Engagement_Dashboard',
    "method": "GET"
}
$.ajax(settings).done(function(response) {
    var dataa = JSON.parse(response);
    if (params == "NameEScore") {
        document.getElementById("district_engagement_score").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].District_Engagement_Score;
        document.getElementById("active_users_percentage").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].Active_Users;
        document.getElementById("active_usage").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].Active_Usage;
        document.getElementById("recent_engagement").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].Recent_Engagement;
        document.getElementById("consistently_weekly_practices").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].Consistent_Weekly_Playback;
        document.getElementById("active_school_score").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].E-Score;
        document.getElementById("e_score_chart").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].e_score_chart;
       
    } else if (params == "Disctrictfilter") {
        document.getElementById("schools_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].schools_360;
        document.getElementById("teachers_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].teachers_360;
        document.getElementById("practice_sessions_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].practice_sessions_360;
        document.getElementById("family_count_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].family_count_360;
        document.getElementById("mindful_minutes_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].mindful_minutes_360;
        document.getElementById("family_parctice_count_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].family_parctice_count_360;
        document.getElementById("user_practice_history_360").title = dataa.Engagement_Dashboard.DP_360[0].User_Playback_History;
        document.getElementById("practice_trend_by_month_360").title = dataa.Engagement_Dashboard.DP_360[0].Playback_Trend_By_Month;
        document.getElementById("top_20_school_user_count_360").title = dataa.Engagement_Dashboard.DP_360[0].Top_20_School_User_Count_;
        document.getElementById("top_20_school_practice_playback_count_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].top_20_school_practice_playback_count_360;
        document.getElementById("top_20_user_practice").title = dataa.Engagement_Dashboard.DISTRICT_360[0].top_20_user_practice;
        document.getElementById("playback_count_3600").title = dataa.Engagement_Dashboard.DISTRICT_360[0].playback_count_360;
        document.getElementById("heat_map_360").title = dataa.Engagement_Dashboard.DP_360[0].Overall_Playback_Heat_Map;
        document.getElementById("schoolCard").title = dataa.Engagement_Dashboard.DP_360[0].School;
        document.getElementById("teacherCard").title = dataa.Engagement_Dashboard.DP_360[0].Teacher;    
        document.getElementById("familyCard").title = dataa.Engagement_Dashboard.DP_360[0].Family;
        document.getElementById("averageRatingCard").title = dataa.Engagement_Dashboard.DP_360[0].Average_Rating;
        document.getElementById("Top_20_Champion_in_CSY").title = dataa.Engagement_Dashboard.DP_360[0].Top_20_Champion_in_CSY;
        document.getElementById("Sentiment_Percentage").title = dataa.Engagement_Dashboard.DP_360[0].Sentiment_Percentage;
        document.getElementById("Top_20_Champion_in_LSY").title = dataa.Engagement_Dashboard.DP_360[0].Top_20_Champion_in_LSY;
        // document.getElementById("User_Playback_History_360").title = dataa.Engagement_Dashboard.DP_360[0].User_Playback_History;
        // document.getElementById("Playback_Trend_By_Month_360").title = dataa.Engagement_Dashboard.DP_360[0].Playback_Trend_By_Month;

       
    } 
    // else if (params == "partner") {
    //     document.getElementById("schools").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].schools;
    //     document.getElementById("teachers").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].teachers;
    //     document.getElementById("practice_sessions").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].practice_sessions;
    //     document.getElementById("family_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].family_count;
    //     document.getElementById("mindful_minutes").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].mindful_minutes;
    //     document.getElementById("family_parctice_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].family_parctice_count;
    //     document.getElementById("user_practice_playback_history").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].user_practice_playback_history;
    //     document.getElementById("practice_playback_trend_by_month").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].practice_playback_trend_by_month;
    //     document.getElementById("top_20_school_user_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].top_20_school_user_count;
    //     document.getElementById("top_20_school_practice_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].top_20_school_practice_count;
    //     document.getElementById("top_20_user_practice_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].top_20_user_practice_count;
    //     document.getElementById("heat_map_insight").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].heat_map;
    // }
     else if (params == "Login_analytics") {
        document.getElementById("Total_Successful_login").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].TOTAL_SUCESSFUL_LOGINS;
        document.getElementById("Total_Temp_count").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].TOTAL_TEMP_COUNT;
        document.getElementById("unique_user_temp").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].UNIQUE_USER_TEMP;
        document.getElementById("Temporary_passcode_by_users").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Temporary_Passcode_by_Users;
        document.getElementById("Sucessful_login_history").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].SUCESSFUL_LOGIN_HISTORY;
        document.getElementById("New_passcode_email_count").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].NEW_PASSCODE_EMAIL_COUNT;

    } else if (params == "School_Search") {
        document.getElementById("by_home").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].by_home;
        document.getElementById("by_school").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].by_school;
        document.getElementById("by_teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].by_teacher;
        document.getElementById("Activeuserscore").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Active_User_Score_By_School;
        document.getElementById("CWPScore").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].CWP_Score_By_School;
        document.getElementById("ReScore").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Re_Score_By_School;
        document.getElementById("EScore").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Usage_Score_By_School //E_Score
        document.getElementById("Usage1").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Usage_Score_By_School_;
        document.getElementById("Playback_Trend_By_School").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Playback_Trend_By_School;
        document.getElementById("Active_User_Trend_By_School").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Active_User_Trend_By_School;
        document.getElementById("Weekly_Usage_CSY_Absolute_count").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Weekly_Usage_CSY_Absolute_count;
        document.getElementById("Weekly_Usage_CSY_Absolute_count").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Weekly_Usage_CSY_Percentage;
        document.getElementById("Playback_History_BY_SCHOOL").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Playback_History_CSY;
        document.getElementById("Active_User_Count_by_Progrmams").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Active_User_Count_by_Progrmams;
        document.getElementById("Playback_Count_by_Programs").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Playback_Count_by_Programs;
        document.getElementById("Average_Audio_Completion_CSY").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Average_Audio_Completion_CSY;
        document.getElementById("School_Details").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].SCHOOL_DETAILS;   
        document.getElementById("Total_Users_By_School").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Total_Users_By_School;   
        document.getElementById("Average_Rating_By_School").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Average_Rating_By_School;  
        document.getElementById("Playback_Count_By_School").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Playback_Count_By_School;   
        document.getElementById("Playback_Counts_Lifetime").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Playback_Counts_Lifetime_CSY_By_School;   
        document.getElementById("Mindful_Minutes_CSY_By_School").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Mindful_Minutes_CSY_By_School;   
        document.getElementById("Mindful_Minuted_Lifetime").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Mindful_Minuted_Lifetime_By_School;   
        document.getElementById("Last_Playback_Date_CSY").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Last_Playback_Date_CSY_By_Home;   
        document.getElementById("Playback_Count_CSY").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Playback_Count_CSY_By_Home;   
        document.getElementById("Completed_Audio_CSY").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Completed_Audio_CSY_By_Home;   
        document.getElementById("Unique_Audio_Played_CSY").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Unique_Audio_Played_CSY_By_Home;   
        document.getElementById("Mindful_Minutes_CSY_By_Home").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Mindful_Minutes_CSY_By_Home;   
        document.getElementById("Average_Rating_CSY_By_Home").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Average_Rating_CSY_By_Home;   
        document.getElementById("Family_Users_Playback_History_By_Home").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Family_User_Playback_History_By_Home;   
        document.getElementById("Average_Audio_Completion_CSY_By_Home").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Average_Audio_Completion_CSY_By_Home;   
        document.getElementById("Unique_Audio_Completion_CSY_By_Home").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Unique_Audio_Completion_CSY_By_Home; 
        document.getElementById("Last_Playback_Date_CSY_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Last_Playback_Date_CSY;   
        document.getElementById("Playback_Count_CSY_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Playback_Count_CSY_By_Teacher;   
        document.getElementById("Completed_Audio_CSY_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Completed_Audio_CSY_By_Teacher;   
        document.getElementById("Unique_Audio_Played_CSY_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Unique_Audio_Played_CSY_By_Teacher;   
        document.getElementById("Mindful_Minutes_CSY_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Mindful_Minutes_CSY_By_Teacher;   
        document.getElementById("Average_Rating_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Average_Rating_By_Teacher;   
        document.getElementById("User_Playback_History_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].User_Playback_History_By_Teacher;   
        document.getElementById("Average_Audio_Completion_CSY_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Average_Audio_Completion_CSY_By_Teacher;   
        document.getElementById("Unique_Audio_Completion_CSY_By_Teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Unique_Audio_Completion_CSY_By_Teacher;   


    } else if (params == "School_Search_comparison") {
        document.getElementById("by_school_compare").title = dataa.Engagement_Dashboard.ENGAGEMENT_COMPARISON[0].by_school_compare;
        document.getElementById("by_district_compare").title = dataa.Engagement_Dashboard.ENGAGEMENT_COMPARISON[0].by_district_compare;
        document.getElementById("by_user_compare").title = dataa.Engagement_Dashboard.ENGAGEMENT_COMPARISON[0].by_user_compare;
        document.getElementById("School_Playback_Comparision").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].SCHOOL_PLAYBACK_COMPARISON;
        document.getElementById("School_Playback_Cumulative").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].SCHOOL_PLAYBACK_CUMULATIVE;
        document.getElementById("Playback_Count_By_School").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].Playback_Count_By_School;
        document.getElementById("Minddul_Minutes_By_School").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].Minddul_Minutes_By_School;
        document.getElementById("District_Playback_Comparision").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].DISTRICT_PLAYBACK_COMPARISON;
        document.getElementById("District_Playback_Cumulative").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].DISTRICT_PLAYBACK_CUMULATIVE;
        document.getElementById("School_Count_By_District").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].School_Count_By_District;
        document.getElementById("User_Count_By_District").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].User_Count_By_District;
        document.getElementById("Playback_Count_By_District").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].Playback_Count_By_District;
        document.getElementById("Mindful_Minutes_By_District").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].Mindful_Minutes_By_District;
        document.getElementById("Last_Playback_Date_By_User").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].Last_Playback_Date_By_User;
        document.getElementById("Playback_Count_By_User").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].Playback_Count_By_User;
        document.getElementById("Mindful_Minutes_By_User").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].Mindful_Minutes_By_User;
        document.getElementById("Users_Playback_Comparision").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].USER_PLAYBACK_COMPARISON;
        document.getElementById("Users_Playback_Comulative").title = dataa.Engagement_Dashboard.SCHOOL_COMPARISON[0].USER_PLAYBACK_CUMULATIVE;

    }
    else if (params == "21daystreak"){
        document.getElementById("Total_Users_Activated").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Total_Users_Activated;
        document.getElementById("Users_Practiced").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Users_Practiced;
        document.getElementById("Mindful_Minutes").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Mindful_Minutes;
        document.getElementById("Practice_Sessions").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Practice_Sessions;
        document.getElementById("Total_Users_Completed").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Total_Users_Completed;
        document.getElementById("Weekly_Quest_Activation").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Weekly_Quest_Activation;
        document.getElementById("Day_Quest_21_History").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].DAY_QUEST_OPT-IN_HISTORY_21;
        document.getElementById("Day_Quest_21_Streak").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].DAY_QUEST_STREAK_21;
        document.getElementById("Top_20_Districts_Activation").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Top_20_Districts_Activation;

    }

    else if (params == "Local_Disctrictfilter"){
        document.getElementById("Mini_D_360_School").title = dataa.Engagement_Dashboard.MINI_D_360[0].School;
        document.getElementById("Mini_D_360_Teacher").title = dataa.Engagement_Dashboard.MINI_D_360[0].Teacher;
        document.getElementById("Mini_D_360_Family").title = dataa.Engagement_Dashboard.MINI_D_360[0].Family;
        document.getElementById("Mini_D_360_Average_Rating").title = dataa.Engagement_Dashboard.MINI_D_360[0].Average_Rating;
        document.getElementById("overall_mini_district_heat_map").title = dataa.Engagement_Dashboard.MINI_D_360[0].Overall_Playback_Heat_Map;
        document.getElementById("User_mini_district_playback_history").title = dataa.Engagement_Dashboard.MINI_D_360[0].User_Playback_History;
        document.getElementById("mini_district_playback_trend_by_month").title = dataa.Engagement_Dashboard.MINI_D_360[0].Playback_Trend_By_Month;
        document.getElementById("mini_district_top_20_school_user_count").title = dataa.Engagement_Dashboard.MINI_D_360[0].Top_20_School_User_Count;
        document.getElementById("mini_district_top_20_champion_in_CSY").title = dataa.Engagement_Dashboard.MINI_D_360[0].Top_20_Champion_in_CSY;
        document.getElementById("mini_district_top_20_champion_in_LSY").title = dataa.Engagement_Dashboard.MINI_D_360[0].Top_20_Champion_in_LSY;
        document.getElementById("mini_district_sentiment_percentage").title = dataa.Engagement_Dashboard.MINI_D_360[0].Sentiment_Percentage;

         // document.getElementById("Users_Practiced").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Users_Practiced;
        // document.getElementById("Mindful_Minutes").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Mindful_Minutes;
        // document.getElementById("Practice_Sessions").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Practice_Sessions;
        // document.getElementById("Total_Users_Completed").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Total_Users_Completed;
        // document.getElementById("Weekly_Quest_Activation").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Weekly_Quest_Activation;
        // document.getElementById("Day_Quest_21_History").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].DAY_QUEST_OPT-IN_HISTORY_21;
        // document.getElementById("Day_Quest_21_Streak").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].DAY_QUEST_STREAK_21;
        // document.getElementById("Top_20_Districts_Activation").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].Top_20_Districts_Activation;
        
    }

    //else if (params == "leadGeneration") {
    // document.getElementById("total_users").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].total_users;
    // document.getElementById("active_streak").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].active_streak;
    // document.getElementById("streak_count").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].streak_count;
    // } 
    else {}
});









// document.getElementById("total_users").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].total_users;
// document.getElementById("active_streak").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].active_streak;
// document.getElementById("streak_count").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].streak_count;
// document.getElementById("quest_streak_21_days").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].quest_streak_21_days;
// document.getElementById("quest_active_streak_21_days").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].quest_active_streak_21_days;
// document.getElementById("quest_user_status_21_days").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].quest_user_status_21_days;
// document.getElementById("quest_opt_in_history_21_days").title = dataa.Engagement_Dashboard.DAY_STREAK_21[0].quest_opt_in_history_21_days;

// document.getElementById("Total_Successful_login").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Total_Successful_login;
// document.getElementById("Total_Temp_count").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Total_Temp_count;
// document.getElementById("New_passcode_email_count").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].New_passcode_email_count;
// document.getElementById("unique_user_temp").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].unique_user_temp;
// document.getElementById("Sucessful_login_history").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Sucessful_login_history;
// document.getElementById("Temporary_passcode_by_users").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Temporary_passcode_by_users;