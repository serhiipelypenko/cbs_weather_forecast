class WeatherModel {

    city_name;
    #temperature_celsius;
    #date;
    #humidity;
    #wind;
    #clouds;
    #pressure;
    #weather;
    #icon;
    #sunrise;
    #sunset;

    constructor(city_name) {
        this.city_name = city_name;
    }

    set temperature_celsius(temperature_celsius){
        this.#temperature_celsius = (temperature_celsius).toFixed();
    }

    get temperature_celsius(){
        return this.#temperature_celsius;
    }

    set date(date){
        this.#date = date;
    }

    get date(){
        return this.#date;
    }

    set humidity(humidity){
        this.#humidity = humidity;
    }

    get humidity(){
        return this.#humidity;
    }
    set wind(wind){
        this.#wind = wind;
    }

    get wind(){
        return this.#wind;
    }

    set clouds(clouds){
        this.#clouds = clouds;
    }

    get clouds(){
        return this.#clouds;
    }

    set pressure(pressure){
        this.#pressure = pressure;
    }

    get pressure(){
        return this.#pressure;
    }

    set weather(weather){
        this.#weather = weather;
    }

    get weather(){
        return this.#weather;
    }

    set icon(icon){
        this.#icon = icon;
    }

    get icon(){
        return this.#icon;
    }

    set sunrise(sunrise){
        this.#sunrise = new Date(sunrise*1000);
    }

    get sunrise(){
        return this.#sunrise;
    }

    set sunset(sunset){
        this.#sunset = new Date(sunset*1000);
    }

    get sunset(){
        return this.#sunset;
    }

}