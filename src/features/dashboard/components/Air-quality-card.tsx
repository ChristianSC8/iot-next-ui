import { Badge } from "@/components/ui/Badge"
import { ResponseData } from "@/types/Response-data";

interface RainCardProps {
    data: ResponseData | null;
}

const CO_THRESHOLD = 50;

export const AirQualityCard: React.FC<RainCardProps> = ({ data }) => {

    const getAirQualityStatus = () => {
        if (!data) return "Unknown";

        const coLevel = data.carbon_monoxide_ppm;

        return coLevel <= CO_THRESHOLD ? "Good" : "Bad";
    };


    return (
        <div className="dark:bg-[#21212B] px-4 py-4 rounded lg:h-[240px]  flex flex-col border border-primary-br">
            {/* Parte superior: título, badge e ícono */}
            <div className="flex justify-between items-start flex-none">
                <div className="text-xl font-medium text-gray-900 dark:text-gray-50 flex flex-col">
                    <span >Air Quality</span>
                    <Badge variant="warning" className="flex items-center justify-center mt-1 ">
                        {getAirQualityStatus()}
                    </Badge>
                </div>
                <div className="flex items-center justify-end">
                    <svg className="w-[70px] h-[70px] fill-[#3AA8B5]" viewBox="0 0 367.3 367.3" xmlns="http://www.w3.org/2000/svg">
                        <path d="m241.54 156.52c-1.919 0-3.837-0.731-5.302-2.195-14.048-14.038-32.722-21.769-52.582-21.769-4.143 0-7.5-3.358-7.5-7.5s3.357-7.5 7.5-7.5c23.864 0 46.305 9.29 63.186 26.159 2.93 2.928 2.932 7.677 4e-3 10.606-1.465 1.466-3.386 2.199-5.306 2.199z" />
                        <path d="m183.65 296.34c-23.874 0-46.319-9.296-63.203-26.177-16.888-16.884-26.188-39.334-26.188-63.215 0-4.142 3.357-7.5 7.5-7.5s7.5 3.358 7.5 7.5c0 19.874 7.74 38.557 21.794 52.607 14.051 14.048 32.73 21.784 52.598 21.784 19.87 0 38.552-7.738 52.603-21.789 2.93-2.929 7.678-2.929 10.607 0s2.929 7.678 0 10.606c-16.885 16.886-39.334 26.184-63.211 26.184z" />
                        <path d="m183.65 247.48c-22.353 0-40.537-18.185-40.537-40.537s18.185-40.537 40.537-40.537 40.537 18.185 40.537 40.537-18.184 40.537-40.537 40.537zm0-66.074c-14.081 0-25.537 11.456-25.537 25.537s11.456 25.537 25.537 25.537 25.537-11.456 25.537-25.537-11.456-25.537-25.537-25.537z" />
                        <path d="m183.65 344.01c-4.143 0-7.5-3.358-7.5-7.5s3.357-7.5 7.5-7.5c32.603 0 63.254-12.696 86.308-35.75 23.055-23.054 35.751-53.706 35.751-86.308 0-4.142 3.357-7.5 7.5-7.5s7.5 3.358 7.5 7.5c0 36.609-14.257 71.027-40.144 96.915-25.887 25.887-60.305 40.143-96.915 40.143z" />
                        <path d="m54.093 214.45c-4.143 0-7.5-3.358-7.5-7.5 0-36.609 14.257-71.027 40.144-96.915 25.888-25.887 60.306-40.144 96.915-40.144 4.143 0 7.5 3.358 7.5 7.5s-3.357 7.5-7.5 7.5c-32.603 0-63.254 12.696-86.308 35.75-23.055 23.054-35.751 53.706-35.751 86.308 0 4.143-3.358 7.501-7.5 7.501z" />
                        <path d="m59.093 339.01c-1.92 0-3.839-0.732-5.304-2.197-34.686-34.686-53.789-80.806-53.789-129.86 0-4.142 3.357-7.5 7.5-7.5s7.5 3.358 7.5 7.5c0 45.049 17.543 87.401 49.396 119.26 2.929 2.929 2.929 7.678 0 10.606-1.464 1.465-3.384 2.197-5.303 2.197z" />
                        <path d="m308.21 339.01c-1.919 0-3.839-0.732-5.304-2.197-2.929-2.929-2.929-7.678 0-10.606 31.854-31.854 49.396-74.206 49.396-119.26 0-4.142 3.357-7.5 7.5-7.5s7.5 3.358 7.5 7.5c0 49.055-19.103 95.174-53.789 129.86-1.464 1.465-3.384 2.197-5.303 2.197z" />
                        <path d="m308.19 89.867c-1.919 0-3.838-0.732-5.302-2.196-31.853-31.839-74.197-49.375-119.23-49.375-4.143 0-7.5-3.358-7.5-7.5s3.357-7.5 7.5-7.5c49.042 0 95.152 19.094 129.84 53.766 2.929 2.928 2.93 7.677 2e-3 10.606-1.466 1.466-3.386 2.199-5.305 2.199z" />
                    </svg>
                </div>
            </div>

            {/* Parte inferior que ocupa el resto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-5 flex-1 border-primary-br">
                <div className="bg-[#f9fafb] dark:bg-background-subtle border border-primary-br rounded-md p-2 h-full dark:border-primary-br flex flex-col items-center justify-center gap-1">
                    <span className="text-md text-gray-500 dark:text-[#C498FA]">CO</span>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">{data?.carbon_monoxide_mq7 ?? 'N/A'}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">ug/m³</span>
                </div>
                <div className="bg-[#f9fafb] dark:bg-background-subtle border border-primary-br rounded-md p-2 h-full dark:border-primary-br flex flex-col items-center justify-center gap-1">
                    <span className="text-md text-gray-500 dark:text-[#C498FA]">CO₂</span>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">{data?.carbon_dioxide_ppm ?? 'N/A'}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">ppm</span>
                </div>

                <div className="bg-[#f9fafb] dark:bg-background-subtle border border-primary-br rounded-md p-2 h-full dark:border-primary-br flex flex-col items-center justify-center gap-1">
                    <span className="text-md text-gray-500 dark:text-[#C498FA]">NH₃</span>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">{data?.amonia_ppm ?? 'N/A'}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">ppm</span>
                </div>
            </div>
        </div>
    )
}