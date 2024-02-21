import { Button } from "@/components/ui/button";
import Image from "next/image";
import twitterIcon from "../../../public/icons/wi-cloud.svg";

interface Props {}

const Page: React.FC<Props> = (props) => {
  return (
    <>
      <div className="container  max-w-[375px] maw-h-[812px] " >
        <div className=" rounded-lg p-6 w-full ">
          <div className="text-center mb-6">
            <h2>Weather Forecast</h2>
            <div className="flex justify-center">
             <div>
             <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="tktk" />
             </div>
             <div>
             <h2 className="text-lg font-medium mb-1">Today</h2>
             <p className="text-sm">Sat, 3 Aug</p>
             </div>
            </div>
            <p className="text-6xl font-bold my-2">28°C</p>
            <p className="text-sm">
              Barcelona, Spain
            </p>
            <p className="text-xs mt-4">Feels like 32 · Sunset: 20:15</p>
          </div>
          <div className="flex justify-between text-xs font-medium mb-6">
            {/* Buttons */}
          </div>
          <div className="flex justify-between text-xs mb-6">
            <div className="text-center">
              {/* Icons */}
              <p>12AM</p>
              <p>26°C</p>
            </div>
            {/* Autres colonnes */}
          </div>
          <div>
            <h3 className="text-xs font-medium mb-2">Chance of rain</h3>
            <div className="flex justify-between">
              <div className="text-center">
                {/* Rain chances */}
                <p>10AM</p>
              </div>
              {/* Autres colonnes */}
            </div>
            <div className="flex justify-between text-xs mt-4">
              <p>sunny</p>
              <p>rainy</p>
              <p>heavy rain</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
