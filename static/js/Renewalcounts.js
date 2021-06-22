P();
P2();
ut = "http://127.0.0.1:5000/upcomingtable";
ud = "http://127.0.0.1:5000/upcomingzeropractable";
uo = "http://127.0.0.1:5000/upcomingonbtable";

//expired current school year
rt = "http://127.0.0.1:5000/cloudtable";
rd = "http://127.0.0.1:5000/cloudpractice";
ro = "http://127.0.0.1:5000/cloudonboard";

//trial
tt = "http://127.0.0.1:5000/trialtable";
td = "http://127.0.0.1:5000/trialzeropracticetable";
to = "http://127.0.0.1:5000/trialtableonbording";

//after current school year
at = "http://127.0.0.1:5000/aftercsytable";
ad = "http://127.0.0.1:5000/aftercsytableozeroprac";
ao = "http://127.0.0.1:5000/aftercsytableoonbording";

ct = "http://127.0.0.1:5000/expcsytable";
cd = "http://127.0.0.1:5000/expcsytabledatazeropractice";
co = " http://127.0.0.1:5000/expcsytableonboarding";

lt = "http://127.0.0.1:5000/lifetimetable";
ld = "http://127.0.0.1:5000/lifetimezeropracticetable";
lo = "http://127.0.0.1:5000/lifetimetableonbording";

function P2() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/dashcount",
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);

    $("#usercount").text(dataa.totaluserbase[0]);
  });
}

function P() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "http://127.0.0.1:5000/renewalcardnew",
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa.totalschool);

    $("#schoolcount").text("3881");
    console.log(dataa.trial.onboarding);
    $("#trial").text(dataa.trial.total);
    $("#trialonboarding").text(dataa.trial.onbording);
    $("#trialdormant").text(dataa.trial.zeropractice);
    $("#trialpractice").text(dataa.trial.practising);

    $("#lsy").text(dataa.cloud.total);
    $("#lsyonboarding").text(dataa.cloud.onbording);
    $("#lsydormant").text(dataa.cloud.zeropractice);
    $("#lsypractice").text(dataa.cloud.practising);

    $("#last6").text(dataa.expcsy.total);
    $("#recentonboarding").text(dataa.expcsy.onbording);
    $("#recentdormant").text(dataa.expcsy.zeropractice);
    $("#recentpractice").text(dataa.expcsy.practising);

    $("#next6").text(dataa.upccsy.total);
    $("#upcomingonboarding").text(dataa.upccsy.onbording);
    $("#upcomingdormant").text(dataa.upccsy.zeropractice);
    $("#upcomingpractice").text(dataa.upccsy.practising);

    $("#after6").text(dataa.aftercsy.total);
    $("#afteronboarding").text(dataa.aftercsy.onbording);
    $("#afterdormant").text(dataa.aftercsy.zeropractice);
    $("#afterpractice").text(dataa.aftercsy.practising);

    $("#lifetime").text(dataa.lifetime.total);
    $("#lifeonboarding").text(dataa.lifetime.onbording);
    $("#lifedormant").text(dataa.lifetime.zeropractice);
    $("#lifepractice").text(dataa.lifetime.practising);
  });
}
function TT() {
  $("#next").empty();
  $("#container").empty();
  console.log(tt);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("TRAIL TOTAL");
  createDynamic(tt);
}
function TO() {
  $("#next").empty();
  $("#container").empty();
  console.log(to);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("TRAIL ONBOARDING");
  createDynamic(to);
}
function TD() {
  $("#next").empty();
  $("#container").empty();
  console.log(td);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("TRIAL DORAMNT");
  createDynamic(td);
}
function RT() {
  $("#next").empty();
  $("#container").empty();
  console.log(rt);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("RECENT EXPIRATION TOTAL");
  createDynamic(rt);
}
function RO() {
  $("#next").empty();
  $("#container").empty();
  console.log(ro);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("RECENT EXPIRATION ONBOARDING");
  createDynamic(ro);
}
function RD() {
  $("#next").empty();
  $("#container").empty();
  console.log(rd);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("RECENT EXPIRE DORMANT");
  createDynamic(rd);
}
function UT() {
  $("#next").empty();
  $("#container").empty();
  console.log(ut);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("UPCOMING RENEWAL TOTAL");
  createDynamic(ut);
}
function UO() {
  $("#next").empty();
  $("#container").empty();
  console.log(uo);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("UPCOMING RENEWAL ONBOARDING");
  createDynamic(uo);
}
function UD() {
  $("#next").empty();
  $("#container").empty();
  console.log(ud);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("UPCOMING RENEWAL DORMANT");
  createDynamic(ud);
}
function AT() {
  $("#next").empty();
  $("#container").empty();
  console.log(at);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("AFTER CSY TOTAL");
  createDynamic(at);
}
function AO() {
  $("#next").empty();
  $("#container").empty();
  console.log(ao);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("AFTER CSY ONBOARDING");
  createDynamic(ao);
}
function AD() {
  $("#next").empty();
  $("#container").empty();
  console.log(ad);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("AFTER CSY DORMANT");
  createDynamic(ad);
}
function CT() {
  $("#next").empty();
  $("#container").empty();
  console.log(ct);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("EXPIRATION CSY TOTAL");
  createDynamic(ct);
}
function CO() {
  $("#next").empty();
  $("#container").empty();
  console.log(co);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("EXPIRATION CSY ONBOARDING");
  createDynamic(co);
}
function CD() {
  $("#next").empty();
  $("#container").empty();
  console.log(cd);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("EXPIRATION CSY DORMANT");
  createDynamic(cd);
}
function LT() {
  $("#next").empty();
  $("#container").empty();
  console.log(lt);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("LIFETIME TOTAL");
  createDynamic(lt);
}
function LO() {
  $("#next").empty();
  $("#container").empty();
  console.log(lo);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("LIFETIME ONBOARDING");
  createDynamic(lo);
}
function LD() {
  $("#next").empty();
  $("#container").empty();
  console.log(ld);
  cardscroll();
  $("#btnExport").show();
  $("#tablename").text("LIFETIME DORMANT");
  createDynamic(ld);
}
function createDynamic(url) {
  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var data1 = JSON.parse(response);

    $("#next").prepend(
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>STATE</th><th>CITY</th><th>RENEWAL DATE</th><th>USER COUNT</th><th>PRACTICE COUNT</th><th>LAST PRACTICE DATE</th></tr></thead ><tbody>'
    );

    for (var i = 0; i < data1.data.length; i++) {
      var datain = data1.data[i];
      var resultDiv = createDynamicDiv(datain);

      $("#dataTable").append(resultDiv);
    }
    //$('#dataTable1').append('</tbody></table>');
    $("#dataTable").append("</tbody></table>");
    dataTab();

    $("#next1").prepend(
      '<table class="table table-striped custab table-fixed" style="display:none;" id = "dataTable1" ><thead ><tr><th>SCHOOL NAME</th><th>ADMIN NAME</th><th>ADMIN EMAIL</th><th>STATE</th><th>CITY</th><th>RENEWAL DATE</th><th>USER COUNT</th><th>PRACTICE COUNT</th><th>LAST PRACTICE DATE</th></tr></thead ><tbody>'
    );
    for (var i = 0; i < data1.data.length; i++) {
      var datain = data1.data[i];

      var resultDiv = createDynamicDiv(datain);
      $("#dataTable1").append(resultDiv);
    }
    $("#dataTable1").append("</tbody></table>");
  });
}
function dataTab() {
  $("#dataTable").DataTable({
    pageLength: 50,
  });
}
function createDynamicDiv(userList) {
  var dynamicDiv = "";
  console.log(userList);

  dynamicDiv +=
    "<tr >" +
    "<td>" +
    userList[0] +
    "</td>" +
    "<td>" +
    userList[1] +
    "</td>" +
    "<td>" +
    userList[2] +
    "</td>" +
    "<td>" +
    userList[3] +
    "</td>" +
    "<td>" +
    userList[4] +
    "</td>" +
    "<td>" +
    userList[5] +
    "</td>" +
    "<td>" +
    userList[6] +
    "</td>" +
    "<td>" +
    userList[7] +
    "</td>" +
    "<td>" +
    userList[8] +
    "</td>" +
    "</tr>";

  return dynamicDiv;
}
