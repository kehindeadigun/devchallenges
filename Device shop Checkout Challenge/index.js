function handleSubmit (event) {
    console.log("Submit event fired");
    event.preventDefault();
    console.log("Form submission prevented!");
}

function handleClose({target}) {
    let targetItem = target.closest(".item");
    targetItem.style.display = "none";
    console.log("Close event fired");
}

const closeButtons = document.querySelectorAll(".close-button");
closeButtons.forEach(ele => {
    ele.addEventListener("click", handleClose);
})

const forms = document.querySelectorAll("form");
forms.forEach(ele => {
    ele.addEventListener("submit", handleSubmit);
})