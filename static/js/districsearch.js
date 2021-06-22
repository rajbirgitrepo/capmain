// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
console.clear();

var data = [
  "CHICO IAMPRESENT",
  "LG IAMPRESENT",
  "YOUNGSTOWN IAMPRESENT",
  "FAIRFIELD IAMPRESENT",
];
let URL = "http://127.0.0.1:5000/schoolsearch/";
let TOTAL = "1";
let SIGNUPS = "1";
let ACTIVE = "1";
class Autocomplete {
  constructor({
    rootNode,
    inputNode,
    resultsNode,
    searchFn,
    shouldAutoSelect = false,
    onShow = () => {},
    onHide = () => {},
  } = {}) {
    this.rootNode = rootNode;
    this.inputNode = inputNode;
    this.resultsNode = resultsNode;
    this.searchFn = searchFn;
    this.shouldAutoSelect = shouldAutoSelect;
    this.onShow = onShow;
    this.onHide = onHide;
    this.activeIndex = -1;
    this.resultsCount = 0;
    this.showResults = false;
    this.hasInlineAutocomplete =
      this.inputNode.getAttribute("aria-autocomplete") === "both";

    // Setup events
    document.body.addEventListener("click", this.handleDocumentClick);
    this.inputNode.addEventListener("keyup", this.handleKeyup);
    this.inputNode.addEventListener("keydown", this.handleKeydown);
    this.inputNode.addEventListener("focus", this.handleFocus);
    this.resultsNode.addEventListener("click", this.handleResultClick);
  }

  handleDocumentClick = (event) => {
    if (
      event.target === this.inputNode ||
      this.rootNode.contains(event.target)
    ) {
      return;
    }
    this.hideResults();
  };

  handleKeyup = (event) => {
    const { key } = event;

    switch (key) {
      case "ArrowUp":
      case "ArrowDown":
      case "Escape":
      case "Enter":
        event.preventDefault();
        return;
      default:
        this.updateResults();
    }

    if (this.hasInlineAutocomplete) {
      switch (key) {
        case "Backspace":
          return;
        default:
          this.autocompleteItem();
      }
    }
  };

  handleKeydown = (event) => {
    const { key } = event;
    let activeIndex = this.activeIndex;

    if (key === "Escape") {
      this.hideResults();
      this.inputNode.value = "";
      return;
    }

    if (this.resultsCount < 1) {
      if (
        this.hasInlineAutocomplete &&
        (key === "ArrowDown" || key === "ArrowUp")
      ) {
        this.updateResults();
      } else {
        return;
      }
    }

    const prevActive = this.getItemAt(activeIndex);
    let activeItem;

    switch (key) {
      case "ArrowUp":
        if (activeIndex <= 0) {
          activeIndex = this.resultsCount - 1;
        } else {
          activeIndex -= 1;
        }
        break;
      case "ArrowDown":
        if (activeIndex === -1 || activeIndex >= this.resultsCount - 1) {
          activeIndex = 0;
        } else {
          activeIndex += 1;
        }
        break;
      case "Enter":
        activeItem = this.getItemAt(activeIndex);
        this.selectItem(activeItem);
        return;
      case "Tab":
        this.checkSelection();
        this.hideResults();
        return;
      default:
        return;
    }

    event.preventDefault();
    activeItem = this.getItemAt(activeIndex);
    this.activeIndex = activeIndex;

    if (prevActive) {
      prevActive.classList.remove("selected");
      prevActive.setAttribute("aria-selected", "false");
    }

    if (activeItem) {
      this.inputNode.setAttribute(
        "aria-activedescendant",
        `autocomplete-result-${activeIndex}`
      );
      activeItem.classList.add("selected");
      activeItem.setAttribute("aria-selected", "true");
      if (this.hasInlineAutocomplete) {
        this.inputNode.value = activeItem.innerText;
      }
    } else {
      this.inputNode.setAttribute("aria-activedescendant", "");
    }
  };

  handleFocus = (event) => {
    this.updateResults();
  };

  handleResultClick = (event) => {
    if (event.target && event.target.nodeName === "LI") {
      this.selectItem(event.target);
    }
  };

  getItemAt = (index) => {
    return this.resultsNode.querySelector(`#autocomplete-result-${index}`);
  };

  selectItem = (node) => {
    if (node) {
      this.inputNode.value = node.innerText;
      this.hideResults();
    }
  };

  checkSelection = () => {
    if (this.activeIndex < 0) {
      return;
    }
    const activeItem = this.getItemAt(this.activeIndex);
    this.selectItem(activeItem);
  };

  autocompleteItem = (event) => {
    const autocompletedItem = this.resultsNode.querySelector(".selected");
    const input = this.inputNode.value;
    if (!autocompletedItem || !input) {
      return;
    }

    const autocomplete = autocompletedItem.innerText;
    if (input !== autocomplete) {
      this.inputNode.value = autocomplete;
      this.inputNode.setSelectionRange(input.length, autocomplete.length);
    }
  };

  updateResults = () => {
    const input = this.inputNode.value;
    const results = this.searchFn(input);

    this.hideResults();
    if (results.length === 0) {
      return;
    }

    this.resultsNode.innerHTML = results
      .map((result, index) => {
        const isSelected = this.shouldAutoSelect && index === 0;
        if (isSelected) {
          this.activeIndex = 0;
        }
        return `
        <li
          id='autocomplete-result-${index}'
          class='autocomplete-result${isSelected ? " selected" : ""}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ""}
        >
          ${result}
        </li>
      `;
      })
      .join("");

    this.resultsNode.classList.remove("hidden");
    this.rootNode.setAttribute("aria-expanded", true);
    this.resultsCount = results.length;
    this.shown = true;
    this.onShow();
  };

  hideResults = () => {
    this.shown = false;
    this.activeIndex = -1;
    this.resultsNode.innerHTML = "";
    this.resultsNode.classList.add("hidden");
    this.rootNode.setAttribute("aria-expanded", "false");
    this.resultsCount = 0;
    this.inputNode.setAttribute("aria-activedescendant", "");
    this.onHide();
  };
}

const search = (input) => {
  if (input.length < 1) {
    return [];
  }
  return data.filter((item) =>
    item.toLowerCase().startsWith(input.toLowerCase())
  );
};

const autocomplete = new Autocomplete({
  rootNode: document.querySelector(".autocomplete"),
  inputNode: document.querySelector(".autocomplete-input"),
  resultsNode: document.querySelector(".autocomplete-results"),
  searchFn: search,
  shouldAutoSelect: true,
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const result = document.querySelector(".search-result");
  const input = document.querySelector(".autocomplete-input");
  // result.innerHTML = 'Searched for: ' + input.value

  $("#viz").empty();
  URL = "http://127.0.0.1:5000/fair/" + input.value;
  TOTAL = "http://127.0.0.1:5000/fair/total/" + input.value;
  SIGNUPS = "http://127.0.0.1:5000/fair/sign/" + input.value;
  ACTIVE = "http://127.0.0.1:5000/fair/active/" + input.value;
  var settings = {
    async: true,
    crossDomain: true,
    url: URL,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);
    console.log(dataa.links[0].source, "hello frnd");

    var nodes = dataa.nodes;

    var links = dataa.links;
    var attributes = dataa.color;

    var viz = d3plus
      .viz()
      .container("#viz")
      .type("rings")
      .data(nodes)
      .id("name")
      .width(1200)
      .height(800)
      .size("size")
      .legend(false)
      .edges(links)
      .edges({ arrows: true })
      .focus(dataa.links[0].source)
      .font({ family: "Helvetica" })
      .tooltip(["names", "Practice_Count"])
      .tooltip({ size: false })
      .attrs(attributes)
      .color("hex")
      .mouse({
        click: function (d, viz) {
          URL =
            "http://127.0.0.1:5000/fair/" +
            input.value +
            "/" +
            d.name;
          $("#next").empty();
          $("#btnExport").show();
          console.log(URL);
          createDynamic(URL);
          total();

          return true;
        },
      })
      //.focus({
      //"tooltip" : false
      //})
      .shape("circle")

      .format({
        text: function (text, key) {
          return text.toUpperCase();
        },
      })
      .draw();

    P2();
  });
});
function total() {
  $("#next").empty();
  console.log(TOTAL);
  cardscroll();
  $("#btnExport").show();
  createDynamic(TOTAL);
  $("#totalparents").fontcolor("red");
}
function sign() {
  $("#next").empty();
  console.log(SIGNUPS);
  cardscroll();
  $("#btnExport").show();
  createDynamic(SIGNUPS);
}
function active() {
  $("#next").empty();
  console.log(ACTIVE);
  cardscroll();
  $("#btnExport").show();
  createDynamic(ACTIVE);
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
      '<table class="table table-striped custab table-fixed" id = "dataTable" ><thead ><tr><th>SCHOOL NAME</th><th>PARENTS NAME</th><th>PARENTS EMAIL</th><th>USER TYPE</th><th>STATE</th> <th>COUNTRY</th> <th>SIGN UP DATE</th> <th>LAST PRACTICE DATE</th><th>PRACTICE COUNT</th></tr ></thead ><tbody>'
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
      '<table class="table table-striped custab table-fixed" id = "dataTable1" style="display:none" ><thead ><tr><th>SCHOOL NAME</th><th>PARENTS NAME</th><th>PARENTS EMAIL</th><th>USER TYPE</th><th>STATE</th> <th>COUNTRY</th> <th>SIGN UP DATE</th><th>LAST PRACTICE DATE</th><th>PRACTICE COUNT</th></tr ></thead ><tbody>'
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

function P2() {
  $("#totalparents").empty();
  $("#signup").empty();
  $("#activeparents").empty();
  $("#minute").empty();
  $("#playback").empty();
  P();
}

function P() {
  var settings = {
    async: true,
    crossDomain: true,
    url: URL,
    method: "GET",
  };
  $.ajax(settings).done(function (response) {
    var dataa = JSON.parse(response);

    $("#totalparents").text(dataa.totparents[0]);
    $("#signup").text(dataa.appsignup[0] + " (" + dataa.appsignupper[0] + "%)");
    $("#activeparents").text(
      dataa.actparents[0] + " (" + dataa.actparentsper[0] + "%)"
    );
    $("#minute").text(dataa.mindfulnessmin[0]);
    $("#playback").text(dataa.playback[0]);
  });
}
