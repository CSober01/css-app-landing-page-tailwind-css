
// ========================================
// Navigation Controller
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  const desktopQuery = window.matchMedia("(min-width: 835px)");

  if (!menuToggle || !mobileMenu || !menuIcon) {
    console.error("Navigation elements not found");
    return;
  }

  function setMenu(isOpen) {

    // Never open mobile menu on desktop
    isOpen = isOpen && !desktopQuery.matches;

    mobileMenu.classList.toggle("hidden", !isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuIcon.innerHTML = isOpen
      ? `<path stroke-linecap="round" stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12" />`
      : `<path stroke-linecap="round" stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16" />`;
  }

  // Toggle menu
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    setMenu(!isOpen);
  });

  // Close outside
  document.addEventListener("click", (event) => {
    if (
      !menuToggle.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      setMenu(false);
    }
  });

  // Close menu after clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Close with Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  // Reset when switching to desktop
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", () => {
      setMenu(false);
    });
  } else {
    desktopQuery.addListener(() => {
      setMenu(false);
    });
  }

});
