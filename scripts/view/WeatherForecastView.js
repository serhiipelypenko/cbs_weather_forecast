class WeatherForecastView {

    constructor() {
    }

    renderTodayWeatherBlock(weatherModel){
        let city_block = document.getElementById('city');
        let weather_icon = document.getElementById('weather-icon');
        let temperature = document.getElementById('temperature');
        let condition = document.getElementById('condition');
        let humidity = document.getElementById('humidity');
        let wind = document.getElementById('wind');
        let date_block = document.getElementById('date');

        city_block.textContent = weatherModel.city_name;
        temperature.textContent = weatherModel.temperature_celsius + "°C";
        date_block.textContent = weatherModel.date.getDate()+'/'+weatherModel.date.getMonth()+'/'+weatherModel.date.getFullYear();
        //cloudsOutput.textContent = json.clouds.all + "%";
        humidity.textContent = weatherModel.humidity + "%";
        wind.textContent = weatherModel.wind + "m/s";
        //pressureOut.textContent = json.main.pressure + "hPa";

        switch (weatherModel.weather) {
            case "Clear":
                condition.textContent = "Clear";
                weather_icon.src = "/images/sunny_icon.png";
                break;
            case "Clouds":
                condition.textContent = "Cloudy";
                weather_icon.src = "/images/cloud_icon.png";
                break;
            case "Rain":
            case "Thunderstorm":
            case "Drizzle":
                condition.textContent = "Rainy";
                weather_icon.src = "/images/rain_icon.png";
                break;
            case "Snow":
                condition.textContent = "Snow";
                weather_icon.src = "/images/cloud_icon.png";
                break;
        }
    }

    clearBlockWeathersNextDays(){
        let blockForecast = document.querySelector('.weekly-forecast');
        if(blockForecast.querySelector('.day')){
            blockForecast.querySelectorAll(".day").forEach(el => el.remove());
        }
    }
    renderNextDaysWeatherBlock(weatherModel){

        let blockForecast = document.querySelector('.weekly-forecast');

        let nameDay = weatherModel.date.toLocaleDateString('uk-UA', { weekday: 'long' });
        let newElement = document.createElement('div');
        newElement.classList.add('day');
        let paragraph  = document.createElement('p');
        paragraph.innerText = nameDay;
        let paragraphYear  = document.createElement('p');
        paragraphYear.innerText =  weatherModel.date.getDate()+'/'+ weatherModel.date.getMonth()+'/'+ weatherModel.date.getFullYear();
        let paragraphWeather  = document.createElement('p');
        paragraphWeather.innerText =  weatherModel.weather;
        let iconWeather  = document.createElement('img');
        iconWeather.src ='https://openweathermap.org/img/wn/'+weatherModel.icon+'@2x.png';
        let paragraphTemp  = document.createElement('p');
        paragraphTemp.innerText = weatherModel.temperature_celsius + "°C";

        newElement.appendChild(paragraph);
        newElement.appendChild(paragraphYear);
        newElement.appendChild(paragraphWeather);
        newElement.appendChild(iconWeather);
        newElement.appendChild(paragraphTemp);

        blockForecast.appendChild(newElement);

    }
}