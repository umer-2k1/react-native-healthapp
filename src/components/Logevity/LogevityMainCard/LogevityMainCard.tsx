import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const LogevityMainCard = () => {
  return (
    <View style={styles.card}>
      <Text>LogevityMainCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(191, 191, 191, 0.2)', // #BFBFBF with 20% opacity
    borderRadius: 8, // Adjust as needed
    padding: 16, // Adjust padding as needed
    shadowColor: 'rgba(14, 39, 105, 0.1)', // #0E2769 with 10% opacity
    shadowOffset: {width: 0, height: 0}, // X: 0, Y: 0
    shadowOpacity: 1,
    shadowRadius: 12, // Blur of 12
    elevation: 4,
  },
});

export {LogevityMainCard};
