document.getElementById('search-button').addEventListener('click', function () {
    var cityInput = document.getElementById('city-input').value;
    searchCity(cityInput);
});

function searchCity(city) {
    // Utiliza una API de geolocalización para obtener latitud y longitud de la ciudad
    var geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=901d3c1a1ede4f6989d7c4e493c7efb9`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                getCurrentWeather(lat, lon, city);
                getForecastWeather(lat, lon);
                // Agrega la ciudad al historial de búsqueda
                addToSearchHistory(city);
            } else {
                console.log("Ciudad no encontrada");
            }
        });
}

function getCurrentWeather(lat, lon, city) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=tu_clave_de_api&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data, city);
        });
}

function getForecastWeather(lat, lon) {
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=tu_clave_de_api&units=metric`;

    fetch(forecastWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayForecastWeather(data);
        });
}

function displayCurrentWeather(data, city) {
    // Aquí se debería actualizar el DOM con los datos del tiempo actual para la ciudad
    console.log(data);
    // Ejemplo de cómo mostrar los datos: document.getElementById('current-weather').textContent = `Temperatura en ${city}: ${data.main.temp}°C`;
}

function displayForecastWeather(data) {
    // Aquí se debería actualizar el DOM con los datos del pronóstico del tiempo
    console.log(data);
}

function addToSearchHistory(city) {
    // Aquí se debería agregar la ciudad al historial de búsqueda y actualizar el DOM correspondientemente
}

// Evento para gestionar clics en el historial de búsqueda
document.getElementById('search-history').addEventListener('click', function (event) {
    var city = event.target.textContent;
    searchCity(city);
});
