const country = document.querySelector("#country");
const city = document.querySelector("#city");
const check = document.querySelector("#check");
const tempIcon = document.querySelector("#tempIcon");
const weatherCountry = document.querySelector("#weatherCountry");
const temperature = document.querySelector("#temperature");
const weatherDescription = document.querySelector("#weatherDescription");
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const longitude = document.querySelector("#longitude");
const latitude = document.querySelector("#latitude");
const forecastCards = document.querySelector("#forecastCards");


check.addEventListener("click", () => {
  const key = "136e881a53658771f7ba18ca05190897";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&units=metric&appid=${key}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value},${country.value}&units=metric&appid=${key}`;


  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }
      return response.json();
    })
    .then((data) => {
      weatherCountry.innerText = `${data.name} / ${data.sys.country}`;
      temperature.innerHTML = `${data.main.temp}°<b>C</b>`;
      weatherDescription.innerText = data.weather[0].description;
      tempIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      feelsLike.innerText = `Feels Like ${data.main.feels_like}°C`;
      humidity.innerText = `Humidity ${data.main.humidity}%`;
      longitude.innerText = `Longitude ${data.coord.lon}`;
      latitude.innerText = `Latitude ${data.coord.lat}`;
    })
    .catch((error) => console.error(error));


  fetch(forecastUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching forecast data");
      }
      return response.json();
    })
    .then((data) => {
      forecastCards.innerHTML = ""; 

    
      const dailyData = {};
      data.list.forEach((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        if (!dailyData[date]) {
          dailyData[date] = item; 
        }
      });

      
      Object.keys(dailyData).forEach((date) => {
        const day = dailyData[date];
        const card = document.createElement("div");
        card.classList.add("forecast-card");
        card.innerHTML = `
                    <h4>${date}</h4>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                    <p>${day.main.temp}°C</p>
                    <p>${day.weather[0].description}</p>
                `;
        forecastCards.appendChild(card);
      });
    })
    .catch((error) => console.error(error));


  country.value = "";
  city.value = "";
});
