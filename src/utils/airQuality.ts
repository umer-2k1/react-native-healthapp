import axios from 'axios';
import {getUserTimeZone} from './date';

type AQIResponse = {
  data: {
    aqi: number;
    attributions: {name: string; url: string}[];
    city: {
      geo: [number, number];
      name: string;
      url: string;
      location: string;
    };
    idx: number;
    time: {
      s: string;
      tz: string;
      v: number;
      iso: string;
    };
    status: string;
  };
};

const getAirQuality = async () => {
  try {
    const city = getUserTimeZone().split('/')[1]?.toLowerCase();
    const URL = `https://api.waqi.info/feed/${city}/?token=${process.env.AIR_QUALITY_API_TOKEN}`;
    const res = await axios.get<AQIResponse>(URL);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};

const categorizeAQI = (aqi: number) => {
  if (aqi >= 0 && aqi <= 50) {
    return 'excellent';
  } else if (aqi > 50 && aqi <= 100) {
    return 'good';
  } else if (aqi > 100) {
    return 'poor';
  } else {
    return 'poor';
  }
};

export {getAirQuality, categorizeAQI};
