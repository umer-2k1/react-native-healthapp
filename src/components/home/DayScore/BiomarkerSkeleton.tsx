import {HStack} from '@components/common';
import {Colors} from '@constants';
import {SKELETON_SPEED} from '@src/utils';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const BiomarkerSkeleton = () => {
  return (
    <HStack spacing={6}>
      <AnimatedCircularProgress
        size={65}
        fill={0}
        tintColor={Colors.primary.main}
        backgroundColor={Colors.progressBar.unfilled}
        backgroundWidth={5}
        width={5}
        lineCap="round"
        rotation={0}>
        {() => (
          <SkeletonPlaceholder speed={SKELETON_SPEED}>
            <SkeletonPlaceholder.Item height={18} borderRadius={4} width={30} />
          </SkeletonPlaceholder>
        )}
      </AnimatedCircularProgress>
      <SkeletonPlaceholder speed={SKELETON_SPEED}>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          gap={4}>
          <SkeletonPlaceholder.Item height={12} width={40} borderRadius={4} />
          <SkeletonPlaceholder.Item height={12} width={40} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </HStack>
  );
};

export {BiomarkerSkeleton};
