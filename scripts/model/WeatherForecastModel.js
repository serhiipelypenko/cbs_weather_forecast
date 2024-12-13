class WeatherForecastModel {

    view;

    API_KEY = "efc4e76275227845ce712618690433e3";

    constructor(view) {
        this.view = view;
    }

    getUrlByNameCity(city_name,units = 'metric'){
        return "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&units=" + units + "&appid=" + this.API_KEY;
    }

    getUrlByLatLon(lat,lon,units = 'metric'){
        return "https://api.openweathermap.org/data/2.5/forecast?units=" + units + "&lat=" + lat + "&&lon=" + lon + "&appid=" + this.API_KEY;
    }

    getWeatherByCity(city_name){
        let urlWeather = this.getUrlByNameCity(city_name);
        this.view.hideErrorCity();
        fetch(urlWeather)
            .then(response => response.json())
            .then(json => {
                if(json.cod !== 200){
                    this.view.showErrorCity(city_name)
                    throw new CityError(city_name);
                }
                let lat = json.coord.lat;
                let lon = json.coord.lon;

                let weatherToday = new WeatherModel(json.name);
                weatherToday.date = new Date();
                weatherToday.temperature_celsius = json.main.temp;
                weatherToday.humidity = json.main.humidity;
                weatherToday.wind = json.wind.speed;
                weatherToday.clouds = json.clouds.all;
                weatherToday.pressure = json.main.pressure;
                weatherToday.weather = json.weather[0].main;
                weatherToday.icon = json.weather[0].icon;
                weatherToday.sunrise = json.sys.sunrise;
                weatherToday.sunset = json.sys.sunset;

                this.view.renderTodayWeatherBlock(weatherToday);

                let urlWeatherNextDays = this.getUrlByLatLon(lat,lon);
                fetch(urlWeatherNextDays)
                    .then(response => response.json())
                    .then(json => {
                        let weekly_weather = [];
                        let list_weathers = json.list;
                        const current_timestamp = parseInt(((new Date()).getTime()/1000).toFixed());
                        const seconds_to_next_day = 24 * 60 * 60;
                        let last_date = current_timestamp + seconds_to_next_day;
                        for (let i = 0; i < list_weathers.length; i++) {
                            if(weekly_weather.length === 5){
                                break;
                            }
                            if(i === 0){
                                last_date = list_weathers[0].dt + seconds_to_next_day;
                            }else if(last_date  ===  list_weathers[i].dt ){
                                weekly_weather.push(list_weathers[i]);
                                last_date = last_date + seconds_to_next_day;
                            }
                        }

                        this.view.clearBlockWeathersNextDays();

                        for (let i = 0; i < weekly_weather.length; i++) {

                            let weatherNextDays = new WeatherModel(json.city.name);
                            weatherNextDays.date = new Date(weekly_weather[i].dt*1000);
                            weatherNextDays.temperature_celsius = weekly_weather[i].main.temp;
                            weatherNextDays.humidity = weekly_weather[i].main.humidity;
                            weatherNextDays.wind = weekly_weather[i].wind.speed;
                            weatherNextDays.clouds = weekly_weather[i].clouds.all;
                            weatherNextDays.pressure = weekly_weather[i].main.pressure;
                            weatherNextDays.weather = weekly_weather[i].weather[0].main;
                            weatherNextDays.icon = weekly_weather[i].weather[0].icon;

                            this.view.renderNextDaysWeatherBlock(weatherNextDays);
                        }
                    })


            });
    }
}