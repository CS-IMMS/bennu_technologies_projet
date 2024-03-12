export interface Geolocation {
    latitude: string;
    longitude: string;
}
export interface WeatherData {
    cloudCover: number;
    precipitationIntensity: number;
    temperature: number;
    weatherCode: number;
    uvIndex: number;
    visibility: number;
    windSpeed: number;
    humidity: number;
}

export interface DailyValues {
    cloudCover: number[];
    precipitationIntensity: number[];
    temperature: number[];
    weatherCode: number[];
}

export interface DailyWeather {
    day: string;
    averageCloudCover: number;
    averagePrecipitationIntensity: number;
    averageTemperature: number;
    minTemperature: number;
    maxTemperature: number;
    averageHumidity: number
    averageWeatherCode: number;
}
export interface weatherFetchDataTimelineInterval {
    startTime: string;
    values: WeatherData
}
export interface weatherFetchDataTimeline {
    timestep: string;
    endTime: string;
    startTime:string
    intervals: weatherFetchDataTimelineInterval[]
}
export interface weatherFetchData {
    timelines: weatherFetchDataTimeline[];
    warnings: {
        code: number,
        type: string,
        message: number,
        meta: {
            field: string,
            from: string,
            to: string
        }
    }
}
export interface HourlyWeather {
    startTime: string;
    averageCloudCover: number;
    averagePrecipitationIntensity: number;
    averageTemperature: number;
    averageWeatherCode: number;
  }
export interface HourlyWeatherAverage {
    hour: string;
    averageCloudCover: number;
    averagePrecipitationIntensity: number;
    averageTemperature: number;
    averageWeatherCode: number;
    chanceOfRain?: string;
  }