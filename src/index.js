import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

// Business Logic

// API call code
function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, city);
    }
  });

  request.open("GET", url, true); 
  request.send();
}

// UI Logic
function printError(request, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}`;
}

 

function printElements(apiResponse, city) {
  document.querySelector(
    "#showResponse"
  ).innerText = `The The humidity in ${city} is ${apiResponse.main.humidity}%.
    The temperature in Kelvins is ${apiResponse.main.temp} degrees.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = (document.querySelector("#location").value = null);
  getWeather(city);
}

window.addEventListener("load", function () {
  this.document
    .querySelector("form")
    .addEventListener("submit", handleFormSubmission);
});
