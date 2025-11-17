let menuButtonToggle = document.querySelectorAll('.menu-button');
let closeButton = document.querySelectorAll('.close-icon');
let mobileNav = document.querySelector('.select-nav');

// mobile menu event listeners

function showMenu() {
    mobileNav.style.display = 'block';
}

function hideMenu() {
    mobileNav.style.display = 'none';
}

menuButtonToggle.forEach(ele => ele.addEventListener('click', showMenu));
closeButton.forEach(ele => ele.addEventListener('click', hideMenu));

// Toggle buttons and screen mode

let lightMoon = "./resources/Moon_fill_light.svg"
let darkMoon = "./resources/Moon_fill.svg"

let lightSun = "./resources/Sun_fill_light.svg"
let darkSun = "./resources/Sun_fill.svg"

let modeToggle = document.querySelectorAll(".mode-toggle")
let sunImages = document.querySelectorAll(".sun-button")
let moonImages = document.querySelectorAll(".moon-button")

function changeColorMode() {
    let toggled = Array.from(modeToggle).some(e => e.checked);
    if (toggled==true){
        /*  DARK MODE */
        sunImages.forEach(ele => ele.src = lightSun);
        moonImages.forEach(ele => ele.src = darkMoon);
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("color-mode", "dark");
    }
    else {
        /*  LIGHT MODE */
        sunImages.forEach(ele => ele.src = darkSun);
        moonImages.forEach(ele => ele.src = lightMoon);
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("color-mode", "light");
    }
}

modeToggle.forEach((ele) => ele.addEventListener("change", changeColorMode));
window.addEventListener("DOMContentLoaded", () => {
    let saved = localStorage.getItem("color-mode");
    if (saved === "dark") {
        modeToggle.forEach(ele => ele.checked = true);
    }
    else {
        modeToggle.forEach(ele => ele.checked = false);
    }
    setTimeout(changeColorMode, 0);
})