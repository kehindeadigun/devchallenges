function handleSubmit (event) {
    console.log("Submit event fired");
    event.preventDefault();
    console.log("Form submission prevented!");
}

const forms = document.querySelectorAll("form");
forms.forEach(ele => {
    ele.addEventListener("submit", handleSubmit);
})