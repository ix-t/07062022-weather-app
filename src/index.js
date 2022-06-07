//Responds
function getWeatherInfo(response) {
  console.log(response.data);
  console.log(response.data.weather[0].icon);
  console.log(response.data.coord.lat);
  console.log(response.data.coord.lon);

  let currentTime = new Date();
  console.log(currentTime);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let city = response.data.name;
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let temp = Math.round(response.data.main.temp);
  let weather = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");
  let h4 = document.querySelector("h4");
  let h5 = document.querySelector("h5");
  let h6 = document.querySelector("h6");
  let h7 = document.querySelector("h7");

  h1.innerHTML = `${city}`;
  h2.innerHTML = `${day} ${hours}:${minutes}`;
  h3.innerHTML = `${tempMax}° / ${tempMin}°`;
  h4.innerHTML = `${temp}°C`;
  h5.innerHTML = `${weather}`;
  h6.innerHTML = `Humidity: ${humidity}%`;
  h7.innerHTML = `Wind: ${wind} km/h`;
}

//When an event occurs
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let cityResult = `${cityInput.value}`;
  console.log(cityResult);

  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "31ee5db17333dd8cbc0df1677e0dc2c4";
  let unit = "metric";
  let apiUrl = `${endpoint}?q=${cityResult}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(getWeatherInfo);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//Current Location
function showPosition(position) {
  console.log(position);

  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "31ee5db17333dd8cbc0df1677e0dc2c4";
  let unit = "metric";
  let apiUrl = `${endpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(getWeatherInfo);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form2 = document.querySelector(".btn-secondary");
form2.addEventListener("click", getCurrentPosition);
