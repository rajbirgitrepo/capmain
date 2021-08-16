$("#Cap4gSnapshot").text("Based on data captured Yesterday");
var settings = {
  async: true,
  crossDomain: true,
  url: "/_executive_dashbaord_",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log("counts are fnctioning");

  // $("#power").text(dataa.r4_count);
  // $("#active").text(dataa.r4_lifetime);
  // $("#passive").text(dataa.green_app);
  // $("#dormant").text(dataa.family_app);
  $("#yearmindful").text("12");

  $("#usercount").text(dataa.user_count.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#totalclassroom").text(dataa.total_classrooms.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#totalstudent").text(dataa.total_students.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#mindful").text(dataa.mindful_minutes.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#neverlogged").text(dataa.practice_count.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#activeschools").text(dataa.active_school.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#tcount").text(dataa.Techers.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#p22count").text(dataa.Homeappusers.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
});

var settings = {
  async: true,
  crossDomain: true,
  url: "/executivecount_productwise",
  method: "GET",
};
$.ajax(settings).done(function (response) {
  var dataa = JSON.parse(response);
  console.log("counts are fnctioning");
  $("#schoolcount").text(dataa.totalschool.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#trial").text(dataa.community.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#lsy").text(dataa.clound.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#next6").text(dataa.explorer.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


  // $("#after6").text(dataa.active_r3 + dataa.district_r3);
  // $("#power").text(dataa.r4_count);
  $("#active").text(dataa.lifetime.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#passive").text(dataa.schoolapp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
  $("#dormant").text(dataa.homeapp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


  // $("#usercount").text(dataa.user_count);
  // $("#totalclassroom").text(dataa.total_classrooms);
  // $("#totalstudent").text(dataa.total_students);
  // $("#mindful").text(dataa.mindful_minutes);
  // $("#neverlogged").text(dataa.never_logged_in);
  // $("#activeschools").text(dataa.active_school);
});
//new

