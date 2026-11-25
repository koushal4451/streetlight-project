// =====================================================
// site.js  -  sirf Aman edit karega
// Navbar me 2 button jodta hai:
//   1. "Menu"  (sirf mobile pe dikhta hai, CSS se)
//   2. "Light mode" / "Dark mode"  (choice browser yaad rakhta hai)
// Har page ke neeche ye ek line chahiye:
//   <script src="js/site.js"></script>
// =====================================================

const nav = document.querySelector("nav");

if (nav) {
  // ---------- 1. Menu button ----------
  const menuBtn = document.createElement("button");
  menuBtn.className = "nav-button nav-menu";
  menuBtn.textContent = "Menu";
  menuBtn.setAttribute("aria-expanded", "false");
  nav.insertBefore(menuBtn, nav.firstChild);

  menuBtn.addEventListener("click", function () {
    // "open" class lagao ya hatao, aur dekho ab khula hai ya nahi
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  // ---------- 2. Theme button ----------
  const themeBtn = document.createElement("button");
  themeBtn.className = "nav-button nav-theme";
  nav.appendChild(themeBtn);

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeBtn.textContent = theme === "light" ? "Dark mode" : "Light mode";
    localStorage.setItem("theme", theme);
  }

  // Pichli baar jo theme chuni thi wahi lagao (pehli baar dark)
  setTheme(localStorage.getItem("theme") || "dark");

  themeBtn.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "dark" : "light");
  });
}
