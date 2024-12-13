const API_KEY = "efc4e76275227845ce712618690433e3";

let city_block = document.getElementById('city');
let weather_icon = document.getElementById('weather-icon');
let temperature = document.getElementById('temperature');
let condition = document.getElementById('condition');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let input_city = document.getElementById('new_city');
let date_block = document.getElementById('date');

function getURLCityWeather(city = 'Kyiv', units = 'metric') {
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;
}

function getURLCityForecast(city = 'Kyiv', units = 'metric') {
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${API_KEY}`;
}

const date = new Date();
const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
];
const current_timestamp = (date.getTime()/1000).toFixed() * 1;
const seconds_to_next_day = 24 * 60 * 60;

let blockForecast = document.querySelector('.weekly-forecast');
function getWeather(city) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + `${city}` + "&units=metric&appid=" + API_KEY;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            if(json.cod !== 200){
                throw ('Sorry');
            }
            lat = json.coord.lat;
            lon = json.coord.lon;
            city_block.textContent = json.name;
            temperature.textContent = (json.main.temp).toFixed() + "°C";
            date_block.textContent = day+'/'+month+'/'+year;
            //cloudsOutput.textContent = json.clouds.all + "%";
            humidity.textContent = json.main.humidity + "%";
            wind.textContent = json.wind.speed + "m/s";
            //pressureOut.textContent = json.main.pressure + "hPa";
            console.log(json);
            let weather = json.weather[0].main;
            switch (weather) {
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

            let urlExtra = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + `${lat}` + "&&lon=" + `${lon}` + "&appid="+ API_KEY
            fetch(urlExtra)
                .then(response => response.json())
                .then(json => {
                    let weekly_weather = [];
                    let list_weathers = json.list;
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
                    if(blockForecast.querySelector('.day')){
                        blockForecast.querySelectorAll(".day").forEach(el => el.remove());
                    }

                    for (let i = 0; i < weekly_weather.length; i++) {

                        let futureDate = new Date(weekly_weather[i].dt*1000);
                        let nameDay = futureDate.toLocaleDateString('uk-UA', { weekday: 'long' });
                        console.log(weekly_weather[i]);
                        let newElement = document.createElement('div');
                        newElement.classList.add('day');
                        let paragraph  = document.createElement('p');
                        paragraph.innerText = nameDay;
                        let paragraphYear  = document.createElement('p');
                        paragraphYear.innerText = futureDate.getDate()+'/'+futureDate.getMonth()+'/'+futureDate.getFullYear();
                        let paragraphWeather  = document.createElement('p');
                        paragraphWeather.innerText = weekly_weather[i].weather[0].main;
                        let iconWeather  = document.createElement('img');
                        iconWeather.src ='https://openweathermap.org/img/wn/'+weekly_weather[i].weather[0].icon+'@2x.png';

                        let paragraphTemp  = document.createElement('p');
                        paragraphTemp.innerText = (weekly_weather[i].main.temp).toFixed() + "°C";




                        newElement.appendChild(paragraph);
                        newElement.appendChild(paragraphYear);
                        newElement.appendChild(paragraphWeather);
                        newElement.appendChild(iconWeather);
                        newElement.appendChild(paragraphTemp);

                        blockForecast.appendChild(newElement);
                    }
                })


        });
}

getWeather('Dnipro');

input_city.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getWeather(input_city.value);
    }
})