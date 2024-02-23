'use client';
import { Button } from "@/components/ui/button";
import { ChevronRight, Dot, Edit } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SingleProgess from "./components/icons/singleProgess";
import { Geolocation } from "./interface/weather.interface";
interface Props { }

const Page: React.FC<Props> = (props) => {
  const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
  const apiKEY: string | undefined = process.env.NEXT_PUBLIC_API_KEY;
  const [weatherData, setWeatherData] = useState<any>();
  const [currentGeolocation, setCurrentGeolocation] = useState<Geolocation>({ latitude: '', longitude: '' });
  const [temperaturePerHour, setTemperaturePerHour] = useState<any[]>([]);
  const [localization, setLocalization] = useState<string>('');

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    if (weatherData) {
      extractTemperaturePerHour(weatherData);
    }
  }, [weatherData]);
  const getWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const corr = {
          latitude: String(position.coords.latitude),
          longitude: String(position.coords.longitude),
        };
        const location = await reverseGeocode(corr.latitude, corr.longitude);
        setLocalization(location)

        if (apiUrl && apiKEY) {
          try {
            const response = await fetch(
              `${apiUrl}/timelines?location=${corr.latitude},${corr.longitude}&fields=precipitationIntensity%2CprecipitationType%2CwindSpeed%2CwindGust%2CwindDirection%2Ctemperature%2CtemperatureApparent%2CcloudCover%2CcloudBase%2CcloudCeiling%2CweatherCode&units=metric&timesteps=1h&apikey=${apiKEY}`
            );
            if (response.ok) {
              const data = await response.json();
              setWeatherData(data);
                  if (data && data.data && data.data.timelines && data.data.timelines.length > 0) {
                    const currentTimeline = data.data.timelines[0];
                    const currentInterval = currentTimeline.intervals[0];
                    const currentTemperature = currentInterval.values.temperature + '°c';
                    const currentTime = new Date(currentInterval.startTime).toLocaleString();
                    console.log("Température actuelle :", currentTemperature);
                    console.log("Date/Heure actuelle :", currentTime);
                }
            } else {
              console.error(
                "Erreur lors de la récupération des données météorologiques"
              );
            }
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des données météorologiques :",
              error
            );
          }
        }
      });
    }
  };
  console.log("weatherData", weatherData);
  console.log("temperaturePerHour", temperaturePerHour);
  
  const extractTemperaturePerHour = (data: any) => {
    if (data) {
      const hourlyData = data.data.timelines[0].intervals;
      if (hourlyData && hourlyData.length > 0) {
        const temperaturePerHour: any[] = [];
        for (let i = 0; i < hourlyData.length; i += 2) {
          const hour = new Date(hourlyData[i].startTime).toLocaleTimeString([], { hour: '2-digit', hour12: true });
          const temperature = hourlyData[i].values.temperature + '°c';
          temperaturePerHour.push({ time: hour, temperature });
        }
        setTemperaturePerHour(temperaturePerHour);
      }
    }
  };
  const reverseGeocode = async (latitude:string, longitude:string) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        if (response.ok) {
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
            const country = data.address.country;
            const location = city ? `${city}, ${country}` : country;
            return location;
        } else {
            console.error("Erreur lors de la récupération des données de géocodage inversé");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données de géocodage inversé :", error);
        return null;
    }
};

return (
  <>
    <div className="container bg-swatch5 max-w-[375px] max-h-[812px] mx-auto">
      <div className="rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">Weather Forecast</h2>
          <div className="flex items-center justify-center py-3">
            <div>
              <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="Weather Icon" />
            </div>
            <div className="ml-1">
              <h2 className="text-xl">Today</h2>
              <p className="text-sm">Sat, 3 Aug</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-6xl font-bold py-2">{weatherData && weatherData.temperature}</p>
            <Image className="mb-4" priority src='/icons/wi-celsius.svg' width={50} height={50} alt="Temperature Icon" />
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm">{localization && localization}</p>
            <div className="ml-1">
              <Edit width={12} />
            </div>
          </div>
          <div className="text-xs mt-4 flex justify-center">
            <p>Feels like 32</p>
            <span className="px-1"><Dot /></span>
            <p>Sunset: 20:15</p>
          </div>
        </div>
        <div className="flex justify-between text-xs font-medium mb-6">
          <Button variant="link">Today</Button>
          <Button variant="link">Tomorrow</Button>
          <Button variant="link">Next 7 Days <ChevronRight /> </Button>
        </div>
        <div className="flex justify-between text-xs mb-6">
          <div className="text-center rounded-full hover:bg-white hover:text-black border border-white py-5 px-3 cursor-pointer">
            <p>12AM</p>
            <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="Weather Icon" />
            <p>26°C</p>
          </div>
          <div className="text-center rounded-full hover:bg-white hover:text-black border border-white py-5 px-3 cursor-pointer">
            <p>12AM</p>
            <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="Weather Icon" />
            <p>26°C</p>
          </div>
          <div className="text-center rounded-full hover:bg-white hover:text-black border border-white py-5 px-3 cursor-pointer">
            <p>12AM</p>
            <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="Weather Icon" />
            <p>26°C</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium">Chance of rain</h3>
          <div className="flex">
            <div className="mt-0 mb-0">
              <p className="pt-2">sunny</p>
              <p className="pt-5">rainy</p>
              <p className="pt-5">heavy rain</p>
            </div>
            <div className="flex justify-between ml-5">
              <div className="mt-0 mb-0 pt-2">
                <div className="flex gap-2">
                  <SingleProgess size={"75"} time={"10"} />
                  <SingleProgess size={"90"} time={"12"} />
                  <SingleProgess size={"60"} time={"2"} />
                  <SingleProgess size={"60"} time={"4"} />
                  <SingleProgess size={"70"} time={"6"} />
                  <SingleProgess size={"60"} time={"8"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>

);
}

export default Page;
