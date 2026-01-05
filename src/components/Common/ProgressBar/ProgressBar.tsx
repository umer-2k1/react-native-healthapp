import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, ColorValue } from 'react-native';

interface ProgressBarProps {
  progress?: number; // 0–100
  height?: number;
  backgroundColor?: ColorValue;
  fillColor?: ColorValue;
  dotColor?: ColorValue;
  dotCount?: number;
  duration?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  height = 22,
  backgroundColor = '#E6F3FA',
  fillColor = '#A8E1F9',
  dotColor = '#C9D6E1',
  dotCount = 10,
  duration = 800,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration,
      useNativeDriver: false,  
    }).start();
  }, [progress, duration, animatedValue]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      {/* Animated fill */}
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: fillColor,
            width: widthInterpolated,
            height,
          },
        ]}
      />

      {/* Dots that fade out when covered */}
      <View style={styles.dotsContainer}>
        {Array.from({ length: dotCount }).map((_, i) => {
          const dotPosition = (i / dotCount) * 100;
          const opacity = animatedValue.interpolate({
            inputRange: [0, dotPosition, dotPosition + 10],
            outputRange: [1, 0.2, 0],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: dotColor,
                  width: height / 2.5,
                  height: height / 2.5,
                  borderRadius: height / 2.5,
                  marginHorizontal: 4,
                  opacity,
                } as Animated.AnimatedProps<ViewStyle>,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    left: 0,
    borderRadius: 50,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  dot: {
    opacity: 0.5,
  },
});

export   {ProgressBar};
