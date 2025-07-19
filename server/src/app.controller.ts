import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import singleFetch from './SingleFetch';
import { LocalWeatherResponse, WeatherResponse } from 'types/localWeather';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/api/local-weather')
    async getLocalWeather(@Query('lat') lat: number, @Query('lon') lon: number): Promise<LocalWeatherResponse> {
        try {
            const response: WeatherResponse = (await singleFetch.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5677fc3d8285d75415ac8fbd8b866bdb`,
            )) as WeatherResponse;

            const dateNow = new Date();

            let backgroundColor: string;

            const dateSunrise = new Date(response.sys.sunrise * 1000);
            const minutesSunrise = dateSunrise.getMinutes() + dateSunrise.getHours() * 60;
            const dateSunset = new Date(response.sys.sunset * 1000);
            const minutesSunset = dateSunset.getMinutes() + dateSunset.getHours() * 60;
            const minutesHour = dateNow.getHours() * 60 + dateNow.getMinutes();
            if (minutesHour > minutesSunset + 45 && minutesHour < minutesSunrise - 45) {
                backgroundColor = 'black';
            } else {
                // code to be executed when during the day.
                // Below it's a cosine function starting from sunrise up to sunset.
                // f(x) = -{cos[2Pi/(d2-d1)*(x-d1)] + 1}*y_max/2;
                // For full spectrum change 15 (grayscale) -> 16777215
                const colorsFloat =
                    ((-Math.cos(((2 * Math.PI) / (minutesSunset - minutesSunrise)) * (minutesHour - minutesSunrise)) +
                        1) *
                        15) /
                    2;
                const colorsDec = Math.floor(colorsFloat);
                const colorsHex = `#${colorsDec.toString(16).repeat(3)}`;
                // console.log((minutesHour - minutesSunrise)/(minutesSunset - minutesSunrise)); // Percentage
                backgroundColor = colorsHex;
            }

            return {
                name: response.name,
                country: response.sys.country,
                img: `https://openweathermap.org/img/w/${response.weather[0].icon}.png`,
                description: response.weather[0].description.replace(/\b\w/g, (capture) => capture.toUpperCase()),
                degrees: Math.round((response.main.temp - 272.15) * 10) / 10,
                humidity: response.main.humidity,
                wind: Math.round(response.wind.speed * 3.6 * 10) / 10,
                sunrise: response.sys.sunrise,
                sunset: response.sys.sunset,
                lastUpdate: response.dt * 1000,
                backgroundColor,
            };
        } catch (error) {
            console.error('Error on /api/local-weather', error);
            return {
                name: '',
                country: '',
                img: '',
                description: '',
                degrees: 0,
                humidity: 0,
                wind: 0,
                sunrise: 0,
                sunset: 0,
                lastUpdate: Date.now(),
                backgroundColor: 'black',
            };
        }
    }
}
