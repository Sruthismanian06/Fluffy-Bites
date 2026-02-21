document.addEventListener("DOMContentLoaded", function() {
    let menuIcon = document.getElementById("menuIcon");
    let crossIcon = document.getElementById("crossIcon");
    let navItems = document.getElementById("navItems");

    function toggleMenu() {
        menuIcon.classList.toggle("hidden");
        navItems.classList.toggle("hidden");
        crossIcon.classList.toggle("hidden");
    }

    menuIcon.addEventListener("click", toggleMenu);
    crossIcon.addEventListener("click", toggleMenu);
});

