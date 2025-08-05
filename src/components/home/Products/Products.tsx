import Shoe from '@assets/shoe.png';
import {HStack, Typography} from '@components/common';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ProductCard} from './ProductCard';
import {Colors} from '@constants';

const PRODUCT = {
  id: '1',
  image: Shoe,
  title: 'Running Sneakers',
  description: 'FLK Spot',
  price: 95.0,
  rating: 5.0,
  url: 'https://www.amazon.com/shoes/s?k=shoes',
};

const Products = () => {
  const ProductsList = new Array(10).fill(PRODUCT);
  const viewAllHandler = () => {};

  return (
    <>
      <HStack justify="space-between" px={12}>
        <Typography variant="h4" fontFamily="montserratSemiBold">
          Products
        </Typography>
        <TouchableOpacity onPress={viewAllHandler}>
          <Typography
            variant="h5"
            fontFamily="montserratSemiBold"
            color={Colors.text.main}>
            View all
          </Typography>
        </TouchableOpacity>
      </HStack>
      <View style={styles.container}>
        <FlatList
          data={ProductsList}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <ProductCard {...item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
});

export {Products};
