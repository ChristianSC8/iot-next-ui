"use client"
import React, { useEffect, useState, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface SensorData {
  time: string;
  mq135: string;
}

const AirQualityChart = () => {
  const [data, setData] = useState<Array<{time: string, value: number}>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const lastFetchTimeRef = useRef<number>(0);

  // Configuración
  const UPDATE_INTERVAL = 1000; // Actualizar cada 1 segundo (1000 ms)
  const MAX_DATA_POINTS = 60; // Máximo de puntos a mostrar (1 minuto de datos)

  // Inicializar datos con valores en 0
  useEffect(() => {
    const initialData = Array.from({length: MAX_DATA_POINTS}, (_, i) => ({
      time: new Date(Date.now() - (MAX_DATA_POINTS - i) * 1000).toLocaleTimeString(),
      value: 0
    }));
    setData(initialData);
  }, []);

  // Función para formatear la hora
  const formatTime = (timeString: string) => {
    const [time, period] = timeString.split(' ');
    return time; // Devuelve el tiempo completo HH:MM:SS
  };

  // Obtener datos del backend
  const fetchData = async () => {
    const now = Date.now();
    // Evitar llamadas demasiado frecuentes (mínimo 500ms entre llamadas)
    if (now - lastFetchTimeRef.current < 500) return;
    
    lastFetchTimeRef.current = now;
    
    try {
      const response = await fetch('http://localhost:3001/api/data', {
        cache: 'no-store' // Evitar caché para obtener datos frescos
      });
      const sensorData: SensorData = await response.json();
      
      setData(prev => {
        const newDataPoint = {
          time: formatTime(sensorData.time),
          value: parseFloat(sensorData.mq135)
        };
        
        // Mantener solo los últimos MAX_DATA_POINTS puntos
        // Reemplazar solo el último punto si todos eran 0 (inicialización)
        const allZeros = prev.every(item => item.value === 0);
        const updatedData = allZeros 
          ? [...prev.slice(1), newDataPoint]
          : [...prev.slice(1), newDataPoint];
        
        return updatedData;
      });
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  // Observar visibilidad del componente
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          startTimeRef.current = Date.now();
        }
      },
      { threshold: 0.1 }
    );

    if (chartRef.current) observer.observe(chartRef.current);
    return () => {
      if (chartRef.current) observer.unobserve(chartRef.current);
    };
  }, []);

  // Actualizar datos periódicamente
  useEffect(() => {
    if (!isVisible) return;

    // Configurar intervalo para actualizaciones periódicas
    const interval = setInterval(() => {
      fetchData();
      setDuration(prev => prev + 1);
    }, UPDATE_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [isVisible]);

  // Estilos
  const styles = {
    container: {
      backgroundColor: '#1e1e1e',
      padding: '12px',
      color: 'white',
      fontFamily: '"Segoe UI", sans-serif',
      width: '100%',
      border: '1px solid #3c3c3c'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2px'
    },
    title: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#e5e5e5'
    },
    value: {
      fontSize: '13px',
      fontWeight: '600',
      color: data[data.length - 1]?.value > 0 ? '#e5e5e5' : '#a0a0a0'
    },
    sensorInfo: {
      fontSize: '11px',
      color: '#a0a0a0',
      marginBottom: '6px'
    },
    duration: {
      fontSize: '11px',
      color: '#a0a0a0',
      textAlign: 'right' as const,
      marginTop: '4px'
    },
    chartContainer: {
      height: '60px',
      position: 'relative' as const,
      backgroundImage: `
        linear-gradient(to right, #252525 1px, transparent 1px),
        linear-gradient(to bottom, #252525 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px'
    },
    chartOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(30, 30, 30, 0.85)'
    }
  };

  return (
    <div ref={chartRef} style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>Calidad del Aire</span>
        <span style={styles.value}>
          {data.length > 0 ? data[data.length - 1].value.toFixed(2) : '0.00'} ppm
          {data[data.length - 1]?.value === 0 && ' (inicializando...)'}
        </span>
      </div>

      <div style={styles.sensorInfo}>Sensor MQ135 - Niveles de CO2 (actualización cada 1s)</div>

      <div style={styles.chartContainer}>
        <div style={styles.chartOverlay}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10, fill: '#a0a0a0' }}
                tickMargin={5}
                interval={Math.floor(data.length / 4)}
                tickFormatter={(value) => {
                  const parts = value.split(':');
                  return parts.length > 2 ? `${parts[1]}:${parts[2]}` : value;
                }}
              />
              <YAxis 
                domain={[0, 'auto']} // Fijar mínimo en 0
                tick={{ fontSize: 10, fill: '#a0a0a0' }}
                width={30}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4ec9b0"
                strokeWidth={1.5}
                fill="rgba(78, 201, 176, 0.2)"
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.duration}>
        {data[data.length - 1]?.value > 0 
          ? `Última actualización: ${data[data.length - 1].time}`
          : 'Esperando datos del sensor...'}
      </div>
    </div>
  );
};

export default AirQualityChart;