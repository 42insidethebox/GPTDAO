document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll(".apply-button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      let parentH3 = this.closest("li").querySelector("h3");
      console.log(parentH3.innerText);
    });
  });
});
