'use client';

import { HourlyWeatherAverage } from "../../interface/weather.interface";

interface props {
    size: string;
    time: string;
    hourlyWeatherAverage: [] | HourlyWeatherAverage[];
    isNight: boolean
}


const SingleProgess = (prop: props) => {
    const { size, time, hourlyWeatherAverage, isNight } = prop;
    console.log(size);
    const currentHour = new Date().getHours();
    const currentRoundedHour = Math.floor(currentHour);
    
    const currentIndex = hourlyWeatherAverage.findIndex(item => {
        const itemHour = parseInt(item.hour);
        if (currentRoundedHour % 2 === 0) {
            return itemHour === currentRoundedHour;
        } else if (currentRoundedHour % 2 !== 0 ) {
            return itemHour === currentRoundedHour + 1;
        }
        return false;
    });    
    let extractedData: HourlyWeatherAverage[] = []
    
    if (currentIndex !== -1) {
        const startIndex = Math.max(currentIndex - 3, 0);
        const endIndex = Math.min(currentIndex + 2, hourlyWeatherAverage.length - 1);

        extractedData = hourlyWeatherAverage.slice(startIndex, endIndex + 1);

        // console.log('extractedData', extractedData);
    } else {
        console.log("L'heure actuelle n'est pas présente dans les données.");
    }
    const formatHour = (hour: string) => {
        const parsedHour = parseInt(hour);
        if (parsedHour === 0) return '12AM';
        else if (parsedHour < 12) return `${parsedHour}AM`;
        else if (parsedHour === 12) return '12PM';
        else return `${parsedHour - 12}PM`;
    };

    return (
        <>
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
                    return (
                        <>
                            <div className="ml-3 pt-2 mt-2"
                                key={index}>
                                <div className='flex '>
                                    <div style={{ height: "100px", width: "20px", position: "relative", borderRadius: "20px" }}>
                                        <div className={`
                                            ${isCurrentHour
                                                ? ' bg-swatch8'
                                                : isNight
                                                    ? 'bg-swatch1'
                                                    : 'bg-black'
                                            }
                                        `} style={{ height: `${size}%`, width: "100%", position: "absolute", bottom: "0", borderRadius: "20px", zIndex: "2" }}></div>
                                    </div>
                                    <div style={{ height: "90px", border: "2px dashed #3c405c", marginLeft: "-12px", zIndex: "1" }}></div>
                                </div>
                                <div className={`  ${isNight
                                    ? 'text-swatch1'
                                    : 'text-black'}`}>
                                    <p >{formatHour(weather.hour)}</p>
                                </div>
                            </div >
                        </>
                    )
                })
            }


        </>
    )
}
export default SingleProgess;