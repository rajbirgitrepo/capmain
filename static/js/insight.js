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
    } else {}
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
        document.getElementById("active_users_percentage").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].Active_User;
        document.getElementById("active_usage").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].Active_Usage;
        document.getElementById("recent_engagement").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].Recent_Engagement;
        document.getElementById("consistently_weekly_practices").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].Consistent_Weekly_Playback;
        document.getElementById("active_school_score").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].consistently_weekly_practices;
        document.getElementById("e_score_chart").title = dataa.Engagement_Dashboard.DISTRICT_ENGAGEMENT[0].e_score_chart;
    } else if (params == "Disctrictfilter") {
        document.getElementById("schools_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].schools_360;
        document.getElementById("teachers_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].teachers_360;
        document.getElementById("practice_sessions_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].practice_sessions_360;
        document.getElementById("family_count_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].family_count_360;
        document.getElementById("mindful_minutes_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].mindful_minutes_360;
        document.getElementById("family_parctice_count_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].family_parctice_count_360;
        document.getElementById("user_practice_history_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].user_practice_history_360;
        document.getElementById("practice_trend_by_month_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].practice_trend_by_month_360;
        document.getElementById("top_20_school_user_count_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].top_20_school_user_count_360;
        document.getElementById("top_20_school_practice_playback_count_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].top_20_school_practice_playback_count_360;
        document.getElementById("top_20_user_practice ").title = dataa.Engagement_Dashboard.DISTRICT_360[0].top_20_user_practice;
        document.getElementById("playback_count_3600").title = dataa.Engagement_Dashboard.DISTRICT_360[0].playback_count_360;
        document.getElementById("heat_map_360").title = dataa.Engagement_Dashboard.DISTRICT_360[0].heat_map_360;
    } else if (params == "partner") {
        document.getElementById("schools").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].schools;
        document.getElementById("teachers").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].teachers;
        document.getElementById("practice_sessions").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].practice_sessions;
        document.getElementById("family_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].family_count;
        document.getElementById("mindful_minutes").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].mindful_minutes;
        document.getElementById("family_parctice_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].family_parctice_count;
        document.getElementById("user_practice_playback_history").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].user_practice_playback_history;
        document.getElementById("practice_playback_trend_by_month").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].practice_playback_trend_by_month;
        document.getElementById("top_20_school_user_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].top_20_school_user_count;
        document.getElementById("top_20_school_practice_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].top_20_school_practice_count;
        document.getElementById("top_20_user_practice_count").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].top_20_user_practice_count;
        document.getElementById("heat_map_insight").title = dataa.Engagement_Dashboard.PARTNER_PORTAL[0].heat_map;
    } else if (params == "Login_analytics") {
        document.getElementById("Total_Successful_login").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Total_Successful_login;
        document.getElementById("Total_Temp_count").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Total_Temp_count;
        document.getElementById("unique_user_temp").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].unique_user_temp;
        document.getElementById("Temporary_passcode_by_users").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Temporary_passcode_by_users;
        document.getElementById("Sucessful_login_history").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].Sucessful_login_history;
        document.getElementById("New_passcode_email_count").title = dataa.Engagement_Dashboard.LOGIN_ANALYTICS[0].New_passcode_email_count;

    } else if (params == "School_Search") {
        document.getElementById("by_home").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].by_home;
        document.getElementById("by_school").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].by_school;
        document.getElementById("by_teacher").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].by_teacher;
        document.getElementById("Activeuserscore").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Active_User_Score;
        document.getElementById("CWPScore").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].CWP_Score;
        document.getElementById("ReScore").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Re_Score;
        document.getElementById("EScore").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].E_Score;
        document.getElementById("Usage1").title = dataa.Engagement_Dashboard.SCHOOL_SEARCH[0].Usage_Score;

    } else if (params == "School_Search_comparison") {

        document.getElementById("by_school_compare").title = dataa.Engagement_Dashboard.ENGAGEMENT_COMPARISON[0].by_school_compare;
        document.getElementById("by_district_compare").title = dataa.Engagement_Dashboard.ENGAGEMENT_COMPARISON[0].by_district_compare;
        document.getElementById("by_user_compare").title = dataa.Engagement_Dashboard.ENGAGEMENT_COMPARISON[0].by_user_compare;
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