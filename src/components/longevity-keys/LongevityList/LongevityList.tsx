import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {LongevityKeyCard} from './LongevityKeyCard';

const Longevity = {
  id: '1',
  title: 'Sleep Quality',
  percent: 20,
  currentProgress: '7.5 hrs',
  target: '9 hrs',
  colors: {
    primary: '#7B62E5',
    secondary: '#e5e0fa',
  },
};

const LongevityList = () => {
  const LongevityKeys = new Array(6).fill(Longevity);

  return (
    <FlatList
      data={LongevityKeys}
      keyExtractor={(_, index) => index.toString()}
      columnWrapperStyle={styles.itemsSpace}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={({item}) => <LongevityKeyCard {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 10,
  },
  itemsSpace: {
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
    paddingHorizontal: 12,
  },
});

export {LongevityList};
