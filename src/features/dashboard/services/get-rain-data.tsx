import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "@/config/config-db";
import { initializeApp } from "firebase/app";
import { ResponseData } from "@/types/Response-data";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function getAllRainData(callback: (data: { [key: string]: ResponseData }) => void): void {
    const sensorRef = ref(database, "sensor");

    onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Real-time data:", data);
        callback(data); 
    });
}

export function getLastRainData(callback: (data: ResponseData | null) => void): void {
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
