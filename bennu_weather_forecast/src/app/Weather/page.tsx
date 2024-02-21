import { Button } from "@/components/ui/button";
import { ChevronRight, Dot, Edit } from "lucide-react";
import Image from "next/image";
interface Props { }

const Page: React.FC<Props> = (props) => {
  return (
    <>
      <div className="container  max-w-[375px] maw-h-[812px] " >
        <div className=" rounded-lg p-6 w-full ">
          <div className="text-center mb-6">
            <h2>Weather Forecast</h2>
            <div className="flex justify-center py-3">
              <div>
                <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="tktk" />
              </div>
              <div className="ml-1">
                <h2 className="text-xl  ">Today</h2>
                <p className="text-sm ml-2">Sat, 3 Aug</p>
              </div>
            </div>
            <p className="text-6xl font-bold my-2">28°C</p>
            <div className="flex justify-center">
              <div>
                <p className="text-sm">
                  Barcelona, Spain
                </p>
              </div>
              <div className="ml-1">
                <Edit width={12} />
              </div>
            </div>
            <div className="text-xs mt-4 flex justify-center">
              <p>Feels like 32</p>
              <Dot className="px-1" />
              <p>Sunset: 20:15</p>
            </div>
            <p className="text-xs mt-4">   </p>
          </div>
          <div className="flex justify-between text-xs font-medium mb-6">
            <Button variant="link">Today</Button>
            <Button variant="link">Tomorrow</Button>
            <Button variant="link">Next 7 Days <ChevronRight /> </Button>
          </div>
          <div className="flex justify-between text-xs mb-6">
            <div className="text-center rounded-full hover:bg-white hover:text-black border border-white py-5 px-3 cursor-pointer">
              <p>12AM</p>
              <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="tktk" />
              <p>26°C</p>
            </div>
            <div className="text-center rounded-full hover:bg-white hover:text-black border border-white py-5 px-3 cursor-pointer">
              <p>12AM</p>
              <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="tktk" />
              <p>26°C</p>
            </div>
            <div className="text-center rounded-full hover:bg-white hover:text-black border border-white py-5 px-3 cursor-pointer">
              <p>12AM</p>
              <Image priority src='/icons/wi-cloud.svg' width={50} height={50} alt="tktk" />
              <p>26°C</p>
            </div>
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
