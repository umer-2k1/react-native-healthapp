import React from 'react';
import {Colors, globalStyles} from '@constants';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LongevityKeysSkeletonLoader = () => {
  return (
    <View style={styles.card}>
      <SkeletonPlaceholder speed={1100}>
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
          {/* Top section with icon and title */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%">
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item
                width={40}
                height={40}
                borderRadius={20}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>

          {/* Main value */}
          <SkeletonPlaceholder.Item
            marginTop={15}
            width={100}
            height={50}
            borderRadius={4}
          />

          {/* Progress bar */}
          <SkeletonPlaceholder.Item
            marginTop={15}
            width="100%"
            height={16}
            borderRadius={6}
          />

          {/* Scale labels */}
          <SkeletonPlaceholder.Item
            marginTop={6}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="90%">
            <SkeletonPlaceholder.Item width={40} height={12} borderRadius={4} />
            <SkeletonPlaceholder.Item width={40} height={12} borderRadius={4} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.neutral.white,
    height: 190,
    flex: 1,
  },
  header: {
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    ...globalStyles.card,
    height: 190,
    flex: 1,
  },
});

export default LongevityKeysSkeletonLoader;
