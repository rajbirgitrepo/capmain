const indicator = document.querySelector(".nav-indicator");
const items = document.querySelectorAll(".nav-item");

function handleIndicator(el) {
  items.forEach(item => {
    item.classList.remove("is-active");
    item.removeAttribute("style");
  });

  indicator.style.height = `${el.offsetHeight}px`;
  indicator.style.top = `${el.offsetTop}px`;
  indicator.style.backgroundColor = el.getAttribute("active-color");

  el.classList.add("is-active");
  el.style.color = "#00a651";
}

items.forEach((item, index) => {
  item.addEventListener("click", e => {
    handleIndicator(e.target);
  });
  item.classList.contains("is-active") && handleIndicator(item);
});