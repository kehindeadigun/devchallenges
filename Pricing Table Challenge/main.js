let columns = document.querySelectorAll(".plan-column");
let whiteTick = "./resources/check-white.svg";
let darkTick = "./resources/check-dark.svg";
let whiteArrow = "./resources/down arrow-white.svg";
let blueArrow = "./resources/down arrow-blue.svg";
let selected = document.querySelector(".plan-column.selected"); // default $99

function applyDark(col) {
    let ticks = col.querySelectorAll(".tick");
    ticks.forEach(t => t.src = whiteTick);

    let arrow = col.querySelector(".plan-cto");
    if (arrow) arrow.src = whiteArrow;

    col.style.setProperty('--heading-color', '#FFFFFF');
    col.style.setProperty('--plan-text', '#FFFFFF');
    col.style.setProperty('--month-color', '#FFFFFF');
    col.style.setProperty('--footer-color', '#d99426');
    col.style.setProperty('--name-color', '#263FA9');
    col.style.backgroundColor = '#121826';
}

function applyLight(col) {
    let ticks = col.querySelectorAll(".tick");
    ticks.forEach(t => t.src = darkTick);

    let arrow = col.querySelector(".plan-cto");
    if (arrow) arrow.src = blueArrow;
    
    col.style.setProperty('--heading-color', '#121826');
    col.style.setProperty('--plan-text', '#263FA9');
    col.style.setProperty('--month-color', '#4D5562');
    col.style.setProperty('--footer-color', '#FFFFFF');
    col.style.setProperty('--name-color', '#FFFFFF');
    col.style.backgroundColor = '#FFFFFF';
}

columns.forEach(col => {

    col.addEventListener("mouseenter", () => {
        // lighten the selected column if it's NOT the hovered one
        if (selected !== col) {
            applyLight(selected);
        }

        // darken the hovered column
        applyDark(col);
    });

    col.addEventListener("mouseleave", () => {
        // lighten the hovered column (if it's not selected)
        if (col !== selected) {
            applyLight(col);
        }
        // restore selected column to dark
        applyDark(selected);
    });
});
