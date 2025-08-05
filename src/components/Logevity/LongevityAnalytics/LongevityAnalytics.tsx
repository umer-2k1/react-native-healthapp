import {ConnectivityTips} from '@components/connectivity';
import {HStack, Typography} from '@src/components/common';
import {Icon} from '@src/components/Icon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {LineChart} from 'react-native-gifted-charts';

const primary = '#7B62E5';
const secondary = '#e5e0fa';

const LongevityAnalytics = () => {
  const value = 70;
  const lineData = [
    {value: 8, label: 'Day 1'},
    {value: 6, label: 'Day 2'},
    {value: 7, label: 'Day 3'},
    {value: 11, label: 'Day 4'},
    {value: 9, label: 'Day 5'},
    {value: 12, label: 'Day 6'},
  ];

  return (
    <View style={styles.card}>
      <HStack justify="space-between">
        <HStack spacing={6}>
          <View style={[styles.iconContainer, {backgroundColor: primary}]}>
            <Icon name="bed" size={24} />
          </View>
          <Typography fontFamily="poppinsMedium">Sleep Quality</Typography>
        </HStack>
        <Icon name="arrow-right" size={20} />
      </HStack>

      <HStack py={12} justify="space-between" align="flex-end">
        <Typography variant="h2" fontFamily="poppinsMedium">
          7.5 hrs
        </Typography>

        <AnimatedCircularProgress
          size={60}
          fill={value}
          tintColor={primary}
          backgroundColor={secondary}
          backgroundWidth={5}
          width={5}
          lineCap="round"
          rotation={0}>
          {() => (
            <Typography
              variant="body2"
              color={primary}
              fontFamily="poppinsSemiBold">
              {value}%
            </Typography>
          )}
        </AnimatedCircularProgress>
      </HStack>

      <Typography fontFamily="poppinsMedium">Target 9 hrs</Typography>

      <View style={{borderWidth: 0, marginVertical: 16, width: '100%'}}>
        <LineChart
          width={0}
          areaChart
          curved
          hideDataPoints
          isAnimated
          animationDuration={1200}
          startFillColor={primary}
          startOpacity={0.2}
          endOpacity={0.3}
          initialSpacing={10}
          data={lineData}
          spacing={60}
          thickness={2}
          yAxisColor={primary}
          showVerticalLines={true}
          verticalLinesColor={'rgba(128,128,128,0.5)'}
          verticalLinesStrokeDashArray={[1, 1]}
          xAxisColor={primary}
          color={primary}
          xAxisLabelTextStyle={{color: 'black', fontSize: 10}}
          yAxisOffset={4}
        />

        {/* <LineChart
          data={lineData}
          width={chartWidth}
          height={300}
          noOfSections={6}
          areaChart
          curved
          hideDataPoints
          hideRules
          hideYAxisText
          yAxisColor="transparent"
          xAxisColor="transparent"
          color="#7B68EE" // Purple color for the line
          startFillColor="rgba(230, 232, 240, 0.8)" // Light blue area fill
          endFillColor="rgba(230, 232, 240, 0.8)"
          startOpacity={0.8}
          endOpacity={0.8}
          thickness={3}
          spacing={chartWidth / 20}
          initialSpacing={10}
          xAxisLabelTextStyle={styles.xAxisLabel}
          hideOrigin
          yAxisTextStyle={styles.yAxisText}
          yAxisThickness={0}
          xAxisThickness={0}
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: '#7B68EE',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: any) => {
              return (
                <View style={styles.pointerLabel}>
                  <Text style={styles.pointerLabelText}>{items[0].value}</Text>
                </View>
              );
            },
          }}
        /> */}
      </View>

      <ConnectivityTips
        title="Tip"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra arcu ut lectus"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(191, 191, 191, 0.2)',
    borderRadius: 16,
    padding: 16,
    shadowColor: 'rgba(14, 39, 105, 0.1)', // #0E2769 with 10% opacity
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xAxisLabel: {},
  yAxisText: {},
  pointerLabel: {},
  pointerLabelText: {},
});

export {LongevityAnalytics};
