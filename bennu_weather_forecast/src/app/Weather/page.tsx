'use client';
import { Button } from "@/components/ui/button";
import { ChevronRight, Dot, Edit, EditIcon } from "lucide-react";
import Image from "next/image";
import SingleProgess from "./components/icons/singleProgess";
import { useEffect, useState } from "react";
interface Props { }

const Page: React.FC<Props> = (props) => {
  const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
  const [weatherData, SetWeatherData] = useState()
  console.log('apiUrl', apiUrl);
  const getEvents = async() => {
    await fetch(`${apiUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          SetWeatherData(data)
        } else {
        }
      })
      .catch((error) => {
      });
  }

  useEffect(() => {
    getEvents();
  }, []);
  console.log('data:', weatherData);
  
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
          <p className="text-sm">Barcelona, Spain</p>
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
