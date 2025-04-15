"use client"
import { firebaseConfig } from "@/config/config-db";
import { AirQualityCard } from "@/features/dashboard/components/Air-quality-card";
import AirQualityChart from "@/features/dashboard/components/CpuUsageChart";
import { HumidityCard } from "@/features/dashboard/components/Humidity-card";
import { RainCard } from "@/features/dashboard/components/Rain-card";
import { TemperatureCard } from "@/features/dashboard/components/Temperature-card";
import { getLastRainData } from "@/features/dashboard/services/get-rain-data";
import { ResponseData } from "@/types/Response-data";
import { useEffect, useState } from "react";


export default function Dashboard() {

  const [lastRain, setLastRain] = useState<ResponseData | null>(null);

  useEffect(() => {
    getLastRainData((data) => {
      setLastRain(data);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-4">
        <div className="lg:col-span-2">
          <TemperatureCard />
        </div>
        <div className="lg:col-span-2">
          <HumidityCard />
        </div>
        <div className="lg:col-span-2">
          <RainCard data={lastRain} />
        </div>
        <div className="lg:col-span-3">
          <AirQualityCard />
        </div>
      </div>

      <div className="h-[calc(100vh-350px)] mt-3 border border-primary-br min-h-[500px] dark:bg-[#21212B] rounded">
        <div className="grid grid-cols-9 gap-4 h-full">
          <div className="col-span-6 bg-white dark:bg-[#2A2A39] rounded">
          </div>
          <div className="col-span-3 bg-white dark:bg-[#2A2A39] rounded">

          </div>
        </div>
      </div>

    </>

  )
}
