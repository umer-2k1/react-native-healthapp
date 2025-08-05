import {
  AppView,
  BackButton,
  TextInputField,
  Typography,
} from '@components/common';
import {DailyActionCard} from '@components/daily-action';
import {Colors, DAILY_ACTOIN_LIST, globalStyles} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';

const DailyActions = () => {
  return (
    <AppView backgroundColor={Colors.background.primary}>
      <DailyActionHeader />

      <View style={globalStyles.hPadding12}>
        <TextInputField
          leftIcon={<Icon name="search" color={'#A6ACB6'} />}
          containerStyle={{marginVertical: 16}}
          placeholder="Search here"
        />
      </View>

      <FlatList
        data={DAILY_ACTOIN_LIST}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.itemsSpace}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => (
          <DailyActionCard
            borderColor={item.primary}
            innerCircleColor={item.base}
            label={item.title}
            icon={<Icon name={item.icon} size={30} />}
            points={item.highlights}
          />
        )}
      />
    </AppView>
  );
};

const DailyActionHeader = () => (
  <View
    style={[
      globalStyles.flexRowCenter,
      globalStyles.hPadding12,
      styles.header,
    ]}>
    <BackButton />
    <View style={globalStyles.flexAlignCenter}>
      <Typography variant="h5" fontFamily="montserratMedium">
        Daily Actions
      </Typography>
    </View>
  </View>
);

export {DailyActions};
