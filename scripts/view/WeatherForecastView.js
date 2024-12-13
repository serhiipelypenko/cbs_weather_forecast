class WeatherForecastView {

    path_to_images = 'images/';
    constructor() {
    }

    renderTodayWeatherBlock(weatherModel){
        let city_block = document.getElementById('city');
        let weather_icon = document.getElementById('weather-icon');
        let temperature_block = document.getElementById('temperature');
        let condition = document.getElementById('condition');
        let humidity_block = document.getElementById('humidity');
        let wind_block = document.getElementById('wind');
        let clouds_block = document.getElementById('clouds');
        let date_block = document.getElementById('date');
        let pressure_block = document.getElementById('pressure');
        let sunrise_block = document.getElementById('sunrise');
        let sunset_block = document.getElementById('sunset');


        city_block.textContent = weatherModel.city_name;
        temperature_block.textContent = weatherModel.temperature_celsius + "°C";
        date_block.textContent = weatherModel.date.getDate() + '/' + (weatherModel.date.getMonth()+1) + '/' + weatherModel.date.getFullYear();
        clouds_block.textContent = weatherModel.clouds + "%";
        humidity_block.textContent = weatherModel.humidity + "%";
        wind_block.textContent = weatherModel.wind + "m/s";
        pressure_block.textContent =  weatherModel.pressure + "hPa";
        sunrise_block.textContent =  weatherModel.sunrise.getHours() +':' + weatherModel.sunrise.getMinutes();
        sunset_block.textContent =  weatherModel.sunset.getHours() + ':' + weatherModel.sunset.getMinutes();

        condition.textContent = this.weatherConditionTranslate(weatherModel.weather);
        switch (weatherModel.weather) {
            case "Clear":
                weather_icon.src = this.path_to_images + "sunny_icon.png";
                break;
            case "Clouds":
                weather_icon.src = this.path_to_images + "cloud_icon.png";
                break;
            case "Rain":
            case "Drizzle":
                weather_icon.src = this.path_to_images + "rain_icon.png";
                break;
            case "Thunderstorm":
                weather_icon.src = this.path_to_images + "storm_icon.png";
                break;
            case "Snow":
                weather_icon.src = this.path_to_images + "snow_icon.png";
                break;
        }
    }

    renderNextDaysWeatherBlock(weatherModel){

        let blockForecast = document.querySelector('.weekly-forecast-block');

        let nameDay = weatherModel.date.toLocaleDateString('uk-UA', { weekday: 'long' });
        let commonBlock = document.createElement('div');
        commonBlock.classList.add('day');
        let paragraphDay  = document.createElement('p');
        paragraphDay.innerText = nameDay;
        paragraphDay.classList.add('day_name');
        let paragraphDate  = document.createElement('p');
        paragraphDate.innerText =  weatherModel.date.getDate()+'/'+ (weatherModel.date.getMonth()+1)+'/'+ weatherModel.date.getFullYear();
        paragraphDate.classList.add('day_date');
        let paragraphWeather  = document.createElement('p');
        paragraphWeather.innerText =  this.weatherConditionTranslate(weatherModel.weather);
        paragraphWeather.classList.add('day_weather');
        let iconWeather  = document.createElement('img');
        iconWeather.src ='https://openweathermap.org/img/wn/'+weatherModel.icon+'@2x.png';
        let paragraphTemp  = document.createElement('p');
        paragraphTemp.innerText = weatherModel.temperature_celsius + "°C";

        commonBlock.appendChild(paragraphDay);
        commonBlock.appendChild(paragraphDate);
        commonBlock.appendChild(iconWeather);
        commonBlock.appendChild(paragraphTemp);
        commonBlock.appendChild(paragraphWeather);
        blockForecast.appendChild(commonBlock);

    }

    clearBlockWeathersNextDays(){
        let blockForecast = document.querySelector('.weekly-forecast-block');
        if(blockForecast.querySelector('.day')){
            blockForecast.querySelectorAll(".day").forEach(el => el.remove());
        }
    }

    weatherConditionTranslate(weatherCondition){
        let result = weatherCondition;
        switch (weatherCondition) {
            case "Clear":
                result = "Сонячно";
                break;
            case "Clouds":
                result = "Хмарно";
                break;
            case "Rain":
            case "Drizzle":
                result = "Дощ";
                break;
            case "Thunderstorm":
                result = "Дощ з грозою";
                break;
            case "Snow":
                result = "Очікується сніг";
                break;
        }
        return result;
    }

    showErrorCity(city_name){
        let errorCity = document.getElementById('errorCity');
        errorCity.textContent = 'Не знайшли даних за вказаним містом. Ви вказали "' + city_name + '"';
        errorCity.style.display = 'block';
    }

    hideErrorCity(){
        let errorCity = document.getElementById('errorCity');
        errorCity.style.display = 'none';
    }
}