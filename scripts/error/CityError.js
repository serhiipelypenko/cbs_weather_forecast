class CityError extends Error {
    constructor(cityName) {
        super(`Місто з назвою ${cityName} не знайдено.`);
        this.name = "CityErorr";
    }
}