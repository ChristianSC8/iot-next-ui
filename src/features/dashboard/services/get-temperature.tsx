import { firebaseConfig } from "@/config/config-db";
import { ResponseData } from "@/types/Response-data";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function getAllTemperatureData(callback: (data: { [key: string]: ResponseData }) => void): void {
    const sensorRef = ref(database, "sensor");

    onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Real-time data:", data);
        callback(data); 
    });
}

export function getLastTemperatureData(callback: (data: ResponseData | null) => void): void {
    const sensorRef = ref(database, "sensor");

    onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
            const sensorKeys = Object.keys(data);  
            const lastSensorKey = sensorKeys[sensorKeys.length - 1];  
            const lastSensorData = data[lastSensorKey]; 

            console.log("Last Rain:", lastSensorData); 
            callback(lastSensorData); 
        } else {
            console.log("No data available.");
            callback(null);  
        }
    });
}
