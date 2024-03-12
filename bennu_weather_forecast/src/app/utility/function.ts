export const getWeatherIcon =(weatherCode: number, isNight: boolean)=> {

  if (weatherCode >= 1000 && weatherCode <= 1102) {
    if(isNight){
        return "/icons/wi-night-clear.svg"
    }else{
        return "/icons/wi-day-sunny.svg";
    }
    } else if (weatherCode >= 1100 && weatherCode <= 1102) {
            return "/icons/wi-cloudy.svg";
    } else if (weatherCode >= 1200 && weatherCode <= 1203) {
            return "/icons/wi-rain-wind.svg";
    } else {
            return "/icons/wi.cloud.svg";
    }
}