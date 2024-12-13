class WeatherForecastController {

    model;

    constructor(model) {
        this.model = model;
        this.#getWeatherByCity('Dnipro')
    }

    initHandlers(){
        let input_city = document.getElementById('new_city');
        input_city.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.#getWeatherByCity(input_city.value);
            }
        });
    }

    #getWeatherByCity(city_name){
        this.model.getWeatherByCity(city_name);
    }

}