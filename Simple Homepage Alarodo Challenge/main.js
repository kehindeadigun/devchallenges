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

let lightMoon = "./resources/Moon_fill_light.svg";
let darkMoon = "./resources/Moon_fill.svg";

let lightSun = "./resources/Sun_fill_light.svg";
let darkSun = "./resources/Sun_fill.svg";


let sunImages = document.querySelectorAll(".sun-button");
let moonImages = document.querySelectorAll(".moon-button");

let modeToggle = document.querySelectorAll(".mode-toggle");


// set the default color mode and checkbox values

function setStartupColors () {
    let colorMode = localStorage.getItem("color-mode");
    let toggleKnobs = document.querySelectorAll(".knob");
    sunImages.forEach(ele => ele.src = (colorMode === "dark") ? lightSun: darkSun);
    moonImages.forEach(ele => ele.src = (colorMode === "dark") ? darkMoon: lightMoon);
    if (colorMode=="dark"){
        toggleKnobs.forEach(knob => knob.style.left = "2px");
    }
}

document.addEventListener("DOMContentLoaded", setStartupColors);


// Toggle buttons and screen mode

function changeColorMode(event) {
    console.log('Triggered!')
    let currentMode = document.documentElement.getAttribute("data-theme");
    let newMode = currentMode==="dark" ? "light": "dark";

    let newState = event.target.checked;
    modeToggle.forEach(e => e.checked = newState);
    console.log(newState)
    console.log(newMode)

    // set images and data for light or dark mode
    sunImages.forEach(ele => ele.src = (newMode === "dark") ? lightSun: darkSun);
    moonImages.forEach(ele => ele.src = (newMode === "dark") ? darkMoon: lightMoon);

    document.documentElement.setAttribute("data-theme", newMode);
    localStorage.setItem("color-mode", newMode);
}

document.addEventListener("DOMContentLoaded", () => {
    modeToggle.forEach((ele) => ele.addEventListener("change", changeColorMode));
});