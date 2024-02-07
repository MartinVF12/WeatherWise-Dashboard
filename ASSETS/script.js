// Define the API key for OpenWeatherMap API
var APIKey = "901d3c1a1ede4f6989d7c4e493c7efb9";

// Add click event listener to the search button
document.getElementById('search-button').addEventListener('click', function () {
    // Get the city input from the user, trim any leading or trailing whitespace
    var cityInput = document.getElementById('city-input').value.trim();
    // If there is a city input, search for the city and add it to the search history
    if (cityInput) {
        searchCity(cityInput);
        addToSearchHistory(cityInput);
    }
});

// Function to search for a city's current weather
function searchCity(city) {
    // Construct the URL for querying the current weather of the city
    var geocodingUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    // Fetch the weather data from OpenWeatherMap
    fetch(geocodingUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // If the query was successful, display the current weather and fetch the forecast
            if (data.cod === 200) {
                displayCurrentWeather(data, city);
                getForecastWeather(city);
            } else {
                // If the city is not found, alert the user
                alert("DOESNT FOUND THE CITY");
            }
        });
}

// Function to get the forecast weather for a city
function getForecastWeather(city) {
    // Construct the URL for querying the forecast weather of the city
    var forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    // Fetch the forecast weather data from OpenWeatherMap
    fetch(forecastWeatherUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Display the forecast weather
            displayForecastWeather(data);
        });
}

// Function to display the current weather of a city
function displayCurrentWeather(data, city) {
    let currentWeatherContainer = document.getElementById('current-weather');
    // Update the HTML content to show current weather details
    currentWeatherContainer.innerHTML = `
        <h2>Current Weather in ${city}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} km/h</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}

// Function to display the forecast weather
function displayForecastWeather(data) {
    let forecastContainer = document.getElementById('forecast-weather');
    forecastContainer.innerHTML = '<h2>5-Day Forecast: </h2>';
    // Filter the forecast data to show a 5-day forecast
    const forecastItems = data.list.filter((item, index) => index % 8 === 0);
    forecastItems.forEach(forecast => {
        let iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        // Append forecast items to the forecast container
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

// Function to add a searched city to the search history
function addToSearchHistory(city) {
    // Retrieve the search history from local storage or initialize it if not present
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // If the city is not already in the history, add it
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    // Display the updated search history
    displaySearchHistory();
}

// Function to display the search history
function displaySearchHistory() {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let historyElement = document.getElementById('search-history');
    historyElement.innerHTML = '<h2>Search History</h2>';
    // Create and append buttons for each city in the history
    searchHistory.forEach(city => {
        let cityElement = document.createElement('button');
        cityElement.textContent = city;
        cityElement.classList.add('history-btn');
        cityElement.addEventListener('click', () => searchCity(city));
        historyElement.appendChild(cityElement);
    });
}

// Call displaySearchHistory to show the search history on page load
displaySearchHistory();
