import { useEffect, useState } from 'react';

type SensorData = {
  hum: number;
  temp: number;
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
      setSensorData(data);
      console.log(data)
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
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
