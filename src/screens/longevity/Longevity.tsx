import {AppView, Typography} from '@components/common';
import {LongevityAnalytics} from '@components/Logevity';
import {Colors} from '@constants';
import React from 'react';

const Longevity = () => {
  return (
    <AppView backgroundColor={Colors.background.primary}>
      <Typography variant="h4" fontFamily="montserratMedium">
        Longevity Keys
      </Typography>

      <LongevityAnalytics />
    </AppView>
  );
};

export {Longevity};
