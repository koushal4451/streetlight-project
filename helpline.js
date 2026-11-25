const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeButton.textContent = "Dark mode";
  } else {
    themeButton.textContent = "Light mode";
  }
});