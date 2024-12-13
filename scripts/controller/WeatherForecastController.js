class WeatherForecastController {

    model;

    constructor(model) {
        this.model = model;
        this.initHandlers();
        this.#getWeatherByCity('Dnipro')
    }

    initHandlers(){
        let input_city = document.getElementById('new_city');
        input_city.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.#getWeatherByCity(input_city.value);
            }
        })
    }

    #getWeatherByCity(city_name){
        this.model.getWeatherByCity(city_name);
    }

}