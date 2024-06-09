function getElement(selector) {
  return document.querySelector(`.${selector}`);
}

function changeValue(slider, sliderValue) {
  let value = slider.value;
  sliderValue.textContent = value;
  return value;
}

const outputBlock = Array.from(document.querySelectorAll(".contribution"));

outputBlock.map((element) => {
  console.log(element.innerText);
});

const slideValue = getElement("calculatedValue");
const timeValue = getElement("calculatedTime");
const inputSlider = getElement("topSlide");
const timeSlider = getElement("botSlide");
const incomeEl = getElement("income");
const sickEl = getElement("sickness");
const criticalEl = getElement("critical");

inputSlider.oninput = () => {
  const value = changeValue(inputSlider, slideValue);
  slideValue.style.left = value / 500 / 2 + "%";
  slideValue.classList.add("show");
  const textValue = slideValue.innerText;
  const timeInv = timeValue.innerText;
  outputBlock.map((el) => (el.innerText = slideValue.innerText));
  incomeEl.innerText = calculate(textValue, timeInv, 12);
  sickEl.innerText = calculateSick(slideValue, timeValue);
  criticalEl.innerText = calculateCritical(slideValue, timeValue);
};

timeSlider.oninput = () => {
  const value = changeValue(timeSlider, timeValue);
  timeValue.style.left = (value * 5) / 2 + "%";
  const textValue = slideValue.innerText;
  const timeInv = timeValue.innerText;
  incomeEl.innerText = calculate(textValue, timeInv, 12);
  sickEl.innerText = calculateSick(slideValue, timeValue);
  criticalEl.innerText = calculateCritical(slideValue, timeValue);
};

inputSlider.onblur = () => {
  slideValue.classList.remove("show");
};

timeSlider.onblur = () => {
  timeValue.classList.remove("show");
};

function calculate(value, months, percent) {
  let result = [];
  let fixed_percentage = (100 + percent) / 100;
  for (let i = 1; i <= months; i++) {
    result.push((value = Math.floor(value * fixed_percentage)));
  }
  return result[months - 1];
}

function calculateSick(value, months) {
  return value.innerText * months.innerText * 2;
}

function calculateCritical(value, months) {
  return value.innerText * months.innerText * 3;
}
