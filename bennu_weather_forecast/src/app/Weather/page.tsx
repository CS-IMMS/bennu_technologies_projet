'use client';
import { Button } from "@/components/ui/button";
import { ChevronRight, Dot, Edit } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SingleProgess from "./components/icons/singleProgess";
import { DailyWeather, Geolocation, HourlyWeather, HourlyWeatherAverage, WeatherData, weatherFetchData, weatherFetchDataTimeline, weatherFetchDataTimelineInterval } from "./interface/weather.interface";
import * as SunCalc from 'suncalc';
import TemperatureForHour from "./components/temperatureForHour";
import NextSevenDay from "./components/NextSeventDay";
import { getWeatherIcon } from "../utility/function";
import MenuIcon from "./components/icons/menu";
interface Props { }
interface SunriseAndSunsetTimeInterface {
  sunrise: string;
  sunset: string;
}
interface IntervalData {
  date: Date,
  temperature: number;
  cloudCover: number;
  precipitationIntensity?: number;
  weatherCode?: string;
}

interface DailyForecast {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  cloudCover: number;
  weatherCode: number;
}
const Page: React.FC<Props> = (props) => {
  const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
  const reverseLocalizationApi: string | undefined = process.env.NEXT_PUBLIC_REVERSE_URL;
  const apiKEY: string | undefined = process.env.NEXT_PUBLIC_API_KEY;
  const [weatherData, setWeatherData] = useState<DailyForecast[]>([]);
  const [currentGeolocation, setCurrentGeolocation] = useState<Geolocation>({ latitude: '', longitude: '' });
  const [temperaturePerHour, setTemperaturePerHour] = useState<any[]>([]);
  const [currentDayWeatherDetail, setCurrentDayWeatherDetail] = useState<weatherFetchDataTimelineInterval | null>(null);
  const [currentDate, setCurrentDate] = useState<string>();
  const [sunriseAndSunsetTime, setSunriseAndSunsetTime] = useState<SunriseAndSunsetTimeInterface | null>(null);
  const [localization, setLocalization] = useState<string>('');
  const [forecastOfTheWeek, setForecastOfTheWeek] = useState<DailyWeather[] | []>([])
  const [hourlyWeatherAverage, setHourlyWeatherAverage] = useState<HourlyWeatherAverage[] | []>([])
  const [nextSevenDayState, SetNextSevenDayState] = useState<boolean>(false)
  const [isNight, SetIsNight] = useState<boolean>(false);
  const [isLoading, SetIsLoading] = useState<boolean>(false)


  useEffect(() => {
    // SetIsLoading(true)
    getWeather();
  }, []);

  useEffect(() => {
    if (weatherData.length > 0) {
      extractTemperaturePerHour(weatherData);
    }
  }, [weatherData]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/temp.json');
  //     const data = await response.json();
  //     console.log(data);
  //     if (data.data) {
  //       getDailyWeatherData(data.data)
  //       groupHourlyWeatherData(data.data)
  //       getCurrentDayWeatherDetail(data.data)
  //     }
  //     // setJsonData(data);
  //   };

  //   fetchData();
  // }, []);

  const getDailyWeatherData = (data: weatherFetchData): DailyWeather[] => {
    const allDataForWeek: any = data.timelines[0].intervals;
    const dailyValues: { [key: string]: { cloudCover: number[], precipitationIntensity: number[], temperature: number[], weatherCode: number[], humidity: number[] } } = {};

    for (let day = 0; day < allDataForWeek.length; day++) {
      const element = allDataForWeek[day];
      const date = new Date(element.startTime).toLocaleDateString('en-US', {
        weekday: 'long',
      });

      if (!dailyValues[date]) {
        dailyValues[date] = {
          cloudCover: [],
          precipitationIntensity: [],
          temperature: [],
          weatherCode: [],
          humidity: [],
        };
      }

      dailyValues[date].cloudCover.push(element.values.cloudCover);
      dailyValues[date].precipitationIntensity.push(element.values.precipitationIntensity);
      dailyValues[date].temperature.push(element.values.temperature);
      dailyValues[date].weatherCode.push(element.values.weatherCode);
      dailyValues[date].humidity.push(element.values.humidity);

    }

    const dailyData: DailyWeather[] = [];

    for (const day in dailyValues) {
      const averageCloudCover =
        dailyValues[day].cloudCover.reduce((acc, curr) => acc + curr, 0) /
        dailyValues[day].cloudCover.length;

      const averagePrecipitationIntensity =
        dailyValues[day].precipitationIntensity.reduce((acc, curr) => acc + curr, 0) /
        dailyValues[day].precipitationIntensity.length;

      const averageTemperature =
        dailyValues[day].temperature.reduce((acc, curr) => acc + curr, 0) /
        dailyValues[day].temperature.length;

      const averageWeatherCode =
        dailyValues[day].weatherCode.reduce((acc, curr) => acc + curr, 0) /
        dailyValues[day].weatherCode.length;

      const averageHumidity =
        dailyValues[day].humidity.reduce((acc, curr) => acc + curr, 0) /
        dailyValues[day].humidity.length;

      const sortTemperature = dailyValues[day].temperature.sort((min, max) => min - max);
      const minTemp = sortTemperature[0]
      const maxTemp = sortTemperature[sortTemperature.length - 1]
      // console.log('sortTemperatureµµµµµµµµµµµµ', sortTemperature);

      dailyData.push({
        day,
        averageCloudCover: Math.floor(Math.round(averageCloudCover * 100) / 100),
        averagePrecipitationIntensity: Math.floor(Math.round(averagePrecipitationIntensity * 100) / 100),
        averageTemperature: Math.floor(Math.round(averageTemperature * 100) / 100),
        averageWeatherCode: Math.floor(Math.round(averageWeatherCode)),
        averageHumidity: Math.floor(Math.round(averageHumidity)),
        minTemperature: Math.floor(Math.round(minTemp)),
        maxTemperature: Math.floor(Math.round(maxTemp)),

      });
    }
    setForecastOfTheWeek(dailyData)
    return dailyData;
  };
  const groupHourlyWeatherData = (data: weatherFetchData): HourlyWeatherAverage[] => {
    const allData = data.timelines[0].intervals;

    const groupedData: { [date: string]: { [hour: string]: WeatherData[] } } = {};

    for (const entry of allData) {
      const date = new Date(entry.startTime).toLocaleDateString('en-US');

      if (!groupedData[date]) {
        groupedData[date] = {};
      }

      const hour = new Date(entry.startTime).getHours();
      const twoHourInterval = Math.floor(hour / 2) * 2;
      const timeKey = `${twoHourInterval.toString().padStart(2, '0')}`;

      if (!groupedData[date][timeKey]) {
        groupedData[date][timeKey] = [];
      }

      groupedData[date][timeKey].push(entry.values);
    }

    const currentDate = new Date().toLocaleDateString('en-US');
    const hourlyWeatherAverages: HourlyWeatherAverage[] = [];

    if (groupedData[currentDate]) {
      for (const hour in groupedData[currentDate]) {
        const hourlyData = groupedData[currentDate][hour];
        const avgCloudCover = hourlyData.reduce((acc, curr) => acc + curr.cloudCover, 0) / hourlyData.length;
        const avgPrecipitationIntensity = hourlyData.reduce((acc, curr) => acc + curr.precipitationIntensity, 0) / hourlyData.length;
        const avgTemperature = hourlyData.reduce((acc, curr) => acc + curr.temperature, 0) / hourlyData.length;
        const avgWeatherCode = hourlyData.reduce((acc, curr) => acc + curr.weatherCode, 0) / hourlyData.length;

        hourlyWeatherAverages.push({
          hour,
          averageCloudCover: Math.round(avgCloudCover * 100) / 100,
          averagePrecipitationIntensity: Math.round(avgPrecipitationIntensity * 100) / 100,
          averageTemperature: Math.round(avgTemperature * 100) / 100,
          averageWeatherCode: Math.round(avgWeatherCode)
        });
      }
    }
    setHourlyWeatherAverage(hourlyWeatherAverages)

    return hourlyWeatherAverages;
  };
  // console.log('forecastOfTheWeek:::::::::::::::', forecastOfTheWeek);



  const getWeather = async () => {
    SetIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const corr: Geolocation = {
          latitude: String(position.coords.latitude),
          longitude: String(position.coords.longitude),
        };

        if (apiUrl && apiKEY) {
          try {
            const response = await fetch(
              `${apiUrl}/timelines?location=${corr.latitude},${corr.longitude}&fields=temperature,cloudCover,precipitationIntensity,weatherCode,humidity,windSpeed,visibility,uvIndex&units=metric&timesteps=1h&apikey=${apiKEY}`
            );
            if (response.ok) {
              const data = await response.json();
              if (data.data) {
                getDailyWeatherData(data.data)
                groupHourlyWeatherData(data.data)
                getCurrentDayWeatherDetail(data.data)
                getSunriseAndSunsetTime(corr);
                getLocalizationInformation(corr);
                setWeatherData(data);
                if (weatherData) {
                  SetIsLoading(false)
                }
              }

            } else {
              console.error('Erreur lors de la récupération des données météo :', response.statusText);
            }
          } catch (error) {
            console.error('Erreur lors de la récupération des données météo :', error);
          }
        } else {
          console.error('URL d\'API ou clé API manquante');
        }
      });
    } else {
      console.error('Géolocalisation non supportée');
    }
  };
  const getLocalizationInformation = async (corr: Geolocation) => {
    const response = await fetch(
      `${reverseLocalizationApi}?format=json&lat=${corr.latitude}&lon=${corr.longitude}&addressdetails=1`
    );
    if (response.ok) {
      const data = await response.json();
      const locationDetail = `${data.address.city}, ${data.address.country}`
      setLocalization(locationDetail)
    }
  }
  const getCurrentDayWeatherDetail = (data: any) => {
    const currentDate = new Date(Date.now());
    const offset = currentDate.getTimezoneOffset() * 60000; // en millisecondes
    const localTime = new Date(currentDate.getTime() - offset);
    const currentDateString = localTime.toISOString().slice(0, 14)
    const allHourWeather: weatherFetchDataTimelineInterval[] = data.timelines[0].intervals;

    const filteredObject = allHourWeather.find((item: any) => {
      const itemDate = new Date(item.startTime).toISOString().slice(0, 14)
      return itemDate === currentDateString;
    });
    if (filteredObject) {
      setCurrentDayWeatherDetail(filteredObject)
    }

    // console.log('currentHour::$$$$$$$$$$$$$$$$$$$', filteredObject);
    // for (let i = 0; i < allHourWeather.length; i++) {
    //   const element = allHourWeather[i];
    // }
  }
  const getSunriseAndSunsetTime = async (corr: Geolocation) => {
    const now = new Date();
    const currentDate = formatDate(now)
    const currentHour = formatTime(now)
    setCurrentDate(currentDate)
    // console.log('currentGeolocation: ', corr);
    const times = SunCalc.getTimes(now, Number(corr.latitude), Number(corr.longitude));
    setSunriseAndSunsetTime({
      sunrise: formatTime(times.sunrise),
      sunset: formatTime(times.sunset)
    });
    const formatItem = currentHour.split(':')[0];
    // console.log("formatItem=====", formatItem);
    const convertSunsetTime = new Date(times.sunset).getTime();
    const convertSunriseTime = new Date(times.sunrise).getTime();
    if (now.getTime() >= convertSunsetTime && now.getTime() <= convertSunriseTime) {
      SetIsNight(true)
    }
  }

  const extractTemperaturePerHour = (data: any) => {
    if (data) {
      const hourlyData = data[0].intervals;
      if (hourlyData && hourlyData.length > 0) {
        const temperaturePerHour: any[] = [];
        for (let i = 0; i < hourlyData.length; i += 2) {
          const hour = new Date(hourlyData[i].startTime).toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true,
            timeZone: 'America/New_York' // Spécifiez le fuseau horaire si nécessaire
          });
          const temperature = hourlyData[i].values.temperature + '°C'; // Ajoutez le symbole °C pour les degrés Celsius
          temperaturePerHour.push({ time: hour, temperature });
        }
        setTemperaturePerHour(temperaturePerHour);
      }
    }
  };


  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  };
  // console.log('weatherData::::', weatherData);
  // console.log('hourlyWeatherAverage:::::::::::', temperaturePerHour);
  const NextStape = () => {
    SetNextSevenDayState(true)
  }

  // console.log("hourlyWeatherAverage$$$$$$$$$$$$$$$$", hourlyWeatherAverage);
  const cuurDayIcon = getWeatherIcon((currentDayWeatherDetail?.values.weatherCode as number), isNight)
  if (nextSevenDayState === false && isLoading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div
            className="border-4 border-black border-solid rounded-full animate-spin"
            style={{
              borderTopColor: '#10103A',
              borderRightColor: '#10103A',
              borderBottomColor: '#10103A',
              borderLeftColor: '#fff',
              width: '50px',
              height: '50px',
            }}
          ></div>
        </div>
      </>
    )

  }
  if (!isLoading && nextSevenDayState === false) {
    return (
      <>
        <div className={`container bg-[url('/icons/wi-cloudDark.svg')] bg-no-repeat  bg-[top_right_15rem]  bg-[length:200px_200px] m-0 p-0 ${isNight ? 'bg-black text-swatch1' : 'bg-swatch1 text-black'}  text-swatch1 max-w-[375px] max-h-[812px]`}>
          <div className="text-center  w-[100%] bg-[url('/icons/wi-cloudDark.svg')] bg-no-repeat bg-[center_right_-6rem] bg-[length:200px_200px]">
            <div className="flex max-h-9  pt-5">
              <MenuIcon color={isNight ? '#ffff' : '#10103A'} />
              {/* <Image priority alt="menu icon" className=" cursor-pointer" src="/icons/menu.svg" width={60} height={60} /> */}
              <h2 className={`text-md ml-20 font-bold ${isNight ? 'text-swatch1' : 'text-black'} `}>Weather Forecast</h2>
            </div>
            <div className="flex pt-14 mr-10 items-center justify-center ">
              <div className=" text-swatch1">
                <Image priority src={cuurDayIcon} className=" text-swatch1" style={{ color: '#ffff' }} width={50} height={50} alt="Weather Icon" />
              </div>
              <div className="">
                <h2 className={`text-xl ${isNight ? 'text-swatch1' : 'text-black'}`}>Today</h2>
                <p className={` text-sm  ${isNight ? 'text-swatch1' : 'text-black'}`}>{currentDate}</p>
              </div>
            </div>
            <div className={`flex  items-center justify-center ${isNight ? 'text-swatch1' : 'text-black'}`} >
              <p className="text-5xl font-bold ">{currentDayWeatherDetail && String(currentDayWeatherDetail?.values.temperature).split('.')[0]}</p>
              <p className="pb-7 text-xl">°C</p>
              {/* <Image className= {`mb-4 ${isNight ? 'bg-swatch1' : 'bg-black'}`} priority src='/icons/wi-celsius.svg' width={50} height={50} alt="Temperature Icon" /> */}
            </div>
            <div className={`flex mr-5 items-center justify-center ${isNight ? 'text-swatch1' : 'text-black'}`}>
              <p className="text-sm">{localization}</p>
              <div className="ml-1">
                <Edit width={12} />
              </div>
            </div>
            <div className="text-xs mr-2 flex justify-center">
              <p className={`${isNight ? 'text-swatch1' : 'text-black'}`}>Feels like 32</p>
              <span className={`px-1 ${isNight ? 'text-swatch1' : 'text-black'}`}><Dot /></span>
              <p className={`${isNight ? 'text-swatch1' : 'text-black'}`}>Sunset: {sunriseAndSunsetTime && sunriseAndSunsetTime.sunset}</p>
            </div>
          </div>
          <div className="flex justify-between  font-medium bg-[url('/icons/wi-cloudDark.svg')] bg-no-repeat bg-[right_-1rem] bg-[length:50px_50px]">
            <div>
              <Button variant="link" className={`text-xl ${isNight ? 'text-swatch1' : 'text-black'}`}>Today</Button>
              <Dot color={isNight ? '#ffff' : '#10103A'} className="ml-6 mt-[-14px]" />
            </div>
            {/* <Button variant="link" className={`text-xl ${isNight ? 'text-swatch1' : 'text-black'}`}>Today</Button> */}
            <Button variant="link" className={`text-xl ${isNight ? 'text-swatch1' : 'text-black'}`}>Tomorrow</Button>
            <Button variant="link" className={`text-xl ml-[-6] cursor-pointer ${isNight ? 'text-swatch1' : 'text-swatch4'}`} onClick={() => NextStape()}>Next 7 Days <ChevronRight /> </Button>
          </div>
          <div className="flex justify-around text-xs mb-6  max-w-[812px] overflow-y-auto">
            <TemperatureForHour hourlyWeatherAverage={hourlyWeatherAverage} isNight={isNight} />
          </div>
          <div className="pt-5">
            <p className={`text-lg ml-3  font-medium ${isNight ? 'text-swatch1' : 'text-black'}`}>Chance of rain</p>
            <div className="flex pt-1">
              <div className={`ml-3 mt-0 mb-0 ${isNight ? 'text-swatch1' : 'text-black'}`}>
                <p className="pt-5 mt-3">sunny</p>
                <p className="mt-1">rainy</p>
                <p className="pt-4">heavy</p>
                <p>rain</p>
              </div>
              <div className="flex justify-between ml-5">
                <div className="mt-0 mb-0 pt-4">
                  <div className="flex ">
                    <SingleProgess hourlyWeatherAverage={hourlyWeatherAverage} isNight={isNight} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className={`  max-w-[375px] max-h-[812px] ${isNight ? 'bg-black text-swatch1' : 'bg-swatch1 text-black'}`}>
          <NextSevenDay isNight={isNight} SetNextSevenDayState={SetNextSevenDayState} currentDayWeatherDetail={currentDayWeatherDetail} forecastOfTheWeek={forecastOfTheWeek} />
        </div>
      </>
    )
  }



}

export default Page;
