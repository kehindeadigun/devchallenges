let currentStep = 0;
let continueButtons = document.querySelectorAll(".continue");
let steps = document.querySelectorAll(".form-step");
let stepDots = document.querySelectorAll(".steps__dot-container");
let stepsText = document.querySelector(".steps__outer-text");
const multiStepForm = document.getElementById("multiStepForm");

continueButtons.forEach((button) => {
  button.addEventListener("click", updateFormDisplay);
});

function showStep(givenStep) {
  // Display current step in the UI
  steps.forEach((step, index) => {
    step.classList.toggle("hidden", index !== givenStep);
    stepDots[index].classList.toggle("is-highlighted", index === givenStep);
  });
  if (givenStep == steps.length - 1) {
    populateAnswers();
  }
  stepsText.textContent = `Step ${givenStep + 1} of ${steps.length}`;
}

function isValidFormBlock(formStep) {
  let formData = formStep.querySelector(".form-data");
  if (!formData.classList.contains("summary")) {
    let checkboxes = [...formData.querySelectorAll('input[type="checkbox"]')];
    if (checkboxes.length) {
      let noneChecked = !checkboxes.some((box) => box.checked);
      checkboxes[0].setCustomValidity(
        noneChecked ? "Pick at least one topic" : "",
      );
    }
    let inputs = [...formData.querySelectorAll("input")];
    return inputs.every((input) => input.reportValidity());
  }
  return true;
}

function updateFormDisplay(event) {
  let formStep = event.target.closest(".form-step");
  if (!isValidFormBlock(formStep)) {
    return;
  }
  currentStep += 1;
  showStep(currentStep);
}

function populateAnswers() {
  let topicListFragment = document.createDocumentFragment();
  const formData = new FormData(multiStepForm);
  const submittedTopics = formData.getAll("topic");

  for (let topic of submittedTopics) {
    let topicContent = document.createElement("li");
    topicContent.classList.add("summary__answer");
    topicContent.textContent = topic;
    topicListFragment.append(topicContent);
  }

  let name = document.getElementById("answer__name");
  let email = document.getElementById("answer__email");
  let topics = document.getElementById("answer__topics");

  name.textContent = formData.get("name");
  email.textContent = formData.get("email");
  topics.replaceChildren(topicListFragment);
}

multiStepForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = new FormData(multiStepForm);
  const values = Object.fromEntries(data);
  console.log(data.get("name")); // single value
  console.log(data.getAll("topic")); // the selected checkbox's value, use getAll if checkbox
  console.log(values);
  alert("🎉 Success");
});
