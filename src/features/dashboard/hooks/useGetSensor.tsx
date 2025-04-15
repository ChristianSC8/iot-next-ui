import { useEffect, useState } from 'react';

type SensorData = {
  humidity: number;
  temperature: number;
  rain: boolean;
  created_at: string;
};

type UseSensorDataReturn = {
  sensorData: SensorData | null;
  loading: boolean;
  error: string | null;
};

const useSensorData = (interval?: number): UseSensorDataReturn => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('https://iot-server-58f2a-default-rtdb.firebaseio.com/sensor.json');
      const data = await res.json();

      // Aseguramos que los datos sean tratados como un arreglo de SensorData
      const sortedData: SensorData[] = Object.values(data) as SensorData[];

      // Solo obtenemos el último dato (más reciente)
      const lastSensorData = sortedData[sortedData.length - 1] || null;

      setSensorData(lastSensorData);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Error fetching sensor data:', err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    let timer: NodeJS.Timeout | undefined;
    if (interval) {
      timer = setInterval(fetchData, interval);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [interval]);

  return { sensorData, loading, error };
};

export default useSensorData;
