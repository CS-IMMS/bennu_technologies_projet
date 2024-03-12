'use client';
import Image from 'next/image';
import { HourlyWeatherAverage } from '../interface/weather.interface';
import { getWeatherIcon } from '@/app/utility/function';

interface Props {
    hourlyWeatherAverage: [] | HourlyWeatherAverage[];
    isNight: boolean
}

export default function TemperatureForHour(props: Props) {
    const { hourlyWeatherAverage, isNight } = props;
    const currentHour = new Date().getHours();
    const currentRoundedHour = Math.floor(currentHour);
    // console.log('currentRoundedHour:::', currentRoundedHour);
    // console.log('hourlyWeatherAverage%%%%%%%', hourlyWeatherAverage);
    const currentIndex = hourlyWeatherAverage.findIndex(item => {
        const itemHour = parseInt(item.hour);
        if (currentRoundedHour % 2 === 0) {
            return itemHour === currentRoundedHour;
        } else if (currentRoundedHour % 2 !== 0) {
            return itemHour === currentRoundedHour - 1;
        }
        return false;
    });
    let extractedData: HourlyWeatherAverage[] = []
    if (currentIndex !== -1) {
        const startIndex = Math.max(currentIndex - 2, 0);
        // console.log('startIndex:::', startIndex);

        const endIndex = Math.min(currentIndex + 2, hourlyWeatherAverage.length - 1);

        extractedData = hourlyWeatherAverage.slice(startIndex, endIndex + 1);

        // console.log('extractedData??????????', extractedData);
    }
    const formatHour = (hour: string) => {
        const parsedHour = parseInt(hour);
        if (parsedHour === 0) return '12AM';
        else if (parsedHour < 12) return `${parsedHour}AM`;
        else if (parsedHour === 12) return '12PM';
        else return `${parsedHour - 12}PM`;
    };

    return (
        <div className="flex">
            {
                extractedData.map((weather, index) => {
                    let isCurrentHour = false;
                    if (currentRoundedHour % 2 === 0) {
                        if (Number(weather.hour) === currentRoundedHour) {
                            isCurrentHour = true;
                        }
                    } else {
                        if (Number(weather.hour) === currentRoundedHour + 1) {
                            isCurrentHour = true;
                        }

                    }
                    const getIcone = getWeatherIcon(weather.averageWeatherCode, isNight)
                    //${isNight ? 'bg-swatch6 text-swatch1' : 'bg-swatch6 text-swatch1'}
                    return (
                        <div
                            key={index}
                            className={`text-center rounded-full border mr-3 py-3 px-3 cursor-pointer  
                        ${isCurrentHour
                                    ? 'text-swatch1 bg-black mb-4'
                                    : isNight
                                        ? 'bg-swatch1 text-black mt-5 pt-4'
                                        : 'bg-swatch1 text-black border-black mt-6'
                                }`}
                        >
                            <p className='pb-2'>{formatHour(weather.hour)}</p>
                            <div
                                className="rounded-full flex items-center justify-center"
                                style={{
                                    // backgroundColor: '#aac2df',
                                    width: '35px',
                                    height: '35px',

                                }}
                            >
                                <Image
                                    priority
                                    src={getIcone}
                                    className=''
                                    width={30}
                                    height={30}
                                    alt="Weather Icon"
                                />
                            </div>
                            <div className="flex pt-3 text-center">
                                <p className='text-xl'>{Math.round(Math.floor(weather.averageTemperature))}</p>
                                <p> °C</p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
