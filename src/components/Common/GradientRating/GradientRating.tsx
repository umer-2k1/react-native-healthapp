import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {createGradientRatingStyle, gradientColors} from './styles';
import {GradientType} from '@types';

interface GradientRatingProps {
  score: number;
  minLabel?: string;
  maxLabel?: string;
  segments?: number;
  showPointer?: boolean;
  width?: number;
  height?: number;
  segmentGap?: number;
  type: GradientType;
  disable: boolean;
  reversePointer?: boolean;
}

const GradientRating: React.FC<GradientRatingProps> = ({
  score,
  minLabel = 'Poor',
  maxLabel = 'Excellent',
  segments = 4,
  showPointer = true,
  height = 24,
  segmentGap = 6,
  type,
  disable,
  reversePointer = false,
}) => {
  // Ensure score is between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, score));
  const [barWidth, setBarWidth] = useState(0);

  const effectiveWidth = barWidth - (segments - 1);
  const pointerPosition = reversePointer
    ? (1 - normalizedScore / 100) * effectiveWidth // Right to left
    : (normalizedScore / 100) * effectiveWidth; // Left to right

  const styles = createGradientRatingStyle({
    height,
    pointerPosition,
    segments,
    type,
  });

  const colors = disable ? gradientColors.disable : gradientColors[type];

  return (
    <View style={styles.container}>
      {/* Gradient Segments */}
      <View
        style={styles.barContainer}
        onLayout={event => setBarWidth(event.nativeEvent.layout.width)}>
        {Array.from({length: segments}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              {
                backgroundColor: colors[index % colors.length],
                borderTopLeftRadius: index === 0 ? height / 2 : 0,
                borderBottomLeftRadius: index === 0 ? height / 2 : 0,
                borderTopRightRadius: index === segments - 1 ? height / 2 : 0,
                borderBottomRightRadius:
                  index === segments - 1 ? height / 2 : 0,
                marginLeft: index > 0 ? segmentGap : 0,
              },
            ]}
          />
        ))}
      </View>

      {/* Pointer */}
      {showPointer && !disable && <View style={styles.pointer} />}

      {/*  Labels */}
      <View style={styles.labelsContainer}>
        <Text style={styles.label}>{minLabel}</Text>
        <Text style={styles.label}>{maxLabel}</Text>
      </View>
    </View>
  );
};

export {GradientRating};
