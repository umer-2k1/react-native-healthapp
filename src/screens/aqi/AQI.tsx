import {AppView, Typography} from '@components/common';
import {getAirQuality} from '@utils';
import React, {useEffect, useState} from 'react';

const AQI = () => {
  const [aqi, setAqi] = useState<number | null>(null);
  const fetchAQI = async () => {
    const data = await getAirQuality();
    if (data) {
      setAqi(data.aqi);
    }
  };

  useEffect(() => {
    fetchAQI();
  }, []);

  return (
    <AppView>
      <Typography variant="h1" align="center">
        AQI: {aqi}
      </Typography>
    </AppView>
  );
};

export {AQI};
