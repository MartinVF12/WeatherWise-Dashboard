var APIKey = "901d3c1a1ede4f6989d7c4e493c7efb9";
document.getElementById('search-button').addEventListener('click', function () {
    var cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
        searchCity(cityInput);
        addToSearchHistory(cityInput);
    }
});

function searchCity(city) {

    var geocodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayCurrentWeather(data, city);
                getForecastWeather(city);
            } else {
                alert("Ciudad no encontrada");
            }
        })
        .catch(error => {
            console.error("Error al realizar la solicitud a la API:", error);
        });
}

function getForecastWeather(city) {

    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;

    fetch(forecastWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayForecastWeather(data);
        });
}

function displayCurrentWeather(data, city) {
    let currentWeatherContainer = document.getElementById('current-weather');
    currentWeatherContainer.innerHTML = `
        <h2>Current Weather in ${city}</h2>
        <img src="${iconUrl}" alt="Weather icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} km/h</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}

function displayForecastWeather(data) {
    let forecastContainer = document.getElementById('forecast-weather');
    forecastContainer.innerHTML = '<h2>5-Day Forecast: </h2>';
    const forecastItems = data.list.filter((item, index) => index % 8 === 0);
    forecastItems.forEach(forecast => {
        let iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        forecastContainer.innerHTML += `
            <div class="forecast-item">
                <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
                <img src="${iconUrl}" alt="Weather icon">
                <p>Temp: ${forecast.main.temp}°C</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
            </div>
        `;
    });
}

function addToSearchHistory(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    displaySearchHistory();
}

function displaySearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let historyElement = document.getElementById('search-history');
    historyElement.innerHTML = '<h2>Search History</h2>';
    searchHistory.forEach(city => {
        let cityElement = document.createElement('button');
        cityElement.textContent = city;
        cityElement.classList.add('history-btn');
        cityElement.addEventListener('click', () => searchCity(city));
        historyElement.appendChild(cityElement);
    });
}


displaySearchHistory
