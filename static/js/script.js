/*global $, console*/
/*
  By Mostafa Omar
	https://www.facebook.com/MostafaOmarIbrahiem
*/
$(function () {
  "use strict";

  (function () {
    var aside = $(".side-nav"),
      showAsideBtn = $(".show-side-btn"),
      contents = $("#contents");

    showAsideBtn.on("click", function () {
      $("#" + $(this).data("show")).toggleClass("show-side-nav");

      contents.toggleClass("margin");
    });

    if ($(window).width() <= 767) {
      aside.addClass("show-side-nav");
    }
    $(window).on("resize", function () {
      if ($(window).width() > 767) {
        aside.removeClass("show-side-nav");
      }
    });

    // dropdown menu in the side nav
    var slideNavDropdown = $(".side-nav-dropdown");

    $(".side-nav .categories li").on("click", function () {
      $(this).toggleClass("opend").siblings().removeClass("opend");

      if ($(this).hasClass("opend")) {
        $(this).find(".side-nav-dropdown").slideToggle(500);

        $(this).siblings().find(".side-nav-dropdown").slideUp(500);
      } else {
        $(this).find(".side-nav-dropdown").slideUp(500);
      }
    });

    $(".side-nav .close-aside").on("click", function () {
      $("#" + $(this).data("close")).addClass("show-side-nav");

      contents.removeClass("margin");
    });
  })();

  // Start chart
});

$("#Cap4gSnapshot").text("Based on data captured till June 30, 2020");


function P2() {
  var settings = {
    async: true,
    crossDomain: true,
    url: "/parentsmap",
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);

    console.log("hello22");
    console.log(dataa.other);
    $("#othe").text(dataa.other);
    $("#russia").text(dataa.india);
    $("#us").text(dataa.usa);
    $("#uk").text(dataa.canada);
    $("#mex").text(dataa.mexico);
    $("#totalparents2").text(dataa.totalparents);
  });
}

function cardscroll() {
  var elmnt = document.getElementById("scroll");
elmnt.scrollIntoView({ block: 'end',  behavior: 'smooth' });
}

function gif2(){
  var modal2 = document.getElementById("myModal2");
  modal2.style.display = "none";
  $('#gif').empty();
}

function clickableTableSchoolName(a){
  window.open("/School_Search?" + a);
}

$(function () {
  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function (position, feedback) {
        $(this).css(position);
        $("<div>")
          .addClass("arrow")
          .addClass(feedback.vertical)
          .addClass(feedback.horizontal)
          .appendTo(this);
      }
    }
  });
});


