import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { WidgetsService } from '../widgets.service';
import { WeatherCodes } from '../weathercodes';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit{

  constructor(private widgetService: WidgetsService) {}

  currentWeather: any;
  weatherConditions: string;
  private delayTime: 2000;

  ngOnInit(): void {
    let params;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude.toString();
      const lon = position.coords.longitude.toString();

      params = { latitude: lat, longitude: lon}

      this.widgetService.getCurrentWeather(params)
      .pipe(
        debounceTime(this.delayTime),
        distinctUntilChanged(),
      )
      .subscribe(data => {
        console.log(data)
        // this.headerTitle = data.current_weather
        this.getWeatherConditions(data)
        this.currentWeather = data
      })
    })
  }

  getWeatherConditions(data: any){
    const code = data.current_weather.weathercode
    console.log(data.current_weather.weathercode)
    switch (code){
      case WeatherCodes.Clear_Sky:
        this.weatherConditions = "Clear skies today"
        break;

      case WeatherCodes.Mainly_Clear:
        this.weatherConditions = "Mostly clear skies"
        break;

      case WeatherCodes.Partly_Cloudy:
        this.weatherConditions = "Partly cloudy today"
        break;

      case WeatherCodes.Overcast:
        this.weatherConditions = "Where did the Sun go?"
        break;

      case WeatherCodes.Fog:
        this.weatherConditions = "Can see anything around here"
        break;

      case WeatherCodes.Depositing_Rime_Fog:
        this.weatherConditions = "Its foggy but its also cold. Watch for some ice"
        break;

      case WeatherCodes.Drizzle_Light:
        this.weatherConditions = "Light drizzles today. Maybaye bring a rain jacket"
        break;

      case WeatherCodes.Drizle_Moderate:
        this.weatherConditions = "Moderate drizzles. I would bring a rain jacket if I were you"
        break;

      case WeatherCodes.Drizzle_Dense:
        this.weatherConditions = "You're not leaving without a rain jacket"
        break;

      case WeatherCodes.Freezing_Drizzle_Light:
        this.weatherConditions = "Light drizzles but it's freezing"
        break;
      case WeatherCodes.Freezing_Drizzle_Dense:
        this.weatherConditions = "Denser drizzles and freezing"
        break;
      case WeatherCodes.Rain_Slight:
        this.weatherConditions = "It's light rain today"
        break;
      case WeatherCodes.Rain_Moderate:
        this.weatherConditions = "You might want to bring an umbrella"
        break;
      case WeatherCodes.Rain_Heavy:
        this.weatherConditions = "You defenitely should not go out in this heavy rain"
        break;
      case WeatherCodes.Freezing_Rain_Light:
        this.weatherConditions = "Normal light rain but colder"
        break;
      case WeatherCodes.Freezing_Rain_heavy:
        this.weatherConditions = "Heaveavy rain but defenitely colder"
        break;
      case WeatherCodes.Snow_Fall_Slight:
        this.weatherConditions = "Light snow today"
        break;
      case WeatherCodes.Snow_Fall_Moderate:
        this.weatherConditions = "Moderate snow today"
        break;
      case WeatherCodes.Snow_Fall_Heavy:
        this.weatherConditions = "Its a blizzard out there"
        break;
      case WeatherCodes.Snow_Grains:
        this.weatherConditions = "It is snowing.... grains?"
        break;
      case WeatherCodes.Rain_Showers_Slight:
        this.weatherConditions = "Slight rain showers"
        break;
      case WeatherCodes.Rain_Showers_Moderate:
        this.weatherConditions = "Moderate rain showers"
        break;
      case WeatherCodes.Rain_Showers_Violent:
        this.weatherConditions = "I think this rain shower wants to kill you"
        break;
      case WeatherCodes.Snow_Showers_Slight:
        this.weatherConditions = "Light snow showers"
        break;
      case WeatherCodes.Snow_Showers_Heavy:
        this.weatherConditions = "Heavy snow showers"
        break;

      default:
        break;
    }

  }

}
