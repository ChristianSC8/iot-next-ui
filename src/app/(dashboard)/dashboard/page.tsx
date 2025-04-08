"use client"
import { AirQualityCard } from "@/features/dashboard/Air-quality-card";
import { HumidityCard } from "@/features/dashboard/Humidity-card";
import { RainCard } from "@/features/dashboard/Rain-card";
import { TemperatureCard } from "@/features/dashboard/Temperature-card";

export default function Dashboard() {
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
          <RainCard />
        </div>
        <div className="lg:col-span-3">
          <AirQualityCard />
        </div>
      </div>
      {/* 
      <div className="h-[calc(100vh-350px)] mt-3 border min-h-[500px]">
    
      </div> */}

    </>

  )
}
