import {Typography} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import {Score} from '@types';
import {determineIconName, formatNumber, NONE} from '@utils';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {createCircularProgressStyle} from './styles';

type NestedCircularProgressProps = {
  dailyScore: number;
  size?: number;
  spacing?: number;
  thickness?: number;
  disable?: boolean;
  loading: boolean;
  scores: Score[];
  onExclamation?: () => void;
};

const NestedCircularProgress = ({
  dailyScore,
  size = 220,
  spacing: defaultSpacing = 6,
  thickness = 13,
  disable = false,
  loading = false,
  scores,
  onExclamation,
}: NestedCircularProgressProps) => {
  const defaultScores = [
    {name: 'Default1', cumulative_score_percentage: 0},
    {name: 'Default2', cumulative_score_percentage: 0},
    {name: 'Default3', cumulative_score_percentage: 0},
  ];

  const effectiveScores =
    loading || scores.length === 0 ? defaultScores : scores;

  // Calculate sizes for nested circles
  const limitedScores = effectiveScores.slice(0, 3);
  const progressValues = limitedScores.map(
    score => score.cumulative_score_percentage || 0,
  );

  // Dynamically adjust spacing based on number of rings
  const scoreCount = progressValues.length;

  // Adjust spacing to fill the gap when fewer than 3 scores
  const spacing = scoreCount === 3 ? defaultSpacing : defaultSpacing * 1.5;

  const outerSize = size;
  const middleSize = outerSize - (thickness + spacing) * 2;

  // For 2 scores, we'll skip the innerSize calculation and go straight to centerSize
  const innerSize = middleSize - (thickness + spacing) * 2;

  // Adjust centerSize based on number of scores
  let centerSize;
  if (scoreCount === 3) {
    centerSize = innerSize - (thickness + spacing) * 2;
  } else if (scoreCount === 2) {
    centerSize = middleSize - (thickness + spacing) * 2;
  } else if (scoreCount === 1) {
    centerSize = outerSize - (thickness + spacing) * 2;
  } else {
    centerSize = size * 0.5; // Fallback if no scores
  }

  const styles = createCircularProgressStyle(size, centerSize);
  const shouldDisplay = !(disable || loading) && scores.length > 0;

  // Render the center circle with daily score
  const renderCenterContent = () => (
    <View style={[styles.centerCircle]}>
      <Typography
        fontFamily="montserratBold"
        color={Colors.primary.main}
        fontSize={disable ? 22 : 32}>
        {disable ? NONE : loading ? 0 : formatNumber(dailyScore)}
      </Typography>

      {!disable && (
        <Typography
          fontFamily="montserratBold"
          fontSize={10}
          color={Colors.primary.main}>
          DAILY SCORE
        </Typography>
      )}
      {false && (
        <TouchableOpacity onPress={onExclamation}>
          <Icon name="exclamation" size={18} color={Colors.primary.main} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <>
      <View style={{marginBottom: 10}}>
        {/* Case: No scores available - render just the center */}
        {shouldDisplay && (
          <View style={[styles.verticalIconBar]}>
            {limitedScores.map((value, index) => (
              <View key={index} style={styles.iconContainer}>
                <TouchableOpacity>
                  <Icon name={determineIconName(value.name)} size={14} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {progressValues.length === 0 ? (
          <View>{renderCenterContent()}</View>
        ) : (
          // Case: At least one score is available
          <AnimatedCircularProgress
            size={outerSize}
            width={thickness}
            fill={loading ? 0 : disable ? 0 : progressValues[0] ?? 0}
            tintColor={'#c5a767'}
            backgroundColor={Colors.progressBar.unfilled}
            rotation={0}
            lineCap="round">
            {() => (
              <View>
                {progressValues.length >= 2 ? (
                  // Case: Two or more scores
                  <AnimatedCircularProgress
                    size={middleSize}
                    width={thickness}
                    fill={loading ? 0 : disable ? 0 : progressValues[1] ?? 0}
                    tintColor={'#e0c08a'}
                    backgroundColor={Colors.progressBar.unfilled}
                    rotation={0}
                    lineCap="round">
                    {() => (
                      <View>
                        {progressValues.length >= 3 ? (
                          // Case: Three scores
                          <AnimatedCircularProgress
                            size={innerSize}
                            width={thickness}
                            fill={
                              loading
                                ? 0
                                : (disable ? 0 : progressValues[2]) ?? 0
                            }
                            tintColor={'#d7bf98'}
                            backgroundColor={Colors.progressBar.unfilled}
                            rotation={0}
                            lineCap="round">
                            {() => renderCenterContent()}
                          </AnimatedCircularProgress>
                        ) : (
                          // Case: Two scores - render center directly
                          renderCenterContent()
                        )}
                      </View>
                    )}
                  </AnimatedCircularProgress>
                ) : (
                  // Case: One score - render center directly
                  renderCenterContent()
                )}
              </View>
            )}
          </AnimatedCircularProgress>
        )}
      </View>
    </>
  );
};

export {NestedCircularProgress};
