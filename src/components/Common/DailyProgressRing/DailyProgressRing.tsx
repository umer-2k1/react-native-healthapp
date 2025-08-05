import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

interface DailyProgressRingProps {
  size?: number;
  width?: number;
  fill: number;
  tintColor?: string;
  backgroundWidth?: number;
  children: React.ReactNode;
}

const DailyProgressRing = ({
  size = 120,
  width = 12,
  tintColor = '#D0B07B',
  fill,
  backgroundWidth = 4,
  children,
}: DailyProgressRingProps) => {
  return (
    <AnimatedCircularProgress
      size={size}
      width={width}
      fill={fill}
      tintColor={tintColor}
      backgroundColor="#e5e5e5"
      backgroundWidth={backgroundWidth}
      style={{borderRadius: 30}}
      lineCap="round"
      rotation={0}>
      {() => <>{children}</>}
    </AnimatedCircularProgress>
  );
};

export {DailyProgressRing};
