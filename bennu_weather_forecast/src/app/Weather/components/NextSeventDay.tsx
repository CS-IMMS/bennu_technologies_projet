'use client'

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { DailyWeather, weatherFetchDataTimelineInterval } from "../interface/weather.interface";
import { getWeatherIcon } from "@/app/utility/function";
import MenuIcon from "./icons/menu";
interface Props {
    SetNextSevenDayState: Dispatch<SetStateAction<boolean>>;
    currentDayWeatherDetail: weatherFetchDataTimelineInterval | null;
    forecastOfTheWeek: [] | DailyWeather[];
    isNight: boolean;
}
export default function NextSevenDay(props: Props) {
    const { SetNextSevenDayState, currentDayWeatherDetail, forecastOfTheWeek, isNight } = props;
    const now = new Date();
    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };
    const getCurrDayIcon = getWeatherIcon(forecastOfTheWeek[0].averageWeatherCode, isNight)
    let totalTemperature = 0;
    for (let i = 0; i < forecastOfTheWeek.length; i++) {
        const temperature = forecastOfTheWeek[i].averageTemperature;
        totalTemperature += temperature;
    }
    const averageTemperatureForWeek = totalTemperature / forecastOfTheWeek.length;
    // console.log("averageTemperatureForWeek§§§", Math.round(Math.floor(averageTemperatureForWeek)));
    function getPositionOfAverageTemperature(minTemperature: number, averageTemperature: number, maxTemperature: number) {
        // Calculer la différence entre la moyenne et les valeurs minimale et maximale
        const diffToMin = Math.abs(averageTemperature - minTemperature);
        const diffToMax = Math.abs(averageTemperature - maxTemperature);

        // Déterminer la position relative de la température moyenne dans la gamme de températures
        const range = maxTemperature - minTemperature;
        const position = (diffToMin / range) * 38; // Position en pourcentage

        return Math.floor(Math.round(position));
    }
    return (
        <>
            <div className="w-100">
                <div className={`flex pl-2  max-h-7  pt-4 ${isNight ? 'text-swatch1' : 'text-black'}`}>
                    {/* <MenuIcon className="text-gray-700 h-6 w-6" /> */}
                    {/* <Image priority alt="menu icon" className="pt-2 pl-3 cursor-pointer text-swatch1" src="/icons/menu.svg" width={60} height={60} /> */}
                    <MenuIcon color={isNight ? '#ffff' : '#10103A'} />
                    <div className="flex ml-20 font-bold text-md justify-start">
                        <p>Weather</p>
                        <p className="">Forecast</p>
                    </div>
                </div>
                <div className="pt-4 pr-10 block text-start mb-1">
                    <ChevronLeft className="ml-2 cursor-pointer" onClick={() => SetNextSevenDayState(false)} />
                    <h2 className="text-2xl pt-5 ml-5">Next<span className=" font-semibold"> 7 days</span> </h2>
                </div>
                <div className="mt-4  p-4 pt-5">
                    <div className={`${isNight ? 'bg-swatch1 text-black' : 'bg-black text-swatch1 '} pt-5 pb-5 pl-5 pr-5   rounded-lg shadow-xl`}>
                        <div className={`flex items-center justify-between mb-4 ${isNight ? 'text-black' : 'text-swatch1'}`}>
                            <h3 className={`text-lg font-semibold ${isNight ? 'text-black' : 'text-swatch1'} `}>{forecastOfTheWeek && forecastOfTheWeek[0].day} </h3>
                            <div className={`rounded-full `}>
                                <Image priority src={getCurrDayIcon} className=" mr-20 text-swatch5" width={30} height={30} alt="Weather Icon" />
                            </div>
                            <div className="flex">
                                <p className="text-xl font-bold">{forecastOfTheWeek && forecastOfTheWeek[0].maxTemperature}°C</p>
                                <p className="text-gray-500 ml-1 pt-2">{forecastOfTheWeek && forecastOfTheWeek[0].minTemperature}°c</p>
                            </div>
                        </div>
                        <div className={`flex justify-between ${isNight ? 'text-black' : 'text-swatch1'}`}>
                            <div className="flex">
                                <div className="">
                                    <p>Wind</p>
                                    <p>Visibility</p>
                                </div>
                                <div className="ml-5">
                                    <p>{currentDayWeatherDetail && Math.floor(Math.round(currentDayWeatherDetail?.values.windSpeed))} m/h</p>
                                    <p>{currentDayWeatherDetail && Math.floor(Math.round(currentDayWeatherDetail?.values.visibility))} km</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mr-5">
                                    <p>Humidity</p>
                                    <p>UV</p>
                                </div>
                                <div>
                                    <p>{currentDayWeatherDetail && Math.floor(Math.round(currentDayWeatherDetail?.values.humidity))} %</p>
                                    <p>{currentDayWeatherDetail && Math.floor(Math.round(currentDayWeatherDetail?.values.uvIndex))}</p>
                                </div>
                            </div>
                            {/*  */}

                        </div>
                    </div>
                    <div className="pt-5 space-y-3">
                        <p className="mr-20 text-end " >{Math.round(Math.floor(averageTemperatureForWeek))}</p>
                        {
                            forecastOfTheWeek && forecastOfTheWeek.length > 0 && forecastOfTheWeek.map(day => {
                                const getIcon = getWeatherIcon(day.averageWeatherCode, isNight)
                                // console.log(getPositionOfAverageTemperature(day.minTemperature, averageTemperatureForWeek, day.maxTemperature));

                                return (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <div className=" items-center">
                                                <p className="ml-2 text-sm">{day.day.split('', 3).join('')}</p>
                                                <div className="flex ">
                                                    <div className="rounded-full">
                                                        <Image priority src='/icons/wi-raindrop.svg' className="text-swatch5" width={23} height={20} alt="Weather Icon" />
                                                    </div>
                                                    <p className="text-md">{day.averageHumidity} %</p>
                                                </div>
                                                {/*  */}
                                            </div>
                                            <div className="rounded-full  ">
                                                {/* <CloudRainIcon className="text-blue-500 h-5 w-5" /> */}
                                                <Image priority src={getIcon} className=" text-swatch1 " width={30} height={30} alt="Weather Icon" />
                                            </div>
                                            <div className="flex relative">
                                                <p className="text-sm mr-[-10px]">{day.minTemperature}°C</p>
                                                <div className="h-2 max-w-[80px] mb-4 text-xs text-center relative flex rounded gap-0" style={{ zIndex: '2' }}>
                                                    {/* <p className="text-sm absolute top-[-25px] left-2/3 transform -translate-x-1/2" >{day.averageTemperature}°c</p> */}
                                                    <div style={{ width: `38px` }} className="shadow-none py-3 ml-5 rounded-l-xl flex flex-col text-center whitespace-nowrap text-white justify-center bg-swatch5"></div>
                                                    <div style={{ width: `${getPositionOfAverageTemperature(day.minTemperature, averageTemperatureForWeek, day.maxTemperature)}px`, maxWidth: '38px' }} className="shadow-none py-3 rounded-r-xl flex flex-col text-center whitespace-nowrap text-white justify-start bg-swatch7"></div>
                                                </div>
                                                <p className="text-sm font-bold  ml-4">{day.maxTemperature}°C</p>
                                                <hr className="absolute top-[12px] left-1/2 transform -translate-x-1/2  p-2  w-32 border-dashed border-swatch6" style={{ zIndex: '1' }} />
                                                <hr className="absolute top-[-1px] right-[8%] transform -translate-x-1/2 rotate-90 p-2 w-20 border-dashed border-swatch6" style={{ zIndex: '1' }} />
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                            )
                        }
                    </div>
                </div>
            </div>
        </>

    )
}
