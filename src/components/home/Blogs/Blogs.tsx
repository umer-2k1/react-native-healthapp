import {HStack, Typography} from '@components/common';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BlogCard} from './BlogCard';
import Vegetables from '@assets/vegetables.png';
import {Colors} from '@constants';

const BLOG = {
  image: Vegetables,
  title: 'Healthy Eating for a Better Life',
  source: 'BBC News',
  isVerified: true,
  date: 'Jun 9, 2025',
  videoUrl: 'https://youtube.com/example-video',
  blogUrl: 'https://bbc.com/example-blog',
};

const Blogs = () => {
  const BLOG_LIST = new Array(7).fill(BLOG);
  const viewAllHandler = () => {};

  return (
    <>
      <HStack justify="space-between" px={12}>
        <Typography variant="h4" fontFamily="montserratSemiBold">
          Health Updates
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
          data={BLOG_LIST}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <BlogCard {...item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flex: 1,
  },
});

export {Blogs};
