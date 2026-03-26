const data = document.querySelectorAll(".data__toggle");
const list = document.querySelectorAll(".options li");

function handleFAQClick ({target}) {
    const dataElem = target.closest(".data");
    desc = dataElem.querySelector(".data__description");
    if (!desc) {return}
    dataElem.classList.toggle("active");
    dataElem.classList.toggle("padded");
    target.classList.toggle("rotated");
    desc.classList.toggle("hidden");
}


data.forEach(ele => ele.addEventListener("click", handleFAQClick))