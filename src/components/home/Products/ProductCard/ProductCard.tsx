import {Image, Linking, TouchableOpacity, View} from 'react-native';
import {HStack, Typography, VStack} from '@components/common';
import {Colors} from '@constants';
import {Icon} from '@icons';
import React, {useState} from 'react';
import {styles} from './styles';

interface ProductCardProps {
  image: any;
  title: string;
  description: string;
  price: number;
  rating: number;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  price,
  rating,
  url,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => Linking.openURL(url);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}>
          <Icon
            name="filled-heart"
            color={isFavorite ? 'red' : 'black'}
            fill={isFavorite ? 'red' : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      <VStack spacing={4}>
        <Typography
          fontFamily="montserratSemiBold"
          variant="h6"
          numberOfLines={1}>
          {title}
        </Typography>
        <HStack justify="space-between">
          <Typography variant="body1" color={Colors.neutral.grey600}>
            {description}
          </Typography>
          <HStack>
            <Icon name="star" size={16} />
            <Typography variant="body1" color={Colors.neutral.grey600}>
              ({rating.toFixed(1)})
            </Typography>
          </HStack>
        </HStack>
        <Typography fontFamily="montserratSemiBold" variant="h6">
          ${price.toFixed(2)}
        </Typography>
      </VStack>
    </TouchableOpacity>
  );
};

export {ProductCard};
