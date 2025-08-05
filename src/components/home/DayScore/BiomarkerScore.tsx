import {HStack, Typography, VStack} from '@components/common';
import {Colors} from '@constants';
import {formatNumber, NONE, SKELETON_SPEED} from '@src/utils';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface BiomarkerScoreProps {
  progress: number;
  label: string;
  icon: React.ReactNode;
  loading?: boolean;
  disable?: boolean;
}

const BiomarkerScore = ({
  progress,
  label,
  icon,
  loading = false,
  disable,
}: BiomarkerScoreProps) => {
  return (
    <HStack spacing={6}>
      <AnimatedCircularProgress
        size={60}
        fill={loading || disable ? 0 : progress}
        tintColor={Colors.primary.main}
        backgroundColor={Colors.progressBar.unfilled}
        backgroundWidth={5}
        width={5}
        lineCap="round"
        rotation={0}>
        {() =>
          loading ? (
            <SkeletonPlaceholder speed={SKELETON_SPEED}>
              <SkeletonPlaceholder.Item
                height={18}
                borderRadius={4}
                width={30}
              />
            </SkeletonPlaceholder>
          ) : (
            <Typography variant="body2" fontFamily="poppinsSemiBold">
              {disable ? NONE : `${formatNumber(progress)}`}
            </Typography>
          )
        }
      </AnimatedCircularProgress>
      <VStack spacing={2}>
        {icon}
        <Typography variant="body2" color="#000" fontFamily="poppinsMedium">
          {label}
        </Typography>
      </VStack>
    </HStack>
  );
};

export {BiomarkerScore};
