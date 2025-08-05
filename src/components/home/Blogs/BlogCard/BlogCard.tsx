import BBC_News from '@assets/bbc-news.png';
import {HStack, Typography} from '@components/common';
import {Colors, globalStyles} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {Image, Linking, TouchableOpacity} from 'react-native';
import {styles} from './styles';

interface BlogCardProps {
  image: any;
  title: string;
  source: string;
  isVerified?: boolean;
  date: string;
  videoUrl: string;
  blogUrl: string;
}

const BlogCard = ({
  image,
  title,
  source,
  isVerified = false,
  date,
  videoUrl,
  blogUrl,
}: BlogCardProps) => {
  const openURL = (url: string) => Linking.openURL(url);

  return (
    <TouchableOpacity
      style={[globalStyles.card, styles.card]}
      onPress={() => openURL(blogUrl)}>
      {/* Video Thumbnail */}
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => openURL(videoUrl)}>
        <Image source={image} style={styles.thumbnail} />
        <HStack style={styles.playButton} align="center" justify="center">
          <Icon name="youtube" color={'red'} size={44} />
        </HStack>
      </TouchableOpacity>

      {/* Title */}
      <Typography
        variant="h6"
        numberOfLines={2}
        fontFamily="montserratSemiBold">
        {title}
      </Typography>

      {/* Footer */}
      <HStack justify="space-between" align="center" py={10}>
        {/* Source Section */}
        <HStack align="center">
          <Image source={BBC_News} style={styles.sourceLogo} />
          <Typography variant="body2" color={Colors.neutral.grey700}>
            {source}
          </Typography>
          {isVerified && <Icon name="verified" color={Colors.primary.main} />}
        </HStack>

        {/* Date */}
        <Typography variant="body2" color={Colors.neutral.grey700}>
          {date}
        </Typography>
      </HStack>
    </TouchableOpacity>
  );
};

export {BlogCard};
